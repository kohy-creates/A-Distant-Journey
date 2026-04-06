StartupEvents.registry('attribute', event => {

	const $RangedAttribute = Java.loadClass('net.minecraft.world.entity.ai.attributes.RangedAttribute');
	function registerAttribute(id, name, base, min, max) {
		event.createCustom(id, () => new $RangedAttribute(name, base, min, max).setSyncable(true));
	}

	registerAttribute('kubejs:harvest_level', 'Harvest Level', 0, 0, 10);
	registerAttribute('kubejs:mining_speed', 'Base Mining Speed', 0, 0, 1);
	registerAttribute('kubejs:ranged_damage', 'Ranged Damage', 0, 0, 10);
	registerAttribute('kubejs:food.hunger', 'Hunger Restored', 0, 0, 10);
	registerAttribute('kubejs:food.saturation', 'Saturation Restored', 0, 0, 10);
	registerAttribute('kubejs:damage_dealt', 'Damage Dealt', 1, 0, 1000);
});
