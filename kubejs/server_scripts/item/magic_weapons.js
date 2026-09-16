ItemEvents.rightClicked(event => {
	let item = event.getItem();
	let player = event.getPlayer();
	if (Object.keys(global.magicWeapons).includes(item.id)) {
		let entry = global.magicWeapons[item.id];
		if (!player.adjcore$tryCastSpell(entry[1])) {
			event.cancel();
			return;
		}
		if (entry[2])
			player.server.scheduleInTicks(1, () => {
				player.addItemCooldown(item.id, entry[2] - 1);
			});
	}
});

NativeEvents.onEvent('highest', false, $LivingHurtEvent, event => {

	function getBaseDamage(itemID) {
		return global.magicWeapons[itemID][0];
	}

	const victim = event.getEntity();
	const source = event.getSource()
	const player = source.getActual();
	if (player instanceof $Player) {
		let immediate = source.getImmediate();
		let type = source.getType();
		switch (type) {
			case 'twilightforest.lifedrain': {
				if (!player.adjcore$tryCastSpell(5)) {
					event.setCanceled(true);
					return;
				}
				let amount = Math.min(8, 3 + victim.getMaxHealth() * 0.005);
				event.setAmount(global.calculateSpellDamage(player, amount, true));
				player.heal(Math.ceil(amount * 0.3));
				break;
			}
			case 'indirect_magic': {
				if (immediate.getType() === 'twilightforest:wand_bolt') {
					event.setAmount(
						global.calculateSpellDamage(player, getBaseDamage('twilightforest:twilight_scepter'), true) // this gets the x4 or x5 multiplier from global edits
					);
				}
				break;
			}
			case 'mob': {
				switch (immediate.getType()) {
					case 'alexscaves:water_bolt': {
						event.setCanceled(true);
						victim.attack(
							global.getDamageSource(player.getLevel(), 'minecraft:magic', null, player),
							global.calculateSpellDamage(player, getBaseDamage('alexscaves:sea_staff'), true)
						);
					}
				}
			}
			case 'player': {
				// Terramity is a funny mod
				if (immediate instanceof $Player) {
					let item = immediate.getMainHandItem().getId();
					switch (item) {
						case 'terramity:enderswap_sceptre':
						case 'terramity:lightning_sceptre':
						case 'terramity:fireball_sceptre': {
							event.setAmount(
								global.calculateSpellDamage(player, getBaseDamage(item), false)
							);
							break;
						}
					}
				}
			}
		}
	};
});
