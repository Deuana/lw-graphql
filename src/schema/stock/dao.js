import mongoose from 'mongoose';

import BaseDAO from '~/src/schema/base/dao';
import { StockItemValues } from '~/src/schema/enums';

export default class StockDAO extends BaseDAO {
  static _model = mongoose.model('Stock', new mongoose.Schema({
    id: { type: String, index: true },
    description: String,
    items: [{
      kind: String,
      item: { type: String, refPath: 'items.kind' },
      quantity: Number,
    }],
  }));

  static readAll() {
    return this._model.find().populate('items.item').exec();
  }

  static read(id) {
    return this._model.findOne({ id }).populate('items.item').exec();
  }

  static async addItem(stockId, { id, kind, quantity }) {
    const stock = await this.findOne({ id: stockId });
    stock.items.push({ kind, item: id, quantity });
    return await stock.save();
  }
}
