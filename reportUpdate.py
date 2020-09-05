from IPython.core.interactiveshell import InteractiveShell
from pymongo import MongoClient

import requests       # For grabbing data via API
import json           # For parsing strings in json format
from datetime import datetime, timedelta, timezone
import pytz

from pathlib import Path #Need the path for reading in the json file when this is run as a script via cron

#FUNCTIONS
def convertTheta_to_Cardinal(theta):
    if (theta >= 45 and theta < 135):
        direction = 'east'
    elif (theta >= 135 and theta < 225):
        direction = 'south'
    elif (theta >= 225 and theta < 315):
        direction = 'west'
    else:
        direction = 'north'
    return direction

def print_time_date():
	timenow = datetime.now()
	print(f'TIME: %s:%s' % (timenow.hour,timenow.minute))
	print(f'Now: {rightnow:%Y}{rightnow:%m}{rightnow:%d}')
	print(f'tomorrow: {tomorrow:%Y}{tomorrow:%m}{tomorrow:%d}')
	return

def wind_wave_data(spotID, reports): #Get recent wave and wind data from a SPOTTER.
	# Assemble the wave report
	with open(str(Path().absolute()) + '/spot_token.json', 'r') as file: # Load credentials from json file

	    token = json.load(file)
	parameters = {'spotterId': spotID, 'limit': '0', 'includeWindData':'true'}
	response = requests.get('https://api.sofarocean.com/api/latest-data', 
	     headers={'token': token["SPOT_TOKEN"]},
             params=parameters)
	latest = response.json()  # parse out json structure
	latest = latest['data'] # move down to the wave data we want
	#latest
	spot_time = datetime.strptime(latest['waves'][-1]['timestamp'][:-1],'%Y-%m-%dT%H:%M:%S.%f') #Parse timestamp
	spot_time = spot_time.replace(tzinfo=timezone.utc) #localize
	#spot_utc = pytz.utc.localize(spot_time) ## We already localized in the line above
	spot_pst = spot_time.astimezone(pytz.timezone("America/Los_Angeles"))

	Hs = latest['waves'][-1]['significantWaveHeight']/0.3048 # Feet
	Tp = latest['waves'][-1]['peakPeriod']
	theta = latest['waves'][-1]['peakDirection']

	windspd = latest['wind'][-1]['speed']
	winddir = convertTheta_to_Cardinal(latest['wind'][-1]['direction'])

	# Assemble the wind report
	if (windspd < 2):
    		wind_str = f'Calm'	
	else: 
    		wind_str = f'From the {winddir} at {windspd} kts'
	wind_report = [wind_str]  # brackets let's us add mulitple entries (cells in matlab-speak)
	data = [
    	f'{spot_pst:%A}, {spot_pst:%B} {spot_pst.day} at {spot_pst:%I}:{spot_pst:%M} {spot_pst:%p}',  
    	f'{Hs:.1f} ft @ {Tp:.0f} secs from {theta:.0f}º',
    	*wind_report]
	reports.extend(data)

def tide_data(reports): #Get a tide prediction from NOAA
    parameters = {'station':'9411340',
	          'begin_date':'20191107', 
	          'end_date':f'{tomorrow:%Y}{tomorrow:%m}{tomorrow:%d}',
	          'time_zone':'gmt',  # could be lst_ldt
	          'product':'predictions',
	          'units':'english',
	          'datum':'mllw',
	          'application':'UCSB',
	          'interval':'hilo',
	          'format':'json'}
    response = requests.get('https://tidesandcurrents.noaa.gov/api/datagetter',
	         params=parameters)
    tide = response.json() 
    
    #Find the next two relevant tides
    tide_predictions = [] #This gets expanded later with *tide_predictions
    n_pred = 0
    for prediction in tide['predictions']:
        pheight = float(prediction['v'])
        prediction_time = datetime.strptime(prediction['t'],'%Y-%m-%d %H:%M')
        prediction_time = prediction_time.replace(tzinfo=timezone.utc)
        fromnow = prediction_time - rightnow
        if (fromnow.days > -1) and (n_pred < 2):
            if (n_pred < 1):
                pnext = pheight
    
            n_pred = n_pred + 1 
	        
            if (round(fromnow.seconds/3600,1) > 1):
                plural = 's'
            else:
                plural = ''
		    
            pt = prediction_time.astimezone(pytz.timezone("America/Los_Angeles"))
            hilo = 'LO'
            if(prediction['type'] == 'H'):
                hilo = 'HI'
            tide_str = f'{hilo}: {pheight:.1f} ft @ {pt:%I}:{pt:%M} {pt:%p}'
            tide_predictions = tide_predictions + [tide_str]
								    
    parameters = {'station':'9411340',
	          'date':'latest', 
	          'time_zone':'gmt', 
	          'product':'water_level',
	          'units':'english',
	          'datum':'mllw',
	          'application':'UCSB',
	          'format':'json'}
    response = requests.get('https://tidesandcurrents.noaa.gov/api/datagetter',
	         params=parameters)
    noaa_latest = response.json()  
    
    tide_height = float(noaa_latest['data'][0]['v'])
    tide_time = datetime.strptime(noaa_latest['data'][0]['t'],'%Y-%m-%d %H:%M')
    tide_time = tide_time.replace(tzinfo=timezone.utc)

    rising = True
    if (pnext > tide_height):
        tideis =  'and rising'   #'\U0001F4C8'
    else:
        tideis = 'and falling'  #'\U0001F4C9' 
        rising = False
    
    tide_age = rightnow - tide_time
    
    data2=[
        f'Tide: {tide_height:.1f} ft {tideis}',
        *tide_predictions]
    reports.extend(data2)

    return rising

