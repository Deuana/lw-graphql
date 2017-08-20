import BaseController, { route } from '~/src/schema/base/controller';
import Rank, { groupedRanks } from '~/src/schema/enums/rank';

import VeteranDAO from './dao';

export default class VeteranController extends BaseController {
  _controller = VeteranController;
  _dao = VeteranDAO;
  _baseRoute = '/militares';
  _templatePath = 'veterans';

  async index(_, res, ctx = {}) {
    const veterans = await this._dao.all();
    return res.render('veterans/index.html', { Rank, veterans });
  }

  new(_, res, ctx = {}) {
    return res.render('veterans/new.html', { Rank, groupedRanks, ...ctx });
  }

  async edit(req, res) {
    const veteran = await this._dao.findOne({ id: req.params.id });
    return res.render('veterans/edit.html', { Rank, groupedRanks, ...veteran._doc });
  }
}
