import express from "express";
import './helpers/console';
import Setup from './Setup';
import Routes from './Routes';

let app = express();
let setup = new Setup(app);
let routes = new Routes(app);

setup.start();
routes.start();