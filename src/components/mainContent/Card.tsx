import '../../styles/Card.scss';

interface Props {
  track: Track;
  isCurrent?: boolean;
}

const Card = ({ track, isCurrent }: Props) => {
  function convertDate(date: Date) {
    return date.toLocaleDateString('en-US');
  }

  return (
    <>
      <div role="listitem" className={"card" + (isCurrent ? ' current' : '')}>
        <div className="track-number">{track.order + 1}</div>
        <div className="main-info">
          <img role="img" className="icon" src={track.thumbnail.src} />
          <div className="desc">
            <p className="title">{track.title}</p>
            <p className="type">{track.type} • {track.author}</p>
          </div>
        </div>
        <p className="date">{convertDate(track.dateAdded)}</p>
        <p className="length">{track.duration}</p>
      </div>
    </>
  );
};

export default Card;
