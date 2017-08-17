import BaseController, { route } from '~/src/schema/base/controller';
import { noAuth } from '~/src/utils/auth';

import UserDAO from './dao';

export default class UserController extends BaseController {
  _controller = UserController;
  _name = 'user';
  _dao = UserDAO;

  @route('post', '/login', noAuth)
  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error('400:Form.UNFILLED');
    }

    const user = await this._dao.authenticate(username, password);
    if (!user) {
      throw new Error('422:User.WRONG_CREDENTIALS');
    }

    const jwt = res.jwt({ id: user.id, name: user.name });
    res.send(jwt.token);
  }

  @route('get', '/user')
  async new(req, res) {
    const users = await this._dao.find({});
    return res.render('users/index.html', { users });
  }

  @route('get', '/user/:id')
  async read(req, res) {
    const user = await this._dao.findOne({ id: req.params.id });
    return res.render('users/read.html', { user });
  }
}
