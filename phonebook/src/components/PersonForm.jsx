const PersonForm = ({
  formHandler,
  name,
  nameHandler,
  phone,
  phoneHandler,
}) => {
  return (
    <form onSubmit={formHandler}>
      <div>
        name: <input value={name} onChange={nameHandler} />
      </div>
      <div>
        number: <input value={phone} onChange={phoneHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
