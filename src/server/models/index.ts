import {
  Sequelize, SequelizeOptions,
} from 'sequelize-typescript';
import { User } from './User';

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'newPassword',
  database: 'gamedev_db',
  models: [User],
  dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);
