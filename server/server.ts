import * as express from 'express';
import * as bodyParser from 'body-parser';
import {invoiceRoutes} from './resources/invoiceResource';
import {clientRoutes} from './resources/clientResource';

const app = express();

app.use(bodyParser.json());

app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    if('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});

// A default hello word route
app.use('/api', invoiceRoutes);
app.use('/api', clientRoutes);


app.listen(4201, '127.0.0.1', function() {
    console.log("Server now listening on 4201");
});