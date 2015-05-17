import config from "./config";

console.error = function consoleError() {
  var toWrite = ['[FATAL]'.bold.red];
  for(var i in arguments){
    if(arguments[i]){
      if(typeof arguments[i] === 'string'){
         toWrite.push(arguments[i].red);
         continue;
      }
      toWrite.push(arguments[i]);
    }
  }
  console.log.apply(console, toWrite);
};

console.debug = function consoleDebug() {
  if(config.log.debug) {
    var toWrite = ['[Debug]'.bold.blue];
    for(var i in arguments){
      if(arguments[i]){
        if(typeof arguments[i] === 'string'){
         toWrite.push(arguments[i].blue);
         continue;
        }
        toWrite.push(arguments[i]);
      }
    }
    console.log.apply(console, toWrite);
  }
};

console.info = function consoleInfo() {
  if(config.log.info) {
    var toWrite = ['[Info]'.bold.blue];
    for(var i in arguments){
      if(arguments[i]){
        if(typeof arguments[i] === 'string'){
         toWrite.push(arguments[i].blue);
         continue;
        }
        toWrite.push(arguments[i]);
      }
    }
    console.log.apply(console, toWrite);
  }
};