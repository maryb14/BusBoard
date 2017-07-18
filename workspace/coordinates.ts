import * as request from 'request'
import { BusStop } from './busStop'

export class Coordinates {
    constructor(public latitude: string, public longitude: string){ }
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
            var busStops: BusStop[] = [];
            for(var i = 0; i < latLongArray.stopPoints.length; ++i){
                busStops.push(new BusStop(latLongArray.stopPoints[i].naptanId, latLongArray.stopPoints[i].commonName + " " + latLongArray.stopPoints[i].indicator));
            }
            return busStops;
        });
    }
}