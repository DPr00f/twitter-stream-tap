module.exports = class Server {
  constructor(app) {
    this.app = app;
  }

  start(serverPort = 3000) {
    var server = this.app.listen(serverPort, ()=> {
      var host = server.address().address;
      var port = server.address().port;

      console.info(`Server started http://${host}:${port}`);
    });
  }
};