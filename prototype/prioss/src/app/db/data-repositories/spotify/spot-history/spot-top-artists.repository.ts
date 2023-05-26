import { Injectable } from "@angular/core";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { SpotMinListenedToArtist } from "src/app/models/Spotify/TopArtist/SpotMinListenedToArtist";
import { DBService } from "src/app/services/db/db.service";

import * as dateUtils from "../../../../utilities/dateUtils.functions";
import * as sql from "./spot-history.sql";
import { SpotListeningHistoryOfArtist } from "src/app/models/Spotify/TopArtist/SpotListeningHistoryOfArtist";

/**
  * This repository component is responsible for providing functions to insert and request data from the spot_history table
  * that houses the Spotify listening history entries from a data-download.
  * It includes a method to bulk-add up to 500 rows to the table in a single SQL statement by building up the SQL statement over multiple method calls.
  *
  * @author: Simon (scg@mail.upb.de), Rashida (rbharmal@mail.uni-paderborn.de )
  *
  */
@Injectable()
export class SpotTopArtistsRepository{

  constructor(private dbService: DBService){
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

      let values = [dateUtils.getDisplayDateString(fromDate),dateUtils.getDisplayDateString(toDate)];
      let result = await db.query(sql.spotMinListenedToArtistSQL, values);
      return result.values as SpotMinListenedToArtist[];
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

      let values = [dateUtils.getDisplayDateString(fromDate),dateUtils.getDisplayDateString(toDate), artistName];
      let result = await db.query(sql.spotListeningHistoryOfArtistSQL, values);
      return result.values as SpotListeningHistoryOfArtist[];
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

      let result = await db.query(sql.spotHistoryMostRecentDaySQL);
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

  /**
   * @returns the first/earliest day that occurs in the spotify listening history
   *
   * @author: Jonathan (jvn@mail.upb.de)
   */
  async getFirstDay(): Promise<Date>
  {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

      let result = await db.query(sql.spotHistoryFirstDaySQL);
      if(result.values)
      {
        let dateString: string = result.values[0].date;
        return dateUtils.parseDate(dateString) as Date;
      }
      else
      {
        throw Error('getFirstDay did not return anything!');
      }
    });
  }

}