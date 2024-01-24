import { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { audioStore } from '../../stores/audioStore.store';
import '../../styles/MainContent.scss';

import Card from './Card';

interface Props {
  tracks: Track[];
}

const MainDisplay = ({ tracks }: Props) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  const $audioState = useStore(audioStore);

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
      if (newLeftWidth < 18) elements.forEach((element) => ((element as HTMLElement).style.display = 'none'));
      else elements.forEach((element) => ((element as HTMLElement).style.display = 'block'));
    }

    function mouseUpHandler() {
      document.body.style.removeProperty('cursor');
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    resizerRef.current.addEventListener('mousedown', mouseDownHandler);
  });

  return (
    <>
      <div className="main">
        <div className="sidebar" ref={sidebarRef}>
          <ul>
            <li className="headers">
              <div className="order">#</div>
              <div className="title">Title</div>
              <div className="date">Date Added</div>
              <div className="length">Track Length</div>
            </li>
            <div className="divider"></div>
            {tracks.map((track, i) => {
              return (
                <li key={track.src}>
                  <Card
                    track={track}
                    isCurrentTrack={$audioState.currentTrackIndex === i}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="resizer" ref={resizerRef} />
        <div className="content">
          <div className="background">
            <img src={tracks[$audioState.currentTrackIndex].thumbnail.src} />
            <div className="overlay" />
          </div>
          <div className="main-content">
            
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDisplay;
