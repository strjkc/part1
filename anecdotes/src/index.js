import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Buttons = (props) => {
  return (
    <>
      <button onClick={props.handleClick[0]}>{props.text[0]}</button>
      <button onClick={props.handleClick[1]()}>{props.text[1]}</button>
    </>
  )
}

const Anecdote = (props) => {
  return (
    <div>{props.anecdote}</div>
  )
}

const DisplayAll = (props) => {
  console.log(props)
  return(
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[props.object.selected]} />
      <div>has: {props.object.votes[props.object.selected]} votes</div>
      <Buttons handleClick={[props.object.handleVote, props.object.getAnecdoteIndex]} text={['Vote', 'Next anecdote']} />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[props.object.indexOfPopularNote]}/>
      <div>has: {props.object.votes[props.object.indexOfPopularNote]} votes</div>
    </>
  )
}


const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))
  console.log('selected', selected)
  console.log('votes', votes)

  const indexOfPopularNote =  votes.indexOf( Math.max(...votes) )
    

  const getAnecdoteIndex = () => {
    return () => {
      let randNum = Math.floor(Math.random() * Math.floor(anecdotes.length))
      setSelected(randNum)
    }
  }

  const handleVote = () => {
    console.log('votes is called')
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const propObject = {
    indexOfPopularNote: indexOfPopularNote,
    selected: selected,
    votes: votes,
    handleVote: handleVote,
    getAnecdoteIndex: getAnecdoteIndex
  }

  return (
    <div>
      <DisplayAll object = {propObject}  />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)