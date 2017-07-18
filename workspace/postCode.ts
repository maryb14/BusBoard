import  { Coordinates } from './coordinates'
import * as request from 'request'

export class PostCode {
    constructor(public code: string) { }
    getCoordinates(): Promise<Coordinates> {
        let promisePostCode: Promise <string> = new Promise((resolve) => {
            var requestString = "https://api.postcodes.io/postcodes/" + this.code 
            request(requestString, (error, response, body) => {
              resolve(body); 
            });
        });
        return promisePostCode.then((bodyString: string) => {
            var postcodeArray = JSON.parse(bodyString);
            var coords = new Coordinates(postcodeArray.result.latitude.toString(), postcodeArray.result.longitude.toString());
            return coords;
        });
    }
}