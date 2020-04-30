import Invoice from "./schema/invoice";
import * as moment from "moment";
import * as random from "random";

export default function init() {
  for (var i = 6; i < 13; i++) {
    var invoiceCount = random.int(1, 2);
    for (var j = 0; j < invoiceCount; j++) {
      _save(mockInvoice(i, j, 2018));
    }
  }

  for (var i = 1; i < 13; i++) {
    var invoiceCount = random.int(1, 2);
    for (var j = 0; j < invoiceCount; j++) {
      _save(mockInvoice(i, j, 2019));
    }
  }
}

async function _save(invoiceTosave) {
  const i = await Invoice.findOne({ name: invoiceTosave.name });
  if (!i) {
    new Invoice(invoiceTosave).save();
  } else {
    console.info(`existing invoice ${invoiceTosave.name}`);
  }
}

function mockInvoice(index: Number, subIndex: Number, year: Number) {
  var date = moment(`01/${index}/${year}`, "DD/MM/YYYY").toDate();
  return {
    name: `invoice-${year}-${index}-${subIndex}`,
    createdAt: date,
    updatedAt: date,
    validatedAt: date,
    products: mockProducts(),
  };
}

function mockProducts() {
  const products = [];
  var productCount = random.int(1, 3);
  for (var i = 0; i < productCount; i++) {
    products.push({
      name: "Product",
      quantity: random.int(1, 20),
      ut: 400,
      tva: 20,
    });
  }
  return products;
}
