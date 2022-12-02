/* eslint-disable no-undef */
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { StateContext } from '../../../StateManager';
import'./cardStyle.css'

export default function MonsterCard(props) {

    const value = useContext(StateContext);
    
    const [inputVal, setInputVal] = useState("")
    const [state, setState] = value;
    const [moreNames, setMoreNames] = useState({})
    const [pokeData, setPokeData] = useState({})



    let cathPokemon = async () => {
        console.log(inputVal);
        //console.log(state.pokemonName);
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+state.pokemonName.toLowerCase());
            const results = await response.json();
            setPokeData(results)
       
          } catch (error){
            console.log("error", error);
          }
        };
    

    function enterBtn(event){
        if (event.key === "Enter") {
            event.preventDefault();
            console.log(state.pokemonName);
            cathPokemon()
          }
    }

    function onInputField(e){
           //console.log(e);
           //setInputVal(e.target.innerText)
           console.log(typeof e.target.value);
           console.log(e.target.defaultValue);
           console.log(e.target.innerText);
    
    }

    useEffect(() => {
        const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const results = await response.json();
            //console.log(json);
            setMoreNames(results)
  
          } catch (error) {
            console.log("error", error);
          }
        };
        cathPokemon()
        fetchData();

    }, [state.pokemonName])
    


  return (
    <div className='pokemonAPI'>
  
        <h4>Search for pokemon</h4>
        
      <InputGroup className="mb-1" style={{width:" 50%", margin: "auto"}}>
        <Form.Control
            type="text"
            placeholder="Enter Pokemon Name"
            aria-label="Enter Pokemon Name"
            aria-describedby="basic-addon2"
            defaultValue={inputVal}
            onChange={onInputField}
            //onKeyDown={enterBtn}
        />
        <Button 
            variant="danger" 
            id="button-addon2"
            onClick={cathPokemon}
            >
          GET
        </Button>
      </InputGroup>

      {/* CARD */}

       <div className='card-outer'>
       {  pokeData.name ?  
    
                
               
                <>
                    <div className='card-container'>
                    <img 
                        src={pokeData.sprites.other["official-artwork"].front_default} 
                        alt={pokeData.name+ " image"} 
                        />
                    <div className='pokemon-info'>
                        <p style={{width: '100%'}}>#{pokeData.id}</p>
                        <p style={{width: '100%', fontWeight: 800}}>{pokeData.name.toUpperCase()}</p>
                        <div className="abilities">
                            {pokeData.abilities.map((skill, i) => (
                            <p key={i} class="power" style={{width: '45%'}}>{skill.ability.name}</p>
                            ) )}
    		            </div>
                    
                        <div className='pokemon-info2'>
                        <p>HP: {pokeData.stats[0].base_stat}</p>
                        <p>Height: {pokeData.height} /decimetre</p>
                        <p>Wight: {pokeData.weight} /hectograms</p>
                        </div>
                    </div>
                    </div>
                </>
            
            :
            
            <></>
    
        
               }                 
            <div className='moreNames'>
                <h3>Also try these names</h3>
             
                    <ul> 
                     { typeof moreNames.results === "object" ?
                        moreNames.results.sort().map((i,index) => (
                            <li key={index}
                                onClick={(e) => {
                                setState(prev => ({...prev, pokemonName: e.target.innerText}))
                                console.log(state.pokemonName);
                                cathPokemon()
                               
                                e.target.style.fontWeight === 900 ?
                                e.target.style.fontWeight = 400:
                                e.target.style.fontWeight = 900
                                console.log(e.target.style.fontWeight);
                            }}
                            style={{cursor: 'pointer'}}
                            >{i.name}</li>
                        ))
                        :
                        <></>
              
                    }
               </ul>
             
            </div>

       </div>


    </div>
  )
}
