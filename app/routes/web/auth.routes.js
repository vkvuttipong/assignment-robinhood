


module.exports = (app, jwtAuth) => {
  const config = require("config");
  const modelTD = require("../../controllers/web/auth.controller");

  var router = require("express").Router();
  router.post("/gen-token-jwt",   modelTD.genTokenJWT);

  app.use(`/robinhood/api/${config.VERSION}/auth`, router);
};

 