import { BsPlayFill, BsPauseFill, BsSoundwave } from 'react-icons/bs';
import { useStore } from '@nanostores/react';
import { audioStore } from '../../stores/audioStore.store';
import './Card.scss';
import type { Track } from '../../classes/implements/Track';

export interface CardProps {
  track: Track;
  isCurrentTrack?: boolean;
}

const Card = ({ track, isCurrentTrack }: CardProps) => {
  const $audioState = useStore(audioStore);

  function convertDate(date: Date) {
    return date.toLocaleDateString('en-US');
  }

  const changeToThisTrack = (e: React.MouseEvent) => {
    if (isCurrentTrack) {
      audioStore.setKey('isPlaying', !$audioState.isPlaying);
    } else {
      audioStore.setKey('currentTrack', track);
      audioStore.setKey('currentTrackIndex', track.order);
      audioStore.setKey('isPlaying', true);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    changeToThisTrack(e);
  }

  return (
    <>
      <div className="card" data-current={isCurrentTrack} onDoubleClick={handleDoubleClick}>
        <div className="track-number">
          {($audioState.isPlaying && isCurrentTrack) ? <BsSoundwave /> : track.order + 1}
        </div>
        <div className="main-info">
          <div className="art-cover">
            <img src={track.thumbnailSource} loading="lazy" decoding="async" />
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
