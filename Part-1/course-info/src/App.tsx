const Header = (props: any) => {
    console.log(props)
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
}

const Content = (props: any) => {
    console.log(props)
    return (
        <div>
            {props.parts.map((part: any) => (
                <p key={part.name}>
                    {part.name} - {part.exercises}
                </p>
            ))}
        </div>
    )
}

const Total = (props: any) => {
    console.log(props)
    const totalExercises = props.parts.reduce((sum: number, part: any) => sum + part.exercises, 0)

    return (
        <div>
            <p>Total exercises: {totalExercises}</p>
        </div>
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
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default App