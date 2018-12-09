/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable no-console */
import express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';
import { resolve } from 'path';
import logger from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { STATUS_CODES } from 'http';
import dbConfig from './config';
import userRoutes from './routes/user';
import cheatRoutes from './routes/cheats';
import setupAdmin from './seeds/adminSeeder';
import seedCheats from './seeds/cheatSeeder';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const port = env === 'test' ? 5001 : process.env.PORT || 5000;
const config = dbConfig[env];
const app = express();

if (config.use_env_variable) {
  mongoose.connect(
    process.env[config.use_env_variable],
    { useNewUrlParser: true }
  );
} else {
  const {
    prefix,
    host,
    database
  } = config;
  const url = `${prefix}://${host}:${config.port}/${database}`;
  mongoose.connect(url, { useNewUrlParser: true });
}

// use the global promise library for mongoose
mongoose.Promise = global.Promise;

const db = mongoose.connection;

app.use(compression());
app.use(express.static(resolve(__dirname, '../../dist/client')));
app.use(
  '/favicon.ico',
  favicon(resolve(
    __dirname, `../client${env === 'test' ? '/src' : ''}/favicon.ico`
  ))
);

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('x-powered-by');

if (env === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('../../webpack.config.dev'); // eslint-disable-line
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    stats: 'errors-only',
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

// use logger only for development and peoduction
if (env !== 'test') {
  // logger for server requests and responses
  app.use(logger('dev'));
}

app.get('/api', (req, res) => {
  res.status(200).send({
    status: STATUS_CODES[200],
    message: 'Status connected ok'
  });
});

app.use(userRoutes);
app.use(cheatRoutes);

app.use('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../client/index.html'));
});

export const server = app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  db.on('error', console.error.bind(console, 'Error connecting to database'));
  db.once('open', () => {
    console.info('🍺 Database connection established...');
    console.info(`🍺 Server started on ${port}`);
    setupAdmin(() => seedCheats());
  });
});

export default app;
