import mongoose from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';

export default class ReserveDAO extends BaseDAO {
  static _model = mongoose.model('Reserve', new mongoose.Schema({
    id: { type: String, index: true },
    acronym: String,
    description: String,
  }));
}

