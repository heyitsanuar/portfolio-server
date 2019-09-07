const DB_USER = process.env.PORTFOLIO_SERVER_DB_USER || '';
const DB_PASSWORD = process.env.PORTFOLIO_SERVER_DB_PASSWORD || '';
const DB_NAME = process.env.PORTFOLIO_SERVER_DB_NAME || '';
const DB_CONNECT_STRING = `mongodb://${DB_USER}:${DB_PASSWORD}@ds253537.mlab.com:53537/${DB_NAME}`;

module.exports = {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_CONNECT_STRING,
};
