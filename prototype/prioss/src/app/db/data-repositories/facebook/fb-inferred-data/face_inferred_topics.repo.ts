import { Injectable } from "@angular/core";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { InferredTopicsModel } from "src/app/models/Facebook/inferredTopics";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./face_inferred_topics.sql";

/** 
 * This class handles data that is inserted into and extracted from the userdata table. The Table is mainly used for the General-Data visualization.
 * 
 * @author: Rashida (rbharmal@mail.upb.de)
 */
@Injectable()
export class InferredTopicsRepository extends BulkAddCapableRepository {

    constructor(dbService: DBService){
        super(sql.bulkAddFaceInferredTopicsBaseSQL, sql.bulkAddFaceInferredTopicsValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    /**
     * This async method adds all inferred tpic to the inferred_topics table.
     * 
     * @author: Rashida (rbharmal@mail.upb.de)
     * 
     * @param topics: array of inferred topics
     */
    async addInferredTopics(topic: string,totalRowCount: number, targetBulkSize: number = 500) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            this.startBulkAdd([topic],totalRowCount,targetBulkSize);
            
          });
    }

    async addBulkInferredTopicsEntry(topic: string) : Promise<void>{
      return this.addBulkEntry([topic]);
    }

    /**
     * This async method fetches all entries from the inferred topics table.
     * 
     * @author: Rashida (rbharmal@mail.upb.de)
     * 
     */
    async getAllInferredTopics() : Promise<InferredTopicsModel[]> {
      return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
  
        let result = await db.query(sql.selectAllInferredTopics);
        return result.values as InferredTopicsModel[];
      });
    }
  }