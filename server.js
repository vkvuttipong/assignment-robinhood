const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const formData = require("express-form-data");
const helmet = require("helmet");
const nocache = require("nocache");

app.use(helmet());
app.use(nocache());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb" }));
app.use(formData.parse());

let whitelist = [];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));


const authentication = require("./app/config/authen.config");
require("./app/routes/web/auth.routes")(app, authentication.decodeJWT);
require("./app/routes/web/interview.routes")(app, authentication.decodeJWT);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
