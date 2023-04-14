import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../services/db/db.service";
import { insertIntoSpotHistorySQL, selectAllSpotHistory, spotHistoryByDaySQL, spotHistoryByHourSQL, spotHistoryByMonthSQL, spotHistoryByYearSQL, spotHistoryMostRecentDaySQL } from "./spot-history.sql";
import { SpotListenHistoryEntry } from "src/app/models/Spotify/ListeningHistory/SpotListenHistoryEntry";
import { SpotYearlyListening } from "src/app/models/Spotify/ListeningHistory/SpotYearlyListening";
import { SpotMonthlyListening } from "src/app/models/Spotify/ListeningHistory/SpotMonthlyListening";
import { SpotDailyListening } from "src/app/models/Spotify/ListeningHistory/SpotDailyListening";
import { SpotHourlyListening } from "src/app/models/Spotify/ListeningHistory/SpotHourlyListening";
import * as dateUtils from "../../utilities/dateUtils.functions";

@Injectable()
export class SpotHistoryRepository {

  constructor(private dbService: DBService){
  
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