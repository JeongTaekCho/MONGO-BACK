const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://cjt3591:xc156156a!@cluster0.gscm3cy.mongodb.net/products_test?retryWrites=true&w=majority";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };

  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    await db.collection("products").insertOne(newProduct);
  } catch (error) {
    return res.json({ message: "Could not store data" });
  }
  client.close();

  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const products = await db.collection("products").find().toArray();

    client.close();
    res.json(products);
  } catch (error) {
    res.json({ message: "Could not retrieve products" });
  }
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
