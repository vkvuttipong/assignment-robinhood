
const { validationResult } = require("express-validator");
const { Response } = require("./responseMapper");

exports.expressValidator =   (req, res, next) => {
    const err = validationResult(req);
    if (err.errors.length > 0) {
      return Response.errorExpressValidate(res, err.errors);
    }
    next();
  };