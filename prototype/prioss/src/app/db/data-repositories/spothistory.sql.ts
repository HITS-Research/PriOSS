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