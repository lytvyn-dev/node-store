const Product = require("../models/product");

exports.getEditProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    edition: false,
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const updatedProduct = new Product(title, imageUrl, description, price);
  updatedProduct.save(id);
  res.redirect("/");
};

exports.getEditProd = (req, res, next) => {
  const isEdition = req.query.edit;
  const id = req.params.productId;

  Product.getById(id, (product) => {
    res.render("admin/edit-product", {
      product,
      pageTitle: isEdition ? "Edit product" : "Add product",
      path: "/admin/edit-product",
      edition: isEdition,
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.deleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product.deleteProduct(id);
  res.redirect("/admin/products");
};
