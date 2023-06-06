import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import * as sql from "./insta-ads.sql";

import { InstaAdsActivityInfo } from "src/app/models/Instagram/LikedAdsInfo/InstaAdsActivityInfo";
import { InstaAdsClickedInfo } from "src/app/models/Instagram/LikedAdsInfo/InstaAdsClickedInfo";
import { InstaAdsInterestInfo } from "src/app/models/Instagram/LikedAdsInfo/InstaAdsInterestInfo";
import { InstaAdsViewedInfo } from "src/app/models/Instagram/LikedAdsInfo/InstaAdsViewedInfo";


/**
 * This class handles all communication with the database tables that are used in the InstaAdsInformation Component.
 * 
 * @author: Mayank (mayank@mail.upb.de)
 */
@Injectable()
export class InstaAdsRepository{
    
    constructor(private dbService: DBService){}

    /**
     * This async method adds liked comments information to the insta_ads_activity table.
     * 
     * @param advertiserName the name of the adversitement company which has user data
     * @param has_data_file_custom_audience Status whether the data file has custom audience or not
     * @param has_remarketing_custom_audience Status whether the remarketing has custom audience or not
     * @param has_in_person_store_visit Status whether the adversitement company has in store visit or not
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addAdsActivityInformation(advertiserName: string, has_data_file_custom_audience: boolean, has_remarketing_custom_audience: boolean, has_in_person_store_visit: boolean) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = sql.insertIntoInstaAdsActivitySQL;
            let values = [advertiserName, has_data_file_custom_audience, has_remarketing_custom_audience, has_in_person_store_visit];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }

    /**
     * This async method adds liked comments information to the insta_ads_clicked table.
     * 
     * @param title the name of the adverstisement clicked
     * @param timestamp the time the adverstisement was clicked
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addAdsClickedInformation(title: string, timestamp: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = sql.insertIntoInstaAdsClickedSQL;
            let values = [title, timestamp];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }

    /**
     * This async method adds liked comments information to the insta_ads_interest table.
     * 
     * @param interest the type of the adverstisement which the user might be interested
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addAdsInterestInformation(interest: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = sql.insertIntoInstaAdsInterestSQL;
            let values = [interest];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }

    /**
     * This async method adds liked comments information to the insta_ads_viewed table.
     * 
     * @param title the name of the adverstisement viewed
     * @param timestamp the time the adverstisement was viewed
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addAdsViewedInformation(title: string, timestamp: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = sql.insertIntoInstaAdsViewedSQL;
            let values = [title, timestamp];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }



    /**
     * This async method selects all entries from the insta_ads_activity table
     * 
     * @returns an array of InstaAdsActivityInfos
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getAdsActivityInfo(): Promise<InstaAdsActivityInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let result = await db.query(sql.selectInstaAdsActivitySQL);
            return result.values as InstaAdsActivityInfo[];
        });
    }

    /**
     * This async method selects all entries from the insta_ads_clicked table
     * 
     * @returns an array of InstaAdsClickedInfos
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getAdsClickedInfo(): Promise<InstaAdsClickedInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let result = await db.query(sql.selectInstaAdsClickedSQL);
            return result.values as InstaAdsClickedInfo[];
        });
    }

    /**
     * This async method selects all entries from the insta_ads_interest table
     * 
     * @returns an array of InstaAdsInterestInfos
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getAdsInterestInfo(): Promise<InstaAdsInterestInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let result = await db.query(sql.selectInstaAdsInterestSQL);
            return result.values as InstaAdsInterestInfo[];
        });
    }

    /**
     * This async method selects all entries from the insta_ads_viewed table
     * 
     * @returns an array of InstaAdsViewedInfos
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getAdsViewedInfo(): Promise<InstaAdsViewedInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let result = await db.query(sql.selectInstaAdsViewedSQL);
            return result.values as InstaAdsViewedInfo[];
        });
    }
}