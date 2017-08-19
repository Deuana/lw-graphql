import BaseController, { route } from '~/src/schema/base/controller';
import VeteranDAO from './dao';

export default class VeteranController extends BaseController {
  _controller = VeteranController;
  _dao = VeteranDAO;
  _baseRoute = '/militares';
  _templatePath = 'veterans';
}
