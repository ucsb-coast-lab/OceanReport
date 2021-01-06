const url = require("url");

export async function getTempRecord(begin, end) {
  var link =
    "https://erddap.sccoos.org/erddap/tabledap/autoss.json" +
    "?time%2Ctemperature&station=%22stearns_wharf" +
    "%22&time%3E=" +
    begin +
    "T00%3A00%3A00Z&time%3C" +
    end +
    "T23%3A59%3A59Z&orderBy(%22time%22)";

  const response = await fetch(link, { method: "GET" });
  return await response.json();
}

export async function getTempForecast(daysAgo, tomorrow) {}

export default async function performAction(req, res) {
  const queryObject = url.parse(req.url, true).query;

  switch (req.method) {
    case "GET": {
      switch (queryObject.dataType) {
        case "forecast": {
          var list = await getTempForecast();
          res.statusCode = 200;
          res.end(list);
          break;
        }
        case "record": {
          var list = await getTempRecord(
            queryObject.begin_date,
            queryObject.end_date
          );
          res.statusCode = 200;
          res.end(JSON.stringify(list));
          break;
        }
        default:
          res.statusCode = 405;
          res.end("data type not found");
      }
      break;
    }
    default:
      res.statusCode = 405;
      res.end("Method not found");
  }
}
