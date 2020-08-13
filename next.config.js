require("dotenv").config();

function mongodb_uri() {
  return process.env.MONGODB_URI;
}

module.exports = {
  env: {
    SPOT_TOKEN: process.env.SPOT_TOKEN,
    MONGODB_URI: mongodb_uri(),
  },
};
