import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import { bulkAddSpotHistoryBaseSQL, bulkAddSpotHistoryValuesSQL, bulkAddValueConnector, insertIntoSpotHistorySQL, selectAllSpotHistory, spotHistoryByDaySQL, spotHistoryByHourSQL, spotHistoryByMonthSQL, spotHistoryByYearSQL, spotHistoryMostRecentDaySQL } from "./spot-history.sql";
import { SpotListenHistoryEntry } from "src/app/models/Spotify/ListeningHistory/SpotListenHistoryEntry";
import { SpotYearlyListening } from "src/app/models/Spotify/ListeningHistory/SpotYearlyListening";
import { SpotMonthlyListening } from "src/app/models/Spotify/ListeningHistory/SpotMonthlyListening";
import { SpotDailyListening } from "src/app/models/Spotify/ListeningHistory/SpotDailyListening";
import { SpotHourlyListening } from "src/app/models/Spotify/ListeningHistory/SpotHourlyListening";
import * as dateUtils from "../../../../utilities/dateUtils.functions";

/**
  * This repository component is responsible for providing functions to insert and request data from the spot_history table
  * that houses the Spotify listening history entries from a data-download.
  * It includes a method to bulk-add up to 500 rows to the table in a single SQL statement by building up the SQL statement over multiple method calls.
  *
  * @author: Simon (scg@mail.upb.de), Rashida (rbharmal@mail.uni-paderborn.de )
  *
  */
@Injectable()
export class SpotHistoryRepository {

  /* 
   * Variables needed for bulk add feature
   */
  private bulkAddSQL: string = "";//The SQL command as a prepared statement (values have placeholders: '?')
  private bulkAddValues: (string|number)[] = [];//the values to fill the placeholders in the prepared statement with 
  private currBulkSize: number = 0;//use to detect if the target bulk size is reached and a SQL command has to be run
  private targetBulkSize: number = 500;//the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
  private totalRemainingBulkAddRowCount: number = 0;//the total number of rows remaining that should be added across all bulks inside this bulk add run

  constructor(private dbService: DBService){

  }

/**
  * Starts a bulk-add run that adds multiple rows from subsequent addBulkHistoryEntry-Calls to the DB in a single SQL statement.
  *
  * @param endTime the endTime of the first row that should be added to the spotify history
  * @param artistName the artistName of the first row that should be added to the spotify history
  * @param trackName the trackName of the first row that should be added to the spotify history
  * @param msPlayed the msPlayed of the first row that should be added to the spotify history
  * @param totalRowCount the total number of rows that should be added to the spotify history table in this bulk add run
  * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
  async startHistoryBulkAdd(endTime: string, artistName: string, trackName: string, msPlayed: number, totalRowCount: number, targetBulkSize: number = 500)
  {
    this.bulkAddSQL = bulkAddSpotHistoryBaseSQL + " " + bulkAddSpotHistoryValuesSQL;
    this.bulkAddValues = [endTime, artistName,  trackName, msPlayed];
    this.totalRemainingBulkAddRowCount = totalRowCount - 1;
    this.currBulkSize += 1;
    this.targetBulkSize = targetBulkSize;
  }

/**
  * Adds a row to the Spotify History table as part of a bulk-add run
  *
  * @param endTime the endTime of the row that should be added to the spotify history
  * @param artistName the artistName of the row that should be added to the spotify history
  * @param trackName the trackName of the row that should be added to the spotify history
  * @param msPlayed the msPlayed of the row that should be added to the spotify history
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
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

/**
  * Inserts a single entry into the spot_history table. Not that this may build up a single DB connection and run a single insert command to insert this line
  * and therefore does not scale well when called repeatedly for a large number of entries.
  * In such cases, please use startHistoryBulkAdd & addBulkHistoryEntry instead
  * 
  * @param historyEntry the SpotListenHistoryEntry to insert 
  * @returns The promise of a SpotListenHistoryEntry that was inserted
  * 
  * @author: Simon (scg@mail.upb.de)
  */
  async createSpotHistoryEntry(historyEntry: SpotListenHistoryEntry) : Promise<SpotListenHistoryEntry>
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

  /**
   * Queries the complete spotify listening history from the database
   * @returns An array of SpotListenHistoryEntrys 
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  async getSpotHistory(): Promise<SpotListenHistoryEntry[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let result = await db.query(selectAllSpotHistory);
      return result.values as SpotListenHistoryEntry[];

    });
  }

  /**
   * Queries the spotify listening history grouped by years from the database
   * @returns An array of SpotYearlyListenings 
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  async getHistoryByYear(): Promise<SpotYearlyListening[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let result = await db.query(spotHistoryByYearSQL);
      return result.values as SpotYearlyListening[];

    });
  }

  /**
   * Queries the spotify listening history grouped by months from the database
   * @returns An array of SpotMonthlyListenings 
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  async getHistoryByMonth(): Promise<SpotMonthlyListening[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let result = await db.query(spotHistoryByMonthSQL);
      return result.values as SpotMonthlyListening[];

    });
  }

  /**
   * Queries the spotify listening history grouped by days and filtered between the given start and end dates (TODO) from the database
   * @returns An array of SpotDailyListenings 
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  async getHistoryByDay(fromDate: Date, toDate: Date): Promise<SpotDailyListening[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let values = [dateUtils.getDisplayDateString(fromDate),dateUtils.getDisplayDateString(toDate)];
      let result = await db.query(spotHistoryByDaySQL, values);
      return result.values as SpotDailyListening[];

    });
  }

  /**
   * Queries the spotify listening history grouped by the hours within the given day from the database
   * @returns An array of SpotHourlyListenings. Each hour of the day is present once in the array (24 entries)
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  async getHistoryByHour(day: Date): Promise<SpotHourlyListening[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let dateString: string = dateUtils.getDisplayDateString(day);
      let result = await db.query(spotHistoryByHourSQL, [dateString]);
      return result.values as SpotHourlyListening[];
    });
  }

  /**
   * @returns the most recent day that occurs in the spotify listening history in the database
   * 
   * @author: Simon (scg@mail.upb.de)
   */
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
