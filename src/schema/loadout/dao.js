import mongoose from 'mongoose';
import BaseDAO from '~/src/schema/base/dao';
import { StockItemValues } from '~/src/schema/enums';

export default class LoadoutDAO extends BaseDAO {
  static _model = mongoose.model('Loadout', new mongoose.Schema({
    id: { type: String, index: true },
    lent: Date,
    returned: Date,
    veteran: { type: String, ref: 'Veteran' },
    items: [{
      kind: String,
      item: { type: String, refPath: 'items.kind' },
      stock: { type: String, ref: 'Stock' },
      quantity: Number,
    }],
  }));

  static all() {
    return this._model.find({}).populate('veteran items.item items.stock').exec();
  }

  static read(id) {
    return this._model.findOne({ id }).populate('veteran items.item items.stock').exec();
  }

  static readOpen(veteran) {
    return this._model
      .find({ returned: undefined, veteran: { $ne: veteran } })
      .populate('veteran items.item items.stock')
      .exec();
  }

  static lendItems(veteran, items) {
    if (!items) {
      return;
    }

    if (!veteran) {
      throw new Error('Form.UNFILLED');
    }

    const loadout = new this._model({
      lent: new Date(),
      veteran,
    });
    loadout.id = loadout._id;

    items.forEach(i => loadout.items.push(i));
    return loadout.save();
  }
}
