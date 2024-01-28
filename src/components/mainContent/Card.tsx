import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
import { useStore } from '@nanostores/react';
import { audioStore } from '../../stores/audioStore.store';
import '../../styles/Card.scss';

interface Props {
  track: Track;
  isCurrentTrack?: boolean;
}

const Card = ({ track, isCurrentTrack }: Props) => {
  const $audioState = useStore(audioStore);

  function convertDate(date: Date) {
    return date.toLocaleDateString('en-US');
  }

  const changeToThisTrack = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isCurrentTrack) {
      audioStore.setKey('isPlaying', !$audioState.isPlaying);
    } else {
      audioStore.setKey('currentTrack', track);
      audioStore.setKey('currentTrackIndex', track.order);
      audioStore.setKey('isPlaying', true);
    }
  };

  return (
    <>
      <div role="listitem" className={'card' + (isCurrentTrack ? ' current' : '')}>
        <div className="track-number">{track.order + 1}</div>
        <div className="main-info">
          <div className="art-cover">
            <img src={track.thumbnail.src} loading="lazy" decoding="async" />
            <div className="art-cover-overlay">
              <button className="play-button" onClick={changeToThisTrack}>
                {isCurrentTrack && $audioState.isPlaying ? <BsPauseFill /> : <BsPlayFill />}
              </button>
            </div>
          </div>
          <div className="desc">
            <p className="title">{track.title}</p>
            <div className="sub-info">
              <p className="type">{track.type}</p>•
              <div className="author" title={track.author}>
                <p>{track.author}</p>
              </div>
            </div>
          </div>
        </div>
        <p className="date">{convertDate(track.dateAdded)}</p>
        <p className="length">{track.duration}</p>
      </div>
    </>
  );
};

export default Card;
