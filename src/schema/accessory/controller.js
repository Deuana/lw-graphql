import BaseController, { route } from '~/src/schema/base/controller';
import AccessoryDAO from './dao';

export default class AccessoryController extends BaseController {
  _controller = AccessoryController;
  _dao = AccessoryDAO;
  _baseRoute = '/acessorios';
  _templatePath = 'accessories';
}
