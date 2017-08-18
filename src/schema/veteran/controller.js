import BaseController, { route } from '~/src/schema/base/controller';
import VeteranDAO from './dao';

export default class VeteranController extends BaseController {
  _controller = VeteranController;
  _name = 'veteran';
  _dao = VeteranDAO;

  @route('get', '/veteran')
  async index(_, res) {
    const veteran = await this._dao.find({});
    return res.render('veteran/index.html', { veteran });
  }

  @route('get', '/veteran/new')
  new(_, res) {
    return res.render('veteran/new.html');
  }

  @route('get', '/veteran/:id')
  async read(req, res) {
    const veteran = await this._dao.findOne({ id: req.params.id });
    return res.render('veteran/read.html', { veteran });
  }

  @route('get', '/veteran/:id/edit')
  async edit(req, res) {
    const veteran = await this._dao.findOne({ id: req.params.id });
    return res.render('veteran/edit.html', { veteran });
  }
}
