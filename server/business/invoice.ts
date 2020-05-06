import * as _ from "lodash";
import MongoInvoice, { IInvoice, IProduct } from "../schema/invoice";

export default class Invoice {
  public readonly id: string;
  public readonly validatedAt: Date;

  constructor(private raw: IInvoice) {
    this.validatedAt = raw.validatedAt;
    this.id = raw.invoiceId;
  }

  get total() {
    return this.raw.products.reduce(
      (sum, product) => sum + product.quantity * product.cost,
      0
    );
  }

  toClient() {
    return _.pick(this.raw, [
      "invoiceId",
      "userId",
      "name",
      "createdAd",
      "updatedAt",
      "validatedAt",
      "products",
    ]);
  }

  static async deleteById(invoiceId: string) {
    await MongoInvoice.deleteOne({ invoiceId });
  }

  async update(raw: Partial<IInvoice>) {
    const date = new Date();
    const mongo = await MongoInvoice.findOne({ invoiceId: this.id });
    const newRaw = { ...this.raw, raw, updatedAt: date };
    this.raw = newRaw;
    mongo.save(new MongoInvoice(newRaw));
  }

  static async create(raw: IInvoice) {
    const invoice = new MongoInvoice(raw);
    await invoice.save();
    return new Invoice(raw);
  }

  static async find(req: any): Promise<Invoice[]> {
    const mongo = await MongoInvoice.find(req);
    return mongo.map((m: IInvoice) => new Invoice(m));
  }

  static async findOne(req: any): Promise<Invoice | undefined> {
    const mongo = await MongoInvoice.findOne(req);
    if (mongo) return new Invoice(mongo);
  }

  static toClient(invoices: Invoice[]) {
    return invoices.map((i) => i.toClient());
  }
}
