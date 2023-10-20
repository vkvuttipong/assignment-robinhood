const logs = require("../util/logging");
const jwt = require('jsonwebtoken');
const config = require("config");
const { getToken ,setToken } = require("../service/memory/redis.service");

const decodeJWT = async (req, res, next) => {
  try {
    let payload = req.header('token');
    if (!payload) {
      logs.loggerWeb.error(`Not Found JWT.`);
      res.status(401).send({ code: "E000", message: "Not Found JWT." });
      return;
    }

    let mem = await getToken(payload);
    if (mem == null) {
      logs.loggerWeb.error(`Not Found JWT In REDIS.`);
      res.status(401).send({ code: "E000", message: "Not Found JWT In REDIS." });
      return;
    }

    let secret = config.jwt_auth.JWT_SECRET;
    let decoded = jwt.verify(payload,secret)
    req.userInfo = decoded;
    next();
  } catch (error) {
    logs.loggerWeb.error(`Unauthorized : ${error}`);
    res.status(401).send({ code: "E000", message: error.message.toUpperCase() || error });
    return;
  }
}

const encodeJWT = async (value) => {
  try {
    const secret = config.jwt_auth.JWT_SECRET;
    let token = jwt.sign({
        iat: Math.floor(Date.now() / 1000)  ,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),  // 1 hour
    }, secret);

    await setToken(token);

    return token;
  } catch (error) {
    logs.loggerWeb.error(`Unauthorized : ${error}`);
    throw new Error(error);
  }
};

module.exports = {
  decodeJWT,
  encodeJWT
};
