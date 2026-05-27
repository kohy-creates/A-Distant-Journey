ItemEvents.rightClicked(/kubejs:.*bandage/, event => {
	const item = event.getItem();
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
	player.addItemCooldown(item.getItem(), 4);
	item.shrink(1);
});
