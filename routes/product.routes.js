module.exports = (app) => {
    const ProductController = require("../controllers/product.controller.js");
  
    app.post("/product/create", ProductController.create);
  
    app.get("/product/get-all", ProductController.findAll);
  
    app.get("/product/:productId", ProductController.findOne);
  
    app.put("/product/:productId", ProductController.update);
  
    app.delete("/product/:productId", ProductController.delete);
  };
  