import express from 'express';
import { param, validationResult } from 'express-validator';
import { db } from '../database';

const songsRouter = express.Router();

// Get all songs
songsRouter.get('/', async function (_, res) {
  db.query('SELECT * FROM songs', [])
    .then((data) => {
      if (!data) {
        res.status(404).json({ error: 'No songs found' });
        return;
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: `Internal server error: ${err.message}` });
    });
});

// Get song by id
songsRouter.get('/:id', param('id').isInt({ min: 1 }), async function (req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const id = req.params?.id;
    db.query('SELECT * FROM songs WHERE song_id = ?', [id])
      .then((data) => {
        const rows = data[0];
        if (!rows) {
          res.status(404).json({ error: `Song with id ${id} not found` });
          return;
        }
        res.status(200).json(rows);
      })
      .catch((err) => {
        res.status(500).json({ error: `Internal server error: ${err.message}` });
      });
  } else {
    res.status(400).json({ error: errors.array() });
  }
});

export default songsRouter;
