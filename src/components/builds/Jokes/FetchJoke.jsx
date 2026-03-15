import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../StateManager';

export default function FetchJoke() {
  const [joke, setJoke] = useState('Loading a Chuck Norris joke…');
  const [state] = useContext(StateContext);

  useEffect(() => {
    let ignore = false;

    async function loadJoke() {
      try {
        const endpoint =
          state.activeCat === 'none'
            ? 'https://api.chucknorris.io/jokes/random'
            : `https://api.chucknorris.io/jokes/random?category=${state.activeCat}`;

        const response = await fetch(endpoint);
        const data = await response.json();

        if (!ignore) {
          setJoke(data.value);
        }
      } catch (error) {
        if (!ignore) {
          setJoke('Could not load a joke right now.');
        }
      }
    }

    loadJoke();

    return () => {
      ignore = true;
    };
    // Only refetch when the category changes or the user requests the next batch.
  }, [state.activeCat, state.nextJoke]);

  return (
    <div className="jokes-build__item build-card">
      <h4>{joke}</h4>
    </div>
  );
}
