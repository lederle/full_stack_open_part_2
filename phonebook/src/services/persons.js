import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getAllNonexisting = () => {
  const request = axios.get(baseUrl);
  const nonexisting = {
    name: "Dummy McEnroe NE",
    number: "020-1294323",
    id: "zzz9999",
  };
  return request.then((response) => response.data.concat(nonexisting));
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then();
};

const update = (id, changedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, changedObject);
  return request.then((response) => response.data);
};

export default { getAll, create, remove, getAllNonexisting, update };
