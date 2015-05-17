import { join } from 'path';

export default class Views {
  constructor(app) {
    this.app = app;
  }

  start() {
    this.app.set('views', join(__dirname, '..', 'views'));
    this.app.set('view engine', 'ejs');
  }
}