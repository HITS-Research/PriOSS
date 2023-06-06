import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./insta-ads-interest.sql"
import { InstaAdsInterestInfo } from "src/app/models/Instagram/LikedAdsInfo/InstaAdsInterestInfo";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

/**
 * This repository component is responsible for providing functions to insert and request data from the
 * insta_ads_interest table that holds all data regarding ads that might be interesting for the user.
 * 
 * @author: Paul (pasch@mail.upb.de)
 */
@Injectable()
export class InstaAdsInterestRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddInstaAdsInterestsBaseSQL, sql.bulkAddInstaAdsInterestsValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdInterestBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param interest the name of the first interest that should be added to the Instagram ads interest table
     * @param totalRowCount the total number of rows that should be added to the Instagram ads activity table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     * 
     * @author: Paul (pasch@mail.upb.de)
     */
    async startAdInterestBulkAdd(interest: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([interest], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram ads interest table as part of a bulk-add run
     * 
     * @param interest the name of the interest that should be added to the Instagram ads interest table
     *
     * @author: Paul (pasch@mail.upb.de)
     */
    async addAdInterestBulkEntry(interest: string) : Promise<void> {
        return this.addBulkEntry([interest]);
    }

    /**
     * This async method selects all entries from the insta_ads_interest table
     * 
     * @returns an array of InstaAdsInterested
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getAllInstaAdsInterested(): Promise<InstaAdsInterestInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let result = await db.query(sql.selectInstaAdsInterestSQL);
            return result.values as InstaAdsInterestInfo[];
        });
    }
}