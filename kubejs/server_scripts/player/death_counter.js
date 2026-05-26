ServerEvents.commandRegistry(event => {

	/** @type {Internal.Commands_} */
	const Commands = event.getCommands();

	event.register(
		Commands.literal('death')
			.requires(s => s.hasPermission(0))
			.executes(c => global.onDeathCommand(c.source, false, false))
	);

	event.register(
		Commands.literal('alldeath')
			.requires(s => s.hasPermission(0))
			.executes(c => global.onDeathCommand(c.source, true, false))
	);

	event.register(
		Commands.literal('pvpdeath')
			.requires(s => s.hasPermission(0))
			.executes(c => global.onDeathCommand(c.source, false, true))
	);

	event.register(
		Commands.literal('allpvpdeath')
			.requires(s => s.hasPermission(0))
			.executes(c => global.onDeathCommand(c.source, true, true))
	);
});

EntityEvents.death('player', event => {
	const server = event.getServer();
	const player = event.getPlayer();

	let isPvP = false;
	const killer = event.getSource().getActual();
	if (killer) isPvP = killer.isPlayer();

	const data = server.getPersistentData();
	if (!data.playerDeaths) {
		data.playerDeaths = {
			pvp: {},
			game: {}
		};
	}
	const uuid = player.getName().getString();
	const deaths = data.playerDeaths[isPvP ? 'pvp' : 'game'];
	if (!deaths[uuid]) {
		deaths[uuid] = 0;
	}
	deaths[uuid]++;
});

/**
 * 
 * @param {Internal.CommandSourceStack_} sourceStack 
 * @param {boolean} isAll 
 * @param {boolean} isPvP 
 * @returns {integer}
 */
global.onDeathCommand = function (sourceStack, isAll, isPvP) {
	const server = sourceStack.getServer();
	const player = sourceStack.getPlayer();
	const uuid = player.getName().getString();

	const data = server.getPersistentData();
	if (!data.playerDeaths) {
		data.playerDeaths = {
			pvp: {},
			game: {}
		};
	}

	/** @type {Internal.CompoundTag_} */
	const entries = data.playerDeaths[isPvP ? 'pvp' : 'game'];
	if (!isAll) {

		if (!entries[uuid]) {
			player.tell(Component.green(`You haven't died a single time${isPvP ? ' in PvP' : ''} yet`));
		}
		else {
			const value = entries[uuid];
			player.tell(Component.red(`You have died ${value.toString().replace('.0', '')} time${value == 1 ? '' : 's'}${isPvP ? ' in PvP' : ''}`));
		}
	}
	else {
		const list = [];
		for (let key of entries.getAllKeys()) {
			list.push([key, entries[key]]);
		}

		// Because Rhino is a shitty JS parser and wouldn't allow .sort() to work
		const sorted = [];
		for (let i = 0; i < 9999; i++) {
			let highestAmount = 0;
			for (let entry of list) {
				let amount = entry[1];
				if (amount > highestAmount) {
					highestAmount = amount
				}
			}
			let found = null;
			for (let entry of list) {
				let amount = entry[1];
				if (amount == highestAmount) {
					found = entry;
				}
			}
			if (found) {
				sorted.push(found);
				let ind = list.indexOf(found);
				list.splice(ind, 1);
			}
			if (list.length == 0) {
				break;
			}
		}

		let place = 1;
		player.tell(Component.white('Death leaderboard:'))
		for (let entry of sorted) {
			player.tell(Component.red(` ${place}. ${entry[0]} - ${entry[1]} time${entry[1] == 1 ? '' : 's'}`));
			place++;
		}
	}

	return 1;
};
