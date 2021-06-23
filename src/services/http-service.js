import axios from "axios";
import config from "./config";

import store from "../store/index";

export const http = {
  sendRequest,
};

async function sendRequest(method, url, data, needToken) {
  let option = {};
  if (needToken) {
    const token = getToken();
    if (token != null)
      option = {
        method,
        data,
        headers: { AppToken: token, "Content-Type": "application/json" },
      };
    else return { error: true, message: "dont have access token" };
  } else {
    option = { method, data };
  }

  try {
    const response = await axios.request(config().apiUrl + url, option);
    if (response.status == 200 || response.status == 201) {
      // localStorage.setItem('jwt', response.headers.authorization);
      return response.data;
    } else {
      if (response.status == 401) store.dispatch("user/logout");
      return { error: true, message: response.data };
    }
  } catch (error) {
    if (error.response.status == 401) store.dispatch("user/logout");
    return { error: true, message: error.message };
  }
}

function getToken() {
  const currentJwt = localStorage.getItem("jwt");
  if (currentJwt) {
    return currentJwt;
  }
  return null;
}
