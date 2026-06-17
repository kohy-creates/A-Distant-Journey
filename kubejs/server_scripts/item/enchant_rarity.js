ADJServerEvents.itemRarityGet(event => {
	const item = event.getItemStack();
	if (item.isEnchanted()) {
		const rarity = event.getBaseRarity();
		console.log(rarity)
		const indexOf = global.rarities.indexOf(rarity);
		if (indexOf != null && indexOf < global.rarities.length - 1) {
			event.setRarity(global.rarities[indexOf + 1]);
		}
	}
});
