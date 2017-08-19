import { pickBy, identity } from 'lodash';

import BaseController, { route } from '~/src/schema/base/controller';
import WeaponDAO from './dao';

export default class WeaponController extends BaseController {
  _controller = WeaponController;
  _name = 'weapon';
  _dao = WeaponDAO;

  @route('get', '/armamentos')
  async index(_, res) {
    const weapons = await this._dao.find({});
    return res.render('weapons/index.html', { weapons });
  }

  @route('get', '/armamentos/novo')
  new(_, res) {
    return res.render('weapons/new.html');
  }

  @route('post', '/armamentos')
  async create(req, res) {
    const { serialNumber, model, manufacturer } = req.body;

    try {
      await this._dao.create(serialNumber, model, manufacturer);
    } catch(e) {
      console.log(e.message);
      return res.status(400).render('weapons/new.html', {
        error: e.message,
        ...req.body,
      });
    }

    res.redirect('/armamentos');
  }

  @route('get', '/armamentos/:id/editar')
  async edit(req, res) {
    const weapon = await this._dao.findOne({ id: req.params.id });
    return res.render('weapons/edit.html', weapon);
  }

  @route('patch', '/armamentos/:id')
  async update(req, res) {
    await this._dao.update(req.params.id, pickBy(req.body, identity));
    return res.send('Ok');
  }

  @route('delete', '/armamentos/:id')
  async delete(req, res) {
    await this._dao.remove({ id: req.params.id });
    return res.send('Ok');
  }
}
