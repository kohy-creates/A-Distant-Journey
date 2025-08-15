function NBTArrayToJSArray(nbtArray) {
	let array = [];
	for (let i = 0; i < nbtArray.size(); i++) {
		array.push(nbtArray[i]);
	}
	return array;
}

EntityEvents.hurt((event) => {

	const entity = event.getEntity();

	console.log(`Entity hurt: ${entity.getType()}`);

	if (global.bossMobs.includes(entity.getType())) {
		
		const player = event.getSource().getActual();
		if (player == null || !player.isPlayer()) return;

		const persistentData = entity.getPersistentData();
		if (!persistentData.playersToReward) {
			persistentData.playersToReward = [];
		}

		let list = NBTArrayToJSArray(persistentData.playersToReward);

		const uuidStr = String(player.getUuid());
		if (!list.includes(uuidStr)) {
			list.push(uuidStr);
		}
		
		persistentData.playersToReward = list;
	}
});

EntityEvents.death((event) => {

	const entity = event.getEntity();
	if (!global.bossMobs.includes(entity.getType())) return;
	const persistentData = entity.getPersistentData();

	if (persistentData.playersToReward) {
		const list = NBTArrayToJSArray(persistentData.playersToReward);
		if (list.length === 0) return;

		const treasureBagId = 'kubejs:treasure_bag_' + entity.getType().split(':')[1];
		for (const playerUuid of list) {
			const player = event.getLevel().getPlayerByUUID(UUID.fromString(playerUuid));
			if (player) {
				player.give(Item.of(treasureBagId));
			}
		}
	}
});
