import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./face_ads_interacted.sql";


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
     * Starts a bulk-add run that adds multiple rows from subsequent addAdActivityBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param title the tilte of the advertiser that has been interacted with to be added to the face_ads_interacted table.
     * @param action the action the user performed to be added to the face_ads_interacted table.
     * @param timestamp timestamp to be added to the face_ads_interacted table
     * @param totalRowCount the total number of rows that should be added to the table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: Deepa (dbelvi@mail.upb.de)
     */
    async startAdActivityBulkAdd(title: string, action: string, timestamp: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([title, action, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Facebook ads activity table as part of a bulk-add run
     * 
     * @author: Deepa (dbelvi@mail.upb.de)
     */
    async addAdActivityBulkEntry(title: string, action: string, timestamp: string) : Promise<void> {
        return this.addBulkEntry([title, action, timestamp]);
    }
}