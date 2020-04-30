import { Request, Response } from "express";
import * as express from "express";
import Invoice from "../schema/invoice";

export const invoiceRoutes = express.Router();

invoiceRoutes.get("/", _findAll);
invoiceRoutes.post("/", _save);
invoiceRoutes.put("/:id", _update);
invoiceRoutes.delete("/:id", _delete);

async function _findAll(req: Request, res: Response) {
  try {
    // On check si l'utilisateur existe en base
    const invoices = await Invoice.find({});
    if (!invoices)
      return res.status(401).json({
        text: "Invoice pas bon",
      });
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}

async function _save(req: Request, res: Response) {
  try {
    const date = new Date();
    const invoice = new Invoice({
      ...req.body,
      createdAt: date,
      updatedAt: date,
    });
    const invoiceSaved = await invoice.save(invoice);

    return res.status(200).json({ id: invoiceSaved.id });
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

    if (!req.params.id) {
      return res.status(401).json({
        error: `Missing param id`,
      });
    }

    const invoice = await Invoice.findOne({ _id: req.params.id });

    if (!invoice) {
      return res.status(401).json({
        error: `Unknown invoice id:${req.params.id}`,
      });
    }
    const invoiceSaved = await invoice.save(
      new Invoice(Object.assign(invoice, invoiceParam, { updatedAt: date }))
    );

    return res.status(200).json(invoiceSaved);
  } catch (error) {
    console.info(error);
    return res.status(500).json({
      error,
    });
  }
}

async function _delete(req: Request, res: Response) {
  try {
    const date = new Date();
    const invoiceParam = req.body;

    if (!req.params.id) {
      return res.status(401).json({
        error: `Missing param id`,
      });
    }

    const invoice = await Invoice.findOne({ _id: req.params.id });

    if (!invoice) {
      return res.status(401).json({
        error: `Unknown invoice id:${req.params.id}`,
      });
    }

    await invoice.deleteOne({ _id: req.params.id });

    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    console.info(error);
    return res.status(500).json({
      error,
    });
  }
}
