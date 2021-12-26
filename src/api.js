import axios from "axios";
const instance = axios.create({
  baseURL: "https://europe-west1-bitirme-aa3f2.cloudfunctions.net/api",
  timeout: 5000,
});

export default instance;
