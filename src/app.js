import express from 'express';

import './database';
import { router } from './routes';

class App {
  constructor() {
    this.server = express();
    this.server.use(express.json());
    this.routes();
  }

  routes() {
    this.server.use(router);
  }
}

export default new App().server;
