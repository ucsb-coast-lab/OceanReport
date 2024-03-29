# OceanReport

This application compiles ocean data from stations and bouys in the Southern California area to create a report that displays the latest wave, wind, temp, and tide conditions at UCSB Campus Point. It also uses this tracked data in addition to some predictive models to create 3-day plots for wave height, wind speed, wave period, temperature, and tide. These graphs display 2-days of recorded data followed by 1 day of predicted behavior. This application is currently hosted on Heroku and can be viewed on its main url or at the Coast Lab website where it can be seen on the [UCSB Ocean Report](https://coastlab.eri.ucsb.edu/ucsb-ocean-report/) page being displayed with an iframe. The application is written using [next.js](https://nextjs.org/docs)/[react](https://reactjs.org/docs/getting-started.html) which utilize html and javascript to create a webpage. The application has one main page (index.jsx) which sets up all of the data for the reports and passes it into the two components (both of which are in the components folder) that make the page which are the Report (report.jsx) and the Graphs (graphs.jsx). In the styles folder there is a styles.module.css file that has the styling for everything on the main page. The secrets for this code, which at the moment is only the spot token and the BASE_URL, are kept in a separate .env file that is not included on the github. This is done to protect the secrets. Inorder to run this code on a local machine you will have to not only download the code but also add a .env folder with the following lines of code `SPOT_TOKEN=YourSpotTokenHere` and `BASE_URL=SITE_URL` replacing YourSpotTokenHere with the API key for a sofar spot buoy and SITE_URL with the url of the site that is hosting the appilcation, for development this url would be https://localhost:3000. If this is spelled incorrectly including case sensitivity, then the next.config.js file will not be able to configure the token for use before the app is run which will make some of the data requests fail.

We are currently getting data from the SPOT-1097. Other buoys include SPOT-0798 and SPOT-0186. To change this we use the same spot token because all the buoys are on the same account and we just change the spot id in the api requests for wave, wind, and temp. The links in README.md, index.jsx, and report.jsx.

## Developer Tools

### Local Deployment

- setup ssl certificates using mkcert by following the instructions [here](https://web.dev/how-to-use-local-https/)
- setup .env file with `SPOT_TOKEN=YourSpotTokenHere` and `BASE_URL=https://localhost:3000`
- run
  - npm install
  - npm run dev
- application should be running on https://localhost:3000

### Storybook

- run storybook on localhost:6006 by running `npm run storybook`

### Jest Testing and Code Coverage

- run jest tests with `npm run test`
- run coverage report with `npm run coverage`
- to get a more detailed coverage report run the command above and then open OceanReport/coverage/Icov-report/index.html in a web browser

## Server Deployment

- Connect to UCSB VPN with Pulse Secure
- run
  - `ssh coastlab@sylk.eri.ucsb.edu`
  - Use the password for the Coast Lab ERI functional account(This can be obtained from a Coast Lab admin)
- Once logged in navigate to the OceanReport directory by running `cd ../coast/ocean-report/OceanReport`
- Typically the repo there should be the most recent version of master
- You can use git commands to pull any branch that you would like deployed
- If the new branch needs to install dependancies then run `NODE_ENV=production npm install` (this will not install dependancies for testing)
- To deploy the new branch you just pulled run
  - `npm run build` to build this new deployment
  - `sudo systemctl restart ocean-report` to restart the server and srtart up the new build
  - `sudo systemctl status ocean-report` to check the status of the server and ensure it deployed correctly

## Maintenance Branch

- This branch informs the user that the buoy is under maintence which means it is out of the water or not working properly.
- Whenever a major changes get added to master or right before this branch is being deployed it should be rebased on the mster branch
- To do this:
  - `git checkout maintenance`
  - `git pull origin maintenance`
  - `git merge master`
  - `npm install` (fixes conflicts in package-lock.json)
  - resolve other conflicts if needed, the only difference bewtween maintence and master should be the one `<h1>` tag at the top of the index page.
  - then add/commit/push changes to maintenance

## COASTLAB WP Site

- Report is on https://coastlab.eri.ucsb.edu/ucsb-ocean-report/ and the test is on https://coastlab.eri.ucsb.edu/time-testing-for-iframe/ (private page that only WP admins can see)
- Both are added on using iframes with set heights, the heights have to be adjusted so the iframes do not internally scroll inside of the webpage. If the report is ever increased in length this height must be adjusted. Sometimes it won't look like it needs adjustment if you are just looking at the desktop site. You will have to access it on a mobile device (in both chrome and safari) to test if the internal scrolling is a problem. To test this load the report page and then try scrolling right on top of the report. If the report scrolls but not the rest of the page then you must adjust the height of the iframe. This test is easiest to see at the top or bottom of the iframe on the page.

## Report Resources and Request Links

- Wave, Wind, and Temp Buoy Data for report and graphs histories: https://coastlab.sofarocean.com/historical/SPOT-1097
  - Sofar API Documentation: https://coastlab.sofarocean.com/api
- Wave and Wind Data for graph predictions: http://cdip.ucsd.edu/m/forecast/?wave_model=socal&layer=waveHs
  - OPeNDAP Access Form: https://thredds.cdip.ucsd.edu/thredds/dodsC/cdip/model/MOP_alongshore/B0391_forecast.nc.html
- Second Wave Data for graph predictions and Wave Period predictions: https://marine.weather.gov/MapClick.php?w3=sfcwind&w3u=0&w10=swlp&w11=swlm&w12=swlp2&w13=swlm2&w14=wwh&w15=wvh&AheadHour=0&Submit=Submit&FcstType=digital&textField1=34.4001&textField2=-119.8461&site=all&unit=0&dd=&bw=&marine=1
  - XML request URL: https://marine.weather.gov/MapClick.php?lat=34.4001&lon=-119.8461&FcstType=digitalDWML
- Temp Data for graph predictions: https://sccoos.org/
  - OPeNDAP Access Form Catalog: https://sccoos.org/thredds/catalog/roms-fcst/2021/catalog.html
- Tide Data for reports and graph history and predictions: https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=9411340
  - NOAA Tides and Currents API Documentation: https://api.tidesandcurrents.noaa.gov/api/prod/
