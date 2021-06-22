import gameService from '../services/game-service';

const state = () => ({
	games: [],
})

const mutations = {
	create(state, game) {
		state.games.push(game);
	},
	getSet(state, game) {
		const index = state.games.findIndex(thisGame => thisGame.Id === game.Id);
		state.games[index] = game;
	},
	join(state, game) {
		state.games.push(game);
	}
};

const actions = {
	async create({ commit }) {
		const response = await gameService.create();
		if (!response.error) {
			commit('create', response);
			return true;
		}
		return false;
	},
	async set({ commit }, game) {
		const response = await gameService.set(game);
		if (!response.error) {
			commit('getSet', response);
			return true;
		}
		return false;
	},
	async get({ commit }, gameId) {
		const response = await gameService.get(gameId);
		if (!response.error) {
			commit('getSet', response);
			return true;
		}
		return false;
	},
	async join({ commit }, gameId) {
		const response = await gameService.join(gameId);
		if (!response.error) {
			commit('join', response);
			return true;
		}
		return false;
	},
}

const getters = {
	getGames: (games) => games
};

export const game = {
	namespaced: true,
	state,
	actions,
	mutations,
	getters,
};
