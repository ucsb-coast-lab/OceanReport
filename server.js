const { createServer } = require("https");
const { parse } = require("url");
const { readFileSync } = require("fs");
const next = require("next");

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: readFileSync("/etc/ssl/certs/__eri_ucsb_edu.key"),
  cert: readFileSync("/etc/ssl/certs/__eri_ucsb_edu_cert.cer"),
  // Dev Options
  //   key: readFileSync("./key.pem"),
  //   cert: readFileSync("./cert.pem")
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${port}`);
  });
});
