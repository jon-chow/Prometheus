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
    let genre = '';

    // First check if the genre exists
    db.query('SELECT genre_name FROM genres WHERE genre_id = ?', [id]).then((data) => {
      const rows = data[0];
      if (!rows) {
        res.status(404).json({ error: `Genre with id ${id} not found` });
        return;
      }

      // Then query for the artists
      genre = JSON.parse(JSON.stringify(rows)).genre_name;
      db.query('SELECT * FROM artists WHERE artist_main_genre = ?', [id])
        .then((artists) => {
          if (!artists) {
            res.status(404).json({ error: `No '${genre}' artists found` });
            return;
          }
          res.status(200).json({ genre, artists });
        })
        .catch((err) => {
          res.status(500).json({ error: `Internal server error: ${err.message}` });
        });
    });
  } else {
    res.status(400).json({ error: errors.array() });
  }
}