import BaseController, { route } from '~/src/schema/base/controller';
import ReserveDAO from './dao';

export default class ReserveController extends BaseController {
  _controller = ReserveController;
  _dao = ReserveDAO;
  _baseRoute = '/reservas';
  _templatePath = 'reserves';

  @route('get', '/reserve/new')
  new(_, res) {
    return res.render('reserve/new.html');
  }

  @route('get', '/reserve/:id')
  async read(req, res) {
    const reserve = await this._dao.findOne({ id: req.params.id });
    return res.render('reserve/read.html', { reserve });
  }

  @route('get', '/reserve/:id/edit')
  async edit(req, res) {
    const reserve = await this._dao.findOne({ id: req.params.id });
    return res.render('reserve/edit.html', { reserve });
  }
}
