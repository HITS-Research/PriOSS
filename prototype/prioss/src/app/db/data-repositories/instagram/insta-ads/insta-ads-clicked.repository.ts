import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./insta-ads-clicked.sql";

@Injectable()
export class InstaAdsClickedRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddInstaAdsClickedBaseSQL, sql.bulkAddInstaAdsClickedValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    async startAdsClickedBulkAdd(title: string, timestamp: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([title, timestamp], totalRowCount, targetBulkSize);
    }

    async addAdsClickedBulkEntry(title: string, timestamp: string) : Promise<void> {
        return this.addBulkEntry([title, timestamp]);
    }
}