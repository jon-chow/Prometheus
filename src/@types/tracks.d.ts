declare enum TrackType {
  Single = 'Single',
  Album = 'Album',
  Playlist = 'Playlist'
}

interface TrackNoId {
  order: number;
  type: TrackType;
  title: string;
  src: string;
  author: string;
  thumbnail: ImageMetadata;
  dateAdded: Date;
  duration: string;
}

interface Track extends TrackNoId {
  id: string;
}
