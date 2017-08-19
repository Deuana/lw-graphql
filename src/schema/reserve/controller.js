import BaseController, { route } from '~/src/schema/base/controller';
import ReserveDAO from './dao';

export default class ReserveController extends BaseController {
  _controller = ReserveController;
  _dao = ReserveDAO;
  _baseRoute = '/reservas';
  _templatePath = 'reserves';
}
