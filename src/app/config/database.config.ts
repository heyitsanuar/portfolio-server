export const DB_USER = process.env.PORTFOLIO_SERVER_DB_USER || '';
export const DB_PASSWORD = process.env.PORTFOLIO_SERVER_DB_PASSWORD || '';
export const DB_NAME = process.env.PORTFOLIO_SERVER_DB_NAME || '';
export const DB_CONNECT_STRING = `mongodb://${DB_USER}:${DB_PASSWORD}@ds253537.mlab.com:53537/${DB_NAME}`;
