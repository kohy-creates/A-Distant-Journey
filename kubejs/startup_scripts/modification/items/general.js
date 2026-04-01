ItemEvents.modification(event => {

	event.modify([
		/obsidian/,
		/magma_block/,
		/bucket/,
	], item => {
		item.fireResistant = true;
	});

});
