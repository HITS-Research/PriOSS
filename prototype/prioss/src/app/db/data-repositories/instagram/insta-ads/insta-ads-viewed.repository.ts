import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./insta-ads-viewed.sql";
import { InstaAdsViewedInfo } from "src/app/models/Instagram/LikedAdsInfo/InstaAdsViewedInfo";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

/**
 * This repository component is responsible for providing functions to insert and request data from the
 * insta_ads_viewed table that holds all data regarding ads that were viewed by the Instagram user.
 * 
 * @author: Paul (pasch@mail.upb.de)
 */
@Injectable()
export class InstaAdsViewedRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddInstaAdsViewedBaseSQL, sql.bulkAddInstaAdsViewedValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdsViewedBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param title the title of the first viewed ad that should be added to the Instagram ads viewed table
     * @param timestamp the timestamp of the first viewed ad should be added to the Instagram ads interest table
     * @param totalRowCount the total number of rows that should be added to the Instagram ads activity table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     * 
     * @author: Paul (pasch@mail.upb.de)
     */
    async startAdsViewedBulkAdd(title: string, timestamp: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([title, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram ads viewed table as part of a bulk-add run
     * 
     * @param title the title of the viewed ad that should be added to the Instagram ads viewed table
     * @param timestamp the timestamp of the viewed ad that should be added to the Instagram ads viewed table
     * @returns 
     */
    async addAdsViewedBulkEntry(title: string, timestamp: string) : Promise<void> {
        return this.addBulkEntry([title, timestamp]);
    }

    /**
     * This async method selects all entries from the insta_ads_interest table
     * 
     * @returns an array of InstaAdsViewed
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getAllInstaAdsViewed(): Promise<InstaAdsViewedInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let result = await db.query(sql.selectInstaAdsViewedSQL);
            return result.values as InstaAdsViewedInfo[];
        });
    }
}