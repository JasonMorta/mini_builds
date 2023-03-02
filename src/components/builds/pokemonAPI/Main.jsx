import React from 'react'
import NamesList from './NamesList'
import CSS from "./PokemonStyles.module.css"
import AllNames from './NameList/PokeNameList'

export default function Main() {
  return (
    <div className={CSS.main}>
        Main
        <NamesList />
        < AllNames />
    </div>
  )
}
