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



    function handleName(name) {
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
        //Get the pokemon data
        setState(
          produce((state) => {
            state.selectedName = e.target.value;
          })
        );
        //console.log(`%c ${e.target.value}`, 'color: #2196f3')
        }
      }


//Custom console.log CSS
 let logCss = `
 background-color: white; 
 font-size: 13px; 
 color: black;
 `


 //prevent unnecessary rerendering of the names list
 const memorizedNamesList = React.useMemo(()=> {

  return state.namesList.map((name, i) => (
    <>
      <ListItem key={i}
        sx={{ padding: "0px" }}
        onClick={()=> handleName(name.name)}>
        <ListItemButton>
          <ListItemIcon>
            <h4>⭐</h4>
          </ListItemIcon>
          <ListItemText primary={name.name} />
        </ListItemButton>
      </ListItem>
    </>
  ))

 }, [state.namesList])



 //logs for this component
 console.log(`%c Got all names: `, logCss)
  return (
    <>
           <section className={CSS.searchBar_section} style={{margin: "10px"}} >
        <TextField
            className={CSS.searchBar}
            hiddenLabel
            ref={inputRef}
            label={selectedName}
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
      {state.namesList.length === 0 ? (
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