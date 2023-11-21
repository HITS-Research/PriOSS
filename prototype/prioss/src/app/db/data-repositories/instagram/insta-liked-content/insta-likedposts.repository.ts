import { Injectable } from "@angular/core";
import { SQLiteDBConnection} from "@capacitor-community/sqlite";
import { DBService } from "../../../db.service";
import * as dateUtils from "../../../../features/utils/dateUtils.functions";
import * as sql from "./insta-liked-content.sql";
import { InstaLikedPostsInfo } from "src/app/instagram/models/LikedCommentsAndPostsInfo/InstaLikedPostsInfo";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import { InstaLikedPostsWithCount } from "src/app/instagram/models/LikedCommentsAndPostsInfo/InstaLikedPostsWithCount";

/**
 * This class handles all communication with the database tables that are used in the InstaLikesInformation Component.
 *
 * @author: Mayank (mayank@mail.upb.de)
 */
@Injectable()
export class InstaLikedPostsRepository extends BulkAddCapableRepository{

    constructor(dbService: DBService){
        super(sql.bulkAddInstaLikedPostsBaseSQL, sql.bulkAddInstaLikedPostsValuesSQL, sql.bulkAddValueConnectorForLikedPosts, dbService);
    }

    /**
     * This async method adds liked posts information to the insta_liked_posts table.
     *
     * @param user the user who posted the post that was liked
     * @param href_link the link of the post which was liked
     * @param timestamp the time value when the post was liked
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addLikedPostsInformation(user: string, href_link: string, timestamp: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const sqlStatement = sql.insertIntoInstaLikedPostsSQL;
            const values = [user, href_link, timestamp];

            await db.run(sqlStatement, values);
          });
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addLikedPostsBulkEntry-Calls to the DB in a single SQL statement.
     *
     * @param user the user who posted the post that was liked
     * @param href_link the link of the post which was liked
     * @param timestamp the time value when the post was liked
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async startLikedPostsBulkAdd(user: string, href_link: string, timestamp: string, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([user, href_link, timestamp], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram ads activity table as part of a bulk-add run
     *
     * @param user the user who posted the post that was liked
     * @param href_link the link of the post which was liked
     * @param timestamp the time value when the post was liked
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addLikedPostsBulkEntry(user: string, href_link: string, timestamp: string,) : Promise<void> {
        return this.addBulkEntry([user, href_link, timestamp]);
    }

    /**
     * This async method selects all entries from the insta_liked_posts table
     *
     * @returns an array of InstaLikedPostInfos
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getLikedPostsInfo(): Promise<InstaLikedPostsInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const result = await db.query(sql.selectLikedPostsSQL);
            return result.values as InstaLikedPostsInfo[];
        });
    }

    /**
     * Queries the instagram liked posts for the number of user post liked
     * @returns An array of InstaLikedPostsWithCount
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getLikedPostsWithCount(): Promise<InstaLikedPostsWithCount[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
        const result = await db.query(sql.selectLikedPostsWithCountSQL);
        return result.values as InstaLikedPostsWithCount[];
        });
    }

    /**
     * Queries the instagram liked posts to get the first date of all the liked posts
     * @returns The First Date
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getLikedPostsFirstDate(): Promise<Date>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            const result = await db.query(sql.getFirstDateForLikedPostsSQL);
            if(result.values) {
                const dateString: string = result.values[0].min_date;
                return dateUtils.parseDate(dateString) as Date;
            }
            else {
                throw Error('getLikedPostsFirstDate did not return anything!');
            }
        });
    }

    /**
     * Queries the instagram liked posts to get the last date of all the liked posts
     * @returns The Last Date
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getLikedPostsLastDate(): Promise<Date>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            const result = await db.query(sql.getLastDateForLikedPostsSQL);
            if(result.values) {
                const dateString: string = result.values[0].max_date;
                return dateUtils.parseDate(dateString) as Date;
            }
            else {
                throw Error('getLikedPostsLastDate did not return anything!');
            }
        });
    }

    /**
     * This async method selects all entries within the Date Range from the insta_liked_posts table
     * @returns An array of InstaLikedPostsWithCount within the Date Range
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async filterLikedPostsBasedOnDate(fromDate: Date, toDate: Date): Promise<InstaLikedPostsWithCount[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            const values = [dateUtils.getDisplayDateString(fromDate),dateUtils.getDisplayDateString(toDate)];
            const result = await db.query(sql.filterLikedPostsBasedOnStartAndEndDateSQL, values);
            return result.values as InstaLikedPostsWithCount[];
        });
    }

    /**
     * This async method selects all entries within the Date Range and for particular user from the insta_liked_comments table
     * @returns An array of InstaLikedPostsWithCount within the Date Range and for particular user
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async filterLikedPostsBasedOnUserAndDate(user: string, fromDate: Date, toDate: Date):
    Promise<InstaLikedPostsWithCount[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            const values = [dateUtils.getDisplayDateString(fromDate),dateUtils.getDisplayDateString(toDate), user];
            const result = await db.query(sql.filterLikedPostsBasedOnUserAndStartAndEndDateSQL, values);
            return result.values as InstaLikedPostsWithCount[];
        });
    }
}
