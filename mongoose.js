const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose
  .connect(
    "mongodb+srv://cjt3591:xc156156a!@cluster0.gscm3cy.mongodb.net/products_test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch(() => {
    console.log("데이터베이스 연결 실패");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  const result = await createdProduct.save();

  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();

  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
