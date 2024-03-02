import express, { Express } from 'express';
import { slowDown } from 'express-slow-down';
import cors from 'cors';
import CONFIGS from './configs';
import router from './routes';
import chalk from 'chalk';

const app: Express = express();
const limiter = slowDown({
  windowMs: 1000,
  delayAfter: 5,
  delayMs: (hits) => hits * 100,
  legacyHeaders: false
});

/* -------------------------------------------------------------------------- */
/*                                 MIDDLEWARES                                */
/* -------------------------------------------------------------------------- */
app.use(limiter);
app.use(cors(CONFIGS.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* -------------------------------------------------------------------------- */
app.use(`/api/${CONFIGS.api.version}`, router);

app.listen(CONFIGS.server.port, () => {
  console.log(chalk.blue.bold(`Server is running at http://${CONFIGS.server.host}:${CONFIGS.server.port}`));
});
