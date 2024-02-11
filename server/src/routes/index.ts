import express, { Express } from 'express';

import songsRouter from './songs.routes';
import artistsRouter from './artists.routes';

const router: Express = express();

router.use('/songs', songsRouter);
router.use('/artists', artistsRouter);

export default router;
