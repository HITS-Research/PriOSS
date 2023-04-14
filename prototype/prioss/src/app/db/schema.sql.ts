//import { capSQLiteSet } from '@capacitor-community/sqlite';

export const createSchema: string = `
CREATE TABLE IF NOT EXISTS spot_history (
    id INTEGER PRIMARY KEY,
    endTime TEXT NOT NULL,
    artistName TEXT NOT NULL,
    trackName TEXT NOT NULL,
    msPlayed INTEGER NOT NULL
);
`;
//PRAGMA user_version = 1;

export const dropSchema: string =`
DROP TABLE IF EXISTS spot_history;
`;
