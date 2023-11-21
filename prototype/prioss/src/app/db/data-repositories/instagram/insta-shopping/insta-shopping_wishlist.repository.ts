import { Injectable } from "@angular/core";
import { SQLiteDBConnection} from "@capacitor-community/sqlite";
import { DBService } from "../../../db.service";
import * as sql from "./insta-shopping_wishlist.sql";
import { InstaShoppingWishlistInfo } from "src/app/instagram/models/ShoppingInfo/InstaShoppingWishlistInfo";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";


/**
 * This class handles all communication with the database tables that are used in the InstaShopping Component.
 *
 * @author: Mayank (mayank@mail.upb.de)
 */
@Injectable()
export class InstaShoppingWishlistRepository extends BulkAddCapableRepository{

    constructor(dbService: DBService){
        super(sql.bulkAddInstaShoppingWishlistBaseSQL,
            sql.bulkAddInstaShoppingWishlistValuesSQL,
            sql.bulkAddValueConnectorForShoppingWishlist,
            dbService);
    }

    /**
     * This async method adds shopping information to the insta_shopping_wishlist table.
     *
     * @param merchantName the merchant/brand selling the product
     * @param productName the name of the product being sold
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async addShoppingWishlistInformation(merchantName: string, productName: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            const sqlStatement = sql.insertIntoInstaShoppingWishlistSQL;
            const values = [merchantName, productName];
            await db.run(sqlStatement, values);
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
    async startShoppingWishlistBulkAdd(merchantName: string, productName: string, totalRowCount: number, targetBulkSize = 500) {
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
    async addShoppingWishlistBulkEntry(merchantName: string, productName: string) : Promise<void> {
        return this.addBulkEntry([merchantName, productName]);
    }

    /**
     * This async method selects all entries from the insta_shopping_wishlist table
     *
     * @returns an array of InstaShoppingInfos
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getAllShoppingWishlistInfo(): Promise<InstaShoppingWishlistInfo[]>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            const result = await db.query(sql.selectInstaShoppingWishlistSQL);
            return result.values as InstaShoppingWishlistInfo[];
        });
    }

    /**
     * Queries the instagram shopping wishlist table to get the total merchant names present
     * @returns Total Merchant Count present
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getTotalMerchantCount(): Promise<number>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            const result = await db.query(sql.getTotalMerchantCountSQL);
            if(result.values) {
                const totalMerchantCount: number = result.values[0].totalMerchantCount;
                return totalMerchantCount;
            }
            else {
                throw Error('getTotalMerchantCount did not return anything!');
            }
        });
    }

    /**
     * Queries the instagram shopping wishlist table to get the total product names present
     * @returns Total Product Count present
     *
     * @author: Mayank (mayank@mail.upb.de)
     */
    async getTotalProductCount(): Promise<number>
    {
        return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
            const result = await db.query(sql.getTotalProductCountSQL);
            if(result.values) {
                const totalProductCount: number = result.values[0].totalProductCount;
                return totalProductCount;
            }
            else {
                throw Error('getTotalProductCount did not return anything!');
            }
        });
    }
}
