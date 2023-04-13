import { DBSQLiteValues, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { SQLiteService } from "../services/sqlite.service";
import { createSchema, dropSchema, insertIntoSpotHistorySQL } from "./schema";

export class DatabaseManager {

  dbVersion = 1;
  dbName = 'prioss-db';

  db: SQLiteDBConnection;

  constructor(private sqlite: SQLiteService){
  
  }

  async addToSpotHistory(historyItem: {endTime: string, artistName: string, trackName: string, msPlayed: number}): Promise<void>
  {
    console.log("Opening Connection");
    this.db = await this.sqlite.createConnection(
      this.dbName,
      false,
      'no-encryption',
      this.dbVersion,
    );

    await this.db.open();

    let ret: any = await this.db.run(insertIntoSpotHistorySQL, [historyItem.endTime, historyItem.artistName,  historyItem.trackName, historyItem.msPlayed]);

    if (ret.changes.changes !== 1) {
      return Promise.reject(new Error('Execute inserTestHistory failed'));
    }
    else
    {
      console.log("Inserted");
    }

    console.log("closing connection");
    await this.sqlite.closeConnection(this.dbName);

    return Promise.resolve();
  }

  async query(sqlStatement: string, values?: any[] | undefined): Promise<DBSQLiteValues>
  {
    return this.db.query(sqlStatement, values);
  }

  async readSpotHistory(): Promise<void>
  {
    console.log("Opening Connection");
    this.db = await this.sqlite.createConnection(
      this.dbName,
      false,
      'no-encryption',
      this.dbVersion,
    );

    await this.db.open();

    const selectStmt: string = `
      select * from spot_history;
    `;
    let result = await this.db.query(selectStmt);
    
    console.log("Read history: ");
    console.log(result.values);
      
    await this.sqlite.closeConnection(this.dbName);  
    return Promise.resolve();
  }

/**
  * Asynchronous method that drops the existing sql database tables and creates new empty ones
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */   
  async rebuildDatabase():Promise<void> { 
    console.log("> Start Rebuilding Database");

    //wait for db service to initialize
    let result: any = await this.sqlite.echo('Hello World');

    let db: SQLiteDBConnection = await this.sqlite.createConnection(
      this.dbName,
      false,
      'no-encryption',
      this.dbVersion,
    );

    // open db
    await db.open();
    
    console.log(">>> Dropping existing schema");
    let ret: any = await db.execute(dropSchema);

    console.log(">>> Creating new schema");
    ret = await db.execute(createSchema);
    if (ret.changes.changes < 0) {
    return Promise.reject(new Error('Execute createSchema failed'));
    }
    
    /* The following is a simple example on how you can insert and query data from a created database table
    console.log(">>> inserting test history");
    ret = await db.execute(insertTestHistory);
    if (ret.changes.changes !== 2) {
    return Promise.reject(new Error('Execute inserTestHistory failed'));
    }

    console.log(">>> Querying test history");
    // select whole history in db
    ret = await db.query('SELECT * FROM spot_history;');
    console.log(ret.values);
    if (
    ret.values.length !== 2 ||
    ret.values[0].trackName !== 'NICE!' ||
    ret.values[1].trackName !== 'DIAMONDS'
    ) {
    return Promise.reject(new Error('Select * from spot_history failed'));
    }
    */

    await this.sqlite.closeConnection(this.dbName);

    console.log("> DB Rebuilding finished");
    return Promise.resolve();
  }
}