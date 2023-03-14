import { v4 as uuid } from 'uuid';
import Sequelize, { Model } from 'sequelize';

class FormAnswer extends Model {
  static init(sequelize) {
    super.init({
      id: { type: Sequelize.STRING, primaryKey: true },
      email: { type: Sequelize.STRING, unique: true },
      name: Sequelize.STRING,
      cpf: Sequelize.STRING,
      phone: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    }, {
      sequelize,
      tableName: 'forms_answers',
      underscored: true,
      timestamps: true,
    });

    this.addHook('beforeSave', async (answer) => {
      if (!answer.id) {
        answer.id = uuid();
      }
    });

    return this;
  }
}

export { FormAnswer };
