import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.content} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  console.log(props)

  return (
    /*  
        use fragment to keep the same structure as in the original component;
        for each part in the Parts array create a Part function and pas the
        properies of the Part to the function as props, the map fuction returns an arrays of functions,
        each function is called and the returned jsx renederd. I think;
        key prop set to index of part to eliminate warning in Console.  
    */      
    <>
      {props.parts.map(part => <Part key={props.parts.indexOf(part)} content={part.name} exercises={part.exercises} />)}
    </>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}
  return (
    <div>
      <Header course={course['name']} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(part => part.exercises)}  />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))