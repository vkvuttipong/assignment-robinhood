const { Client } = require("pg");
const dbConfig = require("config");

const queryByOne = async (text) => {
  const client = new Client({
    ...dbConfig.pgdb,
  });
  await client.connect();
  const res = await client.query(text);
  await client.end();
  return res.rows[0];
};

const queryByList = async (text) => {
  const client = new Client({
    ...dbConfig.pgdb,
  });
  await client.connect();
  const res = await client.query(text);
  await client.end();
  return res.rows;
};

const queryByPagination = async (text) => {
  const client = new Client({
    ...dbConfig.pgdb,
  });
  await client.connect();
  const res =  await client.query(query, [pageNumber, pageSize]);
  await client.end();
  return res.rows;
};

module.exports = {
  queryByOne,
  queryByList,
  queryByPagination
};
