import { reduce } from 'lodash';

const env = (key, miss) => process.env[key] || miss;
const reducer = (obj, miss, key) => ({ ...obj, [key]: env(key, miss) });

const config = reduce({
  PORT: 4000,
  MONGOLAB_URI: '',
  SECRET_KEY: 'local_secret',
  BCRYPT_SALT_ROUNDS: 5,
}, reducer, {});

export default config;