def temp_data(reports):
    before = rightnow - timedelta(days=2)
    daysAgo = before.strftime("%Y")+"-"+before.strftime("%m")+"-"+before.strftime("%d")
    today = rightnow.strftime("%Y")+"-"+rightnow.strftime("%m")+"-"+rightnow.strftime("%d")
    url = "https://erddap.sccoos.org/erddap/tabledap/autoss.json?time%2Ctemperature&station=%22stearns_wharf%22&time%3E=" + daysAgo + "T00%3A00%3A00Z&time%3C" + today + "T23%3A59%3A59Z&orderBy(%22time%22)"
    response = requests.get(url).json()
    recent = len(response['table']['rows'])-1
    far = response['table']['rows'][recent][1] * (9.0 / 5.0) + 32
    temp = [f'Water Temp: {far:.1f} ºF']
    reports.extend(temp)

def getWaveData(waveData, waveData2, waveData3, waveDates):
    with open(str(Path().absolute()) + '/spot_token.json', 'r') as file: 
        token = json.load(file)
    parameters = {'spotterId': spotID, 'limit': '96', 'includeWindData':'true'}
    response = requests.get('https://api.sofarocean.com/api/wave-data', 
	    headers={'token': token["SPOT_TOKEN"]},
        params=parameters)
    latest = response.json()
    waves = latest['data']['waves']
    print(waves)
    for wave in waves:
        print(wave['timestamp'])
        # waveTime = datetime.set(wave.timestamp)

# def getWindData(windData, windData2, windDates):

    
# def getPeriodData(periodData, periodData2, periodDates):


# def getTempData(tempData, tempDates):


# def getTideData(tideData, tideData2, tideDates):



#MAIN
InteractiveShell.ast_node_interactivity = "all" #Set the shell to show all output, instead of last result

spotID = 'SPOT-0186' 
rightnow = datetime.now(timezone.utc) # We need the current time for placing some observations in context. 
tomorrow = rightnow + timedelta(days=1) # Also, we'll use 'tomorrow' to get the tide predictions

reports=[]
wind_wave_data(spotID, reports)
rising = tide_data(reports)
temp_data(reports)
print(reports)

waveData = []
waveData2 = []
waveData3 = []
waveDates = []
getWaveData(waveData, waveData2, waveData3, waveDates)

# windData = []
# windData2 = []
# windDates = []
# getWindData(windData, windData2, windDates)

# periodData = []
# periodData2 = []
# periodDates = []
# getPeriodData(periodData, periodData2, periodDates)

# tempData = []
# tempDates = []
# getTempData(tempData, tempDates)

# tideData = []
# tideData2 = []
# tideDates = []
# getTideData(tideData, tideData2, tideDates)

mongo_client = MongoClient('mongodb+srv://admin:A5PfXpnUwdPAsSet@cluster0-q6lfj.mongodb.net/test?retryWrites=true&w=majority')
db = mongo_client["COASTLAB"]
col = db["Reports"]
col.update_one(
    {}, {"$set" : {
        "date" : reports[0],
        "wave" : reports[1],
        "wind" : reports[2],
        "tide" : reports[3],
        "hi" : reports[4],
        "lo" : reports[5],
        "rising" : rising,
        "temp" : reports[6],
        # "waveChart" : waveData,
        # "waveChart2" : waveData2,
        # "waveChart3" : waveData3,
        # "waveDates" : waveDates,
        # "windChart" : windData,
        # "windChart2" : windData2,
        # "windDates" : windDates,
        # "periodChart" : periodData,
        # "perioddChart2" : periodData2,
        # "perioddDates" : periodDates,
        # "tempChart" : tempData,
        # "tempDates" : tempDates,
        # "tideChart" : tideData,
        # "tideChart2" : tideData2,
        # "tideDates" : tideDates
}})