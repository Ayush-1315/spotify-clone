import './App.css';
import { Sidebar } from './components/sidebar/sidebar';
import { Main } from './components/mainContainer/main';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <div className='content'>
        <Main/>
      </div>
    </div>
  );
}

export default App;
