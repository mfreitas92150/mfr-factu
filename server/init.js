const axios = require("axios");
const moment = require("moment");
const random = require("random");

const url = "http://localhost:4201";

async function createUser() {
  return await axios.post(`${url}/users/`, {email: "dummy@test.fr"});
}

async function createInvoice(userId, invoice){
  const response = await axios.post(`${url}/users/${userId}/invoices`, invoice);
  console.info(`Invoice created ${response.body}`);
}

const userId = createUser();

console.info(`User created with id: ${userId}`)

for (var i = 6; i < 13; i++) {
  var invoiceCount = random.int(1, 2);
  for (var j = 0; j < invoiceCount; j++) {
    createInvoice(userId, mockInvoice(i, j, 2018));
  }
}

for (var i = 1; i < 13; i++) {
  var invoiceCount = random.int(1, 2);
  for (var j = 0; j < invoiceCount; j++) {
    createInvoice(userId, mockInvoice(i, j, 2019));
  }
}

function mockInvoice(index, subIndex, year) {
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
