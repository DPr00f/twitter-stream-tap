module.exports = class Routes {
  constructor(app) {
    this.app = app;
  }

  start() {
    let app = this.app;
    app.get('/', (req, res)=> {
      res.send('hello world');
    });
  }
};