import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./face-off-facebook-activity.sql";
import { OffFacebookActivityModel } from "src/app/models/Facebook/offfacebookactivity";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";


/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_off_facebook_activity table that holds all data regarding off facebook activity of the user.
 * 
 * @author: Deepa (dbelvi@mail.upb.de)
 */
@Injectable()
export class FacebookOffFacebookActivityRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFaceOffFacebookActivityBaseSQL, sql.bulkAddFaceOffFacebookActivityValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdActivityBulkEntry-Calls to the DB in a single SQL statement.
     *
     * @param name the name of the OFA app that has been interacted with to be added to the face_off_facebook_activity table.
     * @param events events: page_view/purchase etc. user performed to be added to the face_off_facebook_activity table.
     * @param id Id of the event to be added to the face_off_facebook_activity table.
     * @param type specifies which event was performed to be added to the face_off_facebook_activity table.
     * @param timestamp timestamp to be added to the face_off_facebook_activity table
     * @param totalRowCount the total number of rows that should be added to the table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: Deepa (dbelvi@mail.upb.de)
     */
    async startAdActivityBulkAdd(name: string, events: string, type: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([name, events, type], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Facebook Off-Facebook-Activity table as part of a bulk-add run
     * 
     * @author: Deepa (dbelvi@mail.upb.de)
     */
    async addAdActivityBulkEntry(name: string, events: string,  type: string) : Promise<void> {
        return this.addBulkEntry([name, events, type]);
    }
     /**
     * This async method fetches all entries from the off facebook activity  table.
     * 
     * @author: @author: rishmamn@campus.uni-paderborn.de
     * 
     */
     async getAllOffFacebookActivity() : Promise<OffFacebookActivityModel[]> {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
    
          let result = await db.query(sql.selectAllFaceOffFacebookActivity);
          return result.values as OffFacebookActivityModel[];
        });
      }
}