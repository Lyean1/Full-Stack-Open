const Hello = (props: any) => {
    console.log(props)
    return (
        <div>
            <p>
                Hello {props.name}, you are {props.age} years old
            </p>
        </div>
    )
}

const App = () => {
    const name = 'Lyean'
    const age = 22

    return (
        <div>
            <h1>Greeting</h1>
            <Hello name='Sai' age={10+11} />
            <Hello name={name} age={age} />
        </div>
    )
}

export default App