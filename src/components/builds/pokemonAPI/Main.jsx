import React from 'react'
import NamesList from './NamesList'
import CSS from "./PokemonStyles.module.css"

export default function Main() {
  return (
    <div className={CSS.main}>
        Main
        <NamesList />
    </div>
  )
}
