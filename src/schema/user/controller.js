import BaseController, { route } from '~/src/schema/base/controller';
import UserDAO from './dao';

export default class UserController extends BaseController {
  constructor() {
    super('user', UserController, UserDAO);
  }

  @route('get', '/user')
  async index(req, res) {
    return res.send('Ok');
  }

}
