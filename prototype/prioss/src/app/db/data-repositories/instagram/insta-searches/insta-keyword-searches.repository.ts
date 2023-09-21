import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { SQLiteDBConnection} from "@capacitor-community/sqlite";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./insta-keyword-search.sql";
import { InstaKeywordSearch } from "src/app/models/Instagram/Searches/InstaKeywordSearch";


/**
 * This repository component is responsible for providing functions to insert and request data from the
 * insta_keyword_searches table that holds all data regarding instagram ads activities.
 * 
 * @author: Paul (pasch@mail.upb.de)
 */
@Injectable()
export class InstaKeywordSearchesRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddInstaKeywordSearchesBaseSQL, sql.bulkAddInstaKeywordSearchesValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addKeywordSearchBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param search the name of the searched value that should be added to the Instagram keyword searches table in this bulk add run
     * @param timestamp the time the value was searched that should be added to the Instagram keyword searches table in this bulk add run
     * @param totalRowCount the total number of rows that should be added to the Instagram keyword searches table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     * 
     * @author: Paul (pasch@mail.upb.de)
     */
    async startKeywordSearchBulkAdd(search: string, timestamp: string, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([search, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram keyword searches table as part of a bulk-add run
     * 
     * @param search the name of the searched value that should be added to the Instagram keyword searches table
     * @param timestamp the time the value was searched that should be added to the Instagram keyword searches table
     * 
     * @author: Paul (pasch@mail.upb.de)
     */
    async addKeywordSearchBulkEntry(search: string, timestamp: string) : Promise<void> {
        return this.addBulkEntry([search, timestamp]);
    }

    /**
     * This async method selects all entries from the insta_keyword_searches table
     * 
     * @returns an array of InstaKeywordSearches
     * 
     * @author: Paul (pasch@mail.upb.de)
     */
    async getKeywordSearches(): Promise<InstaKeywordSearch[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const result = await db.query(sql.selectAllFromInstaKeywordSearches);
            return result.values as InstaKeywordSearch[];
        });
    }
}