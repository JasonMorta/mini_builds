import * as React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { PokeStateContext } from '../PokeState';
import produce from 'immer';


export default function PokeNameList() {

    const value = React.useContext(PokeStateContext);
    const [state, setState] = value;
    const [dense, setDense] = React.useState(false);

        //Get all pokemon names as add to state
        React.useEffect(() => {
          fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
            .then((response) => response.json())
            .then((data) => {
                
              setState(
                produce((state) => {
                  state.namesList = data.results
                })
              );
              console.log('All Names', data)
              console.log(state.namesList.length);
            });
        }, []);




  return (
    <>
      <ListGroup defaultActiveKey="#link1">
        <ListGroup.Item action href="#link1">
          Link 1
        </ListGroup.Item>
        <ListGroup.Item action href="#link2" disabled>
          Link 2
        </ListGroup.Item>
        <ListGroup.Item action>
          This one is a button
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}