import express from 'express';
import { param } from 'express-validator';
import { getAllArtists, getAllArtistsByGenre, getArtistById } from '../controllers/artists.controllers';

const artistsRouter = express.Router();

artistsRouter.get('/', getAllArtists);
artistsRouter.get('/genre/:id', param('id').isInt({ min: 1 }), getAllArtistsByGenre);
artistsRouter.get('/:id', param('id').isInt({ min: 1, max: 10000 }), getArtistById);

export default artistsRouter;
