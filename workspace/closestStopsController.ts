import {PostCodeHandler} from './postCodeHandler'
import {Result} from './result'

export class ClosestStopsController {
    private handleResult(resultsArrayPromise: Promise <Result[]>): Promise <Result[]> {
        return resultsArrayPromise.then((resultsArray: Result[]) => {
            if (resultsArray.length != 0){
                return resultsArray;
            }
            else {
                throw new Error("No buses found");
            }
        })
    }
    private isValidPostCode(postcode: string):boolean {
       var postcodeRegex = new RegExp("[a-zA-Z]?[a-zA-Z][0-9]?[0-9][0-9][a-zA-Z][a-zA-Z]$"); 
       return postcodeRegex.test(postcode);
    }
    getResults(inputPostcode: string): Promise<Result[]> {
        const postCodeHandler = new PostCodeHandler(); 
        if (this.isValidPostCode(inputPostcode) == true){
            var resultsArrayPromise : Promise <Result[]> = postCodeHandler.run(inputPostcode);
            return this.handleResult(resultsArrayPromise);
        }
        else {
            throw new Error("Postcode is invalid");
        }
    }
}