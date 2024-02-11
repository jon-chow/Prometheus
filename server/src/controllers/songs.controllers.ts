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
    db.query('CALL spGetSongsByGenreId(?)', [id])
      .then((data) => {
        const [genre, songs] = data;
        const genreName = (genre[0] as any).genre;
        if (!genreName) {
          res.status(404).json({ error: `Genre with id ${id} not found` });
          return;
        }
        res.status(200).json({ genre: genreName, count: songs.length, songs });
      })
      .catch((err) => {
        res.status(500).json({ error: `Internal server error: ${err.message}` });
      });
  } else {
    res.status(400).json({ error: errors.array() });
  }
}

export async function getTopListenedToSongs(_req: Request, res: Response) {
  db.query('CALL spGetTopListenedToSongs(5)', [])
    .then((data) => {
      const [songs] = data;
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
