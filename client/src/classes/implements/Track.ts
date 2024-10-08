export const TrackType = {
  Single: 'Single',
  Album: 'Album',
  Playlist: 'Playlist'
} as const;

export class Track implements ITrack {
  public order: number;
  public unshuffledOrder: number;
  public readonly type: TrackType;
  public readonly title: string;
  public readonly src: string;
  public readonly author: string;
  public readonly thumbnail: ImageMetadata | string;
  public readonly dateAdded: Date;
  public readonly duration: string;
  public readonly id: string | undefined;

  constructor({ order, unshuffledOrder, type, title, src, author, thumbnail, dateAdded, duration, id = undefined }: ITrack) {
    this.order = order;
    this.unshuffledOrder = unshuffledOrder;
    this.type = type;
    this.title = title;
    this.src = src;
    this.author = author;
    this.thumbnail = thumbnail;
    this.dateAdded = dateAdded;
    this.duration = duration;
    this.id = id;
  }

  public get thumbnailSource(): string {
    if (typeof this.thumbnail === 'string') {
      return this.thumbnail;
    } else {
      return this.thumbnail.src;
    }
  }
}
