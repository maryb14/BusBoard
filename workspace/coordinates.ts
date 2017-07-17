const request = require('request')

import { BusStop } from './busStop'

export class Coordinates {
    latitude: string;
    longitude: string;

    constructor(lat: string, lon: string){
        this.latitude = lat; 
        this.longitude = lon;
    }
    getStopPoints(): Promise <BusStop[]> {
        let promiseLatAndLong: Promise <string> = new Promise((resolve) => {
            var requestString = "https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&lat="+
                this.latitude + "&lon=" + this.longitude //+ "?app_id=ef0cca24&app_key=281fde5472478ee61c2d8a63c5e4f554"
            request(requestString, function (error, response, body) {
                resolve(body); 
            });
        });

        return promiseLatAndLong.then((bodyString: string) => {
            var latLongArray = JSON.parse(bodyString);
           //console.log(latLongArray.stopPoints);
            var busStops: BusStop[] = [];
            for(var i = 0; i < latLongArray.stopPoints.length; ++i){
                busStops.push(new BusStop(latLongArray.stopPoints[i].naptanId, latLongArray.stopPoints[i].commonName + " " + latLongArray.stopPoints[i].indicator));
            }
            return busStops;
        });
    }
}