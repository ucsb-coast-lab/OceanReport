import { initDatabase } from "../../utils/mongodb";

export async function getLatest() {
  const client = await initDatabase();
  const reports = client.collection("Reports");

  return reports.findOne();
}

export default async function performAction(req, res) {
  switch (req.method) {
    case "GET": {
      var latest = await getLatest();
      res.statusCode = 200;
      res.end(JSON.stringify(latest));
      break;
    }
    default:
      res.statusCode = 405;
      res.end("Method not found");
  }
}
