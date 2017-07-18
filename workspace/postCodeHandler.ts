
import * as readline from 'readline'
import * as request from 'request'
import * as _ from "lodash"

import {Coordinates} from './coordinates'
import {PostCode} from './postCode'
import {BusStop} from './busStop'
import {Result} from './result'
import {Bus} from './bus'

export class PostCodeHandler {
    
    public handleUrlInput(urlPostcodeString: string):Promise<Result[]>{
        var postCodeObject = new PostCode(urlPostcodeString);
        let promiseCoordinates = postCodeObject.getCoordinates();
        return promiseCoordinates.then((coords: Coordinates) => {
            let promiseBusStops = coords.getStopPoints();
            return promiseBusStops.then((busStopsArray: BusStop[]) => {
                var promisesArray: Promise<Bus[]>[] = [];
                for(var i = 0; i < busStopsArray.length; ++i){
                    let promiseBuses = busStopsArray[i].getBuses();
                    promisesArray.push(promiseBuses);
                }
                return Promise.all(promisesArray).then(busesArrays => {
                    var resultsArray: Result[] = [];
                    for(var j = 0; j < busesArrays.length; ++j) {
                        if(busesArrays[j].length > 0) {
                            resultsArray.push(new Result(busStopsArray[j].name, busesArrays[j]));
                        }
                    }
                    return resultsArray;
                });
            });
        });
    }
        
    private handleUserInput(){
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        let promiseInputListCommand: Promise<string> = new Promise((resolve) => { 
            rl.question("Input a postcode\n", function(data) {
                resolve(data.toString());
                rl.close();
            });
        });
        promiseInputListCommand.then((inputString: string) => {
            var postCodeObject = new PostCode(inputString);
            let promiseCoordinates = postCodeObject.getCoordinates();
            promiseCoordinates.then((coords: Coordinates) => {
                let promiseBusStops = coords.getStopPoints();
                promiseBusStops.then((busStopsArray: BusStop[]) => {
                    for(var i = 0; i < busStopsArray.length; ++i){
                        let promiseBuses = busStopsArray[i].getBuses();
                        promiseBuses.then((busesArray) => {
                            for(var j = 0; j < busesArray.length; ++j){
                                var b: Bus = busesArray[j];
                                console.log(b.destination + " " + b.line + " " + b.timeToArrival);
                            }
                        });
                    }
                });
            });
        })
    }

    public run(urlString: string):Promise<Result[]> {
        return this.handleUrlInput(urlString);
    }
}

