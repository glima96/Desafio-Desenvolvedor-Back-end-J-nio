import { Sequelize } from 'sequelize';

import config from '../config/db';
import { FormAnswer } from '../models/FormAnswer';

const models = [
  FormAnswer,
];

class Database {
  constructor() {
    this.connection = new Sequelize(config);
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
