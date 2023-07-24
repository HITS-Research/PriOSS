import { SQLiteDBConnection} from "@capacitor-community/sqlite";
import { DBService } from "src/app/services/db/db.service";

/**
  * This repository component is responsible for providing methods for bulk-adding data to a SQLite table
  * It bulk adding allows to add up to 500 rows to a table in a single SQL statement by building up the SQL statement over multiple method calls.
  *
  * @author: Simon (scg@mail.upb.de), Rashida (rbharmal@mail.uni-paderborn.de )
  *
  */
export class BulkAddCapableRepository {

  /* 
   * Variables needed for bulk add feature
   */
  private bulkAddSQL = "";//The SQL command as a prepared statement (values have placeholders: '?')
  private bulkAddValues: any[] = [];//the values to fill the placeholders in the prepared statement with 
  private currBulkSize = 0;//use to detect if the target bulk size is reached and a SQL command has to be run
  private targetBulkSize = 500;//the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
  private totalRemainingBulkAddRowCount = 0;//the total number of rows remaining that should be added across all bulks inside this bulk add run


  private bulkAddBaseSQL: string;
  private bulkAddValuesSQL: string;
  private bulkAddValueConnector: string;
  protected dbService: DBService;

  constructor(bulkAddBaseSQL: string, bulkAddValuesSQL: string, bulkAddValueConnector: string, dbService: DBService){
    this.bulkAddBaseSQL = bulkAddBaseSQL;
    this.bulkAddValuesSQL = bulkAddValuesSQL;
    this.bulkAddValueConnector = bulkAddValueConnector;
    this.dbService = dbService;
  }

/**
  * Starts a bulk-add run that adds multiple rows from subsequent addBulkEntry-Calls to the DB in a single SQL statement.
  *
  * @param values the values that make up the row that should be inserted into the DB
  * @param totalRowCount the total number of rows that should be added to the DB table in this bulk add run
  * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
  async startBulkAdd(values: any[], totalRowCount: number, targetBulkSize = 500)
  {
    this.bulkAddSQL = this.bulkAddBaseSQL + " " + this.bulkAddValuesSQL;
    this.bulkAddValues = values;
    this.totalRemainingBulkAddRowCount = totalRowCount - 1;
    this.currBulkSize += 1;
    this.targetBulkSize = targetBulkSize;

    //executes the query because there is only one entry
    /*if (totalRowCount <= 1) {
      await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
        let ret: capSQLiteChanges = await db.run(this.bulkAddSQL, this.bulkAddValues);
      });

      //Reset the bulk add variables,
      this.totalRemainingBulkAddRowCount = 0;
      this.currBulkSize = 0;
      this.bulkAddSQL = "";
      this.bulkAddValues = [];
    }*/
  }

/**
  * Adds a row to ta DB table as part of a bulk-add run
  *
  * @param values the values that make up the row that should be inserted into the DB
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
  async addBulkEntry(values: any[])
  {
    if (this.currBulkSize >= this.targetBulkSize && this.totalRemainingBulkAddRowCount > 1)//this is the last row in this bulk, but it is not the last overall row (=there is at least one bulk to follow)
    {
      //run the query without the newly passed row
      await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
        await db.run(this.bulkAddSQL, this.bulkAddValues);
      });

      //Start a new bulk with the newly passed row
      this.bulkAddSQL = this.bulkAddBaseSQL + " " + this.bulkAddValuesSQL;
      this.bulkAddValues = values;
      this.totalRemainingBulkAddRowCount -= 1;
      this.currBulkSize = 1;
    }
    else if (this.totalRemainingBulkAddRowCount <= 1)//This is the last entry inside this bulk add: clean up & run query
    {
      //Append a new values row to the SQL query and corresponding values to the values array
      this.bulkAddSQL += " " + this.bulkAddValueConnector + " " + this.bulkAddValuesSQL;
      this.bulkAddValues.push(...values);//append the elements of values to the bulkAddValues array

      //run query
      await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
        await db.run(this.bulkAddSQL, this.bulkAddValues);
      });

      //Reset the bulk add variables,
      this.totalRemainingBulkAddRowCount = 0;
      this.currBulkSize = 0;
      this.bulkAddSQL = "";
      this.bulkAddValues = [];
    }
    else //No need to run the query, just add the row to the current bulk add command
    {
      //Append a new values row to the SQL query and corresponding values to the values array
      this.bulkAddSQL += " " + this.bulkAddValueConnector + " " + this.bulkAddValuesSQL;
      this.bulkAddValues.push(...values);//append the elements of values to the bulkAddValues array

      this.totalRemainingBulkAddRowCount -= 1;
      this.currBulkSize += 1;
    }

    return Promise.resolve();
  }
}