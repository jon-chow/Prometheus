import { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { audioStore } from '../../stores/audioStore.store';
import './MainContent.scss';

import Card from '../Card';
import { EMPTY_TRACK } from '../../data/tracks';
import Visualizer from './Visualizer';

export interface MainContentProps {}

const MainDisplay = ({}: MainContentProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  const $audioState = useStore(audioStore);

  const handleCardDisplay = () => {
    return $audioState.searchTerm === null || $audioState.searchTerm === ''
      ? $audioState.trackList.map((track, i) => (
          <Card key={track.src} track={track} isCurrentTrack={$audioState.currentTrackIndex === $audioState.trackList.indexOf(track)} />
        ))
      : $audioState.trackList
          .filter((track) => track.title.toLowerCase().includes($audioState.searchTerm!.toLowerCase()) || track.author.toLowerCase().includes($audioState.searchTerm!.toLowerCase()))
          .map((track) => <Card key={track.src} track={track} isCurrentTrack={$audioState.currentTrackIndex === $audioState.trackList.indexOf(track)} />);
  };

  useEffect(() => {
    if (!resizerRef.current) return;
    let x = 0;
    let leftWidth = 0;

    function mouseDownHandler(e: MouseEvent) {
      if (!sidebarRef.current) return;
      x = e.clientX;
      leftWidth = sidebarRef.current.getBoundingClientRect().width;

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }

    function mouseMoveHandler(e: MouseEvent) {
      if (!sidebarRef.current || !resizerRef.current) return;
      const dx = e.clientX - x;
      const newLeftWidth = ((leftWidth + dx) * 100) / (resizerRef.current.parentElement as HTMLElement).getBoundingClientRect().width;
      sidebarRef.current.style.width = newLeftWidth + '%';
      document.body.style.cursor = 'col-resize';

      const elements = [...document.getElementsByClassName('date'), ...document.getElementsByClassName('length')];
      if (newLeftWidth < 20) elements.forEach((element) => ((element as HTMLElement).style.display = 'none'));
      else elements.forEach((element) => ((element as HTMLElement).style.display = 'block'));
    }

    function mouseUpHandler() {
      document.body.style.removeProperty('cursor');
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    resizerRef.current.addEventListener('mousedown', mouseDownHandler);

    return () => {
      if (resizerRef.current) resizerRef.current.removeEventListener('mousedown', mouseDownHandler);
    };
  });

  return (
    <>
      <div className="main">
        <div className="sidebar" ref={sidebarRef}>
          <ul className="headers">
            <li>
              <div className="order">#</div>
              <div className="title">Title</div>
              <div className="date">Date Added</div>
              <div className="length">Track Length</div>
            </li>
            <div className="divider" />
          </ul>
          <div className="tracklist">
            {$audioState.isFetching ? <p>Loading tracks...</p> : $audioState.trackList ? handleCardDisplay() : <p>No tracks found</p>}
          </div>
        </div>
        <div className="resizer" ref={resizerRef} />
        <div className="content">
          <div className="visualizer">
            <Visualizer />
          </div>
          <div className="container">
            <div className="banner">
              <img
                className="art-cover"
                data-playing={$audioState.isPlaying}
                src={
                  $audioState.currentTrackIndex !== null ? $audioState.trackList[$audioState.currentTrackIndex].thumbnailSource : EMPTY_TRACK.thumbnailSource
                }
                loading="lazy"
                decoding="async"
              />
              <div className="text">
                <h2>{$audioState.currentTrackIndex !== null ? $audioState.trackList[$audioState.currentTrackIndex].title : EMPTY_TRACK.title}</h2>
                <h4>
                  {$audioState.currentTrackIndex !== null ? $audioState.trackList[$audioState.currentTrackIndex].type : EMPTY_TRACK.type}&nbsp;•&nbsp;
                  {$audioState.currentTrackIndex !== null ? $audioState.trackList[$audioState.currentTrackIndex].author : EMPTY_TRACK.author}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDisplay;
