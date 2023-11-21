import { Injectable } from "@angular/core";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { DBService } from "../../../db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import { GroupsModel } from "../../../../facebook/models/groups";
import * as sql from "./face_groups.sql";

/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_groups table that holds all data about all group subscriptions to be added to the table.
 *
 * @author: Deepa (dbelvi@mail.upb.de)
 *
 */

@Injectable()
export class FacebookGroupsRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFaceGroupsBaseSQL, sql.bulkAddFaceGroupsValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdActivityBulkEntry-Calls to the DB in a single SQL statement.
     *
     * @param name name of the group, to be added to face_groups table.
     * @param timestamp timestamp to be added to the face_groups table
     * @param totalRowCount the total number of rows that should be added to the table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     *
     * @author: Deepa (dbelvi@mail.upb.de)
    */

    async startAdActivityBulkAdd(name: string, timestamp: string, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([name, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Facebook face_groups table as part of a bulk-add run
     *
     * @author: Deepa (dbelvi@mail.upb.de)
    */

    async addAdActivityBulkEntry(name: string, timestamp: string) : Promise<void> {
        return this.addBulkEntry([name, timestamp]);
    }

    /**
     * This async method fetches all entries from the face_groups table.
     *
     * @author: Deepa (dbelvi@mail.upb.de)
     *
    */

    async getAllGroups() : Promise<GroupsModel[]> {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
          const result = await db.query(sql.selectAllGroups);
          return result.values as GroupsModel[];
        });
    }
}
