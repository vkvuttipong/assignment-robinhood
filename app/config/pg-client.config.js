const { Client } = require("pg");
const dbConfig = require("config");

const queryByOne = async (text,params) => {
  const client = new Client({
    ...dbConfig.pgdb,
  });
  await client.connect();
  const res = await client.query(text,params);
  await client.end();
  return res.rows[0];
};

const queryByList = async (text,params) => {
  const client = new Client({
    ...dbConfig.pgdb,
  });
  await client.connect();
  const res = await client.query(text,params);
  await client.end();
  return res.rows;
};

const queryByPagination = async (text,params,pageNumber, pageSize) => {
  const client = new Client({
    ...dbConfig.pgdb,
  });
  await client.connect();
  params.push(pageSize);
  params.push(pageNumber);
  const res =  await client.query(text,params);
  await client.end();
  return res.rows;
};

module.exports = {
  queryByOne,
  queryByList,
  queryByPagination
};
