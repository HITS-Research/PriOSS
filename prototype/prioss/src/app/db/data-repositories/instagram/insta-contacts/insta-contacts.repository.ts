import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./insta-contacts.sql";
import { InstaContactInfo } from "src/app/models/Instagram/ContactInfo/InstaContactInfo";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

/**
 * This repository component is responsible for providing functions to insert and request data from the
 * insta_contacts table that holds all data regarding instagram contacts.
 * 
 * @author: Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
 */
@Injectable()
export class InstaContactsRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddInstaContactsBaseSQL, sql.bulkAddInstaContactsValuesSQL, sql.bulkAddValueConnectorForContacts, dbService);
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addAdActivityBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param first_name the first name of the contact
     * @param surname the value for surname of the contact
     * @param contact_information the value for the contact information
     * @param imported_time the value for the imported time
     * @param totalRowCount the total number of rows that should be added to the Instagram ads activity table in this bulk add run
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
     * 
     * @author: Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
     */
    async startContactBulkAdd(first_name: string, surname: string, contact_information: string, imported_time: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([first_name, surname, contact_information, imported_time], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram ads activity table as part of a bulk-add run
     * 
     * @param first_name the first name of the contact
     * @param surname the value for surname of the contact
     * @param contact_information the value for the contact information
     * @param imported_time the value for the imported time
     * 
     * @author: Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
     */
    async addContactsBulkEntry(first_name: string, surname: string, contact_information: string, imported_time: string) : Promise<void> {
        return this.addBulkEntry([first_name, surname, contact_information, imported_time]);
    }

    /**
     * This async method selects all entries from the Insta_Contacts table
     * 
     * @returns an array of InstaContactInfo
     * 
     * @author: Durva & Mayank (dghurye@mail.upb.de & mayank@mail.upb.de)
     */
    async getAllContacts(): Promise<InstaContactInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let result = await db.query(sql.selectContactsSQL);
            return result.values as InstaContactInfo[];
        });
    }
}