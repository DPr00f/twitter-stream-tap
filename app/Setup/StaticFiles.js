import express from 'express';
import { join } from 'path';

export default class StaticFiles {
  constructor(app) {
    this.app = app;
  }

  start() {
    this.app.use(express.static(join(__dirname, '..', '..', 'public')));
  }
}