import { Injectable } from "@angular/core";
import { SQLiteDBConnection} from "@capacitor-community/sqlite";
import { DBService } from "../../../db.service";
import * as sql from "./userdata.sql";
import { insertIntoUserdata } from "./userdata.sql";
import { UserdataEntry } from "src/app/framework/models/userdata/userdataEntry";

/**
 * This class handles data that is inserted into and extracted from the userdata table. The Table is mainly used for the General-Data visualization.
 *
 * @author: Max (maxy@mail.upb.de)
 */
@Injectable()
export class UserdataRepository {

    constructor(private dbService: DBService){

    }

    /**
     * This async method adds all userdata to the userdata table.
     *
     * @author: Max (maxy@mail.upb.de)
     *
     * @param username
     * @param email
     * @param country
     * @param birthdate
     * @param gender
     * @param postalCode
     * @param mobileNumber
     * @param mobileOperator
     * @param mobileBrand
     * @param creationTime Time of Date at which the account was created
     */
    async addUserdata(username: string, email: string, country: string, birthdate: string, gender: string, postalCode: number, mobileNumber: number, mobileOperator: string, mobileBrand: string, creationTime: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            const sqlStatement = insertIntoUserdata;
            const values = [username, email, country, birthdate, gender, postalCode, mobileNumber, mobileOperator, mobileBrand, creationTime];

            await db.run(sqlStatement, values);
          });
    }

    /**
     * This async method fetches all entries in the userdata table.
     *
     * @author: Max (maxy@mail.upb.de)
     *
     */
    async getAllUserdata() : Promise<UserdataEntry[]> {
      return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

        const result = await db.query(sql.selectAllUserdata);
        return result.values as UserdataEntry[];

      });
    }
  }
