import { Injectable } from "@angular/core";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { DBService } from "../../../db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import { LoginLogoutsModel } from "../../../../facebook/models/loginlogouts";
import * as sql from "./face_login_logouts.sql";

/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_login_logouts.sql table that holds all data regarding login and logout actions along witht their timestamp.
 *
 * @author: Deepa (dbelvi@mail.upb.de)
 *
 */

@Injectable()
export class FacebookLoginLogoutsRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFaceLoginLogoutsBaseSQL, sql.bulkAddFaceLoginLogoutsValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdActivityBulkEntry-Calls to the DB in a single SQL statement.
     *
     * @param action login or logout action, to be added to the face_login_logouts table.
     * @param timestamp timestamp to be added to the face_login_logouts table
     * @param totalRowCount the total number of rows that should be added to the table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: Deepa (dbelvi@mail.upb.de)
    */

    async startAdActivityBulkAdd(action: string, timestamp: string, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([action, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Facebook face_login_logouts table as part of a bulk-add run
     *
     * @author: Deepa (dbelvi@mail.upb.de)
    */

    async addAdActivityBulkEntry(action: string, timestamp: string) : Promise<void> {
        return this.addBulkEntry([action, timestamp]);
    }

    /**
     * This async method fetches all entries from the face_login_logouts table.
     *
     * @author: Deepa (dbelvi@mail.upb.de)
     *
    */

    async getAllLoginLogouts() : Promise<LoginLogoutsModel[]> {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
          const result = await db.query(sql.selectAllLoginLogouts);
          return result.values as LoginLogoutsModel[];
        });
    }
}
