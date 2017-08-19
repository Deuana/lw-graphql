import BaseController, { route } from '~/src/schema/base/controller';
import WeaponDAO from './dao';

export default class WeaponController extends BaseController {
  _controller = WeaponController;
  _dao = WeaponDAO;
  _baseRoute = '/armamentos';
  _templatePath = 'weapons';
}
