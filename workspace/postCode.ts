import  { Coordinates } from './coordinates'

const request = require('request')

export class PostCode {
    getCoordinates(): Promise<Coordinates> {
        let promisePostCode: Promise <string> = new Promise((resolve) => {
            var requestString = "https://api.postcodes.io/postcodes/" + this.code 
            request(requestString, function (error, response, body) {
              resolve(body); 
            });
        });
        return promisePostCode.then((bodyString: string) => {
            var postcodeArray = JSON.parse(bodyString);
            var coords = new Coordinates(postcodeArray.result.latitude.toString(), postcodeArray.result.longitude.toString());
            return coords;
        });
    }
    
    constructor(public code: string){

    }

    /* doThing(): void {
        let coordinatePromise = this.getCoordinates();
        coordinatePromise.then((coords) => {
            console.log(coords);
        })
    }*/
}