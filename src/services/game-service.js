import { http } from "./http-service";

export const gameService = {
  create,
  set,
  get,
  join,
  getAllGames,
  getActiveGames,
  changeTurn,
};

async function create() {
  const data = await http.sendRequest("POST", "/game/createGame", {}, true);
  return data;
}

async function join(gameId) {
  let data = null;
  if (gameId) {
    data = await http.sendRequest(
      "POST",
      `/game/joinGame?IdGame=${gameId}&Life=100&Damage=20&Movement=5`,
      {},
      true
    );
  } else {
    data = await http.sendRequest(
      "POST",
      "/game/joinRandomGame?Life=100&Damage=20&Movement=5",
      {},
      true
    );
  }
  return data;
}

async function set(game) {
  const data = await http.sendRequest("POST", "/game/setGame", { game }, true);
  return data;
}

async function get(gameId) {
  const data = await http.sendRequest("POST", `/game/${gameId}`, {}, true);
  return data;
}

async function getAllGames() {
  const data = await http.sendRequest(
    "POST",
    "/user/getUserAllGames",
    {},
    true
  );
  return data;
}

async function getActiveGames() {
  const data = await http.sendRequest(
    "POST",
    "/user/getUserActiveGames",
    {},
    true
  );
  return data;
}

async function changeTurn(idGame, username, posX, posY) {
  const data = await http.sendRequest(
    "POST",
    "/game/changeTurn",
    { idGame, username, posX, posY },
    true
  );
  return data;
}
