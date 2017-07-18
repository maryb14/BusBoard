import * as request from 'request'
import * as _ from "lodash"
import {Bus} from './bus'

export class BusStop {
    constructor(public id: string, public name: string) { }
    getBuses(): Promise <Bus[]> {
        let promiseLatAndLong: Promise <string> = new Promise((resolve) => {
            var requestString = "https://api.tfl.gov.uk/StopPoint/" + 
                this.id + "/Arrivals?app_id=ef0cca24&app_key=281fde5472478ee61c2d8a63c5e4f554";
            request(requestString, (error, response, body) => {
                resolve(body); 
            });
        });

        return promiseLatAndLong.then((bodyString: string) => {
            return this.getBusesArray(bodyString);
        });
    }
    private getBusesArray(bodyString: string): Bus[] {
        var latLongArray = JSON.parse(bodyString);
        var busesArrayFromJSON = [];
        busesArrayFromJSON = JSON.parse(bodyString);
        busesArrayFromJSON = _.sortBy(busesArrayFromJSON, (bus) => {
            return bus.timeToStation;
        });
        var shortenedBusesArrayFromJSON = busesArrayFromJSON.slice(0, 5);
        var busesArray = _.map(shortenedBusesArrayFromJSON,(busFromJson) => {
            return new Bus(busFromJson.lineId, busFromJson.timeToStation, busFromJson.destinationName);
        });
            
        
        return busesArray;
    }
}