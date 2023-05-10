import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./face_friend_requests_received.sql";


/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_friend_requests_received table that holds all data regarding received friend requests of the user.
 * 
 * @author: Deepa (dbelvi@mail.upb.de)
 */

@Injectable()
export class FacebookFriendRequestsReceivedRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFaceFriendRequestReceivedBaseSQL, sql.bulkAddFaceFriendRequestReceivedValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdActivityBulkEntry-Calls to the DB in a single SQL statement.
     *
     * @param name name of the friend from whom freind request was received, to be added to the face_friend_requests_received table.
     * @param timestamp timestamp at which the request was received, to be added to the face_friend_requests_received table
     * @param totalRowCount the total number of rows that should be added to the table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: Deepa (dbelvi@mail.upb.de)
     */

    async startAdActivityBulkAdd(name: string, timestamp: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([name, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Facebook face_friend_requests_received table as part of a bulk-add run
     * 
     * @author: Deepa (dbelvi@mail.upb.de)
     */
    
    async addAdActivityBulkEntry(name: string, timestamp: string) : Promise<void> {
        return this.addBulkEntry([name, timestamp]);
    }
}