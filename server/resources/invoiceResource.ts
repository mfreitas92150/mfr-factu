import * as express from 'express';
export const invoiceRoutes = express.Router();

invoiceRoutes.get('/invoices', (req, res) => res.send([{id: "invoice1", date: "01/01/2020", ht:"5000"}]));

invoiceRoutes.post('/invoices', (req, res) => res.send({body: req.body})); 