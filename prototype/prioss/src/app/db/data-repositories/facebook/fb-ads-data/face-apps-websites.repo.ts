import { Injectable } from "@angular/core";
import { DBService } from "../../../db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./face-apps-websites.sql";
import { AppsAndWebsitesModel } from "src/app/facebook/models/appsAndWebsites";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";


/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_apps_websites table that holds all data regarding facebook websites and/or application interactions.
 *
 * @author: Deepa (dbelvi@mail.upb.de)
 */
@Injectable()
export class FacebookAppsWebsitesRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFaceAppsWebsitesBaseSQL, sql.bulkAddFaceAppsWebsitesValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdActivityBulkEntry-Calls to the DB in a single SQL statement.
     * @param name the name of the website that has been interacted with to be added to the face_apps_websites table.
     * @param added_timestamp timestamp when the webapp name was added to be added to the face_apps_websites table.
     * @param user_app_scoped_id user scope for this web app to be added to face_apps_websites table.
     * @param category category to be added to the face_apps_websites table.
     * @param removed_timestamp removed timestamp to be added to the face_apps_websites table.
     * @param totalRowCount the total number of rows that should be added to the table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: Deepa (dbelvi@mail.upb.de)
     */
    async startAdActivityBulkAdd(name: string, added_timestamp: number, user_app_scoped_id: number, category: string, removed_timestamp: number, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([name, added_timestamp, user_app_scoped_id, category, removed_timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Facebook web-app activity table as part of a bulk-add run
     *
     * @author: Deepa (dbelvi@mail.upb.de)
     */
    async addAdActivityBulkEntry(name: string, added_timestamp: number, user_app_scoped_id: number, category: string, removed_timestamp: number) : Promise<void> {
        return this.addBulkEntry([name, added_timestamp, user_app_scoped_id, category, removed_timestamp]);
    }

     /**
     * This async method fetches all entries from the off facebook apps and websites  table.
     *
     * @author: @author: rishmamn@campus.uni-paderborn.de
     *
     */
     async getAllFaceAppsAndWebsites() : Promise<AppsAndWebsitesModel[]> {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

          const result = await db.query(sql.selectAllFaceAppsAndWebsites);
          return result.values as AppsAndWebsitesModel[];
        });
      }
}
