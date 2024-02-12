import api from '../api';
import { TrackType, Track } from '../classes/implements/Track';

function convertSecondsToMinutesAndSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export const fetchAllTracks = async (): Promise<Track[]> =>
  api
    .get('/songs')
    .then((response) => {
      if (response.data) {
        return response.data.map((tracks: any, index: number) => {
          return new Track({
            id: tracks.song_id,
            order: index,
            type: TrackType.Single,
            title: tracks.song_title,
            src: tracks.song_src,
            author: tracks.song_artist_name,
            thumbnail: tracks.song_art_cover,
            dateAdded: new Date(tracks.song_date_added),
            duration: convertSecondsToMinutesAndSeconds(tracks.song_duration)
          });
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

export const EMPTY_TRACK: Track = new Track({
  id: 'EMPTY_TRACK',
  order: -1,
  type: TrackType.Single,
  title: 'Song Title',
  src: '',
  author: 'Artist Name',
  thumbnail: 'https://cdn.jsdelivr.net/gh/jon-chow/static@main/assets/prometheus/images/placeholder.png',
  dateAdded: new Date('1970-01-01'),
  duration: '0:00'
});
