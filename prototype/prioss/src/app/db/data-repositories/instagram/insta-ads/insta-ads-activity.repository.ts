import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./insta-ads-activity.sql";


/**
 * This repository component is responsible for providing functions to insert and request data from the insta_ads_interests,
 * insta_ads_activity table that hold all data regarding instagram ads.
 * 
 * @author: Paul (pasch@mail.upb.de)
 */
@Injectable()
export class InstaAdsActivityRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddInstaAdsActivityBaseSQL, sql.bulkAddInstaAdsActivityValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    async startAdActivityBulkAdd(advertiserName: string, has_data_file_custom_audience: string, has_remarketing_custom_audience: string, has_in_person_store_visit: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([advertiserName, has_data_file_custom_audience, has_remarketing_custom_audience, has_in_person_store_visit], totalRowCount, targetBulkSize);
    }

    async addAdActivityBulkEntry(advertiserName: string, has_data_file_custom_audience: string, has_remarketing_custom_audience: string, has_in_person_store_visit: string) : Promise<void> {
        return this.addBulkEntry([advertiserName, has_data_file_custom_audience, has_remarketing_custom_audience, has_in_person_store_visit]);
    }
}