import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { DBService } from '../../../db.service';
import * as sql from './insta-chat-data.sql';
import { InstaChatData } from 'src/app/instagram/models/MessageInfo/InstaChatData';
import { BulkAddCapableRepository } from '../../general/inferences/bulk-add-capable.repository';
/**
 * This class handles all communication with the database tables that are used in the InstaFollower Component.
 *
 * @author: Melina (kleber@mail.uni-paderborn.de)
 */
@Injectable()
export class InstaChatDataRepository extends BulkAddCapableRepository {
  constructor(dbService: DBService) {
    super(
      sql.bulkAddInstaChatDataBaseSQL,
      sql.bulkAddInstaChatDataValuesSQL,
      sql.bulkAddValueConnector,
      dbService
    );
  }

  async addChatData(chatData: InstaChatData){
    let id = 0;
    await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      const sqlStatement = sql.insertIntoInstaChatDataInfoSQL;
      const values = [
        chatData.chat,
        chatData.yourMessages,
        chatData.monday,
        chatData.tuesday,
        chatData.wednesday,
        chatData.thursday,
        chatData.friday,
        chatData.saturday,
        chatData.sunday,
      ];
      id = (await db.run(sqlStatement, values)).changes?.lastId || 0;
    });
    return id;
  }

  // TODO: fix the parameters in the comments
  /**
   * Starts a bulk-add run that adds multiple rows from subsequent addBlockedBulkEntry-Calls to the DB in a single SQL statement.
   *
   * @param instaAccountName the blocked account name
   * @param instaProfileURL the url to the blocked profile
   * @param timestamp since the user blocks this account
   * @param totalRowCount the total number of rows that should be added to the Instagram ads activity table in this bulk add run
   * @param targetBulkSize the number of rows that should be inserted in a single SQL query. The SQLite engine does not seem to support much more than 500 at a time
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async startChatDataBulkAdd(
    chat: string,
    yourMessages: number,
    monday: number,
    tuesday: number,
    wednesday: number,
    thursday: number,
    friday: number,
    saturday: number,
    sunday: number,
    totalRowCount: number,
    targetBulkSize = 500
  ) {
    this.startBulkAdd(
      [
        chat,
        yourMessages,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      ],
      totalRowCount,
      targetBulkSize
    );
  }

  /**
   * Adds a row to the Instagram blocked table as part of a bulk-add run
   *
   * @param instaAccountName the blocked account name
   * @param instaProfileURL the url to the blocked profile
   * @param timestamp since the user blocks this account
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   *
   * @returns
   */
  async addChatDataBulkEntry(
    chat: string,
    yourMessages: number,
    monday: number,
    tuesday: number,
    wednesday: number,
    thursday: number,
    friday: number,
    saturday: number,
    sunday: number
  ): Promise<void> {
    return this.addBulkEntry([
      chat,
      yourMessages,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    ]);
  }

  /**
   * This async method adds blocked information to the insta_chat_data_information table.
   *
   * @param instaAccountName the blocked account name
   * @param instaProfileURL the url to the blocked profile
   * @param timestamp since the user blocks this account
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async addChatDataInformation(
    chat: string,
    yourMessages: number,
    monday: number,
    tuesday: number,
    wednesday: number,
    thursday: number,
    friday: number,
    saturday: number,
    sunday: number
  ) {
    await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      const sqlStatement = sql.insertIntoInstaChatDataInfoSQL;
      const values = [
        chat,
        yourMessages,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      ];
      await db.run(sqlStatement, values);
    });
  }

  /**
   * This async method selects all entries from the insta_chat_data_information table
   *
   * @returns an array of InstaChatDataInformation
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async getChatData(): Promise<InstaChatData[]> {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      const result = await db.query(sql.selectInstaChatDataInfo);
      return result.values as InstaChatData[];
    });
  }
}
