import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { environment } from 'src/environments/environment';
import { SQLiteService } from '../sqlite/sqlite.service';
import { createSchema, dropSchema } from 'src/app/db/schema.sql';

interface SQLiteDBConnectionCallback<T> { (myArguments: SQLiteDBConnection): T }

@Injectable()
export class DBService {

  dbVersion: number = 1;

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
   * @author: https://github.com/jepiqueau
   */
  async executeQuery<T>(callback: SQLiteDBConnectionCallback<T>, databaseName: string = environment.databaseName): Promise<T> {
    try {
      console.log(this.sqlite);
      let isConnection = await this.sqlite.isConnection(databaseName);

      console.log(isConnection.result);
      if (isConnection.result) {
        let db = await this.sqlite.retrieveConnection(databaseName);
        console.log("Run Callback");
        return await callback(db);
      }
      else {
        console.log("Open new Connection");
        const db = await this.sqlite.createConnection(databaseName, false, "no-encryption", this.dbVersion);
        await db.open();

        console.log("Run Callback");
        let cb = await callback(db);

        console.log("Close connection");
        await this.sqlite.closeConnection(databaseName);
        return cb;
      }
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
    let result: any = await this.sqlite.echo('Hello World');

    let db: SQLiteDBConnection = await this.sqlite.createConnection(
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
