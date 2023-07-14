import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./face_address_book.sql";
import { AddressBookModel } from "src/app/models/Facebook/addressBook";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";


/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_address_book table that holds all data regarding facebook address book.
 * 
 * @author: Rishma (rishmamn@mail.upb.de)
 */
@Injectable()
export class FacebookAddressBookRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFaceAddressBookBaseSQL, sql.bulkAddFaceAddressBookValuesSQL, sql.bulkAddValueConnector, dbService);
    }

       /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAddressBookBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param name the name of the person that should be added to the Facebook Address Book table
     * @param contact the phone number of the person that should be added to the Facebook Address Book table
     * @param created_timestamp the timestamp of the contact added that should be added to the Facebook Address Book table
     * @param totalRowCount the total number of rows that should be added to the Facebook Search History table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     * 
     * @author: Rishma (rishmamn@mail.upb.de)
     */
       async startAddressBookBulkAdd(name: string, contact_point: string, created_timestamp: number,totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([name, contact_point, created_timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Facebook Address Book table as part of a bulk-add run
     * 
     * @param name the name of the person that should be added to the Facebook Address Book table
     * @param contact the phone number of the person that should be added to the Facebook Address Book table
     * @param created_timestamp the timestamp of the contact added that should be added to the Facebook Address Book table
     * 
     *@author: Rishma (rishmamn@mail.upb.de)
     */
    async addAddressBookBulkEntry(name: string, contact_point: string ,created_timestamp: string) : Promise<void> {
        return this.addBulkEntry([name, contact_point, created_timestamp]);
    }
    
    /**
     * This async method fetches all entries from the Facebook Address Book table.
     * 
     * @author: Rishma (rishmamn@mail.upb.de)
     * 
     */
       async getAllFaceAddressBook() : Promise<[AddressBookModel]> {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
    
          let result = await db.query(sql.selectAllAddressBookData);
          return result.values as AddressBookModel[];
        });
      }
}
