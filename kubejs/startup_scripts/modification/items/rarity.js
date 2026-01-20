ItemEvents.modification(event => {

	event.modify('@terra_curio', item => {
		item.rarity = 'common';
	});

	event.modify([
		/diamond/,
		'turtle_helmet',
		/orichalcum/,
		/mythril/,
		/palladium/,
		/veridium/,
		'ars_nouveau:novice_spell_book'
	], item => {
		item.rarity = 'uncommon';
	});

	event.modify([
		'ancient_debris',
		/netherite/,
		'netherexp:nether_pizza',
		/adamantite/,
		'ars_nouveau:apprentice_spell_book',
		/gravitite/
	], item => {
		item.rarity = 'rare';
	});

	event.modify([
		/majruszsdifficulty\:enderium\_.*/,
		/creative/,
		'ars_nouveau:archmage_spell_book',
		/treasure_bag/,
		/metallurgium/,
		/celestium/,
		/unobtainium/,
		/gaiasteel/
	], item => {
		item.rarity = 'epic'
	});
});
