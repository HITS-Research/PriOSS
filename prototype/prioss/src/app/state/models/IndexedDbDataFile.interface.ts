import { FbUserDataModel } from "src/app/facebook/state/models";

export interface IndexedDbDataFile {
    timestamp: number;
    filename: string;
    sizeInBytes?: number;
    facebookData?: FbUserDataModel;
}