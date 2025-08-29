const $TieredItem = Java.loadClass('net.minecraft.world.item.TieredItem')
const $ArmorItem = Java.loadClass('net.minecraft.world.item.ArmorItem')
const $SwordItem = Java.loadClass('net.minecraft.world.item.SwordItem')
const $AttributeModifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier")
const $Attributes = Java.loadClass("net.minecraft.world.entity.ai.attributes.Attributes")
const $Operation = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier$Operation')

const miningSpeedUUID = '80091653-9902-44f9-95a7-d627610856c0'
const harvestLevelUUID = '84257908-8296-4470-ad2e-97e5db59b64e'

const slots = [
	'head', 'chest', 'legs', 'feet'
]

const modifierUUIDs = [
	'2AD3F246-FEE1-4E67-B886-69FD380BB150',
	'9F3D476D-C118-4544-8365-64846904B48E',
	'D8499B04-0E66-4726-AB29-64469D734E0D',
	'845DB27C-C624-495F-8C9F-6020A9A58B6B'
]

const weaponModifierUUIDs = [
	'CB3F55D3-645C-4F38-A497-9C13A33DB5CF',
	'FA233E1C-4180-4865-B01B-BCCE9785ACA3',
]

ForgeEvents.onEvent("net.minecraftforge.event.ItemAttributeModifierEvent", (event) => {
	const item = event.getItemStack().getItem();
	const id = item.id.toString();

	// ================= Weapons =================
	if (event.slotType == 'mainhand') {
		if (item instanceof $TieredItem && !(item instanceof $SwordItem)) {
			let tier = item.getTier();
			event.addModifier("kubejs:harvest_level", new $AttributeModifier(harvestLevelUUID, "Harvest Level", tier.getLevel(), 'addition'))
			let speed = tier.getSpeed();
			if (id.includes('rose_gold')) speed = 7.0;
			event.addModifier("kubejs:mining_speed", new $AttributeModifier(miningSpeedUUID, "Mining Speed", speed, 'addition'))
		}

		let attackDamageMods = event.getOriginalModifiers().get($Attributes.ATTACK_DAMAGE);
		let baseDamage = 0
		if (attackDamageMods && !attackDamageMods.isEmpty()) {
			attackDamageMods.forEach(mod => baseDamage += mod.getAmount())
			event.removeAttribute('generic.attack_damage');
			event.addModifier('generic.attack_damage', new $AttributeModifier(weaponModifierUUIDs[0], 'Attack Damage', Math.round(baseDamage * 3.5), 'addition'))
		}

		if (Object.keys(global.weapon_overrides).includes(id)) {
			let overrides = global.weapon_overrides[id];
			event.removeAttribute('generic.attack_damage');
			event.addModifier('generic.attack_damage', new $AttributeModifier(weaponModifierUUIDs[0], 'Attack Damage', overrides[0] - 3, 'addition'))
			event.removeAttribute('generic.attack_speed');
			event.addModifier('generic.attack_speed', new $AttributeModifier(weaponModifierUUIDs[1], 'Attack Speed', -4 + overrides[1], 'addition'))
			if (overrides.length > 2) {
				event.removeAttribute('attributeslib:crit_chance');
				event.addModifier('attributeslib:crit_chance', new $AttributeModifier(weaponModifierUUIDs[0], 'Crit Chance', overrides[2], 'addition'))
				event.removeAttribute('attributeslib:crit_damage');
				event.addModifier('attributeslib:crit_damage', new $AttributeModifier(weaponModifierUUIDs[0], 'Crit Damage', overrides[3], 'addition'))
				if (overrides.length > 4) {
					event.removeAttribute('attributeslib:armor_pierce');
					event.addModifier('attributeslib:armor_pierce', new $AttributeModifier(weaponModifierUUIDs[0], 'Armor Penetration', overrides[4], 'addition'))
				}
			}
		}

		let rangedDamage = (global.bowDamage[id] || 0) + (global.arrowDamage[id] || 0)
		if (rangedDamage > 0) {
			event.addModifier('kubejs:ranged_damage',
				new $AttributeModifier(weaponModifierUUIDs[0], 'Ranged Damage', rangedDamage, 'addition'))
		}
	}

	// ================= Armor =================
	if (item instanceof $ArmorItem) {
		for (const [slot, suffixes] of Object.entries(global.armorSuffixes)) {
			if (event.slotType !== slot) continue;

			// Check if item ID ends with any of the suffixes for this slot
			if (suffixes.some(suffix => id.endsWith(suffix))) {
				let armorID = id;
				// Remove the matching suffix
				for (const suffix of suffixes) {
					if (armorID.endsWith(suffix)) {
						armorID = armorID.slice(0, -suffix.length);
						break; // only remove the first matching suffix
					}
				}

				// Special case: ars_nouveau:arcanist with tiered configs
				if (id.startsWith('ars_nouveau:arcanist')) {
					let stack = event.getItemStack();
					let nbt = stack.getNbt();
					let tier = 0;
					if (nbt && nbt.an_stack_perks) {
						let perks = nbt.an_stack_perks;
						if (perks.tier) {
							tier = perks.getInt("tier");
						}
					}
					armorID = armorID + "_" + tier;
				}

				let overrides = global.armorOverrides[armorID];
				if (!overrides) return;

				let uuid = modifierUUIDs[slots.indexOf(slot)];
				for (const attribute of Object.keys(overrides)) {
					event.removeAttribute(attribute);
					if (overrides[attribute].values[slots.indexOf(slot)] == 0) continue;
					event.addModifier(attribute,
						new $AttributeModifier(uuid, uuid, overrides[attribute].values[slots.indexOf(slot)],
							$Operation.fromValue(overrides[attribute].operation || 0)))
				}

				break;
			}
		}
	}
});
