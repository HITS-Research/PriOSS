import { Injectable } from "@angular/core";
import { DBService } from "../../../db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./insta-ads-viewed.sql"
import { InstaAdsViewedInfo } from "src/app/instagram/models/LikedAdsInfo/InstaAdsViewedInfo";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

/**
 * This repository component is responsible for providing functions to insert and request data from the
 * insta_ads_interest table that holds all data regarding ads that might be interesting for the user.
 *
 * @author: Mayank (mayank@mail.upb.de)
 */
@Injectable()
export class InstaAdsViewedRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddInstaAdsViewedBaseSQL, sql.bulkAddInstaAdsViewedValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Add a single row to the DB.
     *
     * @param title the title of the ad that should be added to the Instagram ads viewed table
     * @param timestamp the timestamp of the ad that should be added to the Instagram ads viewed table
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addSinlgeAdViewedData(title: string, timestamp: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            const sqlStatement = sql.insertIntoInstaAdsViewedSQL;
            const values = [title, timestamp];
            await db.run(sqlStatement, values);
        });
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdViewedBulkEntry-Calls to the DB in a single SQL statement.
     *
     * @param title the title of the first ad that should be added to the Instagram ads viewed table
     * @param timestamp the timestamp of the first ad that should be added to the Instagram ads viewed table
     * @param totalRowCount the total number of rows that should be added to the Instagram ads activity table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async startAdViewedBulkAdd(title: string, timestamp: string, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([title, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram ads interest table as part of a bulk-add run
     *
     * @param title the title of the first ad that should be added to the Instagram ads viewed table
     * @param timestamp the timestamp of the first ad that should be added to the Instagram ads viewed table
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addAdViewedBulkEntry(title: string, timestamp: string) : Promise<void> {
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

            const result = await db.query(sql.selectInstaAdsViewedSQL);
            return result.values as InstaAdsViewedInfo[];
        });
    }
}
