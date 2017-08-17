import mongoose from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';

export default class VeteranDAO extends BaseDAO {
  static _model = mongoose.model('Veteran', new mongoose.Schema({
    id: { type: String, index: true },
    rank: String,
    nickname: String,
  }));
}

