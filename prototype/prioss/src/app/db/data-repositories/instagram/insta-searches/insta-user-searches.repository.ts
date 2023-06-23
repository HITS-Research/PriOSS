import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./insta-user-searches.sql";
import { InstaUserSearch } from "src/app/models/Instagram/Searches/InstaUserSearch";


/**
 * This repository component is responsible for providing functions to insert and request data from the
 * insta_user_searches table that holds all data regarding instagram ads activities.
 * 
 * @author: Paul (pasch@mail.upb.de)
 */
@Injectable()
export class InstaUserSearchesRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddInstaUserSearchesBaseSQL, sql.bulkAddInstaUserSearchesValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addUserSearchBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param search the name of the searched value that should be added to the Instagram user searches table in this bulk add run
     * @param timestamp the time the value was searched that should be added to the Instagram user searches table in this bulk add run
     * @param totalRowCount the total number of rows that should be added to the Instagram user searches table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     * 
     * @author: Paul (pasch@mail.upb.de)
     */
    async startUserSearchBulkAdd(search: string, timestamp: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([search, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram user searches table as part of a bulk-add run
     * 
     * @param search the name of the searched value that should be added to the Instagram user searches table
     * @param timestamp the time the value was searched that should be added to the Instagram user searches table
     * 
     * @author: Paul (pasch@mail.upb.de)
     */
    async addUserSearchBulkEntry(search: string, timestamp: string) : Promise<void> {
        return this.addBulkEntry([search, timestamp]);
    }

    /**
     * This async method selects all entries from the insta_user_searches table
     * 
     * @returns an array of InstaUserSearches
     * 
     * @author: Paul (pasch@mail.upb.de)
     */
    async getUserSearches(): Promise<InstaUserSearch[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let result = await db.query(sql.selectAllFromInstaUserSearches);
            return result.values as InstaUserSearch[];
        });
    }
}