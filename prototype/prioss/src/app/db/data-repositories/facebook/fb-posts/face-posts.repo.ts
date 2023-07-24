import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./face-posts.sql";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { PostsModel } from "src/app/models/Facebook/posts";


/**
 * This repository component is responsible for providing functions to insert and request data from the
 * face_posts table that holds all data regarding facebook posts.
 * 
 * @author: Rashida (rbharmal@mail.upb.de)
 */
@Injectable()
export class FacebookPostsRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddFacePostsBaseSQL, sql.bulkAddFacePostsValuesSQL, sql.bulkAddValueConnector, dbService);
    }

       /**
     * Starts a bulk-add run that adds multiple rows from subsequent startPostsBulkAdd to the DB in a single SQL statement.
     * 
     * @param title that should be added to the Facebook posts table.
     * @param timestamp the timestamp of the content posted that should be added to the Facebook posts table.
     * @param totalRowCount the total number of rows that should be added to the post table in this bulk add run.
     * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time.
     * 
     * @author: Rashida (rbharmal@mail.upb.de)
     */
       async startPostsBulkAdd(timestamp: number, title: string, totalRowCount: number, targetBulkSize = 500) {
        this.startBulkAdd([timestamp, title], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Facebook posts table as part of a bulk-add run
     * 
     * @param title that should be added to the Facebook posts table.
     * @param timestamp the timestamp of the content posted that should be added to the Facebook posts table.
     * 
     *@author: Rashida (rbharmal@mail.upb.de)
     */
    async addPostsBulkEntry(timestamp: number, title: string) : Promise<void> {
        return this.addBulkEntry([timestamp, title]);
    }
    
    /**
     * This async method fetches all entries from the  Facebook posts table.
     * 
     * @author: Rashida (rbharmal@mail.upb.de)
     * 
     */
       async getAllPosts() : Promise<[PostsModel]> {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
    
          const result = await db.query(sql.selectAllPostsData);
          return result.values as PostsModel[];
        });
      }
}
