import BaseController, { route } from '~/src/schema/base/controller';
import UserDAO from './dao';

export default class UserController extends BaseController {
  constructor() {
    super('user', UserController, UserDAO);
  }

  @route('get', '/user')
  async index(req, res) {
    const users = await this._dao.find({});
    return res.render('users/index.html', { users });
  }

  @route('get', '/user/:id')
  async read(req, res) {
    const user = await this._dao.findOne({ id: req.params.id });
    return res.render('users/read.html', { user });
  }
}
