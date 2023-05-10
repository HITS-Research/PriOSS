import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./face_friend_requests_sent.sql";


/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_friend_requests_sent table that holds all data regarding friend requests sent by the user.
 * 
 * @author: Deepa (dbelvi@mail.upb.de)
 */

@Injectable()
export class FacebookFriendRequestsSentRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFaceFriendRequestsSentBaseSQL, sql.bulkAddFaceFriendRequestsSentValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdActivityBulkEntry-Calls to the DB in a single SQL statement.
     *
     * @param name name of the friend to whom freind request was sent, to be added to the face_friend_requests_sent table.
     * @param timestamp timestamp at which the request was sent, to be added to the face_friend_requests_sent table
     * @param totalRowCount the total number of rows that should be added to the table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: Deepa (dbelvi@mail.upb.de)
     */

    async startAdActivityBulkAdd(name: string, timestamp: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([name, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Facebook face_friend_requests_sent table as part of a bulk-add run
     * 
     * @author: Deepa (dbelvi@mail.upb.de)
     */
    
    async addAdActivityBulkEntry(name: string, timestamp: string) : Promise<void> {
        return this.addBulkEntry([name, timestamp]);
    }
}