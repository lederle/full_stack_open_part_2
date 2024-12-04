import { useState, useEffect } from "react";
import PhonebookEntry from "./components/PhonebookEntry";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [showFiltered, setShowFiltered] = useState(false);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (
      !persons.some(
        (p) => p.name.toLowerCase() === newPerson.name.toLowerCase(),
      )
    ) {
      personService.create(newPerson).then((returnedNote) => {
        setPersons(persons.concat(returnedNote));
        setNewName("");
        setNewNumber("");
      });
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
