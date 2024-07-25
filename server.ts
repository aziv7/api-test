import express, { Express } from 'express';
import { envs } from './config';
import helmet from 'helmet';
import cors from 'cors';

import appRoutes from './routes';

const app: Express = express();

app.use(helmet());

app.use(cors({ origin: '*' }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', appRoutes);

app.listen(envs.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${envs.PORT}`);
});
