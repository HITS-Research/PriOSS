import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./insta-topics.sql";
import { InstaTopicsInfo } from "src/app/models/Instagram/YourTopicsInfo/InstaTopicsInfo";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

/**
 * This repository component is responsible for providing functions to insert and request data from the
 * insta-your-topics table that holds all data regarding instagram your topics.
 * 
 * @author: Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
 */
@Injectable()
export class InstaTopicsRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddinstaTopicsBaseSQL, sql.bulkAddinstaTopicsValuesSQL, sql.bulkAddValueConnectorForTopics, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdActivityBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param topic the topic for your topics
     * @param totalRowCount the total number of rows that should be added to the Instagram your topics table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     * 
     * @author: Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
     */
    async startTopicBulkAdd(topic: string, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([topic], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram your topics table as part of a bulk-add run
     * 
     * @param topic the topic for your topics
     * 
     * @author: Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
     */
    async addTopicsBulkEntry(topic: string) : Promise<void> {
        return this.addBulkEntry([topic]);
    }

    /**
     * This async method selects all entries from the Insta_your_topics table
     * 
     * @returns an array of InstaTopicsInfo
     * 
     * @author: Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
     */
    async getAllTopics(): Promise<InstaTopicsInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const result = await db.query(sql.selectTopicsSQL);
            return result.values as InstaTopicsInfo[];
        });
    }
}