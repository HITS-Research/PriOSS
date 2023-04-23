import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./insta-ads-clicked.sql";


/**
 * This repository component is responsible for providing functions to insert and request data from the
 * insta_ads_clicked table that holds all data regarding clicked ads on Instagram.
 * 
 * @author: Paul (pasch@mail.upb.de)
 */
@Injectable()
export class InstaAdsClickedRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddInstaAdsClickedBaseSQL, sql.bulkAddInstaAdsClickedValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdsClickedBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param title the title of the first ad that should be added to the Instagram ads clicked table
     * @param timestamp the timestamp of the first ad that should be added to the Instagram ads clicked table
     * @param totalRowCount the total number of rows that should be added to the Instagram ads activity table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     * 
     * @author: Paul (pasch@mail.upb.de)
     */
    async startAdsClickedBulkAdd(title: string, timestamp: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([title, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram ads clicked table as part of a bulk-add run
     * 
     * @param title the title of the ad that should be added to the Instagram ads clicked table
     * @param timestamp the timestamp of the ad that should be added to the Instagram ads clicked table
     * 
     * @author: Paul (pasch@mail.upb.de)
     */
    async addAdsClickedBulkEntry(title: string, timestamp: string) : Promise<void> {
        return this.addBulkEntry([title, timestamp]);
    }
}