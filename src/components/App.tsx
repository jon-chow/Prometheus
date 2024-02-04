import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { audioStore } from '../stores/audioStore.store';

import BottomBar from './bottomBar/BottomBar';
import MainContent from './mainContent/MainContent';
import TopBar from './topBar/TopBar';

import { tracks } from '../data/tracks';

interface Props {
  title: string;
}

const App = ({ title }: Props) => {
  const $audioState = useStore(audioStore);

  // Shuffle
  useEffect(() => {
    if (audioStore.get().isShuffle) {
      const shuffled = [...tracks];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      shuffled.forEach((track) => (track.order = shuffled.indexOf(track)));
      audioStore.setKey('trackList', shuffled);
    } else {
      tracks.forEach((track) => (track.order = tracks.indexOf(track)));
      audioStore.setKey('trackList', tracks);
    }
  }, [$audioState.isShuffle]);

  return (
    <>
      <div
        role="grid"
        style={{
          maxWidth: '100vw',
          maxHeight: '100vh',
          display: 'grid',
          gap: '5px',
          gridTemplate: `
            'topbar' 40px
            'content' calc(100vh - 40px - 10dvh - 10px)
            'bottombar' 7dvh / 1fr
          `
        }}
      >
        <TopBar header={title} />
        <MainContent />
        <BottomBar />
      </div>
    </>
  );
};

export default App;
