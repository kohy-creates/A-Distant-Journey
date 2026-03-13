PlayerEvents.inventoryChanged(event => {
	const id = event.getItem().id;
	if (global.isItemDisabled(id)) {
		const player = event.getPlayer();
		player.getInventory().clear(id);
		player.displayClientMessage(Text.red('This item is disabled'), true);
	}
})
