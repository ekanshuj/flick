import Axios from 'axios';

const instance = Axios.create({
  baseUrl: "https://api.themoviedb.org/3",
});

export default instance;  