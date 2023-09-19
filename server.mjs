import express from "express";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 20);

const app = express();
app.use(express.json());

let products = [
  {
    id: nanoid(),
    name: "macbook",
    price: 100,
  },
  {
    id: nanoid(),
    name: "iphone",
    price: 200,
  },
  {
    id: nanoid(),
    name: "ipad",
    price: 300,
  },
];

app.get("/products", (req, res) => {
  res.send({ message: "all product found", data: products });
});

app.get("/product/:id", (req, res) => {
  console.log(typeof req.params.id);

  if (isNaN(req.params.id)) {
    res.status(403).send("invalid product id");
  }

  let isFound = false;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === req.params.id) {
      isFound = i;
      break;
    }
  }

  if (isFound === false) {
    res.status(404);
    res.send({ message: "Product not found" });
  } else {
    res.send({
      message: "product found with id :" + products[isFound].id,
      data: products[isFound],
    });
  }
});

app.post("product", (req, res) => {
  if (!req.body.name || !req.body.price) {
    res.status(403).send(`
    required parameters are missing. example JSON request body: {
        name : "macbook" /// always a string
        price : 100
    }`);
  }
  products.push({
    id: nanoid(), /// generate
    name: req.body.name,
    price: req.body.price,
  });

  res.status(201).send({ message: "product created" });
});

app.put("/product/:id", (req, res) => {
  if (!req.body.name && !req.body.price) {
    `
    res.status(403).send{
      required parameter are missing. Atleast one parameter is required : name or price to complete update.
      example JSON request body: {name : "macbook", price : 100}`;
  }

  let isFound = false;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === req.params.id) {
      isFound = i;
      break;
    }
  }

  if (isFound === false) {
    res.status(404);
    res.send({ message: "Product not found" });
  } else {
    if (req.body.name) products[isFound].name = req.body.name;
    if (req.body.price) products[isFound].price = req.body.price;

    res.send({
      message: "product is updated with id :" + products[isFound].id,
      data: products[isFound],
    });
  }
});

app.delete("/product", (req, res) => {
  let isFound = false;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === req.params.id) {
      isFound = i;
      break;
    }
  }

  if (isFound === false) {
    res.status(404);
    res.send({ message: "Product not found" });
  } else {
    products.splice(isFound, 1);
    res.send({
      message: "product is deleted",
    });
  }
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
