import { Injectable } from "@angular/core";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import { AccountActivitiesModel } from "../../../../models/Facebook/accountActivities";
import * as sql from "./face_account_activity.sql";

/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_account_activity table that holds all data about all use activities such as 
 * Login, Session updated, Web Session Terminated, Password Change, Mobile Session Terminated to be added to the table.
 * 
 * @author: Deepa (dbelvi@mail.upb.de)
 * 
 */

@Injectable()
export class FacebookAccountActivityRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFaceAccountActivityBaseSQL, sql.bulkAddFaceAccountActivityValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdActivityBulkEntry-Calls to the DB in a single SQL statement.
     *
     * @param action action data, to be added to face_account_activity table. 
     * @param timestamp timestamp to be added to the face_account_activity table
     * @param city city in which the action was performed, to be added to face_account_activity table.
     * @param region region of the city, to be added to face_account_activity table.
     * @param country country of the region, to be added to face_account_activity table.
     * @param site_name site for which the action was performed, to be added to face_account_activity table.
     * @param totalRowCount the total number of rows that should be added to the table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: Deepa (dbelvi@mail.upb.de)
    */

    async startAdActivityBulkAdd(action: string, timestamp: string, city: string, region: string, country: string, site_name: string, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([action, timestamp, city, region, country, site_name], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Facebook face_account_activity table as part of a bulk-add run
     * 
     * @author: Deepa (dbelvi@mail.upb.de)
    */

    async addAdActivityBulkEntry(action: string, timestamp: string, city: string, region: string, country: string, site_name: string) : Promise<void> {
        return this.addBulkEntry([action, timestamp, city, region, country, site_name]);
    }

    /**
     * This async method fetches all entries from the face_account_activity table.
     * 
     * @author: Deepa (dbelvi@mail.upb.de)
     * 
    */

    async getAllAccountActivities() : Promise<AccountActivitiesModel[]> {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
          const result = await db.query(sql.selectAllAccountActivity);
          return result.values as AccountActivitiesModel[];
        });
    }
}