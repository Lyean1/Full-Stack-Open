import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from './Api';

interface Person {
  name: string;
  number: string;
  id: number;
}

const Notification: React.FC<{ message: string }> = ({ message }) => {
  return <div className="notification">{message}</div>;
};

const Filter: React.FC<{
  searchName: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ searchName, handleSearchChange }) => {
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
}> = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
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

const Persons: React.FC<{ persons: Person[]; onDelete: (id: number) => void }> = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} - {person.number}
          <button onClick={() => onDelete(person.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

const App: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    axios.get<Person[]>('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

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

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already added to the phonebook. Do you want to update the phone number?`);
      if (confirmUpdate) {
        const updatedPerson: Person = {
          ...existingPerson,
          number: newNumber,
        };

        api.updatePerson(existingPerson.id, updatedPerson)
          .then((data) => {
            setPersons(persons.map((person) => (person.id === data.id ? data : person)));
            setNewName('');
            setNewNumber('');
            showNotification(`Phone number updated for ${data.name}`);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      const newPerson: Person = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      api.addPerson(newPerson)
        .then((data) => {
          setPersons([...persons, data]);
          setNewName('');
          setNewNumber('');
          showNotification(`Person ${data.name} added`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deletePerson = (id: number) => {
    const confirmDeletion = window.confirm('Are you sure you want to delete this person?');
    if (confirmDeletion) {
      api.deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotification('Person deleted');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3000); 
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      {notification && (
        <div style={{ backgroundColor: 'green', padding: '10px', marginBottom: '10px' }}>
          <Notification message={notification} />
        </div>
      )}

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

      <Persons persons={filteredPersons} onDelete={deletePerson} />

    </div>
  );
};

export default App;
