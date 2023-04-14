import { Injectable } from "@angular/core";
import { DBSQLiteValues, SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { createSchema, dropSchema } from "../schema.sql";
import { DBService } from "../../services/db/db.service";
import { insertIntoSpotHistorySQL, selectAllSpotHistory } from "./spothistory.sql";
import { SpotListenHistoryEntry } from "src/app/models/SpotListenHistoryEntry";

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
}