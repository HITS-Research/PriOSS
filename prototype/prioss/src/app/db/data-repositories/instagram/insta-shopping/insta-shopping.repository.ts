import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import * as sql from "./insta-shopping.sql";
import { InstaShoppingInfo } from "src/app/models/Instagram/ShoppingInfo/InstaShoppingInfo";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";


/**
 * This class handles all communication with the database tables that are used in the InstaShopping Component.
 * 
 * @author: Mayank (mayank@mail.upb.de)
 */
@Injectable()
export class InstaShoppingRepository extends BulkAddCapableRepository{
    
    constructor(dbService: DBService){
        super(sql.bulkAddInstaShoppingBaseSQL, 
            sql.bulkAddInstaShoppingValuesSQL, 
            sql.bulkAddValueConnectorForShopping, 
            dbService);
    }

    /**
     * This async method adds shopping information to the insta_shopping table.
     * 
     * @param merchantName the merchant/brand selling the product 
     * @param productName the name of the product being sold
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addShoppingInformation(merchantName: string, productName: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            let sqlStatement = sql.insertIntoInstaShoppingSQL;
            let values = [merchantName, productName];
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }

    /**
     * Starts a bulk-add run that adds multiple rows from subsequent addShoppingBulkEntry-Calls to the DB in a single SQL statement.
     * 
     * @param merchantName the merchant/brand selling the product 
     * @param productName the name of the product being sold
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async startShoppingBulkAdd(merchantName: string, productName: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([merchantName, productName], totalRowCount, targetBulkSize);
    }

    /**
     * Adds a row to the Instagram Shopping table as part of a bulk-add run
     * 
     * @param merchantName the merchant/brand selling the product 
     * @param productName the name of the product being sold
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addShoppingBulkEntry(merchantName: string, productName: string) : Promise<void> {
        return this.addBulkEntry([merchantName, productName]);
    }

    /**
     * This async method selects all entries from the insta_shopping table
     * 
     * @returns an array of InstaShoppingInfos
     * 
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getAllShoppingInfo(): Promise<InstaShoppingInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            let result = await db.query(sql.selectInstaShoppingSQL);
            return result.values as InstaShoppingInfo[];
        });
    }

    /**
     * Queries the instagram shopping table to get the total merchant names present
     * @returns Total Merchant Count present
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getTotalMerchantCount(): Promise<number>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            let result = await db.query(sql.getTotalMerchantCountSQL);
            if(result.values) {
                let totalMerchantCount: number = result.values[0].totalMerchantCount;
                return totalMerchantCount;
            }
            else {
                throw Error('getTotalMerchantCount did not return anything!');
            }
        });
    }

    /**
     * Queries the instagram shopping table to get the total product names present
     * @returns Total Product Count present
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getTotalProductCount(): Promise<number>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            let result = await db.query(sql.getTotalProductCountSQL);
            if(result.values) {
                let totalProductCount: number = result.values[0].totalProductCount;
                return totalProductCount;
            }
            else {
                throw Error('getTotalProductCount did not return anything!');
            }
        });
    }
}