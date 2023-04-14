import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../services/db/db.service";
import { insertIntoSpotHistorySQL, selectAllSpotHistory, spotHistoryByMonthSQL, spotHistoryByYearSQL } from "./spot-history.sql";
import { SpotListenHistoryEntry } from "src/app/models/SpotListenHistoryEntry";
import { SpotYearlyListening } from "src/app/models/SpotYearlyListening";
import { SpotMonthlyListening } from "src/app/models/SpotMonthlyListening";

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
}