import mongoose from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';

export default class WeaponDAO extends BaseDAO {
  static _model = mongoose.model('Weapon', new mongoose.Schema({
    id: { type: String, index: true },
    serialNumber: { type: String, index: true },
    model: String,
    manufacturer: String,
  }));

  static async create({ serialNumber, model, manufacturer }) {
    if (!serialNumber || !model || !manufacturer) {
      throw new Error('Form.UNFILLED');
    }

    if (await this._model.findOne({ serialNumber })) {
      throw new Error('Weapon.ALREADY_EXISTS');
    }

    const instance = new this._model({ serialNumber, model, manufacturer });
    instance.id = instance._id;

    return await instance.save();
  }
}

