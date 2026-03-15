import './App.css';
import './fonts.css';
import './responsive-builds.css';
import './build-uplift.css';
import 'rsuite/dist/rsuite.min.css';
import '@xyflow/react/dist/style.css';
import StateManager from './StateManager';

function App() {
  return (
    <div className="App">
      <StateManager />
    </div>
  );
}

export default App;
