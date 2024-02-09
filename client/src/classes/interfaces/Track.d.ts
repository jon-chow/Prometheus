declare const TrackType = {
  Single: 'Single',
  Album: 'Album',
  Playlist: 'Playlist'
} as const;
type TrackType = typeof TrackType[keyof typeof TrackType];

interface ITrack {
  order: number;
  type: TrackType;
  title: string;
  src: string;
  author: string;
  thumbnail: ImageMetadata | string;
  dateAdded: Date;
  duration: string;
  id?: string | undefined;
}
