import { Injectable } from "@angular/core";
import { SQLiteDBConnection} from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import * as sql from "./insta-following.sql";
import { InstaFollowingInfo } from "src/app/models/Instagram/FollowerInfo/FollowingInfo";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
/**
 * This class handles all communication with the database tables that are used in the InstaFollower Component.
 * 
 * @author: Melina (kleber@mail.uni-paderborn.de)
 */
@Injectable()
export class InstaFollowingRepository extends BulkAddCapableRepository {

    constructor(dbService: DBService) {
        super(sql.bulkAddInstaFollowingBaseSQL, sql.bulkAddInstaFollowingValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addFollowingBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param instaProfileURL the url to the followers profile
     * @param timestamp since the user follows this account
     * @param instaAccountName the followers account name
     * @param totalRowCount the total number of rows that should be added to the Instagram ads activity table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async startFollowingBulkAdd(instaProfileURL: string, timestamp: number, instaAccountName: string, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([instaProfileURL, timestamp, instaAccountName], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram following table as part of a bulk-add run
     * 
     * @param instaProfileURL the url to the followers profile
     * @param timestamp since the user follows this account
     * @param instaAccountName the followers account name
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     * 
     * @returns 
     */
    async addFollowingBulkEntry(instaProfileURL: string, timestamp: number, instaAccountName: string) : Promise<void> {
        return this.addBulkEntry([instaProfileURL, timestamp, instaAccountName]);
    }


    /**
     * This async method adds following information to the insta_following_information table.
     * 
     * @param instaProfileURL the url to the following profile
     * @param timestamp since the user following this account
     * @param instaAccountName the following account name
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async addFollowingInformation(instaProfileURL: string, timestamp: number, instaAccountName: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const sqlStatement = sql.insertIntoInstaFollowingInfoSQL;
            const values = [instaProfileURL, timestamp, instaAccountName];
      
            await db.run(sqlStatement, values);
          });
    }

    /**
     * This async method selects all entries from the insta_following_info table
     * 
     * @returns an array of InstaFollowingInfos
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async getFollowingInfo(): Promise<InstaFollowingInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const result = await db.query(sql.selectFollowingInfo);
            return result.values as InstaFollowingInfo[];
        });
    }
}
