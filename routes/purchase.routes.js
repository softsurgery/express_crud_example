module.exports = (app) => {
    const purchases = require("../controllers/purchase.controller.js");
    app.post("/purchase/create", purchases.create);
    app.get("/purchase/get-all", purchases.findAll);
    app.get("/purchase/:purchaseId", purchases.findOne);
  };