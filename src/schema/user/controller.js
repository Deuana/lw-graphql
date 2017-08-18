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
      res.status(400).render('user/login.html', { error: 'Form.UNFILLED' });
    }

    const user = await this._dao.authenticate(username, password);
    if (!user) {
      return res.status(422).render('user/login.html', { error: 'User.WRONG_CREDENTIALS' });
    }

    res.jwt({ id: user.id, name: user.name });
    res.redirect('/');
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
