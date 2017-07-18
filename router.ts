import { PostCodeHandler } from './workspace/postCodeHandler'
import { ClosestStopsController } from './workspace/closestStopsController'
import * as express from 'express'
import { Result } from './workspace/result'
import { Bus } from './workspace/bus'
import * as cors from 'cors'

export class Router {

    public static main(): number {
        var app = express();
        app.use(cors());
        app.get("/", function (req, res){
            res.send('Hello World!')
        });
        var urlString: string;
        app.get('/closestStops', function (req, res) {
            var controller = new ClosestStopsController();
            try {
                controller.getResults(req.query.postcode).then((resultsArray: Result[]) => {
                    res.send(resultsArray);     
                }).catch((error) => {
                    res.status(400);
                    res.send(error.message);
                });
            }
            catch (error) {
                res.status(400);
                res.send(error.message);
            }
        });
        let port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log('Example app listening on port: ' + port)
        });

        return 0;
    }
}

Router.main();