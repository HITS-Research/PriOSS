import { capSQLiteSet } from '@capacitor-community/sqlite';
export const createSchema: string = `
CREATE TABLE IF NOT EXISTS spot_history (
    id INTEGER PRIMARY KEY,
    endTime TEXT NOT NULL,
    artistName TEXT NOT NULL,
    trackName TEXT NOT NULL,
    msPlayed INTEGER NOT NULL
);

PRAGMA user_version = 1;
`;

export const dropSchema: string =`
DROP TABLE IF EXISTS spot_history;
`;

export const insertIntoSpotHistorySQL: string = `
  insert into spot_history 
  (endTime, artistName, trackName, msPlayed)
  values 
  (?, ?, ?, ?);
`;

export const insertTestHistory: string = `
insert into spot_history 
(endTime, artistName, trackName, msPlayed)
values 
('2021-07-19 12:46', 'CRO', 'NICE!', 152000);

insert into spot_history 
(endTime, artistName, trackName, msPlayed)
values 
('2021-11-19 13:07', 'CRO', 'DIAMONDS', 83085);
`;

export const selectAllSpotHistory: string = `
 select id
        endTime, 
        artistName, 
        trackName, 
        msPlayed 
   from spot_history;
`;

/*
// Insert some Users
const row: Array<Array<any>> = [
  ['Whiteley', 'Whiteley.com', 30.2],
  ['Jones', 'Jones.com', 44],
];
export const twoUsers: string = `
DELETE FROM users;
INSERT INTO users (name,email,age) VALUES ("${row[0][0]}","${row[0][1]}",${row[0][2]});
INSERT INTO users (name,email,age) VALUES ("${row[1][0]}","${row[1][1]}",${row[1][2]});
`;
*/