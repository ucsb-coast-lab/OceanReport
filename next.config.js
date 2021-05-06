//This file is run during the building off the application
//It configures the sercets from the .env file
require("dotenv").config();

module.exports = {
  env: {
    SPOT_TOKEN: process.env.SPOT_TOKEN,
    BASE_URL: process.env.BASE_URL,
  },
};
