import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import * as dateUtils from "../../../../utilities/dateUtils.functions";
import * as sql from "./insta-liked-content.sql";
import { InstaLikedCommentsInfo } from "src/app/models/Instagram/LikedCommentsAndPostsInfo/InstaLikedCommentsInfo";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import { InstaLikedCommentsWithCount } from "src/app/models/Instagram/LikedCommentsAndPostsInfo/InstaLikedCommentsWithCount";


/**
 * This class handles all communication with the database tables that are used in the InstaLikesInformation Component.
 * 
 * @author: Mayank (mayank@mail.upb.de)
 */
@Injectable()
export class InstaLikedCommentsRepository extends BulkAddCapableRepository{
    
    constructor(dbService: DBService){
        super(sql.bulkAddInstaLikedCommentsBaseSQL, sql.bulkAddInstaLikedCommentsValuesSQL, sql.bulkAddValueConnectorForLikedComments, dbService);
    }

    /**
     * This async method adds liked comments information to the insta_liked_comments table.
     * 
     * @param user the user who liked the comment that was liked
     * @param href_link the link of the comment which was liked
     * @param timestamp the time value when the comment was liked
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addLikedCommentsInformation(user: string, href_link: string, timestamp: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = sql.insertIntoInstaLikedCommentsSQL;
            let values = [user, href_link, timestamp];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addLikedCommentsBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param user the user who liked the comment that was liked
     * @param href_link the link of the comment which was liked
     * @param timestamp the time value when the comment was liked
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async startLikedCommentsBulkAdd(user: string, href_link: string, timestamp: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([user, href_link, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram ads activity table as part of a bulk-add run
     * 
     * @param user the user who liked the comment that was liked
     * @param href_link the link of the comment which was liked
     * @param timestamp the time value when the comment was liked
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addLikedCommentsBulkEntry(user: string, href_link: string, timestamp: string,) : Promise<void> {
        return this.addBulkEntry([user, href_link, timestamp]);
    }

    /**
     * This async method selects all entries from the insta_liked_comments table
     * 
     * @returns an array of InstaLikedCommentInfos
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getLikedCommentsInfo(): Promise<InstaLikedCommentsInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let result = await db.query(sql.selectLikedCommentsSQL);
            return result.values as InstaLikedCommentsInfo[];
        });
    }

    /**
     * Queries the instagram liked comments for the number of user comments liked
     * @returns An array of InstaLikedCommentsWithCount
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getLikedCommentsWithCount(): Promise<InstaLikedCommentsWithCount[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
        let result = await db.query(sql.selectLikedCommentsWithCountSQL);
        return result.values as InstaLikedCommentsWithCount[];
        });
    }


    /**
     * Queries the instagram liked comments to get the first date of all the liked comments
     * @returns The First Date
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getLikedCommentsFirstDate(): Promise<Date>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            let result = await db.query(sql.getFirstDateForLikedCommentsSQL);
            if(result.values) {
                let dateString: string = result.values[0].min_date;
                return dateUtils.parseDate(dateString) as Date;
            }
            else {
                throw Error('getLikedCommentsFirstDate did not return anything!');
            }
        });
    }

    /**
     * Queries the instagram liked comments to get the last date of all the liked comments
     * @returns The Last Date
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getLikedCommentsLastDate(): Promise<Date>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            let result = await db.query(sql.getLastDateForLikedCommentsSQL);
            if(result.values) {
                let dateString: string = result.values[0].max_date;
                return dateUtils.parseDate(dateString) as Date;
            }
            else {
                throw Error('getLikedCommentsLastDate did not return anything!');
            }
        });
    }

    /**
     * This async method selects all entries within the Date Range from the insta_liked_comments table
     * @returns An array of InstaLikedCommentsWithCount within the Date Range
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async filterLikedCommentsBasedOnDate(fromDate: Date, toDate: Date): Promise<InstaLikedCommentsWithCount[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            let values = [dateUtils.getDisplayDateString(fromDate),dateUtils.getDisplayDateString(toDate)];
            let result = await db.query(sql.filterLikedCommentBasedOnStartAndEndDateSQL, values);
            return result.values as InstaLikedCommentsWithCount[];
        });
    }

    /**
     * This async method selects all entries within the Date Range and for particular user from the insta_liked_comments table
     * @returns An array of InstaLikedCommentsWithCount within the Date Range and for particular user 
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async filterLikedCommentsBasedOnUserAndDate(user: string, fromDate: Date, toDate: Date): Promise<InstaLikedCommentsWithCount[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            let values = [dateUtils.getDisplayDateString(fromDate),dateUtils.getDisplayDateString(toDate), user];
            let result = await db.query(sql.filterLikedCommentBasedOnUserAndStartAndEndDateSQL, values);
            return result.values as InstaLikedCommentsWithCount[];
        });
    }
}