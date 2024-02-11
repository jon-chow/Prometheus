import express from 'express';
import { param } from 'express-validator';
import { getAllSongs, getTopListenedToSongs, getSongById, getAllSongGenres, getAllSongsByGenre } from '../controllers/songs.controllers';

const songsRouter = express.Router();

songsRouter.get('/', getAllSongs);
songsRouter.get('/genres', getAllSongGenres);
songsRouter.get('/top-listened', getTopListenedToSongs);
songsRouter.get('/genre/:id', param('id').isInt({ min: 1 }), getAllSongsByGenre);
songsRouter.get('/:id', param('id').isInt({ min: 1, max: 10000 }), getSongById);

export default songsRouter;
