import './App.css';
import { Sidebar } from './components/sidebar/sidebar';
import { Main } from './components/mainContainer/main';
import { MusicPlayer } from './components/musicPlayer/musicPlayer';
import { useData } from './context/dataContext';

function App() {
  const {dataState}=useData();
  const {currentlyPlaying}=dataState;

  return (
    <div className="App">
      <Sidebar/>
      <div className='content'>
        <Main/>
      </div>
      <MusicPlayer/>
    </div>
  );
}

export default App;
