import Server from './Server';
import StaticFiles from './StaticFiles';
import Views from './Views';
import config from '../helpers/config';

export default class Setup {
  constructor(app) {
    this.app = app;
    this.setup();
  }

  setup() {
    this.server = new Server(this.app);
    this.staticFiles = new StaticFiles(this.app);
    this.views = new Views(this.app);
  }

  start() {
    this.server.start(config.port);
    this.staticFiles.start();
    this.views.start();
  }
}