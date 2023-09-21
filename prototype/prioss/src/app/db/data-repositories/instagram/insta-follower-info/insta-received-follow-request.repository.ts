import { Injectable } from "@angular/core";
import { SQLiteDBConnection} from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import * as sql from "./insta-received-follow-request.sql";
import { InstaReceivedFollowRequestInfo } from "src/app/models/Instagram/FollowerInfo/ReceivedFollowRequest";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
/**
 * This class handles all communication with the database tables that are used in the InstaFollower Component.
 * 
 * @author: Melina (kleber@mail.uni-paderborn.de)
 */
@Injectable()
export class InstaReceivedFollowRequestRepository extends BulkAddCapableRepository {

    constructor(dbService: DBService) {
        super(sql.bulkAddInstaReceivedFollowRequestBaseSQL, sql.bulkAddReceivedFollowRequestValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addReceivedFollowRequestBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param instaProfileURL the url to the profile
     * @param instaAccountName the account name
     * @param timestamp of the request
     * @param totalRowCount the total number of rows that should be added to the Instagram ads activity table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async startReceivedFollowRequestBulkAdd(instaProfileURL: string, instaAccountName: string, timestamp: number, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([instaProfileURL, instaAccountName, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram received follow request table as part of a bulk-add run
     * 
     * @param instaProfileURL the url to the profile
     * @param instaAccountName the account name
     * @param timestamp of the request
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     * 
     * @returns 
     */
    async addReceivedFollowRequestBulkEntry(instaProfileURL: string, instaAccountName: string, timestamp: number) : Promise<void> {
        return this.addBulkEntry([instaProfileURL, instaAccountName, timestamp]);
    }


    /**
     * This async method adds received follow request information to the insta_removed_suggestion_info table.
     * 
     * @param instaProfileURL the url to the profile
     * @param instaAccountName the account name
     * @param timestamp of the request
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async addReceivedFollowRequestInformation(instaProfileURL: string, instaAccountName: string, timestamp: number) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const sqlStatement = sql.insertReceivedFollowRequestSQL;
            const values = [instaProfileURL, instaAccountName, timestamp];
      
            await db.run(sqlStatement, values);
          });
    }

    /**
     * This async method selects all entries from the insta_received_follow_request_info table
     * 
     * @returns an array of InstaRecentUnfollowInfos
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async getReceivedFollowRequestInfo(): Promise<InstaReceivedFollowRequestInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const result = await db.query(sql.selectReceivedFollowRequestInfo);
            return result.values as InstaReceivedFollowRequestInfo[];
        });
    }
}
