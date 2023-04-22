import { Injectable } from "@angular/core";
import { DBService } from "../../../../services/db/db.service";
import { BulkAddCapableRepository } from "../../general/inferences/bulk-add-capable.repository";
import * as sql from "./insta-ads-interest.sql"

@Injectable()
export class InstaAdsInterestRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super(sql.bulkAddInstaAdsInterestsBaseSQL, sql.bulkAddInstaAdsInterestsValuesSQL, sql.bulkAddValueConnector, dbService);
    }

    async startAdInterestBulkAdd(interest: string, totalRowCount: number, targetBulkSize: number = 500) {
        this.startBulkAdd([interest], totalRowCount, targetBulkSize);
    }

    async addAdInterestBulkEntry(interest: string) : Promise<void> {
        return this.addBulkEntry([interest]);
    }
}