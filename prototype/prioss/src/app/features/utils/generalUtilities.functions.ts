import { Router } from "@angular/router";
import iconv from 'iconv-lite';
/**
  * This method returns a database object (key-value pair) as two entries in an array.
  * We can use this in the general-data.component.html to call *ngFor and iterate over all userdata key-value pairs
  *
  * @author: Max (maxy@mail.upb.de)
  *
  */ 
export function getObjectPairs(obj: object): [string, any][] {
    return Object.entries(obj);
  }

/**
 * Facebook has a bug in its encoding in the data export, so we need to fix it
 * @param string The string to fix
 * @returns 
 * @see https://stackoverflow.com/questions/57059821/fixing-facebook-json-encoding-in-node-js
 */
export function fixFacebookEncoding(string: string): string{
  return iconv.decode(iconv.encode(string, "latin1"), "utf8")
}
  /**
  * This method scrolls to the top of the page.
  * This is useful when navigating to an element at the start of the page, because it prevents the header from overlapping the element.
  *
  * @author: Paul (pasch@mail.upb.de)
  *
  */ 
export function scrollToTop():void {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}
/**
 * Iterate through every element in a complex json and apply the function to a value, if the value is a string
 * @param obj The object to iterate through
 * @param func The function to apply to the string
 */
export function modifyStringValuesInJSON(obj: any, func: (str: string) => string): any {
  if (typeof obj === 'string') {
    return func(obj);
  }
  if (typeof obj === 'object') {
    for (const key in obj) {
      obj[key] = modifyStringValuesInJSON(obj[key], func);
    }
  }
  return obj;
}
/**
  * This method calls an url with a router and scrolls to the top (see scrollToTop).
  *
  * @author: Paul (pasch@mail.upb.de)
  *
  */
export function navigateAndScroll(router: Router, url: string):void {
  router.navigateByUrl(url);
  scrollToTop();
}

/**
  * This method capitalizes the first letter of a word and removes '_' from strings.
  * used to capitalize the (non-capitalized) database entries (e.g. email -> Email, email_accound -> Email Account) 
  *
  * @author: Paul (pasch@mail.upb.de)
  *
  */ 
export function capitalizeAndPrettify(str: string) {
  let result = "";
  str.split('_').forEach(function (splitted) {
    result = result + ' ' + splitted.charAt(0).toUpperCase() + splitted.slice(1);
  });

  return result;
}

/**
 * This method is used to convert a string with the format YYYY-MM-DD (e.g. 1676140269 -> 2023-01-06)
 * 
 * @param str: the string to convert
 * @returns: a Date if the string is feasable
 * 
 * @author: Paul (pasch@mail.upb.de)
 * 
 */
export function convertTimestamp(str: string): any {
  //returns the given string if it is not convertible to a number.
  if (isNaN(parseInt(str))) {
    return str;
  }
  //returns 'na' if the timestamp is 0.
  if (str == '0') {
    return 'na';
  }

  const number: number = parseInt(str) * 1000;
  const date: Date = new Date(number);

  //returns a date in the format YYYY-MM-DD.
  //return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0');
  return date.getDate() + ' ' + date.toLocaleString('en-US', { month: 'long' }).substring(0,3) + ' ' + date.getFullYear() + ', ' + date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

/**
 * This method is used to fetch value for a key from json object while ignoring case sensitivity
 * 
 * @param jsonObj JSON object from which key value needs to be fetched
 * @param key Key for which the value needs to be fetched
 * @param time_value Boolean variable which choses whether to fetch value field or timestamp field
 * @returns The value of the key from the JSON object. Returns undefined if the key doesn't fetch
 * 
 * @author: Mayank (mayank@mail.upb.de)
 * 
 */
export function getValueIgnoreCase(jsonObj: any, key: string, time_value : boolean): any {
  const keys = Object.keys(jsonObj);
  for (const i in keys) {
    if (keys[i].toLowerCase() === key.toLowerCase()) {
      if(time_value) {
        if(jsonObj[keys[i]].timestamp != undefined) {
          return jsonObj[keys[i]].timestamp;
        } else if (jsonObj[keys[i]].value != undefined)
        return jsonObj[keys[i]].value;
      } else {
        return jsonObj[keys[i]].value;
      }
    }
  }
  return "Not Set"
}

/**
 * This method returns a database object (key-value pair) as two entries in an array.
 * Pairs with null values are excluded
 *
 *
 * @author: Jonathan (jvn@mail.upb.de), Max (maxy@mail.upb.de)
 *
 */
export function getObjectPairsNotNull(obj: object): [string, any][] {
  if (obj === null || obj === undefined) {
      return [];
    }
  return getObjectPairs(obj).filter( ([, v]) => v != null );
}

/**
* This method capitalizes the first letter of a string.
* used to capitalize the (non-capitalized) database entries (e.g. email -> Email)
*
* @author: Max (maxy@mail.upb.de)
*
*/
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
   * This method slice a dataset for the tables in 10 entrys per page
   *
   * @param data the dataset that sould be sliced
   * @param currentPage the current page of the dataset
   * @returns the sliced data
   * 
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
export function getSlicedData(data: Array<any>, currentPage: number) {
  const start = (currentPage - 1) * 10;
  const end = start + 10;
  return data.slice(start, end);
}