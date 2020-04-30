import * as express from 'express';
export const clientRoutes = express.Router();

clientRoutes.get('/clients', (req, res) => res.send([{ id: "client1", name: "Client 1", siren: "111 111 111" }]));

clientRoutes.post('/clients', (req, res) => res.send({ body: req.body })); 