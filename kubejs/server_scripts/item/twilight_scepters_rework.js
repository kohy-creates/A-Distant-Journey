ItemEvents.rightClicked('twilightforest:twilight_scepter', event => {
	const item = event.getItem();
	const player = event.getPlayer();
	if (item.damageValue != item.maxDamage) {
		player.addItemCooldown(item.id, 12);
	}
});

NativeEvents.onEvent('highest', false, $LivingHurtEvent, event => {
	const victim = event.getEntity();
	const source = event.getSource()
	const player = source.getActual();
	if (player instanceof $Player) {
		const immediate = source.getImmediate();
		const type = source.getType();
		switch (type) {
			case 'twilightforest.lifedrain': {
				const amount = Math.min(8, 3 + victim.getMaxHealth() * 0.005);
				event.setAmount(amount);
				player.heal(Math.ceil(amount * 0.3));
				break;
			}
			case 'indirect_magic': {
				if (immediate.getType() === 'twilightforest:wand_bolt') {
					event.setAmount(4); // this gets the x4 or x5 multiplier from global edits
				}
				break;
			}
		}
	};
});
