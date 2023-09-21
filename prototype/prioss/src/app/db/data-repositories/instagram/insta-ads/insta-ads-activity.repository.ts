import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./insta-ads-activity.sql";
import { InstaAdsActivityInfo } from "src/app/models/Instagram/LikedAdsInfo/InstaAdsActivityInfo";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

/**
 * This repository component is responsible for providing functions to insert and request data from the
 * insta_ads_activity table that holds all data regarding instagram ads activities.
 * 
 * @author: Mayank (mayank@mail.upb.de)
 */
@Injectable()
export class InstaAdsActivityRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddInstaAdsActivityBaseSQL, sql.bulkAddInstaAdsActivityValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Add a single row to the DB.
     * 
     * @param advertiserName the name of the advertiser that should be added to the Instagram ads activity table
     * @param has_data_file_custom_audience the value for has_data_file_custom_audience that should be added to the Instagram ads activity table
     * @param has_remarketing_custom_audience the value for has_remarketing_custom_audienc that should be added to the Instagram ads activity table
     * @param has_in_person_store_visit the value for has_in_person_store_visit that should be added to the Instagram ads activity table
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addSingleAdActivityData(advertiserName: string, has_data_file_custom_audience: string, has_remarketing_custom_audience: string, has_in_person_store_visit: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            const sqlStatement = sql.insertIntoInstaAdsActivitySQL;
            const values = [advertiserName, has_data_file_custom_audience, has_remarketing_custom_audience, has_in_person_store_visit];
            await db.run(sqlStatement, values);
        });
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdActivityBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param advertiserName the name of the first advertiser that should be added to the Instagram ads activity table
     * @param has_data_file_custom_audience the value for has_data_file_custom_audience that should be added to the Instagram ads activity table
     * @param has_remarketing_custom_audience the value for has_remarketing_custom_audienc that should be added to the Instagram ads activity table
     * @param has_in_person_store_visit the value for has_in_person_store_visit that should be added to the Instagram ads activity table
     * @param totalRowCount the total number of rows that should be added to the Instagram ads activity table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async startAdActivityBulkAdd(advertiserName: string, has_data_file_custom_audience: string, has_remarketing_custom_audience: string, has_in_person_store_visit: string, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([advertiserName, has_data_file_custom_audience, has_remarketing_custom_audience, has_in_person_store_visit], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram ads activity table as part of a bulk-add run
     * 
     * @param advertiserName the name of the advertiser that should be added to the Instagram ads activity table
     * @param has_data_file_custom_audience the value for has_data_file_custom_audience that should be added to the Instagram ads activity table
     * @param has_remarketing_custom_audience the value for has_remarketing_custom_audienc that should be added to the Instagram ads activity table
     * @param has_in_person_store_visit the value for has_in_person_store_visit that should be added to the Instagram ads activity table
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addAdActivityBulkEntry(advertiserName: string, has_data_file_custom_audience: string, has_remarketing_custom_audience: string, has_in_person_store_visit: string) : Promise<void> {
        return this.addBulkEntry([advertiserName, has_data_file_custom_audience, has_remarketing_custom_audience, has_in_person_store_visit]);
    }

    /**
     * This async method selects all entries from the insta_ads_activity table
     * 
     * @returns an array of InstaAdsActivity
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getAllInstaAdsActivity(): Promise<InstaAdsActivityInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const result = await db.query(sql.selectInstaAdsActivitySQL);
            return result.values as InstaAdsActivityInfo[];
        });
    }
}