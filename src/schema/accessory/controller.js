import BaseController, { route } from '~/src/schema/base/controller';
import AccessoryDAO from './dao';

export default class AccessoryController extends BaseController {
  constructor() {
    super('accessory', AccessoryController, AccessoryDAO);
  }
  
  @route('get', '/accessory/new')
    new(req, res) {
    return res.render('accessory/new.html');
  }

  @route('get', '/accessory')
  async index(req, res) {
    const accessory = await this._dao.find({});
    return res.render('accessory/index.html', { accessory });
  }

  @route('get', '/accessory/:id')
  async read(req, res) {
    const accessory = await this._dao.findOne({ id: req.params.id });
    return res.render('accessory/read.html', { accessory });
  }  

  @route('get', '/accessory/:id')
  async edit(req, res) {
    const accessory = await this._dao.findOne({ id: req.params.id });
    return res.render('accessory/index.html', { accessory });
  }
}
