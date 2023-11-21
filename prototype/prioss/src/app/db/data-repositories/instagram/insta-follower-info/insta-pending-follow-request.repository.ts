import { Injectable } from "@angular/core";
import { SQLiteDBConnection} from "@capacitor-community/sqlite";
import { DBService } from "../../../db.service";
import * as sql from "./insta-pending-follow-request.sql";
import { InstaPendingFollowRequestInfo } from "src/app/instagram/models/FollowerInfo/PendingFollowRequestInfo";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
/**
 * This class handles all communication with the database tables that are used in the InstaFollower Component.
 *
 * @author: Melina (kleber@mail.uni-paderborn.de)
 */
@Injectable()
export class InstaPendingFollowRequestRepository extends BulkAddCapableRepository {

    constructor(dbService: DBService) {
        super(sql.bulkAddInstaPendingFollowRequestBaseSQL, sql.bulkAddPendingFollowRequestValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addPendingFollowRequestBulkEntry-Calls to the DB in a single SQL statement.
     *
     * @param instaProfileURL the url to the profile
     * @param instaAccountName the account name
     * @param timestamp of the request
     * @param totalRowCount the total number of rows that should be added to the Instagram ads activity table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async startPendingFollowRequestBulkAdd(instaProfileURL: string, instaAccountName: string, timestamp: number, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([instaProfileURL, instaAccountName, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram recent follow table as part of a bulk-add run
     *
     * @param instaProfileURL the url to the profile
     * @param instaAccountName the account name
     * @param timestamp of the request
     *
     * @author: Melina (kleber@mail.uni-paderborn.de)
     *
     * @returns
     */
    async addPendingFollowRequestBulkEntry(instaProfileURL: string, instaAccountName: string, timestamp: number) : Promise<void> {
        return this.addBulkEntry([instaProfileURL, instaAccountName, timestamp]);
    }


    /**
     * This async method adds recent follow information to the insta_recent_follow_info table.
     *
     * @param instaProfileURL the url to the profile
     * @param instaAccountName the account name
     * @param timestamp of the request
     *
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async addPendingFollowRequestInformation(instaProfileURL: string, instaAccountName: string, timestamp: number) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const sqlStatement = sql.insertPendingFollowRequestSQL;
            const values = [instaProfileURL, instaAccountName, timestamp];

            await db.run(sqlStatement, values);
          });
    }

    /**
     * This async method selects all entries from the insta_recent_follow_info table
     *
     * @returns an array of InstaRecentFollowInfos
     *
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async getPendingFollowRequestInfo(): Promise<InstaPendingFollowRequestInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const result = await db.query(sql.selectPendingFollowRequestInfo);
            return result.values as InstaPendingFollowRequestInfo[];
        });
    }
}
