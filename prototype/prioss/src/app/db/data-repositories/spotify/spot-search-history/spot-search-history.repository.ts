import { Injectable } from "@angular/core";
import { SQLiteDBConnection} from "@capacitor-community/sqlite";
import { DBService } from "../../../db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./spot-search-history.sql";
import { SpotSearchHistory } from "src/app/spotify/models/SearchHistory/SpotSearchHistory";
/**
 * This repository component is provides functions to insert and request data from the spot_search_history table.
 * The table houses data from search queries of the user that could be found in the data download
 *
 * @author: Max (maxy@mail.upb.de)
 */
@Injectable()
export class SpotSearchHistoryRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddSpotSearchHistoryBaseSQL, sql.bulkAddSpotSearchHistoryValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addUserSearchBulkEntry-Calls to the DB in a single SQL statement.
     *
     * @param platform the platform used for the serach that should be added to the Spotify Search History table in this bulk add run
     * @param searchTime the time the query was searched that should be added to the Spotify Search History table in this bulk add run
     * @param searchQuery the actual search query entered by the user that should be added to the Spotify Search History table in this bulk add run
     * @param totalRowCount the total number of rows that should be added to the spotify history table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: Max (maxy@mail.upb.de)
     */
    async startSearchHistoryBulkAdd(platform: string, searchTime: string, searchQuery: string, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([platform, searchTime, searchQuery], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Spotify Serach History table as part of a bulk-add run
     *
     * @param platform the platform used for the serach that should be added to the Spotify Search History table
     * @param searchTime the time the query was searched that should be added to the Spotify Search History table
     * @param searchQuery the actual search query entered by the user that should be added to the Spotify Search History table
     *
     * @author: Max (maxy@mail.upb.de)
     */
    async addBulkSearchHistoryEntry(platform: string, searchTime: string, searchQuery: string) : Promise<void> {
        return this.addBulkEntry([platform, searchTime, searchQuery]);
    }

    /**
     * This async method selects all entries from the spot_search_history table
     *
     * @returns an array of SpotSearchHistory
     *
     * @author: Max (maxy@mail.upb.de)
     */
    async getUserSearches(): Promise<SpotSearchHistory[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const result = await db.query(sql.selectAllFromSpotSearches);
            return result.values as SpotSearchHistory[];
        });
    }
}
