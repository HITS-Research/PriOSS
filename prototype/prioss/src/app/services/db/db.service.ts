import { Injectable } from '@angular/core';
import { SQLiteDBConnection, capSQLiteResult } from '@capacitor-community/sqlite';
import { environment } from 'src/environments/environment';
import { SQLiteService } from '../sqlite/sqlite.service';
import { createSchema, dropSchema } from 'src/app/db/schema.sql';

interface SQLiteDBConnectionCallback<T> { (myArguments: SQLiteDBConnection): T }

@Injectable()
export class DBService {

  dbVersion = 1;

  constructor(private sqlite: SQLiteService) {
  }

  /**
   * this function handles the sqlite isopen and isclosed automatically for you.
   * 
   * @param callback: The callback function that will execute multiple SQLiteDBConnection commands or other stuff.
   * @param databaseName optional another database name
   * 
   * @returns any type you want to receive from the callback function.
   * 
   * @author: https://github.com/jepiqueau, Simon (scg@mail.upb.de)
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async executeQuery<T>(callback: SQLiteDBConnectionCallback<T>, databaseName: string = environment.databaseName, debug_info = ''): Promise<T> {

    await customElements.whenDefined('jeep-sqlite');
    const jeepSqliteEl = document.querySelector('jeep-sqlite');
    if(jeepSqliteEl != null) {
      console.log(`>>DbService: isStoreOpen ${await jeepSqliteEl.isStoreOpen()}`);
    }

    try {
      const isConnection = await this.sqlite.isConnection(databaseName);
      //console.log('executing query, isConnection: ' + isConnection.result);

      if(isConnection.result) {
        //console.log('closing previous Connection');
        await this.sqlite.closeConnection(databaseName);
      } 
    } catch (error) {
      throw Error(`DatabaseClosingError: ${error}`);
    }

    try{

      //console.log('creating connection');
      let db = await this.sqlite.createConnection(databaseName, false, "no-encryption", this.dbVersion);
      let consistency: capSQLiteResult = await  this.sqlite.checkConnectionsConsistency();
      console.log('>>> Connection consistency: ' + consistency.result);
      while(!consistency.result)
      {
        db = await this.sqlite.createConnection(databaseName, false, "no-encryption", this.dbVersion);
        consistency = await this.sqlite.checkConnectionsConsistency();
        console.log('>>> RETRY: consistency: ' + consistency.result);
      }

      await db.open();
      let dbOpen: capSQLiteResult = await db.isDBOpen();
      console.log('>>> DB open: ' + dbOpen.result);
      while(!dbOpen.result)
      {
        await db.open();
        dbOpen = await db.isDBOpen();
        console.log('>>> RETRY: DB open: ' + dbOpen.result);
      }
   
      const cb = await callback(db);

      //console.log('closing Connection');
      await this.sqlite.closeConnection(databaseName);
      return cb;
      
    } catch (error) {
      throw Error(`DatabaseServiceError: ${error}`);
    }
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result: any = await this.sqlite.echo('Hello World');

    const db: SQLiteDBConnection = await this.sqlite.createConnection(
      environment.databaseName,
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

    await this.sqlite.closeConnection(environment.databaseName);

    console.log("> DB Rebuilding finished");
    return Promise.resolve();
  }

}
