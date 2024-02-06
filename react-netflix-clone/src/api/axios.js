import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params : {
    api_key: "812b0296b3a8e01db54311cbee7db2b6",
    language: "ko-KR",
  },
});

export default instance;