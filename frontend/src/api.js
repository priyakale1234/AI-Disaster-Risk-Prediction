import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-disaster-risk-prediction.onrender.com/"
});

export default API;