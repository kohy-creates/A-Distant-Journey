const $TreasureBag = Java.loadClass('com.majruszsdifficulty.items.TreasureBag');

StartupEvents.registry('item', event => {

	function createTreasureBag(name, suffix) {
		let modAndEntity = name.split(':');
		let nameTitleCase = global.toTitleCase(global.textReplaceAll(modAndEntity[1], '_', ' '));

		if (suffix) {
			nameTitleCase += ` (${suffix.charAt(0).toUpperCase() + suffix.slice(1)})`;
		}

		let lootTable = modAndEntity[0] + '_' + modAndEntity[1] + (suffix ? `_${suffix}` : '');

		event.createCustom('treasure_bag_' + modAndEntity[1] + (suffix ? `_${suffix}` : ''), () =>
			new $TreasureBag($ResourceLocation.fromNamespaceAndPath('kubejs', 'treasure_bag/' + lootTable))
		)
			.displayName(`<neon r=1><rainbow p=0 f=0.35>${nameTitleCase} Treasure Bag</neon></rainbow>`);

		let lootFilePath = 'kubejs/data/kubejs/loot_tables/treasure_bag/' + lootTable + '.json';
		global.writeJsonIfAbsent(lootFilePath, {}, `Created missing loot table: ${lootFilePath}`);

		let modelFilePath = 'kubejs/assets/kubejs/models/item/' + 'treasure_bag_' + modAndEntity[1] + (suffix ? `_${suffix}` : '') + '.json';
		global.writeJsonIfAbsent(
			modelFilePath,
			{
				parent: 'item/generated',
				textures: {
					layer0: 'kubejs:item/treasure_bag/placeholder'
				}
			},
			`Created missing model: ${modelFilePath}`
		);
	}

	global.bossMobsAddTreasureBag.forEach(mob => {
		if (mob === 'botania:doppleganger') {
			createTreasureBag(mob, 'hardmode');
		}
		createTreasureBag(mob);
	});

});
