import { Request, Response } from "express";
import * as express from "express";
import * as _ from "lodash";
import * as moment from "moment";
import { v4 as uuidv4 } from "uuid";
import User from "../schema/user";
import user from "../schema/user";
import Invoice from "../business/invoice";

export const invoiceRoutes = express.Router();

invoiceRoutes.get("/admin", _findAll);
invoiceRoutes.get("/", _findAllByUser);
invoiceRoutes.get("/:id", _findById);
invoiceRoutes.post("/", _save);
invoiceRoutes.put("/:id", _update);
invoiceRoutes.delete("/:id", _delete);
invoiceRoutes.get("/stat/monthly", _statMonthly);

async function _statMonthly(req: Request, res: Response) {
  const userId = req.header("userId");
  if (!userId) {
    console.error(`Missing param userId`);
    return res.status(401).json({
      error: `Missing param userId`,
    });
  }

  if (!req.query.startDate) {
    console.error(`Missing query startDate`);
    return res.status(401).json({
      error: `Missing query startDate`,
    });
  }
  const startDate = moment(`${req.query.startDate}`, "YYYYMM")
    .startOf("month")
    .toDate();

  if (!req.query.endDate) {
    console.error(`Missing query endDate`);
    return res.status(401).json({
      error: `Missing query endDate`,
    });
  }
  const endDate = moment(`${req.query.endDate}01`, "YYYYMMDD")
    .endOf("month")
    .toDate();

  const invoices = await Invoice.find({
    userId: userId,
    validatedAt: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  const stats = await _statByMonth(invoices, userId);
  // Ici, chaque entré devrait avoir des champs InvoiceStat.InvoiceStatDiff mais je ne les retrouve pas dans le retour de l'api (tester via postman)
  console.info(stats);
  return res.status(200).json(stats);
}

async function _findAll(req: Request, res: Response) {
  try {
    const invoices = await Invoice.find({});
    if (!invoices)
      return res.status(401).json({
        text: "Invoice pas bon",
      });
    return res.status(200).json(Invoice.toClient(invoices));
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}

async function _findAllByUser(req: Request, res: Response) {
  if (!req.header("userId")) {
    console.error(`Missing param userId`);
    return res.status(401).json({
      error: `Missing param userId`,
    });
  }
  try {
    const invoices = await Invoice.find({
      userId: req.header("userId"),
    });
    if (!invoices)
      return res.status(401).json({
        text: "Invoice pas bon",
      });
    return res.status(200).json(Invoice.toClient(invoices));
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}

async function _findById(req: Request, res: Response) {
  const userId = req.header("userId");
  if (!userId) {
    console.error(`Missing param userId`);
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
      userId: userId,
      invoiceId: req.params.id,
    });
    if (!invoice)
      return res.status(401).json({
        text: `Unkonwn invoice ${req.params.id} for user ${userId}`,
      });
    return res.status(200).json(invoice.toClient());
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}

async function _save(req: Request, res: Response) {
  try {
    if (!req.header("userId")) {
      console.error(`Missing param userId`);
      return res.status(401).json({
        error: `Missing param userId`,
      });
    }

    const user = await User.findOne({ userId: req.header("userId") });

    if (!user) {
      console.error(`Unknown userId: ${req.header("userId")}`);
      return res.status(401).json({
        error: `Unknown userId: ${req.header("userId")}`,
      });
    }

    const date = moment.now();

    const invoice = await Invoice.create({
      ...req.body,
      createdAt: date,
      updatedAt: date,
      invoiceId: uuidv4(),
      userId: req.header("userId"),
    });

    return res.status(200).json(invoice.id);
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
        error: `Missing param invoiceId`,
      });
    }

    const invoice = await Invoice.findOne({
      invoiceId: req.params.id,
    });

    if (!invoice) {
      return res.status(401).json({
        text: `Unkonwn invoice ${req.params.id}`,
      });
    }

    await invoice.update(invoiceParam);

    return res.status(200).json(invoice.id);
  } catch (error) {
    console.info(error);
    return res.status(500).json({
      error,
    });
  }
}

async function _delete(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.status(401).json({
        error: `Missing param invoiceId`,
      });
    }

    await Invoice.deleteById(req.params.id);

    return res.status(200).json(req.params.id);
  } catch (error) {
    console.info(error);
    return res.status(500).json({
      error,
    });
  }
}

/**
 * Regroupe les factures par mois.
 * @param invoices
 * @param userId
 */
async function _statByMonth(invoices: Invoice[], userId: string) {
  const statByMonth: { [key: string]: InvoiceStat } = {};
  /*
    si le await est dans un for, l'exécution est linéaire (chaque await 'bloque' le for)
    si on veut faire du concurrent, il faut écrire
      await Promise.all(
        invoices.map(async invoice => { ...code asynchrone avec des await... })
      )
  */
  for (const invoice of invoices) {
    // Créer la clé année / mois
    const date = moment(invoice.validatedAt).format("YYYYMM");
    // Calcul la somme Hors Taxe de la facture à partir des produits
    const ht = invoice.total;
    // Si clé année / mois n'existe pas, on l'init
    if (!statByMonth[date]) {
      statByMonth[date] = { count: 0, ht: 0, diffs: [] };
    }
    const invoiceState = statByMonth[date];
    const htMinus1 = await _getHtForMount(date, 1, userId);

    invoiceState.count++;
    invoiceState.ht += ht;
    invoiceState.diffs.push(htMinus1);
  }
  return statByMonth;
}

/**
 * Récupère la somme HT du cumul des factures du mois de l'année antérieur
 * @param mDate YYYYDD => année mois de base
 * @param sub => antéorité du mois rechercher. Si mDate: 202001 et sub: 2, on recherche 201801
 * @param userId
 */
async function _getHtForMount(mDate: string, sub: number, userId: string) {
  const m = moment(mDate, "YYYYMM").subtract(sub, "years");
  const startDate = m.startOf("month").toDate();
  const endDate = m.endOf("month").toDate();
  const invoices = await Invoice.find({
    userId: userId,
    validatedAt: {
      $gte: startDate,
      $lte: endDate,
    },
  });
  return {
    year: m.format("YYYYMM"),
    diff: invoices.reduce((sum, invoice) => sum + invoice.total, 0),
  };
}

type InvoiceStatDiff = {
  year: string;
  diff: number;
};

type InvoiceStat = {
  count: number;
  ht: number;
  diffs: InvoiceStatDiff[];
};
