import axios from 'axios';
import config from './config';

import store from '../store/index';

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
        headers: { Authorization: token},
      };
    else return { error: true, message: 'dont have access token' };
  } else {
    option = { method, data};
  }
  try {
    console.log(`${config().apiUrl} ${url}`);
    const response = await axios.request(config().apiUrl + url, option);
    if (response.status == 200 || response.status == 201) {
      if (response.headers.authorization)
        localStorage.setItem('jwt', btoa(response.headers.authorization));
      return response.data;
    } else {
      if (response.status == 401) store.dispatch('account/logout');
      return { error: true, message: response.data };
    }
  } catch (error) {
    if (error.response.status == 401) store.dispatch('account/logout');
    return { error: true, message: error.message };
  }
}

function getToken() {
  const currentJwt = localStorage.getItem('jwt');
  if (currentJwt) {
    return atob(currentJwt);
  }
  return null;
}
