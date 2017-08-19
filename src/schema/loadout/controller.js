import BaseController, { route } from '~/src/schema/base/controller';
import LoadoutDAO from './dao';

export default class LoadoutController extends BaseController {
  _controller = LoadoutController;
  _dao = LoadoutDAO;
  _baseRoute = '/cautelas';
  _templatePath = 'loadouts';
}
