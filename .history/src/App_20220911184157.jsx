import { BrowserRouter } from 'react-router-dom';
import './App.css';
import StateManager from './StateManager';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <StateManager />
    </div>
    </BrowserRouter>
  );
}

export default App;
