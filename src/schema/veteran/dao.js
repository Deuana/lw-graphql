import mongoose from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';

export default class VeteranDAO extends BaseDAO {
  static _model = mongoose.model('Veteran', new mongoose.Schema({
    id: { type: String, index: true },
    rank: String,
    nickname: String,
  }));

  static async create({ rank, nickname }) {
    if (!rank || !nickname) {
      throw new Error('Form.UNFILLED');
    }

    const instance = new this._model({ rank, nickname });
    instance.id = instance._id;
    return await instance.save();
  }
}
