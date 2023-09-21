import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./face-ads-interacted.sql";
import { AdsInteractedModel } from "src/app/models/Facebook/adsInteracted";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";


/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_ads_interacted table that holds all data regarding facebook ads interacted.
 * 
 * @author: Deepa (dbelvi@mail.upb.de)
 */
@Injectable()
export class FacebookAdsInteractedRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFaceAdsInteractedBaseSQL, sql.bulkAddFaceAdsInteractedValuesSQL, sql.bulkAddValueConnector, dbService);
    }

       /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdsClickedBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param title the title of the first ad that should be added to the Instagram ads clicked table
     * @param timestamp the timestamp of the first ad that should be added to the Instagram ads clicked table
     * @param totalRowCount the total number of rows that should be added to the Instagram ads activity table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     * 
     * @author: @author: rishmamn@campus.uni-paderborn.de
     */
       async startAdsClickedBulkAdd(title: string, action: string,timestamp: string,totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([title, action, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram ads clicked table as part of a bulk-add run
     * 
     * @param title the title of the ad that should be added to the Instagram ads clicked table
     * @param timestamp the timestamp of the ad that should be added to the Instagram ads clicked table
     * 
     *@author: @author: rishmamn@campus.uni-paderborn.de
     */
    async addAdsClickedBulkEntry(title: string, action: string ,timestamp: string) : Promise<void> {
        return this.addBulkEntry([title,action, timestamp]);
    }
    
    /**
     * This async method fetches all entries from the ads interacted  table.
     * 
     * @author: @author: rishmamn@campus.uni-paderborn.de
     * 
     */
       async getAllFaceAdsInteracted() : Promise<AdsInteractedModel[]> {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
    
          const result = await db.query(sql.selectAllFaceAdsInteracted);
          return result.values as AdsInteractedModel[];
        });
      }
}
