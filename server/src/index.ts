import express, { Express } from 'express';
import CONFIGS from './configs';
import router from './routes';
import chalk from 'chalk';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(`/api/${CONFIGS.api.version}`, router);

app.listen(CONFIGS.server.port, () => {
  console.log(chalk.blue.bold(`Server is running at http://${CONFIGS.server.host}:${CONFIGS.server.port}`));
});
