const url = require("url");

export async function getWaveRecord() {
  var link =
    "https://api.sofarocean.com/api/wave-data?spotterId=SPOT-0798&limit=96";
  const response = await fetch(link, {
    method: "GET",
    headers: { token: process.env.SPOT_TOKEN },
  });

  return await response.json();
}

export async function getWaveForecastCDIP() {
  var link =
    "https://thredds.cdip.ucsd.edu/thredds/dodsC/cdip/model/MOP_alongshore/B0391_forecast.nc.ascii?waveTime[0:1:79],waveHs[0:1:79],waveTp[0:1:79]";
  const response = await fetch(link, { method: "GET" });

  return await response.text();
}

export async function getWaveForecastNOAA() {
  var link =
    "https://marine.weather.gov/MapClick.php?lat=34.4001&lon=-119.8461&FcstType=digitalDWML";
  const response = await fetch(link, { method: "GET" });

  return await response.text();
}

export default async function performAction(req, res) {
  const queryObject = url.parse(req.url, true).query;

  switch (req.method) {
    case "GET": {
      switch (queryObject.dataType) {
        case "forecastCDIP": {
          var list = await getWaveForecastCDIP();
          res.statusCode = 200;
          res.end(list);
          break;
        }
        case "forecastNOAA": {
          var list = await getWaveForecastNOAA();
          res.statusCode = 200;
          res.end(list);
          break;
        }
        case "record": {
          var list = await getWaveRecord();
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
