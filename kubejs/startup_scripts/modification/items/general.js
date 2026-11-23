ItemEvents.modification(event => {

	event.modify([
		/obsidian/,
		/magma_block/,
		/bucket/,
	], item => {
		item.fireResistant = true;
	});

	event.modify('kubejs:philosopher_stone', item => {
		item.craftingRemainingItem = 'kubejs:philosopher_stone';
	});
});
