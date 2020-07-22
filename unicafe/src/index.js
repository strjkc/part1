import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = (props) => {
  return(
  <button onClick={ props.handleClick }>{ props.text }</button>
  )
}

const Statistic = (props) => {
  return(
    <>
      <td>{props.statisticName}:</td>
      <td>{props.statisticValue}</td>
    </>
  )
}

const FeedbackButtons = (props) => {
  //create a list of Button components passing the corresponding functions and text to every one
  return(
    <>
      {props.updateState.map( buttonObject => <Button key={ props.updateState.indexOf(buttonObject) } handleClick={ buttonObject.setter } text={ buttonObject.text }  />)}
    </>
  )
}

const DisplayStats = (props) => {
  let indexOfTotalVotes = null
  for (let i = 0; i < props.stats.length; i++)
  {
    let object = props.stats[i]
    if (object.text === 'Total Votes')
      {
        indexOfTotalVotes = props.stats.indexOf(object)
        break
      }
  } 

  // create a list of div tags to display the values stored in the state
    const feedbackList = props.stats.map( stat => 
    <tr key={ props.stats.indexOf(stat) }>
        <Statistic statisticName={ stat.text } statisticValue={ stat.value } />
    </tr>)

    if (props.stats[indexOfTotalVotes].value > 0){
      return(
        <table>
          <tbody>
            {feedbackList}
          </tbody>
        </table>
      )
    }
    return (
      <div>No feedback given</div>    
    )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const totalVotes = good + neutral + bad
  const average = (good - bad) / totalVotes
  const positive = good / totalVotes * 100
  
  // function to increment state depending on what button is pressed
  const handleClick = (buttonName) => {
    switch (buttonName) {
      case 'good':
        setGood( good + 1 )
        break
      case 'neutral':
        setNeutral( neutral + 1 )
        break
      case 'bad':
        setBad( bad + 1 )
        break
      default:
        console.log('unknown button value')
    }
  }
  /*  Create an object that stores the function to change state, the text for the button and the value from the state
      so it's easier to pass as a prop
  */
  const buttons = [ {setter: () => handleClick('good') , text: 'good', value: good},
                    {setter: () => handleClick('neutral'), text: 'neutral', value: neutral},
                    {setter: () => handleClick('bad'), text: 'bad', value: bad} ]
  

  const advancedStats = [
    { text: 'Total Votes', value: totalVotes },
    { text: 'Average', value: average },
    { text: 'Positive', value: `${positive}%` }, ]


  return (
    <div>
      <h1>Give Feedback</h1>
      <FeedbackButtons updateState={buttons} />
      <h2>Statistics</h2>
      <DisplayStats stats={[...buttons, ...advancedStats]} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)