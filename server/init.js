const axios = require("axios");
const moment = require("moment");
const random = require("random");

const url = "http://localhost:4201/api";

async function createUser() {
  const res = await axios.post(`${url}/users/`, { email: "dummy@test.fr" });
  return res.data.id;
}

const users = {};
users.list = async () => {
  const res = await axios.get(`${url}/users/`);
  return res.data;
};
users.delete = async (id) => {
  console.log(`Deleting user with id ${id}`);
  await axios.delete(`${url}/users/${id}`);
};
users.deleteAll = async () => {
  const list = await users.list();
  for (let user of list) {
    await users.delete(user.userId);
  }
};

async function createInvoice(userId, invoice) {
  const response = await axios.post(`${url}/users/${userId}/invoices`, invoice);
  console.info(`Invoice created ${response.body}`);
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

const wait = (time) => new Promise((accept) => setTimeout(accept, time));

const main = async () => {
  await users.deleteAll();
  await wait(1000);
  console.log("Users after deletion", await users.list());

  const userId = await createUser();

  console.info(`User created with id: ${userId}`);

  for (var i = 6; i < 13; i++) {
    var invoiceCount = random.int(1, 2);
    for (var j = 0; j < invoiceCount; j++) {
      await createInvoice(userId, mockInvoice(i, j, 2018));
    }
  }

  for (var i = 1; i < 13; i++) {
    var invoiceCount = random.int(1, 2);
    for (var j = 0; j < invoiceCount; j++) {
      await createInvoice(userId, mockInvoice(i, j, 2019));
    }
  }
};

// Ceci est une IIFE asynchrone, nécessaire car Node ne supporte pas le async
// au plus haut niveau d'exécution
(async () => {
  main();
})();
