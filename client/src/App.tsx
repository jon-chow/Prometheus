import BottomBar from './components/BottomBar';
import MainContent from './components/MainContent';
import TopBar from './components/TopBar';
import AudioContextProvider from './contexts/AudioContext';

interface Props {
  title: string;
}

const App = ({ title }: Props) => {
  return (
    <AudioContextProvider>
      <div id="root">
        <TopBar header={title} />
        <MainContent />
        <BottomBar />
      </div>
    </AudioContextProvider>
  );
};

export default App;
