export const config = {
  serviceName: 'wallet-api',
  port: 3000,
  mockedToken: '123',
  transactions: {
    maxLatency: 1000,
  },
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
      dictionary: 'dictionary',
    },
  },
  aws: {
    region: 'eu-central-1',
    seedBucket: 'nt-interview-files',
    seedKey: 'data.json',
  },
};
