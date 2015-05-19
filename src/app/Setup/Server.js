export default class Server {
  constructor(app) {
    this.app = app;
  }

  start(serverPort = 3000) {
    let server = this.app.listen(serverPort, ()=> {
      console.log(this);
      
      let host = server.address().address;
      let port = server.address().port;

      console.info(`Server started http://${host}:${port}`);
    });
  }
}
