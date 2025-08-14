// This is only used for displaying the tool's harvest level and mining speed in the description

const $TieredItem = Java.loadClass('net.minecraft.world.item.TieredItem')
const $ArmorItem = Java.loadClass('net.minecraft.world.item.ArmorItem')
const $SwordItem = Java.loadClass('net.minecraft.world.item.SwordItem')
const $AttributeModifier = Java.loadClass("net.minecraft.world.entity.ai.attributes.AttributeModifier")

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

ForgeEvents.onEvent("net.minecraftforge.event.ItemAttributeModifierEvent", (event) => {
	const item = event.getItemStack().getItem();
	if (event.slotType == 'mainhand') {
		if (item instanceof $TieredItem && !(item instanceof $SwordItem)) {
			const tier = item.getTier();
			event.addModifier("kubejs:harvest_level", new $AttributeModifier(harvestLevelUUID, "Harvest Level", tier.getLevel(), 'addition'))
			let speed = tier.getSpeed();
			if (item.id.toString().includes('rose_gold')) speed = 7.0;
			event.addModifier("kubejs:mining_speed", new $AttributeModifier(miningSpeedUUID, "Mining Speed", speed, 'addition'))
		}
	}
	if (item instanceof $ArmorItem) {
		const id = item.getId().toString();
		for (let i = 0; i < armorItemTypes.length; i++) {
			if (id.includes(armorItemTypes[i]) && event.slotType == slots[i]) {
				const armorID = id.replace(armorItemTypes[i], '');
				if (!global.armorOverrides[armorID]) return;
				const armorValue = global.armorOverrides[armorID][i];
				const uuid = modifierUUIDs[i];
				event.removeAttribute('generic.armor');
				event.addModifier('generic.armor', new $AttributeModifier(modifierUUIDs[i], uuid, armorValue, 'addition'))
			}
		}
	}
});
