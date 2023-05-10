import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./face_ads_information.sql";


/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_ads_information table that holds all data regarding facebook ads interacted.
 * 
 * @author: Deepa (dbelvi@mail.upb.de)
 */
@Injectable()
export class FacebookAdsInformationRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFaceAdsInformationBaseSQL, sql.bulkAddFaceAdsInformationValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdActivityBulkEntry-Calls to the DB in a single SQL statement.
     * @param advertiser_name name of the advertiser that user has interacted with to be added to the face_ads_information table.
     * @param has_data_file_custom_audience custom audience information to be added to the face_ads_information table.
     * @param has_remarketing_custom_audience custom remarketing info to be added to the face_ads_information table
     * @param has_in_person_store_visit in person store visit data to be added to face_ads_information table.
     * @param totalRowCount the total number of rows that should be added to the table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: Deepa (dbelvi@mail.upb.de)
     */
    async startAdActivityBulkAdd(advertiser_name: string, has_data_file_custom_audience: string, has_remarketing_custom_audience: string, has_in_person_store_visit: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([advertiser_name, has_data_file_custom_audience, has_remarketing_custom_audience, has_in_person_store_visit], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram ads activity table as part of a bulk-add run
     * 
     * @author: Deepa (dbelvi@mail.upb.de)
     */
    async addAdActivityBulkEntry(advertiser_name: string, has_data_file_custom_audience: string, has_remarketing_custom_audience: string, has_in_person_store_visit: string) : Promise<void> {
        return this.addBulkEntry([advertiser_name, has_data_file_custom_audience, has_remarketing_custom_audience, has_in_person_store_visit]);
    }
}