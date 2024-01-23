import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
import '../../styles/Card.scss';

interface Props {
  track: Track;
  isCurrentTrack?: boolean;
}

const Card = ({ track, isCurrentTrack }: Props) => {
  function convertDate(date: Date) {
    return date.toLocaleDateString('en-US');
  }

  return (
    <>
      <div role="listitem" className={"card" + (isCurrentTrack ? ' current' : '')}>
        <div className="track-number">{track.order + 1}</div>
        <div className="main-info">
          <div className="art-cover">
            <img src={track.thumbnail.src} />
            <div className="art-cover-overlay">
              <button className="play-button" onClick={() => console.log(`To implement playing ${track.title}`)}>
                {/* {(isCurrentTrack && isPlaying) ? <BsPauseFill /> : } */} <BsPlayFill />
              </button>
            </div>
          </div>
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
