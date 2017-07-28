export default class BaseDAO {
  static _model = {};

  static findOne(args) {
    return this._model.findOne(args).exec();
  }
}

