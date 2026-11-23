MoreJSEvents.registerPotionBrewing((event) => {
	global.getAllRegistryObjects('POTIONS').forEach(potion => {
		let id = global.getRegistryId('POTIONS', potion);
		event.removeByPotion(null, null, id);
	});
});
