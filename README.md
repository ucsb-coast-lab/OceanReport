# OceanReport

This application compiles ocean data from stations and bouys in the Southern California area to create a report that displays the latest wave, wind, temp, and tide conditions at UCSB Campus Point. It also uses this tracked data in addition to some predictive models to create 3-day plots for wave height, wind speed, wave period, temperature, and tide. These graphs display 2-days of recorded data followed by 1 day of predicted behavior. This application is currently hosted on Heroku and can be viewed on its main url or at the Coast Lab website where it can be seen on the [UCSB Ocean Report](https://coastlab.eri.ucsb.edu/ucsb-ocean-report/) page being displayed with an iframe. The application is written using [next.js](https://nextjs.org/docs)/[react](https://reactjs.org/docs/getting-started.html) which utilize html and javascript to create a webpage. The application has one main page (index.jsx) which sets up all of the data for the reports and passes it into the two components (both of which are in the components folder) that make the page which are the Report (report.jsx) and the Graphs (graphs.jsx). In the styles folder there is a styles.module.css file that has the styling for everything on the main page. The secrets for this code, which at the moment is only the spot token, are kept in a separate .env file that is not included on the github. This is done to protect the secrets. Inorder to run this code on a local machine you will have to not only download the code but also add a .env folder with the following line of code `SPOT_TOKEN=YourSpotTokenHere` no quotes around the spot token. If this is spelled incorrectly including case sensitivity, then the next.config.js file will not be able to configure the token for use before the app is run which will make some of the data requests fail. If you are using the test branch with the python code you will also have to add a file called spot_token.json with the following code in it `{ "SPOT_TOKEN": "YourSpotTokenHere" }` make sure the token is in quotes.

## External Accounts

### Heroku

- There are two seperate dynos(websites) for the test branch(svQuicker) and for the main report(master branch).
  - Main application website url: https://ucsb-ocean-report.herokuapp.com/
  - Test application website url: https://ucsb-ocean-report-qa.herokuapp.com/
- Heroku's free dynos must sleep an average of 7 hours a day [(read more about it here)](https://medium.com/better-programming/keeping-my-heroku-app-alive-b19f3a8c3a82) so it is actively woken up every 30 minutes from 5am-9pm. Anytime between 9pm and 5am it will take longer to load the site as it has to have a 10-20s wake up delay, unless someone else has pinged the report in the last 30 minutes.
- Currently both websites are being hosted on vanbrocklin@ucsb.edu's account. This can be changed in the future by creating another heroku account and then creating two new apps for each website.
  - To setup a new heroku account go to [here](https://signup.heroku.com/t/platform?c=70130000001xDpdAAE&gclid=EAIaIQobChMI4uus34ff6wIVgT6tBh1XmwHXEAAYASAAEgIsnvD_BwE) and sign up for a free account. Then in your new accounts homepage, in the top right, you will want to click "new" and then "create new app". Name the application and then go to the deploy tab of this application. Under the deploy tab select gitHub as the deployment method and then sign into your gitHub. After that you will want to connect the ucsb-coast-lab/OceanReport repository and deploy the master branch. After this you just need to go to the settings tab and set up the spot token in your configure vars as shown below. 
  ![config vars](/images/convars.png)
  - If you would like the test site to be running as well you can do the same setup as above but instead of deploying master you can deploy the test branch, svQuicker. 
- A third application is also run on heroku and it is used to bypass the cors fetch block on certain requests. If a request fails because of a cors block then adding the url of this website before the request will allow it to bypass the cors system. To learn more about this issue or for information on how to set up your own cors proxy refer to [this page](https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9). Currently the url for the cors proxy is https://stormy-cove-43362.herokuapp.com/.

### Cron-jobs

- Used to ping the heroku app every 30 minutes to wake up the dyno
- [cron-jobs website](https://cron-job.org/en/)
- As of now the two cron-jobs to ping the main and test websites are run from the account under vanbrocklin@ucsb.edu but this can be changed in the future by creating an account at the website and then setting up two cron-jobs for each heroku site with the settings below.
- Picture of how to setup a new cron-job(all days and months are selected, hours 5-20 are selected and minutes 0 and 30 are selected):
  ![cron-job form](/images/cron.png)

### Maybe: MongoDB Atlas

- This was used in the test branch to upload the latest data. A python script called reportUpdate.py can be run by a crontab or manually to update the mongodb database every so often and then the test branch website will take the data from this database which will decrease loading time, testing shows by about 1 second.
- Currently the python code and the test branch are connected to vanbrocklin@ucsb.edu's database. This can be changed in the future by setting up a mongodb account and creating a new collection with the document copied from the old account. After this you will have to edit the mongodb swr connection string in the .env and in the python code.

## COASTLAB WP Site

- Report is on https://coastlab.eri.ucsb.edu/ucsb-ocean-report/ and the test is on https://coastlab.eri.ucsb.edu/time-testing-for-iframe/ (private page that only WP admins can see)
- Both are added on using iframes with set heights, the heights have to be adjusted so the iframes do not internally scroll inside of the webpage. If the report is ever increased in length this height must be adjusted. Sometimes it won't look like it needs adjustment if you are just looking at the desktop site. You will have to access it on a mobile device (in both chrome and safari) to test if the internal scrolling is a problem. To test this load the report page and then try scrolling right on top of the report. If the report scrolls but not the rest of the page then you must adjust the height of the iframe. This test is easiest to see at the top or bottom of the iframe on the page.

## Report Resources and Request Links

- Wave and Wind Buoy Data for report and graphs histories: https://coastlab.sofarocean.com/historical/SPOT-0186
  - Sofar API Documentation: https://coastlab.sofarocean.com/api
- Wave and Wind Data for graph predictions: http://cdip.ucsd.edu/m/forecast/?wave_model=socal&layer=waveHs
  - OPeNDAP Access Form: https://thredds.cdip.ucsd.edu/thredds/dodsC/cdip/model/MOP_alongshore/B0391_forecast.nc.html
- Second Wave Data for graph predictions and Wave Period predictions: https://marine.weather.gov/MapClick.php?w3=sfcwind&w3u=0&w10=swlp&w11=swlm&w12=swlp2&w13=swlm2&w14=wwh&w15=wvh&AheadHour=0&Submit=Submit&FcstType=digital&textField1=34.4001&textField2=-119.8461&site=all&unit=0&dd=&bw=&marine=1
  - XML request URL: https://marine.weather.gov/MapClick.php?lat=34.4001&lon=-119.8461&FcstType=digitalDWML
- Temp Data for reports and graph history: https://www.sccoos.org/data/autoss/timeline/?main=single&station=stearns_wharf
  - tabledap Data Access Form: https://erddap.sccoos.org/erddap/tabledap/autoss.html
- Temp Data for graph predictions: https://catalog.data.gov/dataset/california-roms-forecast-3km
  - OPeNDAP Access Form: http://west.rssoffice.com:8080/thredds/dodsC/roms/CA3km-forecast/CA/ca_subCA_fcst_2020083103.nc.html
- Tide Data for reports and graph history and predictions: https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=9411340
  - NOAA Tides and Currents API Documentation: https://api.tidesandcurrents.noaa.gov/api/prod/
