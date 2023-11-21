import { Injectable } from "@angular/core";
import { BulkAddCapableRepository } from "./bulk-add-capable.repository";
import * as sql from "./inferences.sql";
import { DBService } from "src/app/db/db.service";
import { InferencesEntry } from "src/app/framework/models/Inferences/InferencesEntry";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";

/**
  * This repository component is responsible for providing functions to insert and request data from the inferences table.
  * It includes a methods to bulk-add up to 500 rows to the table in a single SQL statement by building up the SQL statement over multiple method calls.
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
@Injectable()
export class InferencesRepository extends BulkAddCapableRepository {

  constructor(dbService: DBService) {
    super(sql.bulkAddInferencesBaseSQL, sql.bulkAddInferencesValuesSQL, sql.bulkAddValueConnector, dbService);
  }

  async startInferencesBulkAdd(inference: string, totalRowCount: number, targetBulkSize = 500) : Promise<void>{
    return this.startBulkAdd([inference], totalRowCount, targetBulkSize);
  }

  async addBulkInferencesEntry(inference: string) : Promise<void>{
    return this.addBulkEntry([inference]);
  }

  async getAllInferences() : Promise<InferencesEntry[]> {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      const result = await db.query(sql.selectAllInferences);
      return result.values as InferencesEntry[];

    });
  }

}
