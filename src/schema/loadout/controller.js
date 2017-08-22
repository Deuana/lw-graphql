import moment from 'moment';
import { reduce, flatten } from 'lodash';

import BaseController, { route } from '~/src/schema/base/controller';
import { StockDAO } from '~/src/schema/stock';
import { VeteranDAO } from '~/src/schema/veteran';
import kinds from '~/src/schema/enums/stock-item';
import { describeLoadoutItems } from '~/src/utils/descriptions';

import LoadoutDAO from './dao';

export default class LoadoutController extends BaseController {
  _controller = LoadoutController;
  _dao = LoadoutDAO;
  _baseRoute = '/cautelas';
  _templatePath = 'loadouts';

  async index(req, res) {
    const loadouts = (await this._dao.all()).map(l => ({
      ...l._doc,
      description: describeLoadoutItems(l.items),
      lent: moment(l.lent).fromNow(),
      returned: l.returned ? moment(l.returned).fromNow() : 'Ainda emprestado',
    }));

    return res.render('loadouts/index.html', { loadouts });
  }

  async new(req, res, ctx = {}) {
    const [veterans, stocks, loadouts] = await Promise.all([
      VeteranDAO.all(),
      StockDAO.readAll(),
      this._dao.readOpen(),
    ]);

    const stocksDict = reduce(stocks, (obj, s) => ({
      ...obj,
      [s.id]: reduce(s.items, (siobj, si) => ({ ...siobj, [si.item.id]: si }), {}),
    }), {});

    flatten(loadouts.map(l => l.items))
      .forEach(item => {
        stocksDict[item.stock.id][item.item.id].quantity -= item.quantity;
      });

    return res.render('loadouts/new.html', { veterans, stocks, kinds, selectedOptions: [], ...ctx });
  }

  async create(req, res) {
    const { veteran } = req.body;
    const items = req.body.items
      .map(i => i.split('|'))
      .filter(i => parseInt(i[3], 10))
      .map(([stock, kind, item, quantity]) => ({ stock, kind, item, quantity }));

    try {
      await this._dao.lendItems(veteran, items);
    } catch(e) {
      return await this.new(req, res, { error: e.message, ...req.body });
    }

    return res.redirect('/cautelas');
  }

  async edit(req, res) {
    const loadout = await this._dao.read(req.params.id);
    const [veterans, stocks, loadouts] = await Promise.all([
      VeteranDAO.all(),
      StockDAO.readAll(),
      this._dao.readOpen(loadout.veteran.id),
    ]);

    const stocksDict = reduce(stocks, (obj, s) => ({
      ...obj,
      [s.id]: reduce(s.items, (siobj, si) => ({ ...siobj, [si.item.id]: si }), {}),
    }), {});

    flatten(loadouts.map(l => l.items))
      .forEach(item => {
        stocksDict[item.stock.id][item.item.id].quantity -= item.quantity;
      });

    const selectedOptions = loadout.items
      .map(i => (`${i.stock.id}|${i.kind}|${i.item.id}|${i.quantity}`));

    return res.render('loadouts/edit.html', {
      ...loadout._doc,
      selectedOptions,
      veterans,
      stocks,
      kinds,
    });
  }

  async update(req, res) {
    const loadout = await this._dao.read(req.params.id);

    const items = req.body.items
      .map(i => i.split('|'))
      .filter(i => parseInt(i[3], 10))
      .map(([stock, kind, item, quantity]) => ({ stock, kind, item, quantity }));

    try {
      loadout.returned = new Date();
      loadout.save();
      await this._dao.lendItems(loadout.veteran.id, items);
    } catch(e) {
      return await this.new(req, res, { error: e.message, ...req.body });
    }

    return res.send('Ok');
  }
}
