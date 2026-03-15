import React, { createContext, useMemo, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu from './components/Menu';
import AnimatedRoutes from './AnimatedRoutes';
import { buildRegistry } from './config/builds';

export const StateContext = createContext();

function createInitialState() {
  return {
    // Shared navigation model used across the shell.
    menuItems: buildRegistry.map((item) => ({
      name: item.name,
      link: item.link,
      active: item.active ?? false,
      path: item.path,
      description: item.description,
      accent: item.accent,
      icon: item.icon,
    })),
    nextJoke: false,
    catagories: [
      'none',
      'animal',
      'career',
      'celebrity',
      'dev',
      'explicit',
      'fashion',
      'food',
      'history',
      'money',
      'movie',
      'music',
      'political',
      'religion',
      'science',
      'sport',
      'travel',
    ],
    activeCat: 'none',
    score: 0,
    motion: {
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -12 },
      transition: { duration: 0.24, ease: 'easeOut' },
    },
    passGen: {
      count: 16,
      upperCase: true,
      lowerCase: true,
      symbols: true,
      numbers: true,
      excludeAmbiguous: true,
      noRepeatChars: false,
      mustIncludeEachSelected: true,
      pass: '',
    },
    catImage: [],
  };
}

function StateManager() {
  const [state, setState] = useState(createInitialState);
  const contextValue = useMemo(() => [state, setState], [state]);

  return (
    <StateContext.Provider value={contextValue}>
      <Router>
        <div className="app-shell">
          <Menu />
          <main className="content_section">
            <AnimatedRoutes />
          </main>
        </div>
      </Router>
    </StateContext.Provider>
  );
}

export default StateManager;
