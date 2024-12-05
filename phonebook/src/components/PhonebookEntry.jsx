const PhonebookEntry = ({ person, remove }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => remove(person.id)}>delete</button>
    </li>
  );
};

export default PhonebookEntry;
