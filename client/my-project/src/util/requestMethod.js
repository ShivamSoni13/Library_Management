import axios from "axios";

const Base_URL = "http://localhost:3002/";

// const publicRequest = axios.create({
//   baseURL: Base_URL,
// });

const userRequest = axios.create({
  baseURL: Base_URL + "api",
});

// const bookingRequest = axios.create({
//   baseURL: Base_URL + "booking",
// });

export { userRequest };
