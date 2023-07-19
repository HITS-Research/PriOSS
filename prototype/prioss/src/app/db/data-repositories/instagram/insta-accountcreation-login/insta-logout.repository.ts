import { Injectable } from "@angular/core";
import { SQLiteDBConnection} from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import * as sql from "./insta-accountcreation-login.sql";
import { InstaLogoutInfo } from "src/app/models/Instagram/InstaAccountCreationAndLoginInfo/InstaLogoutInfo"; 
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as devicetypeUtils from "../../../../utilities/devicetype.functions";

/**
 * This class handles all communication with the database tables that are used in the InstaAccountCreationAndLogin Component.
 * 
 * @author: Mayank (mayank@mail.upb.de)
 */
@Injectable()
export class InstaLogoutRepository extends BulkAddCapableRepository{
    
    constructor(dbService: DBService){
        super(sql.bulkAddInstaLogoutBaseSQL, sql.bulkAddInstaLogoutValuesSQL, sql.bulkAddValueConnectorForLogout, dbService);
    }

    /**
     * This async method adds liked comments information to the insta_liked_comments table.
     * 
     * @param ip_address the ip address used to logout in the account
     * @param timestamp the time value when the comment was liked
     * @param user_agent the user agent used to logout in the account
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addLogoutInformation(ip_address: string, timestamp: number, user_agent: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            const sqlStatement = sql.insertIntoInstaLogoutSQL;
            const device = devicetypeUtils.getDeviceNameBasedOnUserAgent(user_agent);
            const values = [ip_address, timestamp, user_agent, "Logout", "red", device];
            await db.run(sqlStatement, values);
          });
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addLikedCommentsBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param ip_address the ip address used to logout in the account
     * @param timestamp the time value when the comment was liked
     * @param user_agent the user agent used to logout in the account
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async startLogoutBulkAdd(ip_address: string, timestamp: number, user_agent: string, totalRowCount: number, targetBulkSize = 500) {
        const device = devicetypeUtils.getDeviceNameBasedOnUserAgent(user_agent);
        this.startBulkAdd([ip_address, timestamp, user_agent, "Logout", "red", device], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram ads activity table as part of a bulk-add run
     * 
     * @param ip_address the ip address used to logout in the account
     * @param timestamp the time value when the comment was liked
     * @param user_agent the user agent used to logout in the account
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addLogoutBulkEntry(ip_address: string, timestamp: number, user_agent: string) : Promise<void> {
        const device = devicetypeUtils.getDeviceNameBasedOnUserAgent(user_agent);
        return this.addBulkEntry([ip_address, timestamp, user_agent, "Logout", "red", device]);
    }

    /**
     * This async method selects all entries from the insta_logout_information table
     * 
     * @returns an array of InstaLogoutInfos
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getLogoutInfo(): Promise<InstaLogoutInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const result = await db.query(sql.selectLogoutSQL);
            return result.values as InstaLogoutInfo[];
        });
    }
}