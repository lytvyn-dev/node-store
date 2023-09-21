const fs = require("fs");
const path = require("path");
const getProductsFromFile = require("./product");

const p = path.join(path.dirname(process.mainModule.filename), "data", "cart.json");

module.exports = class Cart {
  static addToCart(id, prodPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProdIndex = cart.products.findIndex((prod) => prod.id === id);

      let updatedProd;

      if (existingProdIndex !== -1) {
        const existingProd = cart.products[existingProdIndex];
        updatedProd = { ...existingProd };
        updatedProd.qty = updatedProd.qty + 1;
        cart.products[existingProdIndex] = updatedProd;
      } else {
        updatedProd = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProd];
      }

      cart.totalPrice = cart.totalPrice + prodPrice;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deteleFromCart(id) {
    getProductsFromFile((products) => {
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        console.log(err);
      });
    });
  }
};
