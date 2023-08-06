import { Injectable } from "@angular/core";
import { SQLiteDBConnection} from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import * as sql from "./insta-follower.sql";
import { InstaFollowerInfo } from 'src/app/models/Instagram/FollowerInfo/FollowerInfo';
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
/**
 * This class handles all communication with the database tables that are used in the InstaFollower Component.
 * 
 * @author: Melina (kleber@mail.uni-paderborn.de)
 */
@Injectable()
export class InstaFollowerRepository extends BulkAddCapableRepository {

    constructor(dbService: DBService) {
        super(sql.bulkAddInstaFollowerBaseSQL, sql.bulkAddInstaFollowerValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addFollowerBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param instaProfileURL the url to the followers profile
     * @param timestamp since the user follows this account
     * @param instaAccountName the followers account name
     * @param totalRowCount the total number of rows that should be added to the Instagram ads activity table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async startFollowerBulkAdd(instaProfileURL: string, timestamp: number, instaAccountName: string, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([instaProfileURL, timestamp, instaAccountName], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram follower table as part of a bulk-add run
     * 
     * @param instaProfileURL the url to the followers profile
     * @param timestamp since the user follows this account
     * @param instaAccountName the followers account name
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     * 
     * @returns 
     */
    async addFollowerBulkEntry(instaProfileURL: string, timestamp: number, instaAccountName: string) : Promise<void> {
        return this.addBulkEntry([instaProfileURL, timestamp, instaAccountName]);
    }

    /**
     * This async method adds follower information to the insta_follower_information table.
     * 
     * @param instaProfileURL the url to the followers profile
     * @param timestamp since the user follows this account
     * @param instaAccountName the followers account name
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async addFollowerInformation(instaProfileURL: string, timestamp: number, instaAccountName: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            const sqlStatement = sql.insertIntoInstaFollowerInfoSQL; 
            const values = [instaProfileURL, timestamp, instaAccountName];
            await db.run(sqlStatement, values);
          });
    }
   

    /**
     * This async method selects all entries from the insta_follower_information table
     * 
     * @returns an array of InstaFollowerInformation
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async getFollowerInfo(): Promise<InstaFollowerInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const result = await db.query(sql.selectFollowerInfo);
            return result.values as InstaFollowerInfo[];
        });
    }
}
