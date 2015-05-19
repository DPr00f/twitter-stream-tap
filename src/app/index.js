import express from "express";
import './helpers/console';
import Setup from './Setup';
import Routes from './Routes';

var app = express();
var setup = new Setup(app);
var routes = new Routes(app);

setup.start();
routes.start();
