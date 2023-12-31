const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProductById = (req, res, next) => {
  const id = req.params.productId;
  Product.getById(id, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: "Product details",
      path: "/product-details",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      prods: products,
    });
  });
};

exports.addToCart = (req, res, next) => {
  const id = req.body.id;
  const price = req.body.price;
  Cart.addToCart(id, +price);
  res.redirect("/");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
