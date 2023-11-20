export const config = {
  serviceName: 'wallet-processor',
  port: 3001,
  cronConfig: '0 0 * * * *',
  redis: {
    host: process.env.NODE_ENV === 'production' ? 'redis' : 'localhost',
    port: 6379,
  },
  mongo: {
    uri:
      process.env.NODE_ENV === 'production'
        ? `mongodb://root:example@mongodb/wallet?authSource=admin`
        : `mongodb://root:example@localhost:27017/wallet?authSource=admin`,
    collections: {
      users: 'users',
      transactions: 'transactions',
    },
  },
};
