const $TreasureBag = Java.loadClass('com.majruszsdifficulty.items.TreasureBag')

StartupEvents.registry('item', event => {

	function createTreasureBag(name, suffix) {
		let modAndEntity = name.split(':');
		let nameTitleCase = modAndEntity[1]
			.replace('_', ' ')
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');

		if (suffix) {
			nameTitleCase += ` (${suffix.charAt(0).toUpperCase() + suffix.slice(1)})`;
		}

		let lootTable = modAndEntity[0] + '_' + modAndEntity[1] + (suffix ? `_${suffix}` : '');

		event.createCustom('treasure_bag_' + modAndEntity[1] + (suffix ? `_${suffix}` : ''), () =>
			new $TreasureBag($ResourceLocation.fromNamespaceAndPath('kubejs', 'treasure_bag/' + lootTable))
		)
			.displayName(nameTitleCase + ' Treasure Bag');

		let lootFilePath = 'kubejs/data/kubejs/loot_tables/treasure_bag/' + lootTable + '.json';
		if (!JsonIO.read(lootFilePath)) {
			JsonIO.write(lootFilePath, {});
			console.log(`Created missing loot table: ${lootFilePath}`);
		}

		let modelFilePath = 'kubejs/assets/kubejs/models/item/' + 'treasure_bag_' + modAndEntity[1] + (suffix ? `_${suffix}` : '') + '.json';
		if (!JsonIO.read(modelFilePath)) {
			JsonIO.write(modelFilePath, {
				parent: 'item/generated',
				textures: {
					layer0: 'kubejs:item/treasure_bag/placeholder'
				}
			});
			console.log(`Created missing model: ${modelFilePath}`);
		}
	}

	global.bossMobsAddTreasureBag.forEach(mob => {
		if (mob === 'botania:doppleganger') {
			createTreasureBag(mob);
			createTreasureBag(mob, 'hardmode');
		} else {
			createTreasureBag(mob);
		}
	});

});
