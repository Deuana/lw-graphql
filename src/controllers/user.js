import { UserDAO } from '~/src/schema/user';

export default UserController extends BaseController {
  static _model = 'user';
  static _dao = UserDAO;
}
