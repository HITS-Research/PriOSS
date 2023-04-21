import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../../services/db/db.service";
import { BulkAddCapableRepository } from "../general/inferences/bulk-add-capable.repository";

@Injectable()
class InstaAdsRepository extends BulkAddCapableRepository {
    constructor(dbService: DBService) {
        super('', '', '', dbService);
    }


    async startAdInterestBulkAdd(advertiseName: string, has_data_file_custom_audience: string, has_remarketing_custom_audience: string, has_in_person_store_visit: string, totalRowCount: number, targetBulkSize: number = 500) {

    }

    async addAdInterestBulkEntry(advertiseName: string, has_data_file_custom_audience: string, has_remarketing_custom_audience: string, has_in_person_store_visit: string) : Promise<void> {
        
    }
}