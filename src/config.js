import { reduce } from 'lodash';

const env = (key, miss) => process.env[key] || miss;
const reducer = (obj, miss, key) => ({ ...obj, [key]: env(key, miss) });

const config = reduce({
  PORT: 4000,
  MONGOLAB_URI: '',
}, reducer, {});

export default config;
