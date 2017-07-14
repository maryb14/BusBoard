
const readline = require('readline');
const request = require('request');

import * as _ from "lodash"

export class Template {

    private handleOutput(busesArray){
        for(var i = 0; i < 5 && i < busesArray.length; ++i){
            console.log("Line: " + busesArray[i].lineId + " Destination: " + busesArray[i].destinationName +
                " Time to arrival: " + busesArray[i].timeToStation);
        }
    }

    private handleJSON(jsonString: string){
        var busesArray = [];
        busesArray = JSON.parse(jsonString);
        busesArray = _.sortBy(busesArray, (bus) => {
            return bus.timeToStation;
        });
        this.handleOutput(busesArray);
    }

    private handleInputStopCode(inputStopCode : string){
        let promiseInputStopCode: Promise <string> = new Promise((resolve) => {
            var requestString = "https://api.tfl.gov.uk/StopPoint/" + inputStopCode + "/Arrivals?app_id=ef0cca24&app_key=281fde5472478ee61c2d8a63c5e4f554"
            request(requestString, function (error, response, body) {
              //console.log('error:', error); 
              //console.log('statusCode:', response && response.statusCode); 
              //console.log('body:', body);
              resolve(body); 
            });
        });
        promiseInputStopCode.then((response: string) => {
            console.log(response);
            this.handleJSON(response);
        });
    }

    private handleUserInput(){
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        let promiseInputListCommand: Promise<string> = new Promise((resolve) => { 
            rl.question("Input a stop code\n", function(data) {
                resolve(data.toString());
                rl.close();
            });
        });
        promiseInputListCommand.then((inputStopCode: string) => {
            this.handleInputStopCode(inputStopCode);
        })
    }

    public run(): void {
        //this.handleUserInput();
        this.handleInputStopCode("490008660N");
    }
}

