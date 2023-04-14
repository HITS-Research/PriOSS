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

export const spotHistoryByYearSQL: string = `
 with years as (select min(cast(strftime('%Y', endTime) as INTEGER)) year
                  from spot_history
                 union
                select year+1 
                  from years
                 where year < (select max(cast(strftime('%Y', endTime) as INTEGER))
                                 from spot_history))
 select y.year year, 
        ifnull(sum(msPlayed), 0) msPlayed
   from years y
   left join spot_history h
     on cast(strftime('%Y', h.endTime) as INTEGER) = y.year
  group by year
  order by year asc;
`;

export const spotHistoryByMonthSQL: string = `
with months as (select 1 month 
                 union 
                select month+1 
                  from months 
                 where month < 12),
      years as (select min(cast(strftime('%Y', endTime) as INTEGER)) year
                  from spot_history
                 union
                select year+1 
                  from years
                 where year < (select max(cast(strftime('%Y', endTime) as INTEGER))
                                 from spot_history))
 select y.year || '-' || m.month yearMonth, 
        y.year year, 
        m.month month,
        ifnull(sum(msPlayed), 0) msPlayed
   from months m
   left join years y
   left join spot_history h
     on cast(strftime('%m', h.endTime) as INTEGER) = m.month 
        AND cast(strftime('%Y', h.endTime) as INTEGER) = y.year
  group by yearMonth
  order by year asc, month ASC;
`;