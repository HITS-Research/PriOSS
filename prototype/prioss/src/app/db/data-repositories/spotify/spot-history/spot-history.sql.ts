export const insertIntoSpotHistorySQL = `
  insert into spot_history
  (endTime, artistName, trackName, msPlayed)
  values
  (?, ?, ?, ?);
`;

export const bulkAddSpotHistoryBaseSQL = `
  insert into spot_history
  (endTime, artistName, trackName, msPlayed)
`;

export const bulkAddSpotHistoryValuesSQL = `
  select ?, ?, ?, ?
`;

export const bulkAddValueConnector = `
union all
`;

export const insertTestHistory = `
insert into spot_history
(endTime, artistName, trackName, msPlayed)
values
('2021-07-19 12:46', 'CRO', 'NICE!', 152000);

insert into spot_history
(endTime, artistName, trackName, msPlayed)
values
('2021-11-19 13:07', 'CRO', 'DIAMONDS', 83085);
`;

export const selectAllSpotHistory = `
 select id,
        endTime,
        artistName,
        trackName,
        msPlayed
   from spot_history;
`;

export const spotMinListenedToArtistSQL = `
 select artistName, sum(msPlayed)/60000 as minPlayed
 from spot_history
 where (? <= strftime('%Y-%m-%d', endtime) and strftime('%Y-%m-%d', endtime) <= ?)
 group by artistName
 having (minPlayed > 0)
 order by minPlayed desc;
`;

export const spotListeningHistoryOfArtistSQL = `
 select endTime, trackName, msPlayed/1000 as secPlayed
 from spot_history
 where (? <= strftime('%Y-%m-%d', endtime) and strftime('%Y-%m-%d', endtime) <= ? and artistName = ? and secPlayed > 10)
 order by endTime asc;
`;

export const spotMinListenedToSongSQL = `
 select artistName, trackName, sum(msPlayed)/60000 as minPlayed
 from spot_history
 where (? <= strftime('%Y-%m-%d', endtime) and strftime('%Y-%m-%d', endtime) <= ?)
 group by artistName, trackName
 having (minPlayed > 0)
 order by minPlayed desc;
`;

export const spotListeningHistoryOfSongSQL = `
 select endTime, msPlayed/1000 as secPlayed
 from spot_history
 where (? <= strftime('%Y-%m-%d', endtime) and strftime('%Y-%m-%d', endtime) <= ? and artistName = ? and trackName = ? and secPlayed > 10)
 order by endTime asc;
`;

export const spotHistoryByYearSQL = `
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

export const spotHistoryByMonthSQL = `
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
 select y.year || '-' ||substr('00'|| m.month, -2, 2) yearMonth,
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

export const spotHistoryByDaySQL = `
with days as (select 1 day
               union
              select day+1
                from days
               where day < 31),
months as (select 1 month
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
 select y.year || '-' || substr('00'|| m.month, -2, 2) || '-' || substr('00'|| d.day, -2, 2) date,
        y.year year,
        m.month month,
        d.day day,
        ifnull(sum(msPlayed), 0) msPlayed
   from years y
   left join months m
   left join days d
     on d.day <= cast(strftime('%d', DATE(
                                  y.year || '-' || substr('00'|| m.month, -2, 2) || '-01',
                                  '+1 month',
                                  '-1 day')) as INTEGER)
  left join spot_history h
    on (cast(strftime('%m', h.endTime) as INTEGER) = m.month
        and cast(strftime('%Y', h.endTime) as INTEGER) = y.year
        and cast(strftime('%d', h.endTime) as INTEGER) = d.day)
  where (? <= strftime('%Y-%m-%d', date) and strftime('%Y-%m-%d', date) <= ?)
  group by date
  order by year asc, month asc, day asc;
`;

export const spotHistoryByHourSQL = `
with hours as (select 0 hour
                 from spot_history
                union
               select hour+1
                 from hours
                where hour < 24)
 select substr('00'|| t.hour, -2, 2) || ':00' displayHour,
        t.hour hour,
        ifnull(sum(msPlayed), 0) msPlayed
   from hours t
   left join spot_history h
     on strftime('%H', h.endTime) = substr('00'|| t.hour, -2, 2)
  where strftime('%Y-%m-%d', h.endTime) = ? or h.endTime is NULL
  group by hour
  order by hour asc;
`;

export const spotHistoryForSingleHourSQL = `
 select trackName,
        artistName,
        --strftime('%Y-%m-%d %H:%M:%f', endTime) endTime,
        trackName || ' - ' || artistName label, 
        (strftime('%s', endTime)*1000 - ifnull(msPlayed, 0))  startTimeMs,
        ifnull(msPlayed, 0) msPlayed,
        strftime('%s', endTime)*1000 endTimeMs
        --? inputStartTime,
        --? inputEndTime
            --strftime('%Y-%m-%d %H:%M:%f', endTime) endTimeDate,
            --strftime('%s', endTime) endTimeSeconds,
   from spot_history
  --where artistName = 'DJ Antoine'
  where endTimeMs >= ? and startTimeMs <= ?
  order by startTimeMs asc;
`;

export const spotHistoryMostRecentDaySQL = `
select max(strftime('%Y-%m-%d', endTime)) date
  from spot_history
`;

export const spotHistoryFirstDaySQL = `
select min(strftime('%Y-%m-%d', endTime)) date
  from spot_history
`;
