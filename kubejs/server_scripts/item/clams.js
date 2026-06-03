ItemEvents.rightClicked(event => {
	const item = event.getItem();
	if (item.id == 'crittersandcompanions:clam') {
		const player = event.getPlayer();
		player.give(global.weightedRandom({
			'air': 30,
			'hybrid-aquatic:pearl': 6,
			'hybrid-aquatic:black_pearl': 3,
			'alexscaves:pearl': 1
		}));
		player.swing(event.getHand(), true);
		player.level.playSound(null, player.x, player.y, player.z, 'minecraft:entity.turtle.egg_crack', 'players', 0.5, Math.random() * 0.2 + 1.05);
		item.shrink(1);
	}
});
