import BaseController from '~/src/schema/base/controller';
import UserDAO from './dao';

export default class UserController extends BaseController {
  constructor() {
    super(UserDAO);
  }
}
