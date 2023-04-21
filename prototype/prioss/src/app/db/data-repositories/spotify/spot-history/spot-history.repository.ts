import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import { bulkAddSpotHistoryBaseSQL, bulkAddSpotHistoryValuesSQL, bulkAddValueConnector, insertIntoSpotHistorySQL, selectAllSpotHistory, spotHistoryByDaySQL, spotHistoryByHourSQL, spotHistoryByMonthSQL, spotHistoryByYearSQL, spotHistoryMostRecentDaySQL } from "./spot-history.sql";
import { SpotListenHistoryEntry } from "src/app/models/Spotify/ListeningHistory/SpotListenHistoryEntry";
import { SpotYearlyListening } from "src/app/models/Spotify/ListeningHistory/SpotYearlyListening";
import { SpotMonthlyListening } from "src/app/models/Spotify/ListeningHistory/SpotMonthlyListening";
import { SpotDailyListening } from "src/app/models/Spotify/ListeningHistory/SpotDailyListening";
import { SpotHourlyListening } from "src/app/models/Spotify/ListeningHistory/SpotHourlyListening";
import * as dateUtils from "../../../../utilities/dateUtils.functions";
import * as sql from "./spot-history.sql";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";

/**
  * This repository component is responsible for providing functions to insert and request data from the spot_history table
  * that houses the Spotify listening history entries from a data-download.
  * It includes a method to bulk-add up to 500 rows to the table in a single SQL statement by building up the SQL statement over multiple method calls.
  *
  * @author: Simon (scg@mail.upb.de), Rashida (rbharmal@mail.uni-paderborn.de )
  *
  */
@Injectable()
export class SpotHistoryRepository extends BulkAddCapableRepository{

  constructor(dbService: DBService){
    super(sql.bulkAddSpotHistoryBaseSQL, sql.bulkAddSpotHistoryValuesSQL, sql.bulkAddValueConnector, dbService);
  }

/**
  * Starts a bulk-add run that adds multiple rows from subsequent addBulkHistoryEntry-Calls to the DB in a single SQL statement.
  *
  * @param endTime the endTime of the first row that should be added to the spotify history
  * @param artistName the artistName of the first row that should be added to the spotify history
  * @param trackName the trackName of the first row that should be added to the spotify history
  * @param msPlayed the msPlayed of the first row that should be added to the spotify history
  * @param totalRowCount the total number of rows that should be added to the spotify history table in this bulk add run
  * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
  async startHistoryBulkAdd(endTime: string, artistName: string, trackName: string, msPlayed: number, totalRowCount: number, targetBulkSize: number = 500)
  {
    this.startBulkAdd([endTime, artistName, trackName, msPlayed], totalRowCount, targetBulkSize);
  }

/**
  * Adds a row to the Spotify History table as part of a bulk-add run
  *
  * @param endTime the endTime of the row that should be added to the spotify history
  * @param artistName the artistName of the row that should be added to the spotify history
  * @param trackName the trackName of the row that should be added to the spotify history
  * @param msPlayed the msPlayed of the row that should be added to the spotify history
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
  async addBulkHistoryEntry(endTime: string, artistName: string, trackName: string, msPlayed: number) : Promise<void> {
    return this.addBulkEntry([endTime, artistName, trackName, msPlayed]);
  }

  /**
   * Queries the complete spotify listening history from the database
   * @returns An array of SpotListenHistoryEntrys 
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  async getSpotHistory(): Promise<SpotListenHistoryEntry[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let result = await db.query(selectAllSpotHistory);
      return result.values as SpotListenHistoryEntry[];

    });
  }

  /**
   * Queries the spotify listening history grouped by years from the database
   * @returns An array of SpotYearlyListenings 
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  async getHistoryByYear(): Promise<SpotYearlyListening[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let result = await db.query(spotHistoryByYearSQL);
      return result.values as SpotYearlyListening[];

    });
  }

  /**
   * Queries the spotify listening history grouped by months from the database
   * @returns An array of SpotMonthlyListenings 
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  async getHistoryByMonth(): Promise<SpotMonthlyListening[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let result = await db.query(spotHistoryByMonthSQL);
      return result.values as SpotMonthlyListening[];

    });
  }

  /**
   * Queries the spotify listening history grouped by days and filtered between the given start and end dates (TODO) from the database
   * @returns An array of SpotDailyListenings 
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  async getHistoryByDay(fromDate: Date, toDate: Date): Promise<SpotDailyListening[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let values = [dateUtils.getDisplayDateString(fromDate),dateUtils.getDisplayDateString(toDate)];
      let result = await db.query(spotHistoryByDaySQL, values);
      return result.values as SpotDailyListening[];

    });
  }

  /**
   * Queries the spotify listening history grouped by the hours within the given day from the database
   * @returns An array of SpotHourlyListenings. Each hour of the day is present once in the array (24 entries)
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  async getHistoryByHour(day: Date): Promise<SpotHourlyListening[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let dateString: string = dateUtils.getDisplayDateString(day);
      let result = await db.query(spotHistoryByHourSQL, [dateString]);
      return result.values as SpotHourlyListening[];
    });
  }

  /**
   * @returns the most recent day that occurs in the spotify listening history in the database
   * 
   * @author: Simon (scg@mail.upb.de)
   */
  async getMostRecentDay(): Promise<Date>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let result = await db.query(spotHistoryMostRecentDaySQL);
      if(result.values)
      {
        let dateString: string = result.values[0].date;
        return dateUtils.parseDate(dateString) as Date;
      }
      else
      {
        throw Error('getMostRecentDay did not return anything!');
      }
    });
  }
}
