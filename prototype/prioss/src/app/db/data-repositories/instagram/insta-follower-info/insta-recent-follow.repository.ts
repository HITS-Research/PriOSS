import { Injectable } from "@angular/core";
import { SQLiteDBConnection} from "@capacitor-community/sqlite";
import { DBService } from "../../../db.service";
import * as sql from "./insta-recent-follow.sql";
import { InstaRecentFollowInfo } from "src/app/instagram/models/FollowerInfo/RecentFollow";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
/**
 * This class handles all communication with the database tables that are used in the InstaFollower Component.
 *
 * @author: Melina (kleber@mail.uni-paderborn.de)
 */
@Injectable()
export class InstaRecentFollowRepository extends BulkAddCapableRepository {

    constructor(dbService: DBService) {
        super(sql.bulkAddInstaRecentFollowBaseSQL, sql.bulkAddInstaRecentFollowValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addRecentFollowBulkEntry-Calls to the DB in a single SQL statement.
     *
     * @param instaProfileURL the url to the recent followers profile
     * @param instaAccountName the recent followers account name
     * @param timestamp since the user recent follow request
     * @param totalRowCount the total number of rows that should be added to the Instagram ads activity table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async startRecentFollowBulkAdd(instaProfileURL: string, instaAccountName: string, timestamp: number, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([instaProfileURL, instaAccountName, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram recent follow table as part of a bulk-add run
     *
     * @param instaProfileURL the url to the recent followers profile
     * @param instaAccountName the recent followers account name
     * @param timestamp since the user recent follow request
     *
     * @author: Melina (kleber@mail.uni-paderborn.de)
     *
     * @returns
     */
    async addRecentFollowBulkEntry(instaProfileURL: string, instaAccountName: string, timestamp: number) : Promise<void> {
        return this.addBulkEntry([instaProfileURL, instaAccountName, timestamp]);
    }


    /**
     * This async method adds recent follow information to the insta_recent_follow_info table.
     *
     * @param instaProfileURL the url to the recent followers profile
     * @param instaAccountName the recent followers account name
     * @param timestamp since the user recent follow request
     *
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async addRecentFollowInformation(instaProfileURL: string, instaAccountName: string, timestamp: number) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const sqlStatement = sql.insertIntoInstaRecentFollowSQL;
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
    async getRecentFollowInfo(): Promise<InstaRecentFollowInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const result = await db.query(sql.selectRecentFollowInfo);
            return result.values as InstaRecentFollowInfo[];
        });
    }
}
