import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import PhonebookEntries from "./components/PhonebookEntries";

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
      const person = persons.find((p) => p.name === newPerson.name);
      const change = { ...person, number: newPerson.number };
      confirm(
        `${person.name} is already added to the phonebook, replace the old number ${person.number} with the new number ${newPerson.number}?`,
      );
      personService.update(person.id, change).then((returnedPerson) => {
        setPersons(
          persons.map((p) => (p.id === person.id ? returnedPerson : p)),
        );
        setNewName("");
        setNewNumber("");
      });
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

  const removePerson = (id) => {
    const deleteIndex = persons.findIndex((p) => p.id === id);
    if (confirm(`Do you really want to delete ${persons[deleteIndex].name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.toSpliced(deleteIndex, 1));
        })
        .catch((_) => {
          alert(
            `the person ${persons[deleteIndex].name} is not found on the server`,
          );
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

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
      <PhonebookEntries
        personList={entriesToShow}
        removeHandler={removePerson}
      />
    </div>
  );
};

export default App;
