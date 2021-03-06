import { gameService } from "../services/game-service";

const state = () => ({
  games: [],
  activeGames: [],
});

const mutations = {
  create(state, game) {
    state.games.push(game);
  },
  getAll(state, games) {
    state.games = games;
  },
  getSet(state, game) {
    const index = state.games.findIndex((thisGame) => thisGame.Id === game.Id);
    state.games[index] = game;
  },
  getActive(state, games) {
    state.activeGames = games;
  },
  join(state, game) {
    state.games.push(game);
  },
  setPlayers(state, players, idGame) {
    const index = state.games.findIndex((thisGame) => thisGame.Id === idGame);
    state.games[index].listPlayers = players;
  },
};

const actions = {
  async create({ commit }) {
    const response = await gameService.create();
    if (!response.error) {
      commit("create", response);
      return response;
    }
    return false;
  },
  async set({ commit }, game) {
    const response = await gameService.set(game);
    if (!response.error) {
      commit("getSet", response);
      return response;
    }
    return false;
  },
  async get({ commit }, gameId) {
    const response = await gameService.get(gameId);
    if (!response.error) {
      commit("getSet", response);
      return response;
    }
    return false;
  },
  async getAll({ commit }) {
    const response = await gameService.getAllGames();
    if (!response.error) {
      commit("getAll", response);
      return response;
    }
    return false;
  },
  async getActive({ commit }) {
    const response = await gameService.getActiveGames();
    if (!response.error) {
      commit("getActive", response);
      return response;
    }
    return false;
  },
  async join({ commit }, gameId) {
    const response = await gameService.join(gameId);
    if (!response.error) {
      commit("join", response);
      return response;
    }
    return false;
  },
  async changeTurnFunc({ commit }, [gameId, playerTurn]) {
    const response = await gameService.changeTurnFunc(gameId, playerTurn);
    if (!response.error) {
      commit("getSet", response.game);
      return response;
    }
    return false;
  },
  async getPlayers({ commit }, gameId) {
    const response = await gameService.getPlayers(gameId);
    if (!response.error) {
      commit("setPlayers", response, gameId);
      return response;
    }
    return false;
  },
};

const getters = {
  getGames: (games) => games,
  getActiveGames: (activeGames) => activeGames,
};

export const game = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
