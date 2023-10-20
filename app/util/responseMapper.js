let { MESSAGES } = require("../config/constants.config");

class Response {
  success(res, data) {
    let responseBody = {
      code: MESSAGES.MSG1.code,
      message: MESSAGES.MSG1.message,
      data: data,
    };

    res.setHeader("Content-Type", "application/json");

    return res.status(200).send(JSON.stringify(responseBody));
  }

  error(res, returncode, data = null) {
    let responseBody = {
      code: null,
      message: null,
    };

    res.setHeader("Content-Type", "application/json");

    switch (returncode) {
      case "E999":
        responseBody.code = MESSAGES.MSG2.code;
        responseBody.message = MESSAGES.MSG2.message;
        break;
      case "401":
        responseBody.code = MESSAGES.MSG3.code;
        responseBody.message = MESSAGES.MSG3.message;
        return res.status(401).send(JSON.stringify(responseBody));
      default:
        responseBody.code = MESSAGES.MSG2.code;
        responseBody.message = MESSAGES.MSG2.message;

        if (data) {
          responseBody.code = data.code;
          responseBody.message = data.message;
          responseBody.data = data.data || null;
        }

        return res.status(500).send(JSON.stringify(responseBody));
    }

    return res.status(500).send(JSON.stringify(responseBody));
  }

  errorExpressValidate(res, data) {
    let responseBody = {
      code: MESSAGES.MSG4.code,
      message: MESSAGES.MSG4.message,
      data,
    };

    res.setHeader("Content-Type", "application/json");
    return res.status(400).send(JSON.stringify(responseBody));
  }
}

module.exports = {
  Response: new Response(),
};
