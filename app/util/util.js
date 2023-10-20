const crypto = require("crypto");
const config = require("config");

const algorithm = config.crypto.algorithm;
const secretKey = config.crypto.secretKey;
const iv = config.crypto.iv;

exports.encrypt = (text) => {
  const cipher = crypto.createCipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, "hex")
  );
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return encrypted.toString("hex");
};

exports.decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, "hex")
  );
  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash, "hex", "utf8")),
    decipher.final(),
  ]);
  return decrpyted.toString();
};

 
 
 