import axios from "axios";
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: "https://cse-416-jart.herokuapp.com/api",
});

export const createGame = () => {
  return api.post(`/game`);
};

const apis = {
  createGame,
};

export default apis;