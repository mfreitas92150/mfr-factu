import { Request, Response } from "express";
import * as express from "express";
export const productRoutes = express.Router();

productRoutes.get("/", (req: Request, res: Response) =>
  res.send([])
);
