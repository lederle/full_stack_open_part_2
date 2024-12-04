import PhonebookEntry from "./PhonebookEntry";

const PhonebookEntries = ({ personList, removeHandler }) => {
  return (
    <ul>
      {personList.map((p) => (
        <PhonebookEntry key={p.id} person={p} remove={removeHandler} />
      ))}
    </ul>
  );
};

export default PhonebookEntries;
