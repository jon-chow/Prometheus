import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { db } from '../database';

export async function getAllArtists(_req: Request, res: Response) {
  db.query('SELECT * FROM artists', [])
    .then((artists) => {
      if (!artists) {
        res.status(404).json({ error: 'No artists found' });
        return;
      }
      res.status(200).json(artists);
    })
    .catch((err) => {
      res.status(500).json({ error: `Internal server error: ${err.message}` });
    });
}

export async function getArtistById(req: Request, res: Response) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const id = req.params?.id;
    db.query('SELECT * FROM artists WHERE artist_id = ?', [id])
      .then((data) => {
        const artist = data[0];
        if (!artist) {
          res.status(404).json({ error: `Artist with id ${id} not found` });
          return;
        }
        res.status(200).json(artist);
      })
      .catch((err) => {
        res.status(500).json({ error: `Internal server error: ${err.message}` });
      });
  } else {
    res.status(400).json({ error: errors.array() });
  }
}

export async function getAllArtistsByGenre(req: Request, res: Response) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const id = req.params?.id;
    db.query('CALL spGetArtistsByGenreId(?)', [id])
      .then((data) => {
        const [genre, artists] = data;
        const genreName = (genre[0] as any).genre;
        if (!genreName) {
          res.status(404).json({ error: `Genre with id ${id} not found` });
          return;
        }
        res.status(200).json({ genre: genreName, count: artists.length, artists });
      })
      .catch((err) => {
        res.status(500).json({ error: `Internal server error: ${err.message}` });
      });
  } else {
    res.status(400).json({ error: errors.array() });
  }
}
