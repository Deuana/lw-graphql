import BaseController, { route } from '~/src/schema/base/controller';
import AccessoryDAO from './dao';

export default class AccessoryController extends BaseController {
  _controller = AccessoryController;
  _name = 'accessory';
  _dao = AccessoryDAO;

  @route('get', '/accessory')
  async index(_, res) {
    const accessories = await this._dao.find({});
    return res.render('accessory/index.html', { accessories });
  }

  @route('get', '/accessory/new')
  new(_, res) {
    return res.render('accessory/new.html');
  }

  @route('get', '/accessory/:id')
  async read(req, res) {
    const accessory = await this._dao.findOne({ id: req.params.id });
    return res.render('accessory/read.html', { accessory });
  }

  @route('get', '/accessory/:id/edit')
  async edit(req, res) {
    const accessory = await this._dao.findOne({ id: req.params.id });
    return res.render('accessory/edit.html', { accessory });
  }
}
