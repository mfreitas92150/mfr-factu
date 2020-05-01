import { Request, Response, NextFunction } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { invoiceRoutes } from "./resources/invoiceResource";
import { clientRoutes } from "./resources/clientResource";
import { productRoutes } from "./resources/productResource";
import { userRoutes } from "./resources/userResouce";

const app = express();

mongoose
  .connect("mongodb://localhost/db")
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((e) => {
    console.log("Error while DB connecting");
    console.log(e);
  });

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
});

app.use("/api/users", userRoutes);
app.use("/api/users", invoiceRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/products", productRoutes);

app.listen(4201, "127.0.0.1", function () {
  console.log("Server now listening on 4201");
});
