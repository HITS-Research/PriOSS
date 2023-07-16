import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import { MessagesModel } from "src/app/models/Facebook/friendsMessages";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import * as sql from "./fb-messages-friends.sql";


/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_messages table that holds all data regarding facebook messages data.
 * 
 * @author: Rishma (rishmamn@mail.upb.de)
 */
@Injectable()
export class FaceBookMessagesInfoRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFaceMessagesInfoBaseSQL, sql.bulkAddFaceMessagesInfoValuesSQL, sql.bulkAddValueConnector, dbService);
    }

       /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAddressBookBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param name the name of the person that you interacted with should be added to the Facebook Messages table
     * @param timestamp the timestamp of the person when you interacted that should be added to the Facebook Messages table
     * @param totalRowCount the total number of rows that should be added to the Facebook Messages table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     * 
     * @author: Rishma (rishmamn@mail.upb.de)
     */
       async startMessagesBulkAdd(name: string, timestamp: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([name,  timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Facebook Messages table as part of a bulk-add run
     * 
     * @param name the name of the person that you interacted with should be added to the Facebook Messages table.
     * @param timestamp the timestamp of the person when you interacted that should be added to the Facebook Messages table.
     * 
     *@author: Rishma (rishmamn@mail.upb.de)
     */
    async addMessagesBulkEntry(name: string, timestamp: string,) : Promise<void> {
        return this.addBulkEntry([name, timestamp]);
    }
    
    /**
     * This async method fetches all entries from the Facebook Messages table.
     * 
     * @author: Rishma (rishmamn@mail.upb.de)
     * 
     */
       async getAllFaceMessagesInfo() : Promise<[MessagesModel]> {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
    
          let result = await db.query(sql.selectAllFaceMessagesInfoData);
          return result.values as MessagesModel[];
        });
      }
}
