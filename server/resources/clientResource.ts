import { Request, Response } from "express";
import * as express from "express";
export const clientRoutes = express.Router();

clientRoutes.get("/", (req: Request, res: Response) =>
  res.send([{ id: "client1", name: "Client 1", siren: "111 111 111" }])
);
