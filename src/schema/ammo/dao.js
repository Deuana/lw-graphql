import mongoose from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';

export default class AmmoDAO extends BaseDAO {
  static _model = mongoose.model('Ammo', new mongoose.Schema({
    id: { type: String, index: true },
    caliber: String,
    description: String,
  }));
}

