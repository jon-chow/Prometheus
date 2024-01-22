import BottomBar from "../components/bottomBar/BottomBar";
import MainContent from "../components/mainContent/MainContent";
import TopBar from "../components/topBar/TopBar";

import { tracks } from '../data/tracks';

interface Props {
  title: string;
}

const App = ({ title }: Props) => {
  return (
    <>
      <div
        role="grid"
        style={{
          maxWidth: "100vw",
          maxHeight: "100vh",
          display: "grid",
          gap: "5px",
          gridTemplate: `
            'topbar' 40px
            'content' calc(100vh - 40px - 10dvh - 10px)
            'bottombar' 7dvh / 1fr
          `
        }}
      >
        <TopBar header={title} />
        <MainContent tracks={tracks} />
        <BottomBar tracks={tracks} />
      </div>
    </>
  );
}

export default App;
