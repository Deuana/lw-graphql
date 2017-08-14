import mongoose from 'mongoose';

import BaseDAO from '~/src/schema/base/dao';
import { StockItemValues } from '~/src/schema/enums;

export default class StockDAO extends BaseDAO {
  static _model = mongoose.model('Stock', new mongoose.Schema({
    id: { type: String, index: true },
    items: [{
      item: { type: String, enum: StockItemValues },
      quantity: Number,
    }],
  }));
}
