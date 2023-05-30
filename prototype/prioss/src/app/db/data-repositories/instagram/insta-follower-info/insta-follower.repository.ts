import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import * as sql from "./insta-follower.sql";
import { InstaFollowerInfo } from 'src/app/models/Instagram/FollowerInfo/FollowerInfo';
/**
 * This class handles all communication with the database tables that are used in the InstaFollower Component.
 * 
 * @author: Melina (kleber@mail.uni-paderborn.de)
 */
@Injectable()
export class InstaFollowerRepository {

    constructor(private dbService: DBService){

    }

    /**
     * This async method adds follower information to the insta_follower_information table.
     * 
     * @param instaProfileURL the url to the followers profile
     * @param instaAccountName the followers account name
     * @param timestamp since the user follows this account
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async addFollowerInformation(instaProfileURL: string, instaAccountName: string, timestamp: number) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = sql.insertIntoInstaFollowerInfoSQL;
            let values = [instaProfileURL, instaAccountName, timestamp];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }

    /**
     * This async method adds following information to the insta_following_information table.
     * 
     * @param instaProfileURL the url to the following profile
     * @param instaAccountName the following account name
     * @param timestamp since the user following this account
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async addFollowingInformation(instaProfileURL: string, instaAccountName: string, timestamp: number) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = sql.insertIntoInstaFollowingInfoSQL;
            let values = [instaProfileURL, instaAccountName, timestamp];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }
   

    /**
     * This async method selects all entries from the insta_follower_information table
     * 
     * @returns an array of InstaFollowerInformation
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async getFollowerInfo(): Promise<InstaFollowerInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let result = await db.query(sql.selectFollowerInfo);
            return result.values as InstaFollowerInfo[];
        });
    }

    /**
     * This async method selects all entries from the insta_following_info table
     * 
     * @returns an array of InstaFollowingInfos
     * 
     * @author: Melina (kleber@mail.uni-paderborn.de)
     */
    async getFollowingInfo(): Promise<InstaFollowerInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let result = await db.query(sql.selectFollowingInfo);
            return result.values as InstaFollowerInfo[];
        });
    }
}
