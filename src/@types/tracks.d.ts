declare enum TrackType {
  Single = 'Single',
  Album = 'Album',
  Playlist = 'Playlist'
}

interface Track {
  order: number;
  type: TrackType;
  title: string;
  src: string;
  author: string;
  thumbnail: ImageMetadata;
  dateAdded: Date;
  duration: string;
}
