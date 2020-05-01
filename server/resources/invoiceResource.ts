import { Request, Response } from "express";
import * as express from "express";
import * as _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import User from "../schema/user";
import Invoice from "../schema/invoice";

export const invoiceRoutes = express.Router();

invoiceRoutes.get("/:userId/invoices/", _findAll);
invoiceRoutes.get("/:userId/invoices/:id", _findById);
invoiceRoutes.post("/:userId/invoices/", _save);
invoiceRoutes.put("/:userId/invoices/:id", _update);
invoiceRoutes.delete("/:userId/invoices/:id", _delete);

async function _findAll(req: Request, res: Response) {
  try {
    // On check si l'utilisateur existe en base
    const invoices = await Invoice.find({ userId: req.params.userId });
    if (!invoices)
      return res.status(401).json({
        text: "Invoice pas bon",
      });
    return res
      .status(200)
      .json(_.map(invoices, (invoice) => mapInvoice(invoice)));
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}

async function _findById(req: Request, res: Response) {
  if (!req.params.userId) {
    return res.status(401).json({
      error: `Missing param userId`,
    });
  }

  if (!req.params.id) {
    return res.status(401).json({
      error: `Missing param invoiceId`,
    });
  }

  try {
    // On check si l'utilisateur existe en base
    const invoice = await Invoice.findOne({
      userId: req.params.userId,
      invoiceId: req.params.id,
    });
    if (!invoice)
      return res.status(401).json({
        text: `Unkonwn invoice ${req.params.id} for user ${req.params.userId}`,
      });
    return res.status(200).json(mapInvoice(invoice));
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}

async function _save(req: Request, res: Response) {
  try {

    if (!req.params.userId) {
      return res.status(401).json({
        error: `Missing param userId`,
      });
    }

    const user = await User.findOne({userId: req.params.userId});

    if(!user){
      return res.status(401).json({
        error: `Unknown userId: ${req.params.userId}`,
      });
    }

    const date = new Date();
    const invoice = new Invoice({
      ...req.body,
      createdAt: date,
      updatedAt: date,
      invoiceId: uuidv4(),
      userId: req.params.userId,
    });

    await invoice.save();

    return res.status(200).json({ invoiceId: invoice.invoiceId });
  } catch (error) {
    console.info(error);
    return res.status(500).json({
      error,
    });
  }
}

async function _update(req: Request, res: Response) {
  try {
    const date = new Date();
    const invoiceParam = req.body;

    if (!req.params.userId) {
      return res.status(401).json({
        error: `Missing param userId`,
      });
    }

    if (!req.params.id) {
      return res.status(401).json({
        error: `Missing param invoiceId`,
      });
    }

    const invoice = await Invoice.findOne({
      userId: req.params.userId,
      invoiceId: req.params.id,
    });

    if (!invoice) {
      return res.status(401).json({
        text: `Unkonwn invoice ${req.params.id} for user ${req.params.userId}`,
      });
    }
    await invoice.save(
      new Invoice(Object.assign(invoice, invoiceParam, { updatedAt: date }))
    );

    return res.status(200).json({ invoiceId: invoice.invoiceId });
  } catch (error) {
    console.info(error);
    return res.status(500).json({
      error,
    });
  }
}

async function _delete(req: Request, res: Response) {
  try {
    if (!req.params.userId) {
      return res.status(401).json({
        error: `Missing param userId`,
      });
    }

    if (!req.params.id) {
      return res.status(401).json({
        error: `Missing param invoiceId`,
      });
    }

    await Invoice.deleteOne({
      userId: req.params.userId,
      invoiceId: req.params.id,
    });

    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    console.info(error);
    return res.status(500).json({
      error,
    });
  }
}

function mapInvoice(invoice: any) {
  return _.pick(invoice, [
    "invoiceId",
    "userId",
    "name",
    "createdAd",
    "updatedAt",
    "validatedAt",
    "products",
  ]);
}
