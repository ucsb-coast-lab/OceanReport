const url = require("url");

export async function getTide(reqNum, begin, end) {
  var link =
    "https://tidesandcurrents.noaa.gov/api/datagetter?" +
    "station=9411340" +
    "&datum=mllw" +
    "&units=english" +
    "&time_zone=gmt" +
    "&application=UCSB" +
    "&format=json";
  if (parseInt(reqNum) === 1) {
    link += "&date=latest" + "&product=water_level";
  } else if (parseInt(reqNum) > 1) {
    link +=
      "&product=predictions" + "&begin_date=" + begin + "&end_date=" + end;
  }
  if (parseInt(reqNum) === 2) {
    link += "&interval=hilo";
  }
  const response = await fetch(link, { method: "GET" });
  return await response.json();
}

export default async function performAction(req, res) {
  const queryObject = url.parse(req.url, true).query;

  switch (req.method) {
    case "GET": {
      var list = await getTide(
        queryObject.reqNum,
        queryObject.begin_date,
        queryObject.end_date
      );
      res.statusCode = 200;
      res.end(JSON.stringify(list));
      break;
    }
    default:
      res.statusCode = 405;
      res.end("Method not found");
  }
}
