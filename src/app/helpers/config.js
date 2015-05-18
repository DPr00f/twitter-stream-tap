import merge from "merge";
import fs from "fs";
import path from "path";
import "colors";

function loadConfig () {
  var config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'config.json')));
  try{
    var stats = fs.lstatSync(path.join(__dirname, '..', '..', 'config.private.json'));

    if( stats.isFile() ){
        config = merge(config, JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'config.private.json'))));
    }
  }catch(e){}

  return config;
}

var config = loadConfig();
config.reload = function configReload(){
  config = loadConfig();
  return config;
};

module.exports = config;