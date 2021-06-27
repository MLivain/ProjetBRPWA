import { http } from "./http-service";

export const gameService = {
  create,
  set,
  get,
  join,
  getAllGames,
  getActiveGames,
  changeTurnFunc,
  getPlayers,
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

async function changeTurnFunc(idGame, username) {
  const data = await http.sendRequest(
    "POST",
    `/game/changeTurn?IdGame=${idGame}&userName=${username}&posX=1&posY=1`,
    {},
    true
  );
  return data;
}

async function getPlayers(idGame) {
  const data = await http.sendRequest(
    "GET",
    `/game/${idGame}/players`,
    {},
    true
  );
  return data;
}
