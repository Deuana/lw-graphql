import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import config from '~/src/config';
import BaseDAO from '~/src/schema/base/dao';

export default class UserDAO extends BaseDAO {
  static _model = mongoose.model('User', new mongoose.Schema({
    id: { type: String, index: true },
    username: { type: String, index: true },
    name: String,
    email: String,
    passwordHash: String,
  }));

  static async authenticate(username, password) {
    const user = await this._model.findOne({ username });
    const match = user && await bcrypt.compare(password, user.passwordHash);
    return match && user;
  }

  static async create(name, email, username, password) {
    if (!name || !email || !username || !password) {
      throw new Error('Form.UNFILLED');
    }

    const user = await this._model.findOne({ username });
    if (user) {
      throw new Error('User.ALREADY_EXISTS');
    }

    const passwordHash = await bcrypt.hash(password, config.BCRYPT_SALT_ROUNDS);
    const instance = new this._model({ name, email, username, passwordHash });
    instance.id = instance._id;

    return await instance.save();
  }
}
