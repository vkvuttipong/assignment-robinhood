const { createLogger, transports, format } = require("winston");
const requestIp = require("request-ip");

const timezoned = () => {
  return new Date().toLocaleString("th-TH", {
    timeZone: "Asia/Bangkok"
  });
};

 
const loggerWeb = createLogger({
  format: format.combine(
    format.timestamp({ format: timezoned }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: "./logs/web/all-logs.log",
      json: false,
      maxsize: 5242880,
      maxFiles: 5
    }),
    new transports.Console()
  ]
});
exports.loggerWeb = loggerWeb;

exports.logWebInfo = (req,isWriteBody = true) => {

   
  let clientIp = requestIp.getClientIp(req);
  let forwardedIpsStr =    req.headers['x-forwarded-for'] || requestIp.getClientIp(req);
  clientIp =    forwardedIpsStr.split(',')[0]; 
  
  let logMsg =
    "{ip:" +
    clientIp +
    " , method:" +
    req.method +
    " , url" +
    req.baseUrl +
    req.route.path;
  if (req.params) {
    logMsg += " , params:" + JSON.stringify(req.params);
  }
  if (req.query) {
    logMsg += " , query:" + JSON.stringify(req.query);
  }
  if (req.body && isWriteBody) {
    let bodyData = JSON.stringify(req.body);
    const replaceBody = replaceData(bodyData);   
    logMsg += " , body:" + JSON.stringify(replaceBody);
  }
  if (req.headers && req.headers.token) {
    logMsg += " , headers.token:" + req.headers.token;
  }
  logMsg += "}";
  loggerWeb.info(logMsg);
  
};


const replaceData = (body) => {
  let data = JSON.parse(body);
  if (data.esigData) {
    data.esigData = 'xxxxxxxx'
  }
  if (data.biometricData) {
    data.biometricData = 'xxxxxxxx'
  }
  if (data.citizenID) {
    data.citizenID = 'xxxxxxxx'
  }
  return data;
};

 

 