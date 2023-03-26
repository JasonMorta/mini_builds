import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { PokeStateContext } from '../PokeState';
import { FixedSizeList } from 'react-window';
import GetNamesList from './GetNamesList';
import TextField from '@mui/material/TextField';
import CSS from './NameList.module.css'
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import produce from 'immer';
export default function NameList() {


    const value = React.useContext(PokeStateContext);
    const [selectedName, setSelectedName] = React.useState("")
    const [state, setState] = value;
    const inputRef = React.useRef()
    //console.log('state.namesList', state.namesList)

    function filterNames(e) {
      //console.log("state.namesList", state.namesList);

      if (state.namesList !== null ) {
        //return a new array with all the names that includes the letters from the input
        let filtered = state.namesList.filter((poke) =>
          poke.name.includes(e.target.value.toLowerCase())
        );
        //console.log("filtered", filtered);

        setState(
          produce((state) => {
            state.namesList = filtered.length > 0 ? filtered : null;
          })
        );
      } else {
      }
    }
    

    function handleName(e, name) {
      e.target.style.fontWeight = "700"
      
        setSelectedName(name)
          setState(
              produce((state) => {
                state.selectedName = name;
              })
            );
        //inputRef.current.value = name
        //console.log('inputRef', inputRef.current.value)
      }
      
      function handleKey(e) {
        //setSelectedName()
        if (e.key ==="Enter") {
          //console.log('neter: ',e.target.value)
          //console.log('e.target.value !== " "', e.target.value !== "")

        //Get the pokemon data
        if (e.target.value !== "") {
          setState(
            produce((state) => {
              state.selectedName = e.target.value;
            })
          );
        }
        //console.log(`%c ${e.target.value}`, 'color: #2196f3')
        }
      }



 //prevent unnecessary rerendering of the names list
 const memorizedNamesList = React.useMemo(()=> {
  //console.log('state.namesList !== null || state.namesList.length > 0', state.namesList !== null || state.namesList.length > 0)

  if (state.namesList !== null) {
    return state.namesList.map((name, i) => (
      <>
        <ListItem
          key={i}
          sx={{ padding: "0px" }}
          onClick={(e) => handleName(e, name.name)}
        >
          <ListItemButton sx={{ padding: "0px 5px" }}>
            <ListItemIcon>
              <h4>⭐</h4>
            </ListItemIcon>
            <ListItemText primary={name.name} />
          </ListItemButton>
        </ListItem>
      </>
    ));
  } else {
    return (
      <ListItem key={0} sx={{ padding: "0px" }}>
        <ListItemButton sx={{ padding: "0px 5px" }}>
          <ListItemIcon>
            <h4>⭐</h4>
          </ListItemIcon>
          <ListItemText primary={"Not Found"} />
        </ListItemButton>
      </ListItem>
    );
  }
  //console.log('state.namesList', state.namesList)

 }, [state.namesList])


  return (
    <>
           <section className={CSS.searchBar_section} style={{margin: "10px"}} >
        <TextField
            className={CSS.searchBar}
            hiddenLabel
            ref={inputRef}
            label={selectedName}
            onChange={(e)=> filterNames(e)}
            onKeyDown={(e)=>handleKey(e)}
            defaultValue={selectedName}
            id="filled-hidden-label-small"
            variant="filled"
            size="medium"
        /><ManageSearchRoundedIcon className={CSS.searchSVG}/>
    </section>
      <h2 className={CSS.pokemonName}>
            {state.selectedName.charAt(0).toUpperCase() + state.selectedName.slice(1)}
      </h2>
    <div className={CSS.names_list}>
      {state.namesList === null || state.namesList.length === 0 ? (
        <GetNamesList />
      ) : (
        <List
          sx={{
            width: "100%",
            height: "100%",
            overflow: "auto",
            bgcolor: "background.paper",
          }}
          aria-label="contacts"
        >
          {memorizedNamesList}
        </List>
      )}
      </div>
    </>
  );
}