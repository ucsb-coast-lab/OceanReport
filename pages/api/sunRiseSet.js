const url = require("url");

export async function getRiseSet(date) {
  var link =
    "https://api.sunrise-sunset.org/json?lat=34.4001&lng=-119.8461&date=" +
    date;
  const response = await fetch(link, { method: "GET" });
  return await response.json();
}

export default async function performAction(req, res) {
  const queryObject = url.parse(req.url, true).query;

  switch (req.method) {
    case "GET": {
      var list = await getRiseSet(queryObject.date);
      res.statusCode = 200;
      res.end(JSON.stringify(list));
      break;
    }
    default:
      res.statusCode = 405;
      res.end("Method not found");
  }
}
