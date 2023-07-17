import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./face-search-history.sql";
import { SearchHistoryModel } from "src/app/models/Facebook/searchHistory";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";


/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_search_history table that holds all data regarding facebook search history.
 * 
 * @author: Rishma (rishmamn@mail.upb.de)
 */
@Injectable()
export class FacebookSearchHistoryRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFaceSearchHistoryBaseSQL, sql.bulkAddFaceSearchHistoryValuesSQL, sql.bulkAddValueConnector, dbService);
    }

       /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdsClickedBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param text the search lists that should be added to the Facebook Search History table.
     * @param timestamp the timestamp of the content searched  that should be added to the Facebook Search History table.
     * @param totalRowCount the total number of rows that should be added to the Search History activity table in this bulk add run.
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time.
     * 
     * @author: Rishma (rishmamn@mail.upb.de)
     */
       async startSearchHistoryBulkAdd(text: string, timestamp: number, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([text, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Facebook Search History table as part of a bulk-add run
     * 
     *@param text the search lists that should be added to the Facebook Search History table.
     *@param timestamp the timestamp of the content searched  that should be added to the Facebook Search History table.
     * 
     *@author: Rishma (rishmamn@mail.upb.de)
     */
    async addSearchHistoryBulkEntry(text: string, timestamp: number,) : Promise<void> {
        return this.addBulkEntry([text, timestamp]);
    }
    
    /**
     * This async method fetches all entries from the  Facebook Search History table.
     * 
     * @author: Rishma (rishmamn@mail.upb.de)
     * 
     */
       async getAllFaceSearchHistory() : Promise<[SearchHistoryModel]> {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
    
          let result = await db.query(sql.selectAllSearchHistoryData);
          return result.values as SearchHistoryModel[];
        });
      }
}
