import { GranularityEnum } from "./granularity.enum";

/**
 * Trims a date down to the given granularity. This means that a Date's elements (e.g. month, day, hour, minute, ...) that are smaller than the given granularity will be nulled
 * For example: Trimming the date 2023-03-25 11:05p.m. down to the month would result in the date 2023:03-01 00:00p.m.
 * 
 * @param date The date to be trimmed down
 * @param trimTo The last element of the date that should still have its original value instead of being nulled
 * @returns The trimmed down date
 * 
 * @author: Simon (scg@mail.upb.de)
 */
export function trimDate(date: Date, trimTo: GranularityEnum) {
  let dateYear: number = date.getFullYear();
  let dateMonth: number = date.getMonth();
  let dateDay: number = date.getDate();
  let dateHour: number = date.getHours();

  let resultDate: Date = new Date();

  switch (trimTo) {
    case GranularityEnum.Year:
      resultDate = new Date(dateYear, 0, 1, 0, 0, 0, 0);
      break;
    case GranularityEnum.Month:
      resultDate = new Date(dateYear, dateMonth, 1, 0, 0, 0, 0);
      break;
    case GranularityEnum.Day:
      resultDate = new Date(dateYear, dateMonth, dateDay, 0, 0, 0, 0);
      break;
    case GranularityEnum.Hour:
      resultDate = new Date(dateYear, dateMonth, dateDay, dateHour, 0, 0, 0);
      break;
    default:
      throw new Error("unknown trimming strim passed to trimDate function");
  }

  return resultDate;
}

/**
* Parses a dateString in the format 'YYYY-MM-DD HH:MI' to a Date object
* 
* @param dateString the date string in the format 'YYYY-MM-DD HH:MI'
* @returns The parsed date object defined by the given dateString
* 
* @author: Simon (scg@mail.upb.de)
*/
export function parseDate(dateString: string) {
  let dateParts = dateString.split(" ");
  let date = dateParts[0].split("-");
  let time = dateParts[1].split(":");

  //Month is decremented by one because in a date object, the month is 0-indexed
  return new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), parseInt(time[0]), parseInt(time[1]));
}