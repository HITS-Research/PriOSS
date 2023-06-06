import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import * as sql from "./insta-accountcreation-login.sql";
import { InstaSignUpInfo } from "src/app/models/Instagram/InstaAccountCreationAndLoginInfo/InstaSignUpInfo";

/**
 * This class handles all communication with the database tables that are used in the InstaAccountCreationAndLogin Component.
 * 
 * @author: Mayank (mayank@mail.upb.de)
 */
@Injectable()
export class InstaSignUpRepository{
    
    constructor(private dbService: DBService){}

    /**
     * This async method adds liked comments information to the insta_liked_comments table.
     * 
     * @param username the username which user used during signup
     * @param ip_address the device ip address which was used during signup
     * @param timestamp the time value when the user signed up
     * @param email the email address used during signup
     * @param phone_number the phone number used during signup
     * @param device the device used during signup
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addSignUpInformation(username: string, ip_address: string, timestamp: number,
        email: string, phone_number: string, device: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = sql.insertIntoInstaSignUpSQL;
            let values = [username, ip_address, timestamp, email, phone_number, device, "blue"];
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }

    /**
     * This async method selects all entries from the insta_signup_information table
     * 
     * @returns an array of InstaSignUpInfos
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getSignUpInfo(): Promise<InstaSignUpInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let result = await db.query(sql.selectSignUpSQL);
            return result.values as InstaSignUpInfo[];
        });
    }
}