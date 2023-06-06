import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import * as sql from "./insta-accountcreation-login.sql";
import { InstaLoginInfo } from "src/app/models/Instagram/InstaAccountCreationAndLoginInfo/InstaLoginInfo"; 
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as devicetypeUtils from "../../../../utilities/devicetype.functions";

/**
 * This class handles all communication with the database tables that are used in the InstaAccountCreationAndLogin Component.
 * 
 * @author: Mayank (mayank@mail.upb.de)
 */
@Injectable()
export class InstaLoginRepository extends BulkAddCapableRepository{
    
    constructor(dbService: DBService){
        super(sql.bulkAddInstaLoginBaseSQL, sql.bulkAddInstaLoginValuesSQL, sql.bulkAddValueConnectorForLogin, dbService);
    }

    /**
     * This async method adds liked comments information to the insta_liked_comments table.
     * 
     * @param ip_address the ip address used to login in the account
     * @param timestamp the time value when the comment was liked
     * @param user_agent the user agent used to login in the account
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addLoginInformation(ip_address: string, timestamp: number, user_agent: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            let sqlStatement = sql.insertIntoInstaLoginSQL;
            let device = devicetypeUtils.getDeviceNameBasedOnUserAgent(user_agent);
            let values = [ip_address, timestamp, user_agent, "Login", "green", device];
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addLikedCommentsBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param ip_address the ip address used to login in the account
     * @param timestamp the time value when the comment was liked
     * @param user_agent the user agent used to login in the account
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async startLoginBulkAdd(ip_address: string, timestamp: number, user_agent: string, totalRowCount: number, targetBulkSize: number = 500) {
        let device = devicetypeUtils.getDeviceNameBasedOnUserAgent(user_agent);
        this.startBulkAdd([ip_address, timestamp, user_agent, "Login", "green", device], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram ads activity table as part of a bulk-add run
     * 
     * @param ip_address the ip address used to login in the account
     * @param timestamp the time value when the comment was liked
     * @param user_agent the user agent used to login in the account
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addLoginBulkEntry(ip_address: string, timestamp: number, user_agent: string) : Promise<void> {
        let device = devicetypeUtils.getDeviceNameBasedOnUserAgent(user_agent);
        return this.addBulkEntry([ip_address, timestamp, user_agent, "Login", "green", device]);
    }

    /**
     * This async method selects all entries from the insta_login_information table
     * 
     * @returns an array of InstaLoginInfos
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getLoginInfo(): Promise<InstaLoginInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            let result = await db.query(sql.selectLoginSQL);
            return result.values as InstaLoginInfo[];
        });
    }

    
}