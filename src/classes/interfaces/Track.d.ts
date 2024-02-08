declare enum TrackType {
  Single = 'Single',
  Album = 'Album',
  Playlist = 'Playlist'
}

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
  get thumbnailSource(): string;
}
