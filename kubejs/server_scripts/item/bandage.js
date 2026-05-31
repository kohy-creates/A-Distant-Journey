ItemEvents.rightClicked(event => {
	const item = event.getItem();
	if (item.id == 'kubejs:bandage' || item.id == 'kubejs:golden_bandage') {
		const player = event.getPlayer();
		const raycastTarget = event.getTarget();
		let healTarget;
		if (raycastTarget && raycastTarget.entity) {
			healTarget = raycastTarget.entity;
		}
		else {
			healTarget = player;
		}
		if (healTarget.getHealth() == healTarget.getMaxHealth()) return;
		healTarget.heal(item.id == 'kubejs:golden_bandage' ? 5.0 : 2.001);
		healTarget.removeEffect('majruszsdifficulty:bleeding');
		player.addItemCooldown(item.getItem(), 5);
		item.shrink(1);
	}
});
