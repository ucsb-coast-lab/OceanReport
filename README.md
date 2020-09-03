# OceanReport

## Extrernal Accounts
- Heroku
  - seperate dynos for test branch(svQuicker) and main report(master branch)
  - Heroku free dynos must sleep an avaerage of 7 hours a day (read here https://blog.heroku.com/app_sleeping_on_heroku) so it is activetly woken up every 30 minutes from 5am-9pm. Anytime between 9pm and 5am it will take longer to load the site as it has to have a 10-20s wake up delay unless someone else has pinged the report in the last 30 minutes. 
- Cron-jobs
  -used to ping report every 30 minutes to wake up the dyno
- Maybe: MongoDB Atlas
  - used in the test branch to upload the lastest data. A python script (reportUpdate.py) can be run by a crontab to update the mongodb data base every so often and then the test branch will take the data from this data base which will increase the load speed, testing shows by about 1 second. 

## COASTLAB WP Site
- Report is on    page and the test is on   page
- Both are added on using iframes with set heights, the heights have to be adjusted to the iframes do not internally scroll inside of the webpage. If the report is every increased in length this heightmust be adjusted. It will not seem like it will need to be adjusted just looking at the desktop site. You will have to access it on a mobile device (in both chrome and safari) to test in the internal scrolling is a problem. To test this load the report page and then try scrolling right on top of thr report. If the report scrolls but not the rest of the page then you must adjust the height of the iframe. This test is easiest to see at the top or bottom of the iframe on the page. 

## Report Resources and Request Links
-
