import { Injectable } from "@angular/core";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { FacebookFriendsModel } from "src/app/facebook/models/faceFriends";
import { DBService } from "../../../db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./face_friends.sql";


/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_friends table that holds all data regarding total number of friends of the user.
 *
 * @author: rbharmal (rbharmal@mail.upb.de)
 */

@Injectable()
export class FacebookFriendsRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFaceFriendsBaseSQL, sql.bulkAddFaceFriendsValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdActivityBulkEntry-Calls to the DB in a single SQL statement.
     *
     * @param name name of the friend of the user, to be added to the face_friends table.
     * @param timestamp timestamp to be added to the face_friends table
     * @param type :- what type of facebook friends to be added to the face_friends table
     * @param totalRowCount the total number of rows that should be added to the table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: rbharmal (rbharmal@mail.upb.de)
     */

    async startAdActivityBulkAdd(name: string, timestamp: string, type: string, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([name, timestamp, type], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Facebook face_friends table as part of a bulk-add run
     *
     * @author: rbharmal (rbharmal@mail.upb.de)
     */

    async addAdActivityBulkEntry(name: string, timestamp: string, type: string) : Promise<void> {
        return this.addBulkEntry([name, timestamp, type]);
    }

     /**
     * This async method fetches all entries from the face friends table.
     *
     * @author: Rashida (rbharmal@mail.upb.de)
     *
     */
      async getAllFacebookFriends() : Promise<FacebookFriendsModel[]> {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

          const result = await db.query(sql.selectAllFacebookFriends);
          return result.values as FacebookFriendsModel[];
        });
      }
}
