
import './App.css';
import StateManager from './StateManager';
import './fonts.css'
import 'rsuite/dist/rsuite.min.css';


// Importing a language
import 'prismjs/components/prism-javascript';

// Importing a theme
import 'prismjs/themes/prism-tomorrow.css';

function App() {
  return (
    <div className="App">
      <StateManager />
    </div>
   
  );
}

export default App;
