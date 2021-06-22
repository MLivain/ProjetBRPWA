import { http } from './http-service';

export const userService = {
  login,
  register,
};

async function login(username, password) {
  const data = await http.sendRequest(
    'POST',
    '/user/login',
    { username, password },
    false
  );
  // if (data.token) data.token = btoa(data.token);
  return data;
}

async function register(user) {
  return await http.sendRequest('POST', '/user/register', user, false);
}
