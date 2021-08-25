const url = require("url");

export async function getTempRecord() {
  var link =
    "https://api.sofarocean.com/api/wave-data?spotterId=SPOT-0798&includeSmartMooringData=true";
  const response = await fetch(link, {
    method: "GET",
    headers: { token: process.env.SPOT_TOKEN },
  });

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
          res.statusCode = 503;
          res.end(list);
          break;
        }
        case "record": {
          var list = await getTempRecord();
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
