import BaseController, { route } from '~/src/schema/base/controller';
import AmmoDAO from './dao';

export default class AmmoController extends BaseController {
  _controller = AmmoController;
  _dao = AmmoDAO;
  _baseRoute = '/municoes';
  _templatePath = 'ammo';
}
