const request = require('request')
import {Bus} from './bus'
import * as _ from "lodash"

export class BusStop {
    constructor(public id: string, public name: string) {
    }
    getBuses(): Promise <Bus[]> {
        let promiseLatAndLong: Promise <string> = new Promise((resolve) => {
        var requestString = "https://api.tfl.gov.uk/StopPoint/" + 
            this.id + "/Arrivals?app_id=ef0cca24&app_key=281fde5472478ee61c2d8a63c5e4f554"
            request(requestString, function (error, response, body) {
                resolve(body); 
            });
        });

        return promiseLatAndLong.then((bodyString: string) => {
            var latLongArray = JSON.parse(bodyString);
            var busesArray = [];
            var busesArrayFromJSON = [];
            busesArrayFromJSON = JSON.parse(bodyString);
            busesArrayFromJSON = _.sortBy(busesArrayFromJSON, (bus) => {
                return bus.timeToStation;
            });
            for(var i = 0; i < 5 && i < busesArrayFromJSON.length; ++i){
                busesArray.push(new Bus(busesArrayFromJSON[i].lineId, busesArrayFromJSON[i].timeToStation, busesArrayFromJSON[i].destinationName));
            }
            return busesArray;
        });
    }
}