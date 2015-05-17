import Server from './Server';
import config from '../helpers/config';

module.exports = class Setup {
  constructor(app) {
    this.app = app;
    this.setup();
  }

  setup() {
    this.server = new Server(this.app);
  }

  start() {
    this.server.start(config.port);
  }
};