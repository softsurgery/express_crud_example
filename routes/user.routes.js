module.exports = (app) => {
  const User = require("../controllers/user.controller.js");
  app.post("/users", User.createUser);
  app.get("/users/:id", User.getUser);
  app.patch("/users/:id", User.updateUser);
  app.delete("/users/:id", User.deleteUser);
};
