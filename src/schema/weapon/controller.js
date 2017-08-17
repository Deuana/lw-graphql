import BaseController, { route } from '~/src/schema/base/controller';
import WeaponDAO from './dao';

export default class WeaponController extends BaseController {
  _controller = WeaponController;
  _name = 'weapon';
  _dao = WeaponDAO;

  @route('get', '/weapon')
  async index(_, res) {
    const weapons = await this._dao.find({});
    return res.render('weapon/index.html', { weapons });
  }

  @route('get', '/weapon/new')
  new(_, res) {
    return res.render('weapon/new.html');
  }

  @route('get', '/weapon/:id')
  async read(req, res) {
    const weapon = await this._dao.findOne({ id: req.params.id });
    return res.render('weapon/read.html', { weapon });
  }

  @route('get', '/weapon/:id/edit')
  async edit(req, res) {
    const weapon = await this._dao.findOne({ id: req.params.id });
    return res.render('weapon/edit.html', { weapon });
  }
}
