class UnixDateStringifier {
  constructor(date) {
    this.date = date;
  }

  static getTime(unixTimestamp) {
    // Turning unix timestamp into a nicely formatted string
    const date = new Date(unixTimestamp * 1000);
    var dateString = "";

    // If number of hours in the date is zero, append another zero to the end to get e.g. 00:30 rather than 0:30
    if (date.getUTCHours() === 0) {
      dateString += date.getUTCHours() + "0";
    } else if (date.getUTCHours() > 0 && date.getUTCHours() < 10) {
      dateString += "0" + date.getUTCHours();
    } else {
      dateString += date.getUTCHours();
    }

    dateString += ":";

    // If number of minutes in the date is zero, append another zero to the end to get e.g. 12:00 rather than 12:0
    if (date.getUTCMinutes() === 0) {
      dateString += date.getUTCMinutes() + "0 ";
    } else if (date.getUTCMinutes() > 0 && date.getUTCMinutes() < 10) {
      dateString += "0" + date.getUTCMinutes();
    } else {
      dateString += date.getUTCMinutes();
    }

    return dateString;
  }

  static getFullDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    var dateString = this.getTime(unixTimestamp);
    return (dateString +=
      " " +
      date.getUTCDate() +
      "/" +
      (date.getUTCMonth() + 1) +
      "/" +
      date.getUTCFullYear());
  }

  static getFullDateForCalendar(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    var dateString = "";
    dateString += date.getUTCFullYear();
    dateString += "-";
    // If month in the date is zero, append another zero to the end to get e.g. 00 rather than 0
    if (date.getUTCMonth() === 0) {
      dateString += date.getUTCHours() + "0";
    } else if (date.getUTCMonth() > 0 && date.getUTCMonth() < 10) {
      dateString += "0" + date.getUTCMonth();
    } else {
      dateString += date.getUTCMonth();
    }
    dateString += "-";
    dateString += date.getUTCDate();
    dateString += "T";
    // If number of hours in the date is zero, append another zero to the end to get e.g. 00:30 rather than 0:30
    if (date.getUTCHours() === 0) {
      dateString += date.getUTCHours() + "0";
    } else if (date.getUTCHours() > 0 && date.getUTCHours() < 10) {
      dateString += "0" + date.getUTCHours();
    } else {
      dateString += date.getUTCHours();
    }
    dateString += ":";
    // If number of minutes in the date is zero, append another zero to the end to get e.g. 12:00 rather than 12:0
    if (date.getUTCMinutes() === 0) {
      dateString += date.getUTCMinutes() + "0 ";
    } else if (date.getUTCMinutes() > 0 && date.getUTCMinutes() < 10) {
      dateString += "0" + date.getUTCMinutes();
    } else {
      dateString += date.getUTCMinutes();
    }

    return dateString;
  }
}

export default UnixDateStringifier;
