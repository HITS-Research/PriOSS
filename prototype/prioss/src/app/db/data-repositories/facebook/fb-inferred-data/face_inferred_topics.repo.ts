import { Injectable } from "@angular/core";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./face_inferred_topics.sql";

/** 
 * This class handles data that is inserted into and extracted from the userdata table. The Table is mainly used for the General-Data visualization.
 * 
 * @author: Max (maxy@mail.upb.de)
 */
@Injectable()
export class InferredTopicsRepository extends BulkAddCapableRepository {

    constructor(dbService: DBService){
        super(sql.insertIntoFacebookInferredTopicSQL, sql.selectAllInferredTopics, sql.bulkAddValueConnector, dbService);
    }

    /**
     * This async method adds all inferred tpic to the inferred_topics table.
     * 
     * @author: Rashida (rbharmal@mail.upb.de)
     * 
     * @param topics: array of inferred topics
     */
    async addInferredTopics(topics: string[],totalRowCount: number, targetBulkSize: number = 500) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            this.startBulkAdd([topics],totalRowCount,targetBulkSize);
            
          });
    }

    /**
     * This async method fetches all entries from the inferred topics table.
     * 
     * @author: Rashida (rbharmal@mail.upb.de)
     * 
     */
    async getAllInferredTopics() : Promise<string[]> {
      return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
  
        let result = await db.query(sql.selectAllInferredTopics);
        return result.values as string[];
  
      });
    }
  }