//this function is given a floating point number and an integer percision and returns that floating point number
//rounded to however many percision points after the decimal
export function round(number, precision) {
  var shift = function (number, exponent) {
    var numArray = ("" + number).split("e");
    return +(
      numArray[0] +
      "e" +
      (numArray[1] ? +numArray[1] + exponent : exponent)
    );
  };
  return shift(Math.round(shift(number, +precision)), -precision);
}

//this function converts any given time from 24hr to 12hr time and removes leading zeros
export function timeConv(time) {
  if (parseInt(time.substring(0, 2)) < 12) {
    time = time + " AM";
  } else {
    time = time + " PM";
  }
  if (time.substring(0, 2) === "00" || time.substring(0, 2) === "12") {
    time = "12" + time.substring(2, 8);
  } else {
    time = (parseInt(time.substring(0, 2)) % 12) + time.substring(2, 8);
  }
  return time;
}

//this function formats the sunrise and sunset data that is given in UTC to PST
export function formatRiseSet(data, sunTimes, dateOffset) {
  let date = new Date(); //create new datetime object and set its hours, minutes, seconds and date for sunrise
  date.setDate(date.getDate() + dateOffset - 1); //adjust day
  date.setUTCHours(
    data.results.sunrise.substring(0, data.results.sunrise.indexOf(":"))
  );
  if (
    data.results.sunrise.substr(data.results.sunrise.length - 2, 2) === "PM" &&
    data.results.sunrise.substring(0, data.results.sunrise.indexOf(":")) != "12"
  ) {
    date.setUTCHours(date.getUTCHours() + 12); //if PM then adjust 12 hours forward
  }
  date.setUTCMinutes(
    data.results.sunrise.substr(data.results.sunrise.indexOf(":") + 1, 2)
  );
  date.setUTCSeconds(
    data.results.sunrise.substr(data.results.sunrise.length - 5, 2)
  );
  sunTimes[(2 + dateOffset) * 2] = date.getTime(); //set first sunrise

  //reset hours, minutes, seconds and date for sunset
  date = new Date();
  date.setDate(date.getDate() + dateOffset - 1);
  date.setUTCHours(
    data.results.sunset.substring(0, data.results.sunset.indexOf(":"))
  );
  date.setUTCHours(date.getUTCHours() + 12);
  if (
    parseInt(
      data.results.sunset.substring(0, data.results.sunset.indexOf(":"))
    ) < 12
  ) {
    date.setUTCHours(date.getUTCHours() + 12);
  }
  date.setUTCMinutes(
    data.results.sunset.substr(data.results.sunset.indexOf(":") + 1, 2)
  );
  date.setUTCSeconds(
    data.results.sunset.substr(data.results.sunset.length - 5, 2)
  );
  sunTimes[(2 + dateOffset) * 2 + 1] = date.getTime();
}

//this function uses a dateOffset 0 being today and returns the year, month and day in yyyy, mm, dd format
export function formatDate(dateOffset) {
  const dateTime = new Date();
  dateTime.setDate(dateTime.getDate() + dateOffset);
  let date = { year: "", month: "", day: "" };
  date.year = dateTime.getFullYear().toString();
  let month = dateTime.getMonth() + 1;
  let m = "00" + month;
  date.month = m.substr(m.length - 2); //2 digit month
  let day = dateTime.getDate();
  let d = "00" + day;
  date.day = d.substr(d.length - 2); //2 digit date
  return date;
}
