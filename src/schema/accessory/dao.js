import mongoose from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';

export default class AccessoryDAO extends BaseDAO {
  static _model = mongoose.model('Accessory', new mongoose.Schema({
    id: { type: String, index: true },
    description: String,
  }));
}

