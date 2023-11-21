import { Injectable } from "@angular/core";
import { DBService } from "../../../db.service";
import { SQLiteDBConnection} from "@capacitor-community/sqlite";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./insta-tag-search.sql";
import { InstaTagSearch } from "src/app/instagram/models/Searches/InstaTagSearches";


/**
 * This repository component is responsible for providing functions to insert and request data from the
 * insta_tag_searches table that holds all data regarding instagram search activities.
 *
 * @author: Paul (pasch@mail.upb.de)
 */
@Injectable()
export class InstaTagSearchesRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddInstaTagSearchesBaseSQL, sql.bulkAddInstaTagSearchesValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addTagSearchBulkEntry-Calls to the DB in a single SQL statement.
     *
     * @param search the name of the searched value that should be added to the Instagram tag searches table in this bulk add run
     * @param timestamp the time the value was searched that should be added to the Instagram tag searches table in this bulk add run
     * @param totalRowCount the total number of rows that should be added to the Instagram tag searches table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: Paul (pasch@mail.upb.de)
     */
    async startTagSearchBulkAdd(search: string, timestamp: string, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([search, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram tag searches table as part of a bulk-add run
     *
     * @param search the name of the searched value that should be added to the Instagram tag searches table
     * @param timestamp the time the value was searched that should be added to the Instagram tag searches table
     *
     * @author: Paul (pasch@mail.upb.de)
     */
    async addTagSearchBulkEntry(search: string, timestamp: string) : Promise<void> {
        return this.addBulkEntry([search, timestamp]);
    }

    /**
     * This async method selects all entries from the insta_tag_searches table
     *
     * @returns an array of InstaTagSearches
     *
     * @author: Paul (pasch@mail.upb.de)
     */
    async getTagSearches(): Promise<InstaTagSearch[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const result = await db.query(sql.selectAllFromInstaTagSearches);
            return result.values as InstaTagSearch[];
        });
    }
}
