import { FbUserDataModel } from "../state/models";

export interface FacebookDataFile {
    timestamp: number;
    filename: string;
    sizeInBytes?: number;
    facebookData?: FbUserDataModel;
}