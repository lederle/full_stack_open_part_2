import { useState } from "react";
import PhonebookEntry from "./components/PhonebookEntry";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567", id: 1 },
  ]);
  // TEST SET
  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "040-123456", id: 1 },
  //   { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  //   { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  //   { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  // ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [showFiltered, setShowFiltered] = useState(false);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };
    if (
      !persons.some(
        (p) => p.name.toLowerCase() === newPerson.name.toLowerCase(),
      )
    ) {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    } else {
      alert("${newPerson.name} is already added to the phonebook");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
    event.target.value ? setShowFiltered(true) : setShowFiltered(false);
  };

  const filterRe = new RegExp(newSearch, "i");
  const entriesToShow = showFiltered
    ? persons.filter((p) => filterRe.test(p.name))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchText={newSearch} handler={handleSearchChange} />

      <h3>Add a new</h3>
      <PersonForm
        formHandler={addPerson}
        name={newName}
        nameHandler={handleNameChange}
        phone={newNumber}
        phoneHandler={handleNumberChange}
      />

      <h3>Numbers</h3>
      <PhonebookEntry persons={entriesToShow} />
    </div>
  );
};

export default App;
