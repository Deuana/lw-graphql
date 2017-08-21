import mongoose from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';
import { StockItemValues } from '~/src/schema/enums';

export default class LoadoutDAO extends BaseDAO {
  static _model = mongoose.model('Loadout', new mongoose.Schema({
    id: { type: String, index: true },
    lent: Date,
    delivered: Date,
    veteran: { type: String, ref: 'Veteran' },
    items: [{
      kind: { type: String, enum: StockItemValues },
      item: { type: String, refPath: 'items.kind' },
      quantity: Number,
    }],
  }));
}
