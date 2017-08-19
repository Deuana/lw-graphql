import BaseController, { route } from '~/src/schema/base/controller';
import { noAuth } from '~/src/utils/auth';
import config from '~/src/config';

import UserDAO from './dao';

export default class UserController extends BaseController {
  _controller = UserController;
  _dao = UserDAO;
  _baseRoute = '/usuarios';
  _templatePath = 'users';

  @route('get', '/login', noAuth)
  getLogin(req, res) {
    return res.render('users/login.html');
  }

  @route('post', '/login', noAuth)
  async postLogin(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).render('users/login.html', { error: 'Form.UNFILLED' });
    }

    const user = await this._dao.authenticate(username, password);
    if (!user) {
      return res.status(422).render('users/login.html', { error: 'User.WRONG_CREDENTIALS' });
    }

    res.jwt({ id: user.id, name: user.name });
    res.redirect('/');
  }

  @route('get', '/usuarios/novo')
  async new(req, res) {
    return res.render('users/new.html');
  }

  @route('get', '/usuarios/:id/editar')
  async edit(req, res) {
    const user = await this._dao.findOne({ id: req.params.id });
    return res.render('users/edit.html', user);
  }
}
