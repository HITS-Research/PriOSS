/**
  * Returns a string from the given time in milliseconds that presents the time in a human readable format
  * 
  * @param ms: the time to be formatted as a number in milliseconds
  *
  * @author: Simon (scg@mail.upb.de)
  *
  */
export function formatDisplayTime(ms: number) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysms = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = ms % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 1000));
  const minutesms = ms % (60 * 1000);
  const sec = Math.floor(minutesms / 1000);

  if (days > 0) {
    return days + "d " + String(hours).padStart(2, '0') + "h " + String(minutes).padStart(2, '0') + "m " + String(sec).padStart(2, '0') + "s";
  }
  else if (hours > 0) {
    return hours + "h " + String(minutes).padStart(2, '0') + "m " + String(sec).padStart(2, '0') + "s";
  }
  else {
    return minutes + "m " + String(sec).padStart(2, '0') + "s";
  }
}