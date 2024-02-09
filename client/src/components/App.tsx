import BottomBar from './bottomBar/BottomBar';
import MainContent from './mainContent/MainContent';
import TopBar from './topBar/TopBar';
import AudioContextProvider from '../contexts/AudioContext';

interface Props {
  title: string;
}

const App = ({ title }: Props) => {
  return (
    <AudioContextProvider>
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
    </AudioContextProvider>
  );
};

export default App;
