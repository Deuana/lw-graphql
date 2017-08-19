import BaseController, { route } from '~/src/schema/base/controller';
import AmmoDAO from './dao';

export default class AmmoController extends BaseController {
  _controller = AmmoController;
  _dao = AmmoDAO;
  _baseRoute = '/municoes';
  _templatePath = 'ammo';

  @route('get', '/ammo/new')
  new(_, res) {
    return res.render('ammo/new.html');
  }

  @route('get', '/ammo/:id')
  async read(req, res) {
    const ammo = await this._dao.findOne({ id: req.params.id });
    return res.render('ammo/read.html', { ammo });
  }

  @route('get', '/ammo/:id/edit')
  async edit(req, res) {
    const ammo = await this._dao.findOne({ id: req.params.id });
    return res.render('ammo/edit.html', { ammo });
  }
}
