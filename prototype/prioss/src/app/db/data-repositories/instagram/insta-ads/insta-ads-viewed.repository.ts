import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./insta-ads-viewed.sql";

@Injectable()
export class InstaAdsViewedRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddInstaAdsViewedBaseSQL, sql.bulkAddInstaAdsViewedValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    async startAdsViewedBulkAdd(title: string, timestamp: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([title, timestamp], totalRowCount, targetBulkSize);
    }

    async addAdsViewedBulkEntry(title: string, timestamp: string) : Promise<void> {
        return this.addBulkEntry([title, timestamp]);
    }
}