StartupEvents.registry('attribute', event => {

	const $RangedAttribute = Java.loadClass('net.minecraft.world.entity.ai.attributes.RangedAttribute');
	function registerAttribute(id, name, base, min, max) {
		event.createCustom(id, () => new $RangedAttribute(name, base, min, max).setSyncable(true));
	}

	registerAttribute('harvest_level', 'Harvest Level', 0, 0, 10);
	registerAttribute('mining_speed', 'Base Mining Speed', 0, 0, 1);
	registerAttribute('ranged_damage', 'Ranged Damage', 0, 0, 10);
	registerAttribute('enchantment_power', 'Enchanting Table Power', 0, 0, 1000);
	registerAttribute('healing_power', 'Healing Power', 0, 0, 2048);
	registerAttribute('magic_damage', 'Magic Damage', 0, 0, 4096);
});
