import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../services/db/db.service";
import { bulkAddSpotHistoryBaseSQL, bulkAddSpotHistoryValuesSQL, bulkAddValueConnector, insertIntoSpotHistorySQL, selectAllSpotHistory, spotHistoryByDaySQL, spotHistoryByHourSQL, spotHistoryByMonthSQL, spotHistoryByYearSQL, spotHistoryMostRecentDaySQL } from "./spot-history.sql";
import { SpotListenHistoryEntry } from "src/app/models/Spotify/ListeningHistory/SpotListenHistoryEntry";
import { SpotYearlyListening } from "src/app/models/Spotify/ListeningHistory/SpotYearlyListening";
import { SpotMonthlyListening } from "src/app/models/Spotify/ListeningHistory/SpotMonthlyListening";
import { SpotDailyListening } from "src/app/models/Spotify/ListeningHistory/SpotDailyListening";
import { SpotHourlyListening } from "src/app/models/Spotify/ListeningHistory/SpotHourlyListening";
import * as dateUtils from "../../utilities/dateUtils.functions";

@Injectable()
export class SpotHistoryRepository {

  private bulkAddSQL: string = "";
  private bulkAddValues: (string|number)[] = [];
  private currBulkSize: number = 0;
  private targetBulkSize: number = 100;
  private totalRemainingBulkAddRowCount: number = 0;

  constructor(private dbService: DBService){

  }

  async startHistoryBulkAdd(endTime: string, artistName: string, trackName: string, msPlayed: number, totalRowCount: number, targetBulkSize: number = 100)
  {
    this.bulkAddSQL = bulkAddSpotHistoryBaseSQL + " " + bulkAddSpotHistoryValuesSQL;
    this.bulkAddValues = [endTime, artistName,  trackName, msPlayed];
    this.totalRemainingBulkAddRowCount = totalRowCount - 1;
    this.currBulkSize += 1;
    this.targetBulkSize = targetBulkSize;
  }

  async addBulkHistoryEntry(endTime: string, artistName: string, trackName: string, msPlayed: number)
  {
    if (this.currBulkSize >= this.targetBulkSize && this.totalRemainingBulkAddRowCount > 1)//this is the last row in this bulk, but it is not the last overall row (=there is at least one bulk to follow)
    {
      //run the query without the newly passed row
      await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
        let ret: capSQLiteChanges = await db.run(this.bulkAddSQL, this.bulkAddValues);
      });

      //Start a new bulk with the newly passed row
      this.bulkAddSQL = bulkAddSpotHistoryBaseSQL + " " + bulkAddSpotHistoryValuesSQL;
      this.bulkAddValues = [endTime, artistName, trackName, msPlayed];
      this.totalRemainingBulkAddRowCount -= 1;
      this.currBulkSize = 1;
    }
    else if (this.totalRemainingBulkAddRowCount <= 1)//This is the last entry inside this bulk add: clean up & run query
    {
      //Append a new values row to the SQL query and corresponding values to the values array
      this.bulkAddSQL += " " + bulkAddValueConnector + " " + bulkAddSpotHistoryValuesSQL;
      this.bulkAddValues.push(endTime, artistName,  trackName, msPlayed);

      //run query
      await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
        let ret: capSQLiteChanges = await db.run(this.bulkAddSQL, this.bulkAddValues);
      });

      //Reset the bulk add variables,
      this.totalRemainingBulkAddRowCount = 0;
      this.currBulkSize = 0;
      this.bulkAddSQL = "";
      this.bulkAddValues = [];
    }
    else //No need to run the query, just add the row to the current bulk add command
    {
      //Append a new values row to the SQL query and corresponding values to the values array
      this.bulkAddSQL += " " + bulkAddValueConnector + " " + bulkAddSpotHistoryValuesSQL;
      this.bulkAddValues.push(endTime, artistName,  trackName, msPlayed);

      this.totalRemainingBulkAddRowCount -= 1;
      this.currBulkSize += 1;
    }

    return Promise.resolve();
  }

  async createSpotHistoryEntry(historyEntry: SpotListenHistoryEntry)
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let sqlStatement = insertIntoSpotHistorySQL;
      let values = [historyEntry.endTime, historyEntry.artistName,  historyEntry.trackName, historyEntry.msPlayed];

      let ret: capSQLiteChanges = await db.run(sqlStatement, values);

      let lastId = ret.changes?.lastId;
      if (typeof(lastId) !== "undefined" && lastId > 0) {
        return ret.changes as SpotListenHistoryEntry;
      }

      throw Error('createSpotHistoryEntry failed');
    });
  }

  async getSpotHistory(): Promise<SpotListenHistoryEntry[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let result = await db.query(selectAllSpotHistory);
      return result.values as SpotListenHistoryEntry[];

    });
  }

  async getHistoryByYear(): Promise<SpotYearlyListening[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let result = await db.query(spotHistoryByYearSQL);
      return result.values as SpotYearlyListening[];

    });
  }

  async getHistoryByMonth(): Promise<SpotMonthlyListening[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let result = await db.query(spotHistoryByMonthSQL);
      return result.values as SpotMonthlyListening[];

    });
  }

  async getHistoryByDay(): Promise<SpotDailyListening[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let result = await db.query(spotHistoryByDaySQL);
      return result.values as SpotDailyListening[];

    });
  }

  async getHistoryByHour(day: Date): Promise<SpotHourlyListening[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let dateString: string = dateUtils.getDisplayDateString(day);
      let result = await db.query(spotHistoryByHourSQL, [dateString]);
      return result.values as SpotHourlyListening[];
    });
  }

  async getMostRecentDay(): Promise<Date>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let result = await db.query(spotHistoryMostRecentDaySQL);
      if(result.values)
      {
        let dateString: string = result.values[0].date;
        return dateUtils.parseDate(dateString) as Date;
      }
      else
      {
        throw Error('getMostRecentDay did not return anything!');
      }
    });
  }
}
