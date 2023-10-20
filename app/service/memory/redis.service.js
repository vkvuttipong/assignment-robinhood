const { createClient } = require("redis");
const logs = require("../../util/logging");
const rdConfig = require("config");

const getToken = async (token) => {
  const client = await createClient({url: rdConfig.redis.url})
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

  const value = await client.get(token);
  logs.loggerWeb.info(`getToken : ${value}`);
  await client.disconnect();
  return value
};


const setToken = async (token) => {
  const client = await createClient({url: 'redis://localhost:6379'})
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

  await client.set(token, token,{
    EX: 60*60,  // expire 60 minute
    NX: true
  });
  logs.loggerWeb.info(`setToken : ${token}`);
  await client.disconnect();
};

module.exports = {
  getToken,
  setToken
};
