import logo from './logo.svg';
import './App.css';
import Mainpage from './pages/Mainpage';
import { PopupProvider } from './utils/ContexApi/PopUpContext';

function App() {
  return (
    <>
      <PopupProvider>
        <Mainpage />
      </PopupProvider>
    </>

  );
}

export default App;
