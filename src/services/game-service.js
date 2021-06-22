import { http } from './http-service';

export default const gameService = {
	create,
	set,
	get,
	join
}

async function create() {
	const data = await http.sendRequest(
		'POST',
		'/createGame',
		{},
		true
	);
	return data;
}

async function join(gameId) {
	let data = null
	if (gameId) {
		data = await http.sendRequest(
			'POST',
			'/joinGame',
			{ gameId, 100, 20, 5 },
			true
		);
	} else {
		data = await http.sendRequest(
			'POST',
			'/joinRandomGame',
			{ 100, 20, 5 },
			true
		);
	}
	return data;
}

async function set(game) {
	const data = await http.sendRequest(
		'POST',
		'/setGame',
		{ game },
		true
	);
	return data;
}

async function get(gameId) {
	const data = await http.sendRequest(
		'POST',
		'/getGame',
		{ gameId },
		true
	);
	return data;
}
