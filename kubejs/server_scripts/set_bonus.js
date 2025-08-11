const $UUID = Java.loadClass('java.util.UUID')

PlayerEvents.tick(event => {
	const player = event.getPlayer();

	let equipment = {};
	equipment['helmet'] = player.getHeadArmorItem().getId();
	equipment['chestplate'] = player.getChestArmorItem().getId();
	equipment['leggings'] = player.getLegsArmorItem().getId();
	equipment['boots'] = player.getFeetArmorItem().getId();

	let equippedTypes = [];
	for (const [key, item] of Object.entries(equipment)) {
		equippedTypes.push(item.toString().replace('_' + key, ''));
	}

	const allSame = equippedTypes.every(v => v === equippedTypes[0]);
	if (allSame && !player.getTags().toArray().includes('adj.set_bonus_active')) {
		let bonus = global.setBonusMap[equippedTypes[0]];
		if (!bonus) return;

		player.addTag('adj.set_bonus_active');
		player.addTag('adj.set_bonus.' + equippedTypes[0].replace(':', '.'));
		player.stages.add('set_bonus.' + equippedTypes[0].replace(':', '.'))
		for (const effect of bonus.effects) {
			let type = effect.type;
			let value = effect.value;
			// switch in case I ever want to extend it
			switch (type) {
				case 'effect': {
					let id = value.id;
					let amplifier = value.amplifier
					player.addEffect(new $MobEffectInstance(id, -1, amplifier));
					break;
				}
				case 'attribute': {
					let id = value.id;
					let attrValue = value.value;
					let operation = value.operation;
					let uuid;
					if (!value.uuid) {
						uuid = global.genericSetBonusUUID;
					}
					else {
						uuid = value.uuid;
					}
					player.getAttribute(id).addPermanentModifier(new $AttributeModifer(uuid, 'Set bonus', attrValue, $Operation.fromValue(operation)));
					break;
				}
			}
		}
	}
	else if (!allSame && player.getTags().toArray().includes('adj.set_bonus_active')) {
		let bonusNamespace = null;
		let bonusId = null;

		for (const tag of player.getTags().toArray()) {
			let match = tag.match(/^adj\.set_bonus\.([a-z0-9_\-]+).([a-z0-9_\-/]+)$/);
			if (match) {
				bonusNamespace = match[1];
				bonusId = match[2];
				break;
			}
		}

		if (bonusNamespace && bonusId) {
			let bonusToRemove = bonusNamespace + ':' + bonusId;
			let bonus = global.setBonusMap[bonusToRemove];
			if (!bonus) return;
			for (const effect of bonus.effects) {
				let type = effect.type;
				let value = effect.value;
				switch (type) {
					case 'effect': {
						let id = value.id;
						player.removeEffect(id)
						break;
					}
					case 'attribute': {
						let id = value.id;
						let uuid;
						if (!value.uuid) {
							uuid = global.genericSetBonusUUID;
						}
						else {
							uuid = value.uuid;
						}
						player.getAttribute(id).removeModifier(uuid);
						break;
					}
				}
			}
			player.removeTag('adj.set_bonus_active');
			player.removeTag('adj.set_bonus.' + bonusNamespace + '.' + bonusId)
			player.stages.remove('set_bonus.' + bonusNamespace + '.' + bonusId)
		}
	}
})

PlayerEvents.respawned(event => {
	const player = event.getPlayer();
	if (player.getTags().toArray().includes('adj.set_bonus_active')) {
		player.removeTag('adj.set_bonus_active')
		for (const tag of player.getTags().toArray()) {
			let match = tag.match(/^adj\.set_bonus\.([a-z0-9_\-]+).([a-z0-9_\-/]+)$/);
			if (match) {
				player.removeTag(tag)
				break;
			}
		}
	}
})