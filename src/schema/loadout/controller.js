import BaseController, { route } from '~/src/schema/base/controller';
import LoadoutDAO from './dao';

export default class LoadoutController extends BaseController {
  _controller = LoadoutController;
  _name = 'loadout';
  _dao = LoadoutDAO;

  @route('get', '/loadout')
  async index(_, res) {
    const loadout = await this._dao.find({});
    return res.render('loadout/index.html', { loadout });
  }

  @route('get', '/loadout/new')
  new(_, res) {
    return res.render('loadout/new.html');
  }

  @route('get', '/loadout/:id')
  async read(req, res) {
    const loadout = await this._dao.findOne({ id: req.params.id });
    return res.render('loadout/read.html', { loadout });
  }

  @route('get', '/loadout/:id/edit')
  async edit(req, res) {
    const loadout = await this._dao.findOne({ id: req.params.id });
    return res.render('loadout/edit.html', { loadout });
  }
}
