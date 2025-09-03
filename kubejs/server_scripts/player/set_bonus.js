const $UUID = Java.loadClass('java.util.UUID');
const $MobEffectInstance = Java.loadClass('net.minecraft.world.effect.MobEffectInstance');

PlayerEvents.tick(event => {
	const player = event.getPlayer();

	const slots = ['head', 'chest', 'legs', 'feet'];

	const equipment = {};
	const equippedTypes = [];
	const equippedTiers = [];

	for (const slot of slots) {
		/** @type {Internal.ItemStack} */
		let item = player[`get${slot.charAt(0).toUpperCase() + slot.slice(1)}ArmorItem`]();
		let id = item ? String(item.getId()) : "minecraft:air";
		equipment[slot] = id;
		if (id === "minecraft:air") continue;

		// Cleaned type
		let cleanedId = global.armorSuffixes[slot].reduce((acc, suf) => acc.endsWith(suf) ? acc.slice(0, -suf.length) : acc, id);
		equippedTypes.push(cleanedId);

		// Detect tier for arcanist armor
		let tier;
		if (id.startsWith('ars_nouveau:arcanist')) {
			tier = 0;
			if (item.getNbt().an_stack_perks) tier = item.getNbt().an_stack_perks.getInt('tier');
		}
		equippedTiers.push(tier);
	}

	const tags = player.getTags().toArray();
	const hasActiveBonus = tags.includes('adj.set_bonus_active');

	// Determine matched bonus
	let matchedBonusId = null;
	let matchedTier = null;

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

	// fallback: all pieces same
	if (!matchedBonusId && equippedTypes.length === 4 && equippedTypes.every(v => v === equippedTypes[0])) {
		matchedBonusId = equippedTypes[0];
	}

	// Special: Arcanist tier handling
	if (matchedBonusId === 'ars_nouveau:arcanist') {
		// Only apply if all non-null tiers are equal
		let nonNullTiers = equippedTiers.filter(t => t !== null);
		if (nonNullTiers.length === 4 && nonNullTiers.every(t => t === nonNullTiers[0])) {
			matchedTier = nonNullTiers[0];
		} else {
			// Not all tiers match, don't apply
			matchedBonusId = null;
		}
	}

	// Remove old bonus if needed
	if (!matchedBonusId && hasActiveBonus) removeBonus(player);

	// Apply new bonus
	if (matchedBonusId && !hasActiveBonus) {
		// Arcanist: pick correct tier
		if (matchedBonusId === 'ars_nouveau:arcanist' && matchedTier !== null) {
			matchedBonusId = matchedBonusId + '_' + matchedTier;
		}
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

	tickBonus(player)
});

PlayerEvents.respawned(event => removeBonus(event.player));
PlayerEvents.loggedIn(event => removeBonus(event.player));

function removeBonus(player) {
	let tags = player.getTags().toArray();
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

	// Copy first, then remove
	tags.forEach(tag => {
		if (tag.startsWith('adj.set_bonus.')) player.removeTag(tag);
	});

	let stages = player.stages.getAll().toArray();
	stages.forEach(stage => {
		if (stage.startsWith('set_bonus.')) player.stages.remove(stage);
	});
}

EntityEvents.hurt('player', event => {
	console.log(setBonusActive(event.getPlayer(), 'mythicmetals:kyber'))
	if (setBonusActive(event.getPlayer(), 'mythicmetals:kyber') && event.getSource().getActual()) {
		event.getPlayer().getServer().runCommandSilent(
			// entity.hurt didn't work cause why would it
			// Nothing to see here, just KubeJS being KubeJS
			`/damage ${event.getSource().getActual().getUuid().toString()} ${event.damage * 0.66} thorns by ${event.getPlayer().username}`
		)
	}
})

/**
 * Doing those as a function for the sake of visual clarity in this file
 * @param {Internal.Player} player 
 */
function tickBonus(player) {
	if (setBonusActive(player, 'born_in_chaos_v1:dark_metal_armor')) {
		const percentHP = Math.round((player.health / player.maxHealth) * 100);

		if (percentHP <= 80) {
			let amplifier = 0;
			if (percentHP <= 20) amplifier = 3;
			else if (percentHP <= 40) amplifier = 2;
			else if (percentHP <= 60) amplifier = 1;

			player.addEffect(new $MobEffectInstance('born_in_chaos_v1:light_rampage', 10, amplifier, true, true, true))
		}
		if (percentHP < 10) {
			player.removeEffect('born_in_chaos_v1:medium_rampage');
			player.removeEffect('born_in_chaos_v1:strong_rampage');
			player.removeEffect('born_in_chaos_v1:furious_rampage');
			player.removeEffect('born_in_chaos_v1:rampant_rampage');
			player.removeEffect('hunger');
		}

	}
}

/**
 * @param {Internal.Player} player 
 * @param {string} bonus 
 * @returns {boolean}
 */
function setBonusActive(player, bonus) {
	const lookFor = bonus.split(':');
	return player.tags.toArray().includes(`adj.set_bonus.${lookFor[0]}.${lookFor[1]}`);
}