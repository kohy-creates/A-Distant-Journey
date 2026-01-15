ItemEvents.rightClicked(event => {

	const item = event.getItem();
	const id = item.getId();
	const player = event.getPlayer();

	switch (id) {
		case 'ars_nouveau:greater_experience_gem':
		case 'ars_nouveau:experience_gem': {
			if (player.getXpLevel() === 50) {
				event.cancel();
			}
			player.swing(event.getHand(), true)
			player.level.playSound(null, player.getPos(), 'minecraft:block.amethyst_cluster.break', 'neutral');
			break;
		}
	}
})