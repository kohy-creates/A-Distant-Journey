const $UUID = Java.loadClass('java.util.UUID');

PlayerEvents.tick(event => {
	const player = event.getPlayer();

	const slots = ['head', 'chest', 'legs', 'feet'];
	const slotSuffixes = {
		head: ['_helmet', '_helm'],
		chest: ['_chestplate', '_tunic'],
		legs: ['_leggings', '_pants'],
		feet: ['_boots']
	};

	const equipment = {};
	const equippedTypes = [];

	for (const slot of slots) {
		let item = player[`get${slot.charAt(0).toUpperCase() + slot.slice(1)}ArmorItem`]();
		let id = item ? String(item.getId()) : "minecraft:air";
		equipment[slot] = id;
		if (id === "minecraft:air") continue;

		let cleanedId = slotSuffixes[slot].reduce((acc, suf) => acc.endsWith(suf) ? acc.slice(0, -suf.length) : acc, id);
		equippedTypes.push(cleanedId);
	}

	const tags = player.getTags().toArray();
	const hasActiveBonus = tags.includes('adj.set_bonus_active');

	// Determine matched bonus
	let matchedBonusId = null;
	for (const [bonusId, combos] of Object.entries(global.bonusOverrides)) {
		for (const combo of combos) {
			if (combo.length !== equippedTypes.length) continue;

			let copy = equippedTypes.slice();
			let valid = true;
			for (const needed of combo) {
				let idx = copy.indexOf(needed);
				if (idx === -1) { valid = false; break; }
				copy.splice(idx, 1);
			}
			if (valid && copy.length === 0) {
				matchedBonusId = bonusId;
				break;
			}
		}
		if (matchedBonusId) break;
	}

	if (!matchedBonusId && equippedTypes.length === 4 && equippedTypes.every(v => v === equippedTypes[0])) {
		matchedBonusId = equippedTypes[0];
	}

	// Remove old bonus if needed
	if (!matchedBonusId && hasActiveBonus) removeBonus(player);

	// Apply new bonus
	if (matchedBonusId && !hasActiveBonus) {
		let bonus = global.setBonusMap[matchedBonusId];
		if (!bonus || !bonus.effects) return;

		player.addTag('adj.set_bonus_active');
		player.addTag('adj.set_bonus.' + matchedBonusId.replace(':', '.'));
		player.stages.add('set_bonus.' + matchedBonusId.replace(':', '.'));

		for (const effect of bonus.effects) {
			if (effect.type === 'effect') player.addEffect(new $MobEffectInstance(effect.value.id, -1, effect.value.amplifier));
			else if (effect.type === 'attribute') {
				let uuid = effect.value.uuid || global.genericSetBonusUUID;
				player.getAttribute(effect.value.id).addPermanentModifier(new $AttributeModifier(uuid, 'Set bonus', effect.value.value, $Operation.fromValue(effect.value.operation)));
			}
		}
	}
});


PlayerEvents.respawned(event => {
	removeBonus(event.player);
});

PlayerEvents.loggedIn(event => {
	removeBonus(event.player);
});


function removeBonus(player) {
	const tags = player.getTags().toArray();
	let bonusNamespace = null;
	let bonusId = null;

	for (const tag of tags) {
		let match = tag.match(/^adj\.set_bonus\.([a-z0-9_\-]+).([a-z0-9_\-/]+)$/);
		if (match) {
			bonusNamespace = match[1];
			bonusId = match[2];
			break;
		}
	}

	if (bonusNamespace && bonusId) {
		let bonusKey = bonusNamespace + ':' + bonusId;
		let bonus = global.setBonusMap[bonusKey];
		if (bonus && bonus.effects) {
			for (const effect of bonus.effects) {
				if (effect.type === 'effect') player.removeEffect(effect.value.id);
				else if (effect.type === 'attribute') {
					let uuid = effect.value.uuid || global.genericSetBonusUUID;
					player.getAttribute(effect.value.id).removeModifier(uuid);
				}
			}
		}
	}

	player.removeTag('adj.set_bonus_active');
	tags.forEach(tag => { if (tag.startsWith('adj.set_bonus.')) player.removeTag(tag); });
	let stages = player.stages.getAll();
	stages.forEach(stage => { if (stage.startsWith('set_bonus.')) player.stages.remove(stage); });
}
