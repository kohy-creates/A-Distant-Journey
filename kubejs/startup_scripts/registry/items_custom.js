(() => {
	/** @type {any} */
	const $QuiverItem = Java.loadClass('net.mehvahdjukaar.supplementaries.common.items.QuiverItem');
	/** @type {any} */
	const $BannerPatternItem = Java.loadClass('net.minecraft.world.item.BannerPatternItem');
	/** @type {any} */
	const $TreasureBag = Java.loadClass('com.majruszsdifficulty.items.TreasureBag');

	StartupEvents.registry('item', registry => {

		const defaultProperties = new $ItemProperties();
		function createCustom(id, itemClass, texture) {
			registry.createCustom(id, () => itemClass);
			global.writeJsonIfAbsent(`kubejs/assets/kubejs/models/item/${id}.json`, {
				parent: 'item/generated',
				textures: {
					layer0: global.getOrDefault(texture, 'minecraft:item/stick')
				}
			});
		}

		// Quivers
		createCustom('molten_quiver', new $QuiverItem(new $ItemProperties()
			.stacksTo(1)
		));
		createCustom('stalker_quiver', new $QuiverItem(new $ItemProperties()
			.stacksTo(1)
		));
		createCustom('compound_quiver', new $QuiverItem(new $ItemProperties()
			.stacksTo(1)
		));
		createCustom('shock_quiver', new $QuiverItem(new $ItemProperties()
			.stacksTo(1)
		));

		function registerBannerPatternItem(id, properties) {
			createCustom(`${id}_banner_patterm`, new $BannerPatternItem(
				$TagKey.create($Registries.BANNER_PATTERN, global.resourceLocation('adj', `pattern_item/${id}`)),
				global.getOrDefault(properties, new $ItemProperties().stacksTo(1))
			), 'minecraft:item/thing_banner_pattern');
		}

		registerBannerPatternItem('field_masoned');
		registerBannerPatternItem('bordure_indented');
		registerBannerPatternItem('text');
		registerBannerPatternItem('heart');
		registerBannerPatternItem('peace');
		registerBannerPatternItem('pride');
		registerBannerPatternItem('shark');

		function createTreasureBag(name, suffix) {
			let modAndEntity = name.split(':');
			let nameTitleCase = global.toTitleCase(global.textReplaceAll(modAndEntity[1], '_', ' '));

			if (suffix) {
				nameTitleCase += ` (${suffix.charAt(0).toUpperCase() + suffix.slice(1)})`;
			}
			let name = `<neon r=1><rainbow p=0 f=0.35>${nameTitleCase} Treasure Bag</neon></rainbow>`

			let lootTable = modAndEntity[0] + '_' + modAndEntity[1] + (suffix ? `_${suffix}` : '');
			event.createCustom(
				'treasure_bag_' + modAndEntity[1] + (suffix ? `_${suffix}` : ''), () =>
				new $TreasureBag(global.resourceLocation('kubejs', 'treasure_bag/' + lootTable))
			).displayName(name);

			let lootFilePath = 'kubejs/data/kubejs/loot_tables/treasure_bag/' + lootTable + '.json';
			global.writeJsonIfAbsent(lootFilePath, {}, `Created missing loot table for treasure bag: ${lootFilePath}`);

			let modelFilePath = 'kubejs/assets/kubejs/models/item/' + 'treasure_bag_' + modAndEntity[1] + (suffix ? `_${suffix}` : '') + '.json';
			global.writeJsonIfAbsent(
				modelFilePath,
				{ parent: 'item/generated', textures: { layer0: 'kubejs:item/treasure_bag/placeholder' } },
				`Created missing model: ${modelFilePath}`
			);
		}

		global.bossMobsAddTreasureBag.forEach(boss => createTreasureBag(boss));

		createTreasureBag('botania:doppleganger', 'hardmode');

	});
})();
