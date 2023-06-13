const App = () => {
    const friends = [
        { name: 'Sai', age: 21 },
        { name: 'Lyean', age: 22 },
    ]

    return (
        <div>
            <p>{friends[0].name} {friends[0].age}</p>
            <p>{friends[1].name} {friends[1].age}</p>
        </div>
    )
}

export default App