MoreJSEvents.registerPotionBrewing((event) => {

	// // Custom alchemy recipes
	// event.addCustomBrewing(
	// 	'tide:glowfish',
	// 	Item.of('minecraft:potion', "{Potion:'minecraft: water'}"),
	// 	'majruszsdifficulty:recall_potion'
	// );

	// event.addCustomBrewing(
	// 	'ender_pearl',
	// 	Item.of('minecraft:potion', "{Potion:'minecraft: water'}"),
	// 	'wormholepotion:wormhole_potion'
	// );


	global.getAllRegistryObjects('POTIONS').forEach(potion => {
		let id = global.getRegistryId('POTIONS', potion);
		event.removeByPotion(null, null, id);
	});
});
