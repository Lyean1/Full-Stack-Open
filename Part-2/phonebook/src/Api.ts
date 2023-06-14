import axios from 'axios';

interface Person {
  name: string;
  number: string;
  id: number;
}

const baseUrl = 'http://localhost:3001/persons';

const getAllPersons = async (): Promise<Person[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addPerson = async (newPerson: Person): Promise<Person> => {
  const response = await axios.post(baseUrl, newPerson);
  return response.data;
};

const deletePerson = async (id: number): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`);
};

const updatePerson = async (id: number, updatedPerson: Person): Promise<Person> => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedPerson);
  return response.data;
};

const api = {
  getAllPersons,
  addPerson,
  deletePerson,
  updatePerson,
};

export default api;
