import axios from "axios";

export default () => {
  // const currentUser = JSON.parse(window.localStorage.currentUser);
  return axios.create({
    // baseURL: "/",
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
      // Authorization: currentUser && currentUser.token
    }
  });
};
