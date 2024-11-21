import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      id: String(persons.length + 1),
    };
    if (
      !persons.some(
        (p) => p.name.toLowerCase() === newPerson.name.toLowerCase(),
      )
    ) {
      setPersons(persons.concat(newPerson));
      setNewName("");
    } else {
      alert("${newPerson.name} is already added to the phonebook");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};

const Person = ({ person }) => {
  return <li>{person.name}</li>;
};

export default App;
