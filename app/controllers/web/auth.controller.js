const logs = require("../../util/logging");
const { Response } = require("../../util/responseMapper");
const auth = require("../../config/authen.config");


exports.genTokenJWT = async (req, res) => {
  logs.logWebInfo(req);
  try {
    let body = req.body;
    let token = await auth.encodeJWT(body)

    let data = {
      token : token
    };
    return Response.success(res, data); 
  } catch (error) {
    logs.loggerWeb.error(`genTokenJWT error : ${error}`);
    return Response.error(res, error.message);
  }
};

 