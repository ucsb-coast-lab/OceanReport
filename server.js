const { createServer } = require("https");
const { parse } = require("url");
const { readFileSync } = require("fs");
const next = require("next");

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

var httpsOptions;
if (dev) {
  httpsOptions = {
    key: readFileSync("./localhost-key.pem"),
    cert: readFileSync("./localhost.pem"),
  };
} else {
  httpsOptions = {
    key: readFileSync("/etc/ssl/certs/__eri_ucsb_edu.key"),
    cert: readFileSync("/etc/ssl/certs/__eri_ucsb_edu_cert.cer"),
  };
}

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${port}`);
  });
});
