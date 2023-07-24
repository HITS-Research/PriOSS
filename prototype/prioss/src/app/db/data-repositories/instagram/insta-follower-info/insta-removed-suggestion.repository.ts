import { Injectable } from "@angular/core";
import { SQLiteDBConnection} from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import * as sql from "./insta-removed-suggestion.sql";
import { InstaRemovedSuggestionInfo } from "src/app/models/Instagram/FollowerInfo/RemovedSuggestion";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
/**
 * This class handles all communication with the database tables that are used in the InstaFollower Component.
 * 
 * @author: Melina (kleber@mail.uni-paderborn.de)
 */
@Injectable()
export class InstaRemovedSuggestionRepository extends BulkAddCapableRepository {

    constructor(dbService: DBService) {
        super(sql.bulkAddInstaRemovedSuggestionBaseSQL, sql.bulkAddRemovedSuggestionValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addRemovedSuggestionBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param instaProfileURL the url to the profile
     * @param instaAccountName the account name
     * @param timestamp of the request
     * @param totalRowCount the total number of rows that should be added to the Instagram ads activity table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async startRemovedSuggestionBulkAdd(instaProfileURL: string, instaAccountName: string, timestamp: number, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([instaProfileURL, instaAccountName, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram recent removed suggestion table as part of a bulk-add run
     * 
     * @param instaProfileURL the url to the profile
     * @param instaAccountName the account name
     * @param timestamp of the request
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     * 
     * @returns 
     */
    async addRemovedSuggestionBulkEntry(instaProfileURL: string, instaAccountName: string, timestamp: number) : Promise<void> {
        return this.addBulkEntry([instaProfileURL, instaAccountName, timestamp]);
    }


    /**
     * This async method adds recent unfollow information to the insta_removed_suggestion_info table.
     * 
     * @param instaProfileURL the url to the profile
     * @param instaAccountName the account name
     * @param timestamp of the request
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async addRemovedSuggestionInformation(instaProfileURL: string, instaAccountName: string, timestamp: number) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const sqlStatement = sql.insertRemovedSuggestionSQL;
            const values = [instaProfileURL, instaAccountName, timestamp];
      
            await db.run(sqlStatement, values);
          });
    }

    /**
     * This async method selects all entries from the insta_removed_suggestion_info table
     * 
     * @returns an array of InstaRecentUnfollowInfos
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async getRemovedSuggestionInfo(): Promise<InstaRemovedSuggestionInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const result = await db.query(sql.selectRemovedSuggestionInfo);
            return result.values as InstaRemovedSuggestionInfo[];
        });
    }
}
