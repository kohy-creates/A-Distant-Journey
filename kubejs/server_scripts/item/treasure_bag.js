function NBTArrayToJSArray(nbtArray) {
	let array = [];
	for (let i = 0; i < nbtArray.size(); i++) {
		array.push(nbtArray[i]);
	}
	return array;
}

EntityEvents.hurt((event) => {

	const entity = event.getEntity();

	if (global.bossMobsNoTreasureBag.includes(entity.getType())) {

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
	if (!global.bossMobsNoTreasureBag.includes(entity.getType())) return;
	const persistentData = entity.getPersistentData();

	if (persistentData.playersToReward) {
		const list = NBTArrayToJSArray(persistentData.playersToReward);
		if (list.length === 0) return;

		let suffix = '';
		if (entity.getType() === 'botania:doppleganger') {
			let nbt = entity.getNbt();
			if (nbt.get('hardMode') == true) {
				suffix = '_hardmode';
			}
		}
		const treasureBagId = 'kubejs:treasure_bag_' + entity.getType().split(':')[1] + suffix;
		for (const playerUuid of list) {
			const player = event.getLevel().getPlayerByUUID(UUID.fromString(playerUuid));
			if (player) {
				player.give(Item.of(treasureBagId));
			}
		}
	}
});

// LootJS.modifiers(event => {

// 	[
// 		//"witherstormmod:witherstorm",
// 		//"witherstormmod:withered_symbiont",
// 		"botania:doppleganger",
// 		"cataclysm:ignis",
// 		"cataclysm:netherite_monstrosity",
// 		"cataclysm:ender_guardian",
// 		"cataclysm:the_harbinger",
// 		"cataclysm:the_leviathan",
// 		"cataclysm:ancient_remnant",
// 		"cataclysm:maledictus",
// 		"cataclysm:scylla",
// 		"unusualend:endstone_golem",
// 		"unusualend:enderblob_queen",
// 		"ars_nouveau:wilden_boss",
// 		"aether:slider",
// 		"aether:valkyrie_queen",
// 		"aether:sun_spirit",
// 		"alexscaves:luxtructosaurus",
// 		"the_bumblezone:cosmic_crystal_entity",
// 		"lost_aether_content:aerwhale_king",
// 		"rediscovered:red_dragon"
// 	].forEach(boss => {
// 		event.addEntityLootModifier(boss)
// 			.removeLoot(Ingredient.of(/^(?!.*dungeon_key).*/));
// 	})
// })
