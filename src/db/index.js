import mongoose from 'mongoose';

import config from '~/src/config';

export const connectDB = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.MONGOLAB_URI, err => (
    err ? console.error(`Mongo error: ${err}`) : console.warn('Mongo connected')
  ));
};
