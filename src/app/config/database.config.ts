export const DB_USER = process.env.LISSANDRA_SERVER_DB_USER || 'anuar';
export const DB_PASSWORD = process.env.LISSANDRA_SERVER_DB_PASSWORD || 'taquito';
export const DB_NAME = process.env.LISSANDRA_SERVER_DB_NAME || 'lissa';
export const DB_CONNECT_STRING = `mongodb://${DB_USER}:${DB_PASSWORD}@ds121176.mlab.com:21176/${DB_NAME}`;
