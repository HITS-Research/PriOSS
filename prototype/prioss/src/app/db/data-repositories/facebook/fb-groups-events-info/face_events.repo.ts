import { Injectable } from "@angular/core";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import { EventsModel } from "../../../../models/Facebook/events";
import * as sql from "./face_events.sql";

/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_groups table that holds all data about all group subscriptions to be added to the table.
 * 
 * @author: Deepa (dbelvi@mail.upb.de)
 * 
 */

@Injectable()
export class FacebookEventsRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFaceEventsBaseSQL, sql.bulkAddFaceEventsValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdActivityBulkEntry-Calls to the DB in a single SQL statement.
     *
     * 
     * @param name name of the group, to be added to face_events table. 
     * @param start_timestamp start of the event timestamp to be added to the face_events table
     * @param end_timestamp end of the event timestamp to be added to the table face_events.
     * 
     * @author: Deepa (dbelvi@mail.upb.de)
    */

    async startAdActivityBulkAdd(name: string, start_timestamp: string, end_timestamp: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([name, start_timestamp, end_timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Facebook face_groups table as part of a bulk-add run
     * 
     * @author: Deepa (dbelvi@mail.upb.de)
    */

    async addAdActivityBulkEntry(name: string, start_timestamp: string, end_timestamp: string) : Promise<void> {
        return this.addBulkEntry([name, start_timestamp, end_timestamp]);
    }

    /**
     * This async method fetches all entries from the face_groups table.
     * 
     * @author: Deepa (dbelvi@mail.upb.de)
     * 
    */

    async getAllEvents() : Promise<EventsModel[]> {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
          let result = await db.query(sql.selectAllEvents);
          return result.values as EventsModel[];
        });
    }
}