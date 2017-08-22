import BaseController, { route } from '~/src/schema/base/controller';
import { WeaponDAO } from '~/src/schema/weapon';
import { AmmoDAO } from '~/src/schema/ammo';
import { AccessoryDAO } from '~/src/schema/accessory';

import StockDAO from './dao';

export default class StockController extends BaseController {
  _controller = StockController;
  _dao = StockDAO;
  _baseRoute = '/estoques';
  _templatePath = 'stocks';

  @route('get', '/estoques/novo')
  async newStock(_, res, ctx = {}) {
    return res.render(`${this._templatePath}/new.html`, ctx);
  }

  async index(req, res) {
    const buildLink = (id, description) => (
      `<a href="/estoques/${id}">${description}</a>`
    );
    const stocks = (await this._dao.all())
      .map(({ id, description }) => ({
        description: buildLink(id, description),
        id,
      }));
    return res.render('stocks/index.html', { stocks });
  }

  @route('get', '/estoques/:id')
  async read(req, res) {
    const stock = await this._dao.read(req.params.id);
    stock.items
      .filter(i => i.kind === 'Weapon')
      .forEach(({ item }) => { item.description = `${item.manufacturer} - ${item.model}` });

    return res.render('stocks/read.html', stock);
  }

  @route('get', '/estoques/:id/items/novo')
  async newItem(req, res) {
    const kinds = [
      {
        key: 'Weapon',
        label: 'Arma',
        items: (await WeaponDAO.all()).map(w => ({ ...w._doc, description: w.model })),
      },
      { key: 'Ammo', label: 'Munição', items: await AmmoDAO.all() },
      { key: 'Accessory', label: 'Acessório', items: await AccessoryDAO.all() },
    ];
    return res.render('stocks/newItem.html', { stockId: req.params.id, kinds });
  }

  @route('post', '/estoques/:id/items')
  async addItem(req, res) {
    const [kind, id] = req.body.item.split('|');
    const { quantity } = req.body;
    await this._dao.addItem(req.params.id, { kind, id, quantity });
    return res.redirect(`/estoques/${req.params.id}`);
  }

  @route('get', '/estoques/:id/items/:itemId/editar')
  async editItem(req, res) {
    const kinds = [
      {
        key: 'Weapon',
        label: 'Arma',
        items: (await WeaponDAO.all()).map(w => ({ ...w._doc, description: w.model })),
      },
      { key: 'Ammo', label: 'Munição', items: await AmmoDAO.all() },
      { key: 'Accessory', label: 'Acessório', items: await AccessoryDAO.all() },
    ];
    const { id, itemId } = req.params;
    const stock = await this._dao.read(id);
    const item = stock.items.find(i => i.id === itemId);
    return res.render('stocks/editItem.html', { stockId: id, kinds, ...item._doc });
  }

  @route('patch', '/estoques/:id/items/:itemId')
  async updateItem(req, res) {
    const stock = await this._dao.findOne({ id: req.params.id });

    const { item, quantity } = req.body;
    const [kind, id] = item.split('|');

    stock.items
      .filter(i => i.id === req.params.itemId)
      .forEach(i => Object.assign(i, { item: id, kind, quantity }));

    return res.send(await stock.save());
  }
}
