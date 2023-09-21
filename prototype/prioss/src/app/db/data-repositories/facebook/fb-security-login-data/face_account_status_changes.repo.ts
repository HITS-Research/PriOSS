import { Injectable } from "@angular/core";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./face_account_status_changes.sql";
import { AccountStatusChangesModel } from "../../../../models/Facebook/accountStatusChanges";

/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_status_changes table that holds all data regarding locations where user has logged in and the device(s) used to login.
 * 
 * @author: Deepa (dbelvi@mail.upb.de)
 * 
 */

@Injectable()
export class FacebookAccountStatusChangesRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFaceStatusChangesBaseSQL, sql.bulkAddFaceStatusChangesValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdActivityBulkEntry-Calls to the DB in a single SQL statement.
     *
     * @param status status changes data, to be added to face_status_changes table. 
     * @param timestamp timestamp to be added to the face_status_changes table
     * @param totalRowCount the total number of rows that should be added to the table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: Deepa (dbelvi@mail.upb.de)
    */

    async startAdActivityBulkAdd(status: string, timestamp: string, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([status, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Facebook face_status_changes table as part of a bulk-add run
     * 
     * @author: Deepa (dbelvi@mail.upb.de)
    */

    async addAdActivityBulkEntry(status: string, timestamp: string) : Promise<void> {
        return this.addBulkEntry([status, timestamp]);
    }

    /**
     * This async method fetches all entries from the face_status_changes table.
     * 
     * @author: Deepa (dbelvi@mail.upb.de)
     * 
    */

    async getAllAccStatusChanges() : Promise<AccountStatusChangesModel[]> {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
          const result = await db.query(sql.selectAllStatusChanges);
          return result.values as AccountStatusChangesModel[];
        });
    }
}