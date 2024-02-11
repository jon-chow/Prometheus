import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { db } from '../database';

export async function getAllSongs(_req: Request, res: Response) {
  db.query('SELECT * FROM songs', [])
    .then((songs) => {
      if (!songs) {
        res.status(404).json({ error: 'No songs found' });
        return;
      }
      res.status(200).json(songs);
    })
    .catch((err) => {
      res.status(500).json({ error: `Internal server error: ${err.message}` });
    });
}

export async function getSongById(req: Request, res: Response) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const id = req.params?.id;
    db.query('SELECT * FROM songs WHERE song_id = ?', [id])
      .then((data) => {
        const song = data[0];
        if (!song) {
          res.status(404).json({ error: `Song with id ${id} not found` });
          return;
        }
        res.status(200).json(song);
      })
      .catch((err) => {
        res.status(500).json({ error: `Internal server error: ${err.message}` });
      });
  } else {
    res.status(400).json({ error: errors.array() });
  }
}

export async function getAllSongGenres(_req: Request, res: Response) {
  db.query('SELECT * FROM genres', [])
    .then((genres) => {
      if (!genres) {
        res.status(404).json({ error: 'No genres found' });
        return;
      }
      res.status(200).json(genres);
    })
    .catch((err) => {
      res.status(500).json({ error: `Internal server error: ${err.message}` });
    });
}

export async function getAllSongsByGenre(req: Request, res: Response) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const id = req.params?.id;
    let genre = '';

    // First check if the genre exists
    db.query('SELECT genre_name FROM genres WHERE genre_id = ?', [id]).then(
      (data) => {
        const rows = data[0];
        if (!rows) {
          res.status(404).json({ error: `Genre with id ${id} not found` });
          return;
        }

        // Then query for the songs
        genre = JSON.parse(JSON.stringify(rows)).genre_name;
        db.query('SELECT * FROM songs WHERE song_genre = ?', [id])
          .then((songs) => {
            if (!songs) {
              res.status(404).json({ error: `No '${genre}' songs found` });
              return;
            }
            res.status(200).json({ genre, songs });
          })
          .catch((err) => {
            res.status(500).json({ error: `Internal server error: ${err.message}` });
          });
      }
    )
  } else {
    res.status(400).json({ error: errors.array() });
  }
}

export async function getMostListenedSongs(_req: Request, res: Response) {
  db.query('SELECT * FROM songs ORDER BY song_listens DESC LIMIT 10', [])
    .then((songs) => {
      if (!songs) {
        res.status(404).json({ error: 'No songs found' });
        return;
      }
      res.status(200).json(songs);
    })
    .catch((err) => {
      res.status(500).json({ error: `Internal server error: ${err.message}` });
    });
}
