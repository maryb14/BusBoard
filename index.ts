import { Template } from './workspace/template'
import * as express from 'express'
import { Result } from './workspace/result'
import { Bus } from './workspace/bus'
import * as cors from 'cors'

export class Index {
    public static main(): number {
        var app = express();
        app.use(cors());
        app.get("/", function (req, res){
            res.send('Hello World!')
        });
        var urlString: string;
        app.get('/closestStops', function (req, res){
            const template = new Template();
            var postcodeRegex = new RegExp("[a-zA-Z]?[a-zA-Z][0-9]?[0-9][0-9][a-zA-Z][a-zA-Z]$");
            var booleanPostcode = postcodeRegex.test(req.query.postcode)
            if (booleanPostcode==true){
                var resultsArrayPromise : Promise <Result[]> = template.run(req.query.postcode);
                var resultString: string = ""; 
                resultsArrayPromise.then((resultsArray) => {
                    if (resultsArray.length != 0){
                        res.status('200')
                        res.send(resultsArray);
                    }
                    else {
                        res.send('No buses found')
                        res.status('400')
                    }
                })
            }
            else {
                res.status('406')
                res.send('postcode is invalid')
            }
        });
        app.listen(3000, function (){
            console.log('Example app listening on port 3000')
        });

        return 0;
    }
}

Index.main();