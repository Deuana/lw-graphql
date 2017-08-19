import BaseController, { route } from '~/src/schema/base/controller';
import WeaponDAO from './dao';

export default class WeaponController extends BaseController {
  _controller = WeaponController;
  _dao = WeaponDAO;
  _baseRoute = '/armamentos';
  _templatePath = 'weapons';

  @route('get', '/armamentos/novo')
  new(_, res) {
    return res.render('weapons/new.html');
  }

  @route('get', '/armamentos/:id/editar')
  async edit(req, res) {
    const weapon = await this._dao.findOne({ id: req.params.id });
    return res.render('weapons/edit.html', weapon);
  }
}
