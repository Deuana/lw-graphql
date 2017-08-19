import BaseController, { route } from '~/src/schema/base/controller';
import LoadoutDAO from './dao';

export default class LoadoutController extends BaseController {
  _controller = LoadoutController;
  _dao = LoadoutDAO;
  _baseRoute = '/cautelas';
  _templatePath = 'loadouts';

  @route('get', '/cautelas')
  async index(_, res) {
    const loadout = await this._dao.find({});
    return res.render('loadout/index.html', { loadout });
  }

  @route('get', '/cautelas/novo')
  new(_, res) {
    return res.render('loadout/new.html');
  }

  @route('get', '/cautelas/:id')
  async read(req, res) {
    const loadout = await this._dao.findOne({ id: req.params.id });
    return res.render('loadout/read.html', { loadout });
  }

  @route('get', '/cautelas/:id/editar')
  async edit(req, res) {
    const loadout = await this._dao.findOne({ id: req.params.id });
    return res.render('loadout/edit.html', { loadout });
  }
}
