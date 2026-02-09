BlockEvents.rightClicked('minecraft:snow', event => {
	const player = event.getPlayer();
	if (player.getMainHandItem().getItem().getId() === 'minecraft:air'
		&& player.getOffhandItem().getItem().getId() === 'minecraft:air') {
		event.cancel();
	}
})
