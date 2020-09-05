# OceanReport

## Extrernal Accounts
- Heroku
  - There are two seperate dynos(websites) for the test branch(svQuicker) and for the main report(master branch). 
  - Heroku's free dynos must sleep an avaerage of 7 hours a day [(read more about it here)](https://blog.heroku.com/app_sleeping_on_heroku) so it is activetly woken up every 30 minutes from 5am-9pm. Anytime between 9pm and 5am it will take longer to load the site as it has to have a 10-20s wake up delay unless someone else has pinged the report in the last 30 minutes. 
  - Currently both websites are being hosted on vanbrocklin@ucsb.edu's account. This can be chnaged in the future by creating another heroku account and then creating two new apps for each webiste. Setup instructions? 
- Cron-jobs
  - Used to ping the heroku app every 30 minutes to wake up the dyno
  - [cron-jobs website](https://cron-job.org/en/)
  - As of now the two cron-jobs to ping the main and test websites are run from the account under vanbrocklin@ucsb.edu but this can be changed in the future by creating an account at the webiste and then using the setup steps below. 
  - Picture of how to setup a new cron-job(all days and months are selected, hours 5-20 are seleted and minutes 0 and 30 are selected):
    ![cron-job form](/images/cron.png)
- Maybe: MongoDB Atlas
  - This was used in the test branch to upload the lastest data. A python script called reportUpdate.py can be run by a crontab or manually to update the mongodb data base every so often and then the test branch website will take the data from this data base which will decrease loading time, testing shows by about 1 second. 
  - Currently the python code and the test branch are connected to vanbrocklin@ucsb.edu's database. This can be changed in the future by setting up a mongodb account and creating a new collection with the document copied from the old account. After this you will have to edit the mongodb swr connection string in the .env and in the python code. 

## COASTLAB WP Site
- Report is on https://coastlab.eri.ucsb.edu/ucsb-ocean-report/ and the test is on https://coastlab.eri.ucsb.edu/time-testing-for-iframe/
- Both are added on using iframes with set heights, the heights have to be adjusted so the iframes do not internally scroll inside of the webpage. If the report is ever increased in length this height must be adjusted. Sometimes it won't look like it needs adjustment if you are just looking at the desktop site. You will have to access it on a mobile device (in both chrome and safari) to test in the internal scrolling is a problem. To test this load the report page and then try scrolling right on top of thr report. If the report scrolls but not the rest of the page then you must adjust the height of the iframe. This test is easiest to see at the top or bottom of the iframe on the page. 

## Report Resources and Request Links
- Wave and Wind Bouy Data for report and graphs histories: https://coastlab.sofarocean.com/historical/SPOT-0186
- Wave and Wind Data for graph predictions: https://marine.weather.gov/MapClick.php?w3=sfcwind&w3u=0&w10=swlp&w11=swlm&w12=swlp2&w13=swlm2&w14=wwh&w15=wvh&AheadHour=0&Submit=Submit&FcstType=digital&textField1=34.4001&textField2=-119.8461&site=all&unit=0&dd=&bw=&marine=1
- Second Wave Data for graph predictions and Wave Period predictions: http://cdip.ucsd.edu/m/forecast/?wave_model=socal&layer=waveHs
- Temp Data for reports and graph history: https://www.sccoos.org/data/autoss/timeline/?main=single&station=stearns_wharf
- Temp Data for graph predictions: https://catalog.data.gov/dataset/california-roms-forecast-3km
- Tide Data for reports and graph history and predictions: https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=9411340
