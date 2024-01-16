import { Injectable } from "@angular/core";
import { SQLiteDBConnection} from "@capacitor-community/sqlite";
import { DBService } from "../../../db.service";
import { SpotListenHistoryEntry } from "src/app/spotify/models/ListeningHistory/SpotListenHistoryEntry";
import { SpotYearlyListening } from "src/app/spotify/models/ListeningHistory/SpotYearlyListening";
import { SpotMonthlyListening } from "src/app/spotify/models/ListeningHistory/SpotMonthlyListening";
import { SpotDailyListening } from "src/app/spotify/models/ListeningHistory/SpotDailyListening";
import { SpotHourlyListening } from "src/app/spotify/models/ListeningHistory/SpotHourlyListening";
import { SpotMinListenedToArtist } from "src/app/spotify/models/TopArtist/SpotMinListenedToArtist";
import { SpotListeningHistoryOfArtist } from "src/app/spotify/models/TopArtist/SpotListeningHistoryOfArtist";
import * as dateUtils from "../../../../features/utils/dateUtils.functions";
import * as sql from "./spot-history.sql";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import {SpotMinListenedToSong} from "../../../../spotify/models/TopSong/SpotMinListenedToSong";
import {SpotListeningHistoryOfSong} from "../../../../spotify/models/TopSong/SpotListeningHistoryOfSong";
import { SpotHistoryBySong } from "src/app/spotify/models/ListeningHistory/SpotHistoryBySong";
import { GranularityEnum } from "src/app/spotify/pages/listening-time/granularity.enum";

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
  async startHistoryBulkAdd(endTime: string, artistName: string, trackName: string, msPlayed: number, totalRowCount: number, targetBulkSize = 500)
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

      const result = await db.query(sql.selectAllSpotHistory);
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

      const result = await db.query(sql.spotHistoryByYearSQL);
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

      const result = await db.query(sql.spotHistoryByMonthSQL);
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

      const values = [dateUtils.getDisplayDateString(fromDate),dateUtils.getDisplayDateString(toDate)];
      const result = await db.query(sql.spotHistoryByDaySQL, values);
      return result.values as SpotDailyListening[];

    });
  }

  /**
   * Queries the spotify listening history for the duration in minutes that an artist has been listened to, filtered between the given start and end dates
   * @returns An array of SpotMinListenedToArtist
   *
   * @param fromDate: start date for the time filter
   * @param toDate: end date for the time filter
   *
   * @author: Jonathan (jvn@mail.upb.de)
   */
  async getMinListenedToArtists(fromDate: Date, toDate: Date): Promise<SpotMinListenedToArtist[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      const values = [dateUtils.getDisplayDateString(fromDate),dateUtils.getDisplayDateString(toDate)];
      const result = await db.query(sql.spotMinListenedToArtistSQL, values);
      return result.values as SpotMinListenedToArtist[];
    });
  }

  /**
   * Queries the spotify listening history for the duration in minutes that an artist has been listened to, filtered between the given start and end dates
   * @returns An array of SpotMinListenedToArtist
   *
   * @param fromDate: start date for the time filter
   * @param toDate: end date for the time filter
   *
   * @author: Jonathan (jvn@mail.upb.de)
   */
  async getMinListenedToSongs(fromDate: Date, toDate: Date): Promise<SpotMinListenedToSong[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      const values = [dateUtils.getDisplayDateString(fromDate),dateUtils.getDisplayDateString(toDate)];
      const result = await db.query(sql.spotMinListenedToSongSQL, values);
      return result.values as SpotMinListenedToSong[];
    });
  }

  /**
   * Queries the spotify listening history for all songs by an artist, filtered between the given start and end dates
   * @returns An array of SpotListeningHistoryOfSong
   *
   * @param artistName: name of the artist
   * @param fromDate: start date for the time filter
   * @param toDate: end date for the time filter
   *
   * @author: Jonathan (jvn@mail.upb.de)
   */
  async getListeningHistoryOfArtist(artistName: string, fromDate: Date, toDate: Date): Promise<SpotListeningHistoryOfArtist[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      const values = [dateUtils.getDisplayDateString(fromDate),dateUtils.getDisplayDateString(toDate), artistName];
      const result = await db.query(sql.spotListeningHistoryOfArtistSQL, values);
      return result.values as SpotListeningHistoryOfArtist[];
    });
  }

  /**
   * Queries the spotify listening history for all entries of a song, filtered between the given start and end dates
   * @returns An array of SpotListeningHistoryOfSong
   *
   * @param artistName: name of the artist
   * @param trackName: name of the track
   * @param fromDate: start date for the time filter
   * @param toDate: end date for the time filter
   *
   * @author: Jonathan (jvn@mail.upb.de)
   */
  async getListeningHistoryOfSong(artistName: string, trackName: string, fromDate: Date, toDate: Date): Promise<SpotListeningHistoryOfSong[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      const values = [dateUtils.getDisplayDateString(fromDate),dateUtils.getDisplayDateString(toDate), artistName, trackName];
      const result = await db.query(sql.spotListeningHistoryOfSongSQL, values);
      return result.values as SpotListeningHistoryOfSong[];
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

      const dateString: string = dateUtils.getDisplayDateString(day);
      const result = await db.query(sql.spotHistoryByHourSQL, [dateString]);
      return result.values as SpotHourlyListening[];
    });
  }

  /**
   * Queries the spotify listening history for the information of songs listened to within on specific hour
   * @returns An array of SpotHistoryBySong
   *
   * @author: Simon (scg@mail.upb.de)
   */
  async getHistoryForSingleHour(startHour: Date): Promise<SpotHistoryBySong[]>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      startHour = dateUtils.trimDate(startHour, GranularityEnum.Hour);
      const endHour = dateUtils.trimDate(startHour, GranularityEnum.Hour);
      startHour.setUTCHours(startHour.getHours());//ignore timezone
      endHour.setUTCHours(endHour.getHours()+1);
      
      const values = [startHour.getTime(), endHour.getTime()];
      const result = await db.query(sql.spotHistoryForSingleHourSQL, values);
      return result.values as SpotHistoryBySong[];
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

      const result = await db.query(sql.spotHistoryMostRecentDaySQL);
      if(result.values)
      {
        const dateString: string = result.values[0].date;
        if (!dateString) {
          return null;
        }
        else {
          return dateUtils.parseDate(dateString) as Date;
        }
      }
      else
      {
        throw Error('getMostRecentDay did not return anything!');
      }
    });
  }

  /**
   * @returns the first/earliest day that occurs in the spotify listening history
   *
   * @author: Jonathan (jvn@mail.upb.de)
   */
  async getFirstDay(): Promise<Date>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      const result = await db.query(sql.spotHistoryFirstDaySQL);
      if(result.values)
      {
        const dateString: string = result.values[0].date;
        if (!dateString) {
          return null;
        }
        else {
          return dateUtils.parseDate(dateString) as Date;
        }
      }
      else
      {
        throw Error('getFirstDay did not return anything!');
      }
    });
  }
}
