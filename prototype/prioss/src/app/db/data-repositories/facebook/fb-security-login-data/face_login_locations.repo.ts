import { Injectable } from "@angular/core";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import { LoginLocationsModel } from "../../../../models/Facebook/loginLocations";
import * as sql from "./face_login_locations.sql";

/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_login_locations table that holds all data regarding locations where user has logged in and the device(s) used to login.
 * 
 * @author: Deepa (dbelvi@mail.upb.de)
 * 
 */

@Injectable()
export class FacebookLoginLocationsRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFaceLoginLocationsBaseSQL, sql.bulkAddFaceLoginLocationsValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdActivityBulkEntry-Calls to the DB in a single SQL statement.
     *
     * @param location location of the login activity, to be added to face_login_locations table. 
     * @param device name of the device of the user, to be added to the face_login_locations table.
     * @param timestamp timestamp to be added to the face_login_locations table
     * @param totalRowCount the total number of rows that should be added to the table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: Deepa (dbelvi@mail.upb.de)
    */

    async startAdActivityBulkAdd(location: string, device: string, timestamp: string, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([location, device, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Facebook face_login_locations table as part of a bulk-add run
     * 
     * @author: Deepa (dbelvi@mail.upb.de)
    */

    async addAdActivityBulkEntry(location: string, device: string, timestamp: string) : Promise<void> {
        return this.addBulkEntry([location, device, timestamp]);
    }

    /**
     * This async method fetches all entries from the face_login_locations table.
     * 
     * @author: Deepa (dbelvi@mail.upb.de)
     * 
    */

    async getAllLoginLocations() : Promise<LoginLocationsModel[]> {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
    
          const result = await db.query(sql.selectAllLoginLocations);
          return result.values as LoginLocationsModel[];
        });
    }
}
