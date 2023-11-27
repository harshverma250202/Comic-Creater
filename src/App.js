import logo from './logo.svg';
import './App.css';
import Mainpage from './pages/Mainpage';
import { PopupProvider } from './utils/ContexApi/PopUpContext';
import { ComicProvider } from './utils/ContexApi/ComicContext';

function App() {
  return (
    <>
      <PopupProvider>
        <ComicProvider>
        <Mainpage />
        </ComicProvider>
      </PopupProvider>
    </>

  );
}

export default App;
