// This is only used for displaying the tool's harvest level and mining speed in the description

const $TieredItem = Java.loadClass('net.minecraft.world.item.TieredItem')
const $ArmorItem = Java.loadClass('net.minecraft.world.item.ArmorItem')
const $SwordItem = Java.loadClass('net.minecraft.world.item.SwordItem')
const $AttributeModifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier")
const $Attributes = Java.loadClass("net.minecraft.world.entity.ai.attributes.Attributes")

const miningSpeedUUID = '80091653-9902-44f9-95a7-d627610856c0'
const harvestLevelUUID = '84257908-8296-4470-ad2e-97e5db59b64e'

const armorItemTypes = [
	'_helmet',
	'_chestplate',
	'_leggings',
	'_boots'
]

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
	// LEAVE EVERYTHING PAST HERE AS 'LET' CAUSE KUBEJS SUCKS BALLS

	if (event.slotType == 'mainhand') {
		if (item instanceof $TieredItem && !(item instanceof $SwordItem)) {
			let tier = item.getTier();
			event.addModifier("kubejs:harvest_level", new $AttributeModifier(harvestLevelUUID, "Harvest Level", tier.getLevel(), 'addition'))
			let speed = tier.getSpeed();
			if (item.id.toString().includes('rose_gold')) speed = 7.0;
			event.addModifier("kubejs:mining_speed", new $AttributeModifier(miningSpeedUUID, "Mining Speed", speed, 'addition'))
		}
		let attackDamageMods = event.getOriginalModifiers().get('generic.attack_damage');
		let baseDamage = 0
		if (attackDamageMods && !attackDamageMods.isEmpty()) {
			// AttributeModifiers is a Collection, iterate in JS
			attackDamageMods.forEach(mod => {
				baseDamage += mod.getAmount()
			})
			event.removeAttribute('generic.attack_damage');
			event.addModifier('generic.attack_damage', new $AttributeModifier(weaponModifierUUIDs[0], 'Attack Damage', Math.round(baseDamage * 4), 'addition'))
		}
		if (Object.keys(global.weapon_overrides).includes(item.id.toString())) {
			let overrides = global.weapon_overrides[item.id.toString()];
			event.removeAttribute('generic.attack_damage');
			event.addModifier('generic.attack_damage', new $AttributeModifier(weaponModifierUUIDs[0], 'Attack Damage', overrides[0], 'addition'))
			event.removeAttribute('generic.attack_speed');
			let attackSpeed = -4 + overrides[1];
			event.addModifier('generic.attack_speed', new $AttributeModifier(weaponModifierUUIDs[1], 'Attack Speed', attackSpeed, 'addition'))
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
	}
	if (item instanceof $ArmorItem) {
		let id = item.getId().toString();
		for (let i = 0; i < armorItemTypes.length; i++) {
			if (id.includes(armorItemTypes[i]) && event.slotType == slots[i]) {
				let armorID = id.replace(armorItemTypes[i], '');
				if (!global.armorOverrides[armorID]) return;
				let armorValue = global.armorOverrides[armorID][i];
				let uuid = modifierUUIDs[i];
				event.removeAttribute('generic.armor');
				event.addModifier('generic.armor', new $AttributeModifier(modifierUUIDs[i], uuid, armorValue, 'addition'))
			}
		}
	}
});
