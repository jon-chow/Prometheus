import express, { Express } from 'express';
import songsRouter from './songs.routes';

const router: Express = express();

router.use('/songs', songsRouter);

export default router;