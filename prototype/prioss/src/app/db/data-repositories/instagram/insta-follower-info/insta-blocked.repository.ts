import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import * as sql from "./insta-blocked.sql";
import { InstaBlockedInfo } from "src/app/models/Instagram/FollowerInfo/BlockedInfo";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
/**
 * This class handles all communication with the database tables that are used in the InstaFollower Component.
 * 
 * @author: Melina (kleber@mail.uni-paderborn.de)
 */
@Injectable()
export class InstaBlockedRepository extends BulkAddCapableRepository {

    constructor(dbService: DBService) {
        super(sql.bulkAddInstaBlockedBaseSQL, sql.bulkAddInstaBlockedValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addBlockedBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param instaAccountName the blocked account name
     * @param instaProfileURL the url to the blocked profile
     * @param timestamp since the user blocks this account
     * @param totalRowCount the total number of rows that should be added to the Instagram ads activity table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async startBlockedBulkAdd(instaAccountName: string, instaProfileURL: string, timestamp: number, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([instaAccountName, instaProfileURL, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram blocked table as part of a bulk-add run
     * 
     * @param instaAccountName the blocked account name
     * @param instaProfileURL the url to the blocked profile
     * @param timestamp since the user blocks this account
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     * 
     * @returns 
     */
    async addBlockedBulkEntry(instaAccountName: string, instaProfileURL: string, timestamp: number) : Promise<void> {
        return this.addBulkEntry([instaAccountName, instaProfileURL, timestamp]);
    }

    /**
     * This async method adds blocked information to the insta_blocked_information table.
     * 
     * @param instaAccountName the blocked account name
     * @param instaProfileURL the url to the blocked profile
     * @param timestamp since the user blocks this account
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async addBlockedInformation(instaAccountName: string, instaProfileURL: string, timestamp: number) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            let sqlStatement = sql.insertIntoInstaBlockedInfoSQL; 
            let values = [instaAccountName, instaProfileURL, timestamp];
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }
   

    /**
     * This async method selects all entries from the insta_blocked_information table
     * 
     * @returns an array of InstaBlockedInformation
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async getBlockedInfo(): Promise<InstaBlockedInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let result = await db.query(sql.selectInstaBlockedInfo);
            return result.values as InstaBlockedInfo[];
        });
    }
}
