import React, { useState, useEffect } from 'react'
import Die from './die'
import { nanoid } from 'nanoid'

export default function App() {

  const [dice, setDice] = useState(newDice())
  const [gameOver, setGameover] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [rollCount, setRollCount] = useState(0)

  useEffect(() => {
    if (dice.every(die => die.isPressed === true)) {
      if (dice.every(die => die.value === dice[0].value)) {
        setGameover(true)
        setGameWon(true)
      }
      else{
        setGameover(true)
        setGameWon(false)
      }
    }
    else{
      setGameover(false)
    }
  },[dice])

  function getRandomNumber(){
    return Math.ceil(Math.random() * 6)
  }

  function newDice(){
    const nums = []
    for (let i = 0; i < 10; i++) {
      nums?.push({value : getRandomNumber(), isPressed: false, id:nanoid()})
    }
    return nums
  }

  function toggleIsPressed(id) {
    setDice(prevDice => {
      return prevDice.map(prevDie => {
        if (prevDie.id === id) {
          return {...prevDie, isPressed: !prevDie.isPressed}
        }
        else{
          return {...prevDie}
        }
      })
    })
  }

  function rollDice(){
    setRollCount(prevRollCount => prevRollCount + 1)
    setDice(prevDice => {
      return prevDice.map(prevDie => {
        if(prevDie.isPressed){
          return {...prevDie}
        }
        else{
          return {...prevDie, value: getRandomNumber()}
        }
      })
    })
  }

  function newGame() {
    setDice(newDice())
    setRollCount(0)
    setGameStatus({over: false, won: false})
  }


  const diceElements = dice?.map(die => {
    return <Die value={die.value} isPressed={die.isPressed} toggleIsPressed={() => toggleIsPressed(die.id)} key={crypto.randomUUID()}/>
  })

  return (
    <main>
        {rollCount !==0 && <h1 className='rolls-count'>You Rolled The Dice {rollCount} {rollCount ===1 ? 'Time' :'Times'}</h1>}
      <div className='dice-container'>
        {diceElements}
      </div>
      {gameOver === false && <button className='blue-btn' onClick={rollDice}>Roll</button>}
      {gameOver && gameWon && <><h1>You Won!</h1> <button className='blue-btn' onClick={newGame}>New Game</button></>}
      {gameOver && gameWon === false && <><h1>You Lost😔</h1> <button className='blue-btn' onClick={newGame}>New Game</button></>}
    </main>
  )
}
