export default class BaseController {
  constructor(dao) {
    this._dao = dao;
  }

  create(args) {
    return this._dao.create(args);
  }

  read(id) {
    return this._dao.findOne({ id });
  }

  update(id, patch) {
    return this._dao.update(id, patch);
  }

  delete(id) {
    return this._dao.remove(id);
  }
}
