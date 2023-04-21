import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../../services/db/db.service";
import { insertIntoInstaPersonalInfoSQL, insertIntoInstaAccountInfoSQL, insertIntoInstaProfessionalInfoSQL, insertIntoInstaProfileChangesSQL } from "./insta-personal.sql";

/**
 * This class handles all communication with the database tables that are used in the InstaPersonalInformation Component.
 * 
 * @author: Paul (pasch@mail.upb.de)
 */
@Injectable()
export class InstaPersonalRepository {

    constructor(private dbService: DBService){

    }

    /**
     * This async method adds personal information to the insta_personal_information table.
     * 
     * @author: Paul (pasch@mail.upb.de)
     * 
     * @param username 
     * @param email 
     * @param birthdate 
     * @param gender 
     */
    async addPersonalInformation(username: string, email: string, birthdate: string, gender: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = insertIntoInstaPersonalInfoSQL;
            let values = [username, email,  birthdate, gender];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }

    /**
     * This async method adds account information to the insta_account_information table.
     * 
     * @author: Paul (pasch@mail.upb.de)
     * 
     * @param contact_syncing 
     * @param first_country_code 
     * @param has_shared_live_video 
     * @param last_login 
     * @param last_logout 
     * @param first_story_time 
     * @param last_story_time 
     * @param first_close_friends_story_time 
     */
    async addAccountInformation(contact_syncing: string, first_country_code: string, has_shared_live_video: string, last_login: string, last_logout: string, first_story_time: string, last_story_time: string, first_close_friends_story_time: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = insertIntoInstaAccountInfoSQL;
            let values = [contact_syncing, first_country_code, has_shared_live_video, last_login, last_logout, first_story_time, last_story_time, first_close_friends_story_time];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }

    /**
     * This async method adds professional information to the insta_professional_information table.
     * 
     * @author: Paul (pasch@mail.upb.de)
     * 
     * @param title 
     */
    async addProfessionalInformation(title:string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = insertIntoInstaProfessionalInfoSQL;
            let values = [title];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }

    /**
     * This async method adds profile change infomration to the insta_profile_changes table.
     * 
     * @author: Paul (pasch@mail.upb.de)
     * 
     * @param title 
     * @param changed 
     * @param previous_value 
     * @param new_value 
     * @param change_date 
     */
    async addProfileChanges(title: string, changed: string, previous_value: string, new_value: string, change_date: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = insertIntoInstaProfileChangesSQL;
            let values = [title, changed, previous_value, new_value, change_date];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }
}