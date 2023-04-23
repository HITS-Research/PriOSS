import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
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
     * @param username the username of the user that should be added to the insta personal info table
     * @param email the email of the user that should be added to the insta personal info table
     * @param birthdate the birthdate of the user that should be added to the insta personal info table
     * @param gender the gender of the user that should be added to the insta personal info table
     * 
     * @author: Paul (pasch@mail.upb.de)
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
     * @param contactSyncing the information if the user uses contact syncinc that should be added to the insta account info table
     * @param firstCountryCode the first country code of the user that should be added to the insta account info table
     * @param hasSharedLiveVideo the information if the user has a shared live video that should be added to the insta account info table
     * @param lastLogin the timestamp of the last login of the user that should be added to the insta account info table
     * @param lastLogout the timestamp of the the last logout of the user that should be added to the insta account info table
     * @param firstStoryTime the timestamp of the first story time of the user that should be added to the insta account info table
     * @param lastStoryTime the timestamp of the last story time of the user that should be added to the insta account info table
     * @param firstCloseFriendsStoryTime the timestamp of the first story of a close friend of the user that should be added to the insta account info table
     * 
     * @author: Paul (pasch@mail.upb.de)
     */
    async addAccountInformation(contactSyncing: string, firstCountryCode: string, hasSharedLiveVideo: string, lastLogin: string, lastLogout: string, firstStoryTime: string, lastStoryTime: string, firstCloseFriendsStoryTime: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = insertIntoInstaAccountInfoSQL;
            let values = [contactSyncing, firstCountryCode, hasSharedLiveVideo, lastLogin, lastLogout, firstStoryTime, lastStoryTime, firstCloseFriendsStoryTime];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }

    /**
     * This async method adds professional information to the insta_professional_information table.
     * 
     * @author: Paul (pasch@mail.upb.de)
     * 
     * @param title the title of the professional information of the user that should be added to the insta professional info table
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
     * @param title the title of the profile change of the user that should be added to the insta profile changes table
     * @param changed the type of changes of the profile that should be added to the insta profile changes table
     * @param previous_value the prvious value of the profile that should be added to the insta profile changes table
     * @param new_value the new value of the profile that should be added to the insta profile changes table
     * @param change_date the timestamp of the change to the profile that should be added to the insta profile changes table
     */
    async addProfileChanges(title: string, changed: string, previous_value: string, new_value: string, change_date: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = insertIntoInstaProfileChangesSQL;
            let values = [title, changed, previous_value, new_value, change_date];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }
}