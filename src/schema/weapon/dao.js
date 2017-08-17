import mongoose from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';

export default class WeaponDAO extends BaseDAO {
  static _model = mongoose.model('Weapon', new mongoose.Schema({
    id: { type: String, index: true },
    serialNumber: { type: String, index: true },
    model: String,
    manufacturer: String,
  }));
}

