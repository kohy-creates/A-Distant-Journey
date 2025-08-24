const $UUID = Java.loadClass('java.util.UUID')

PlayerEvents.loggedIn(event => {
	player.removeTag('adj.set_bonus_active');
	player.getTags().forEach(tag => {
		if (tag.startsWith('adj.set_bonus.')) {
			player.removeTag(tag);
		}
	});
	player.stages.getAll().forEach(stage => {
		if (stage.startsWith('set_bonus.')) {
			player.stages.remove(stage);
		}
	});
})

PlayerEvents.tick(event => {
	const player = event.getPlayer();

	let equipment = {};
	equipment['helmet'] = player.getHeadArmorItem().getId();
	equipment['chestplate'] = player.getChestArmorItem().getId();
	equipment['leggings'] = player.getLegsArmorItem().getId();
	equipment['boots'] = player.getFeetArmorItem().getId();

	const slotSuffixes = {
		helmet: ['_helmet', '_helm'],
		chestplate: ['_chestplate', '_tunic'],
		leggings: ['_leggings', '_pants'],
		boots: ['_boots']
	};

	let equippedTypes = [];

	for (const [slot, item] of Object.entries(equipment)) {
		let id = item.toString();

		for (const suffix of slotSuffixes[slot]) {
			if (id.endsWith(suffix)) {
				id = id.substring(0, id.length - suffix.length);
				break;
			}
		}

		equippedTypes.push(id);
	}


	let matchedBonusId = null;

	for (const [bonusId, combos] of Object.entries(global.bonusOverrides)) {
		for (const combo of combos) {
			if (combo.length !== equippedTypes.length) continue;

			let copy = equippedTypes.slice();
			let valid = true;
			for (const needed of combo) {
				let idx = copy.indexOf(needed);
				if (idx === -1) {
					valid = false;
					break;
				}
				copy.splice(idx, 1);
			}
			if (valid && copy.length === 0) {
				matchedBonusId = bonusId;
				break;
			}
		}
		if (matchedBonusId) break;
	}

	if (!matchedBonusId) {
		let allSame = equippedTypes.every(v => v === equippedTypes[0]);
		if (allSame) {
			matchedBonusId = equippedTypes[0];
		}
	}

	if (matchedBonusId && !player.getTags().toArray().includes('adj.set_bonus_active')) {
		let bonus = global.setBonusMap[matchedBonusId];
		if (!bonus) return;

		player.addTag('adj.set_bonus_active');
		player.addTag('adj.set_bonus.' + matchedBonusId.replace(':', '.'));
		player.stages.add('set_bonus.' + matchedBonusId.replace(':', '.'));

		for (const effect of bonus.effects) {
			let type = effect.type;
			let value = effect.value;
			switch (type) {
				case 'effect': {
					player.addEffect(new $MobEffectInstance(value.id, -1, value.amplifier));
					break;
				}
				case 'attribute': {
					let uuid = value.uuid || global.genericSetBonusUUID;
					player.getAttribute(value.id).addPermanentModifier(
						new $AttributeModifer(uuid, 'Set bonus', value.value, $Operation.fromValue(value.operation))
					);
					break;
				}
			}
		}
	}
	else if (!matchedBonusId && player.getTags().toArray().includes('adj.set_bonus_active')) {
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