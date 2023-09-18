import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { DBService } from '../../../../services/db/db.service';
import * as sql from './insta-chat-partner-data.sql';
import { InstaChatPartnerData } from 'src/app/models/Instagram/MessageInfo/InstaChatData';
import { BulkAddCapableRepository } from '../../general/inferences/bulk-add-capable.repository';
/**
 * This class handles all communication with the database tables that are used in the InstaFollower Component.
 *
 * @author: Melina (kleber@mail.uni-paderborn.de)
 */
@Injectable()
export class InstaChatPartnerDataRepository extends BulkAddCapableRepository {
  constructor(dbService: DBService) {
    super(
      sql.bulkAddChatPartnerDataBaseSQL,
      sql.bulkAddChatPartnerDataValuesSQL,
      sql.bulkAddValueConnector,
      dbService
    );
  }

  async bulkChatPartnerData(
    chatPartnerData: InstaChatPartnerData[],
    chat_id: number
  ) {
    const totalRowCount = chatPartnerData.length;
    const firstChatData = chatPartnerData.pop();
    if (firstChatData == undefined) {
      return;
    }
    this.startChatPartnerDataBulkAdd(firstChatData, chat_id, totalRowCount, 50);
    chatPartnerData.forEach((chatData) => {
      this.addChatPartnerDataBulkEntry(chatData, chat_id);
    });
    this.finishBulkEntry();

    // (sender,
    //     messages,
    //     avg,
    //     text,
    //     share,
    //     audio,
    //     photos,
    //     monday,
    //     tuesday,
    //     wednesday,
    //     thursday,
    //     friday,
    //     saturday,
    //     sunday,
    //   ),
    //   totalRowCount,
    //   targetBulkSize
    // );
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
  async startChatPartnerDataBulkAdd(
    chatPartnerData: InstaChatPartnerData,
    chat_id: number,
    totalRowCount: number,
    targetBulkSize = 500
  ) {
    this.startBulkAdd(
      [
        chatPartnerData.sender,
        chatPartnerData.messages,
        chatPartnerData.avg,
        chatPartnerData.text,
        chatPartnerData.share,
        chatPartnerData.audio,
        chatPartnerData.photos,
        chatPartnerData.monday,
        chatPartnerData.tuesday,
        chatPartnerData.wednesday,
        chatPartnerData.thursday,
        chatPartnerData.friday,
        chatPartnerData.saturday,
        chatPartnerData.sunday,
        chat_id,
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
  async addChatPartnerDataBulkEntry(
    chatPartnerData: InstaChatPartnerData,
    chat_id: number
  ): Promise<void> {
    return this.addBulkEntry([
      chatPartnerData.sender,
      chatPartnerData.messages,
      chatPartnerData.avg,
      chatPartnerData.text,
      chatPartnerData.share,
      chatPartnerData.audio,
      chatPartnerData.photos,
      chatPartnerData.monday,
      chatPartnerData.tuesday,
      chatPartnerData.wednesday,
      chatPartnerData.thursday,
      chatPartnerData.friday,
      chatPartnerData.saturday,
      chatPartnerData.sunday,
      chat_id,
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
  async addChatPartnerDataInformation(
    sender: string,
    messages: number,
    avg: number,
    text: number,
    share: number,
    audio: number,
    photos: number,
    monday: number,
    tuesday: number,
    wednesday: number,
    thursday: number,
    friday: number,
    saturday: number,
    sunday: number
  ) {
    await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      const sqlStatement = sql.insertIntoChatPartnerDataInfoSQL;
      const values = [
        sender,
        messages,
        avg,
        text,
        share,
        audio,
        photos,
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
   * @returns an array of InstaChatPartnerDataInformation
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async getChatPartnerData(): Promise<InstaChatPartnerData[]> {
    return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      const result = await db.query(sql.selectChatPartnerDataInfo);
      return result.values as InstaChatPartnerData[];
    });
  }
}
