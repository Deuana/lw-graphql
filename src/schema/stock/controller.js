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
    return res.render('stocks/read.html', await this._dao.read(req.params.id));
  }

  @route('get', '/estoques/:id/items/novo')
  async newItem(req, res) {
    const kinds = [
      {
        key: 'Weapon',
        label: 'Arma',
        items: (await WeaponDAO.all()).map(w => ({ ...w, description: w.model })),
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
    return res.redirect(`/estoques/${req.params.id}/items`);
  }
}
