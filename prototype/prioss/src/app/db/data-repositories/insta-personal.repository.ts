import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../services/db/db.service";
import { insertIntoInstaPersonalInfoSQL, insertIntoInstaAccountInfoSQL, insertIntoInstaProfessionalInfoSQL, insertIntoInstaProfileChangesSQL } from "./insta-personal.sql";

@Injectable()
export class InstaPersonalRepository {

    constructor(private dbService: DBService){

    }

    async addPersonalInformation(username: string, email: string, birthdate: string, gender: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = insertIntoInstaPersonalInfoSQL;
            let values = [username, email,  birthdate, gender];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }

    async addAccountInformation(contact_syncing: string, first_country_code: string, has_shared_live_video: string, last_login: string, last_logout: string, first_story_time: string, last_story_time: string, first_close_friends_story_time: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = insertIntoInstaAccountInfoSQL;
            let values = [contact_syncing, first_country_code, has_shared_live_video, last_login, last_logout, first_story_time, last_story_time, first_close_friends_story_time];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }

    async addProfessionalInformation(title:string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = insertIntoInstaProfessionalInfoSQL;
            let values = [title];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }

    async addProfileChanges(title: string, changed: string, previous_value: string, new_value: string, change_date: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = insertIntoInstaProfileChangesSQL;
            let values = [title, changed, previous_value, new_value, change_date];
      
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }
}