const url = require("url");

export async function getTempRecord() {
  var link =
    "https://api.sofarocean.com/api/wave-data?spotterId=SPOT-1097&includeSmartMooringData=true";
  // "https://api.sofarocean.com/api/wave-data?spotterId=SPOT-0798&includeSmartMooringData=true";
  const response = await fetch(link, {
    method: "GET",
    headers: { token: process.env.SPOT_TOKEN },
  });

  return await response.json();
}

export async function getTempForecast(date) {
  var link =
    "https://sccoos.org/thredds/dodsC/roms-fcst/2021/ca_subCA_fcst_" +
    date +
    "03.nc.ascii?temp[3:1:52][0:1:0][103:1:103][255:1:255]";
  const response2 = await fetch(link, { method: "GET" });

  return await response2.text();
}

export default async function performAction(req, res) {
  const queryObject = url.parse(req.url, true).query;

  switch (req.method) {
    case "GET": {
      switch (queryObject.dataType) {
        case "forecast": {
          var list = await getTempForecast(queryObject.date);
          res.statusCode = 200;
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
