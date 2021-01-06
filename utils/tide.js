import { round, timeConv, formatDate } from "../utils/format.js";

const current = new Date(); //Datetime object set to today
const tomorrow = formatDate(1);
const dayAfterTomorrow = formatDate(2);
const dayBeforeYesterday = formatDate(-2);
const twoDaysBefore = formatDate(-3);

async function getTideReport() {
  let tomorrowURLFormat = tomorrow.year + tomorrow.month + tomorrow.day;
  let dayBeforeYesterdayURLFormat =
    dayBeforeYesterday.year + dayBeforeYesterday.month + dayBeforeYesterday.day;

  //Setting hi and lo for report
  const response = await fetch(
    `/api/tide?reqNum=2&begin_date=` +
      dayBeforeYesterdayURLFormat +
      `&end_date=` +
      tomorrowURLFormat,
    { method: "GET" }
  );
  const data = await response.json();

  let t_pred = {};
  let n_pred = 0;
  let hiloTimes = [];
  let k = 0;

  data.predictions.map((prediction) => {
    //loops through predictions and puts each as prediction
    let time = new Date(
      prediction.t.substring(0, 10) +
        "T" +
        prediction.t.substring(11, 16) +
        ":00Z"
    );
    if (
      time.getTime() < current.getTime() + 86400000 &&
      time.getTime() > current.getTime() - 259200000
    ) {
      hiloTimes[k] = time; //recording hi and low time for 3-days ago through tomorrow for use in the graph
      k++;
    }
    if (time.getTime() > current.getTime() && n_pred < 2) {
      //gathering 2 data points that will be the next hi and low on the report
      t_pred[n_pred] = prediction;
      n_pred++;
    }
  });

  //This is where it is determined if the the tide is high or low and it sets the string to be displayed
  let first, second;
  if (t_pred[0].type === "H") {
    first = "HI: ";
    second = "LO: ";
  } else {
    first = "LO: ";
    second = "HI: ";
  }
  let height = round(parseFloat(t_pred[0].v), 1);
  let height2 = round(parseFloat(t_pred[1].v), 1);
  let time1 = new Date(
    t_pred[0].t.substring(0, 10) + "T" + t_pred[0].t.substring(11, 16) + ":00Z"
  );
  let time2 = new Date(
    t_pred[1].t.substring(0, 10) + "T" + t_pred[1].t.substring(11, 16) + ":00Z"
  );
  let t1 = timeConv(time1.toString().substring(16, 21));
  let t2 = timeConv(time2.toString().substring(16, 21));
  first += height + " ft @ " + t1;
  second += height2 + " ft @ " + t2;

  const response2 = await fetch(`/api/tide?reqNum=1`, { method: "GET" });
  const data2 = await response2.json();

  let currTide = "Tide: " + round(parseFloat(data2.data[0].v), 1) + " ft and ";
  let rising;
  if (data2.data[0].v < t_pred[0].v) {
    currTide += "rising";
    rising = true; //this variable is used during rendering to choose the right tide icon
  } else {
    currTide += "falling";
    rising = false;
  }

  let tideData = { tide: currTide, rising: rising, hi: first, lo: second };
  return tideData;
}

async function getTideGraph() {
  let tomorrowURLFormat = tomorrow.year + tomorrow.month + tomorrow.day;
  let dayAfterTomorrowURLFormat =
    dayAfterTomorrow.year + dayAfterTomorrow.month + dayAfterTomorrow.day;
  let dayBeforeYesterdayURLFormat =
    dayBeforeYesterday.year + dayBeforeYesterday.month + dayBeforeYesterday.day;
  let twoDaysBeforeURLFormat =
    twoDaysBefore.year + twoDaysBefore.month + twoDaysBefore.day;

  //Setting hi and lo for report
  const response = await fetch(
    `/api/tide?reqNum=2&begin_date=` +
      dayBeforeYesterdayURLFormat +
      `&end_date=` +
      tomorrowURLFormat,
    { method: "GET" }
  );
  const data = await response.json();

  // let t_pred = {};
  // let n_pred = 0;
  let hiloTimes = [];
  let k = 0;

  data.predictions.map((prediction) => {
    // //loops through predictions and puts each as prediction
    let time = new Date(
      prediction.t.substring(0, 10) +
        "T" +
        prediction.t.substring(11, 16) +
        ":00Z"
    );
    if (
      time.getTime() < current.getTime() + 86400000 &&
      time.getTime() > current.getTime() - 259200000
    ) {
      hiloTimes[k] = time; //recording hi and low time for 3-days ago through tomorrow for use in the graph
      k++;
    }
  });

  const res = await fetch(
    `/api/tide?reqNum=3&begin_date=` +
      twoDaysBeforeURLFormat +
      `&end_date=` +
      dayAfterTomorrowURLFormat,
    { method: "GET" }
  );
  const data3 = await res.json();

  let tideData = []; //Graph history data
  let tideDate = []; //Labels
  let i = 0;
  let tideData2 = []; //Graph predicted data
  let j = 0;

  data3.predictions.map((prediction) => {
    //looping through each prediction in predictions
    let time = new Date(
      prediction.t.substring(0, 10) +
        "T" +
        prediction.t.substring(11, 16) +
        ":00Z"
    );
    if (
      time.getTime() <= current.getTime() &&
      time.getTime() > current.getTime() - 259200000
    ) {
      tideData[i] = { x: time.getTime(), y: prediction.v };
      tideDate[i] = "";
      if (time.getTime() >= hiloTimes[j]) {
        //Labels only inlcude hilo times
        tideDate[i] =
          hiloTimes[j].toString().substring(4, 10) +
          ", " +
          timeConv(hiloTimes[j].toString().substring(16, 21));
        j++;
      }
      i++;
    } else if (
      time.getTime() < current.getTime() + 86400000 &&
      time.getTime() > current.getTime()
    ) {
      tideData2[i] = { x: time.getTime(), y: prediction.v };
      tideDate[i] = "";
      if (time.getTime() >= hiloTimes[j]) {
        tideDate[i] =
          hiloTimes[j].toString().substring(4, 10) +
          ", " +
          timeConv(hiloTimes[j].toString().substring(16, 21));
        j++;
      }
      i++;
    }
  });

  let graphData = {
    tideRecord: tideData,
    tideForecast: tideData2,
    dateLabels: tideDate,
  };
  return graphData;
}

export { getTideReport, getTideGraph };
