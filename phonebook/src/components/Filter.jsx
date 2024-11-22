const Filter = ({ searchText, handler }) => {
  return (
    <div>
      filter shown with <input value={searchText} onChange={handler} />
    </div>
  );
};

export default Filter;
