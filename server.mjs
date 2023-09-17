import express from "express";

const app = express();

app.get("/", (req, res) => {
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
      isFound = products[i];
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
  if (!req.body.id || !req.body.name || !req.body.price) {
    res.status(403).send(`
    required parameters are missing. example JSON request body: {
        id : 23453 /// always a number
        name : "macbook" /// always a string
        price : 100
    }`);
  }
  products.push({
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
  });

  res.status(201).send({ message: "product created" });
});

let products = [
  {
    id: 152349785457,
    name: "macbook",
    price: 100,
  },
  {
    id: 152349785458,
    name: "iphone",
    price: 200,
  },
  {
    id: 152349785459,
    name: "ipad",
    price: 300,
  },
];

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
