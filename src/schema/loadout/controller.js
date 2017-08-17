import BaseController, { route } from '~/src/schema/base/controller';
import LoadoutDAO from './dao';

export default class LoadoutController extends BaseController {
  constructor() {
    super('loadout', loadoutController, LoadoutDAO);
  }

  @route('get', '/loadout/new')
    new(req, res) {
    return res.render('loadout/new.html');
  }

  @route('get', '/loadout')
  async index(req, res) {
    const loadout = await this._dao.find({});
    return res.render('loadout/index.html', { loadout });
  }

  @route('get', '/loadout/:id')
  async read(req, res) {
    const loadout = await this._dao.findOne({ id: req.params.id });
    return res.render('loadout/read.html', { loadout });
  }
 
  @route('get', '/loadout/:id')
  async edit(req, res) {
    const loadout = await this._dao.findOne({ id: req.params.id });
    return res.render('loadout/index.html', { loadout });
  }
}
