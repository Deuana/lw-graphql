import { pickBy, identity } from 'lodash';
import { userLogged } from '~/src/utils/auth';

export const route = (method, path, auth = userLogged) => (
  (target, property, descriptor) => {
    async function get(req, res) {
      try {
        auth(req);
        await descriptor.value.bind(this)(req, res);
      } catch(e) {
        const [code, message] = e.message.split(':');
        res.status(code).send(message);
      }
    }
    get.route = path;
    get.method = method;
    return { get };
  }
);

export default class BaseController {
  buildRoutes(app) {
    const { prototype } = this._controller;
    Object.getOwnPropertyNames(prototype)
      .map(methodName => Object.getOwnPropertyDescriptor(prototype, methodName))
      .filter(descriptor => descriptor.get)
      .forEach(({ get }) => app[get.method](get.route, get.bind(this)));

    const baseRoute = this._baseRoute;
    app.post(baseRoute, this.create.bind(this));
    app.patch(`${baseRoute}/:id`, this.update.bind(this));
    app.delete(`${baseRoute}/:id`, this.delete.bind(this));
  }

  async create(req, res) {
    try {
      await this._dao.create(req.body);
    } catch(e) {
      return res.status(400).render(`${this._templatePath}/new.html`, {
        error: e.message,
        ...req.body,
      });
    }

    res.redirect(this._baseRoute);
  }

  async update(req, res) {
    const args = pickBy(req.body, identity);
    return res.json(await this._dao.update(req.params.id, args));
  }

  async delete(req, res) {
    return res.json(await this._dao.remove({ id: req.params.id }));
  }
}
