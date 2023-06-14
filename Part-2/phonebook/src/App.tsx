import { useState } from 'react';

interface Person {
  name: string;
  number: string;
  id: number;
}

const Filter: React.FC<{ searchName: string; handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void }> = ({
  searchName,
  handleSearchChange,
}) => {
  return (
    <div>
      Search by name: <input type="text" value={searchName} onChange={handleSearchChange} />
    </div>
  );
};

const PersonForm: React.FC<{
  newName: string;
  newNumber: string;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addPerson: (event: React.FormEvent<HTMLFormElement>) => void;
}> = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input type="text" value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input type="text" value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

const Persons: React.FC<{ persons: Person[] }> = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} - {person.number}
        </li>
      ))}
    </ul>
  );
};

const App: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  const addPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newName.trim() === '' || newNumber.trim() === '') {
      return;
    }

    const isNameDuplicate = persons.some((person) => person.name === newName);

    if (isNameDuplicate) {
      alert(`${newName} is already added to the phonebook!`);
      return;
    }

    const newPerson: Person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons([...persons, newPerson]);
    setNewName('');
    setNewNumber('');
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchName={searchName} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
