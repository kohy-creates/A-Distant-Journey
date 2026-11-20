(() => {
	const $QuiverItem = Java.loadClass('net.mehvahdjukaar.supplementaries.common.items.QuiverItem');
	const $BannerPatternItem = Java.loadClass('net.minecraft.world.item.BannerPatternItem');
	const $TreasureBag = Java.loadClass('com.majruszsdifficulty.items.TreasureBag');
	const $WingsItem = Java.loadClass('xyz.kohara.adjcore.registry.items.WingsItem');

	StartupEvents.registry('item', registry => {

		function properties() {
			return new $ItemProperties();
		}

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
		function createQuiver(id) {
			createCustom(id, new $QuiverItem(properties().stacksTo(1)));
		}
		createQuiver('molten_quiver');
		createQuiver('stalker_quiver');
		createQuiver('compound_quiver');
		createQuiver('shock_quiver');

		function registerBannerPatternItem(id) {
			createCustom(`${id}_banner_pattern`, new $BannerPatternItem(
				$TagKey.create($Registries.BANNER_PATTERN, global.resourceLocation(`adj:pattern_item/${id}`)),
				properties().stacksTo(1)
			), 'minecraft:item/mojang_banner_pattern');
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
			let displayName = `<neon r=1><rainbow p=0 f=0.35>${nameTitleCase} Treasure Bag</neon></rainbow>`

			let lootTable = modAndEntity[0] + '_' + modAndEntity[1] + (suffix ? `_${suffix}` : '');
			registry.createCustom(
				'treasure_bag_' + modAndEntity[1] + (suffix ? `_${suffix}` : ''), () =>
				new JavaAdapter(
					$TreasureBag,
					{
						/* isFoil */m_5812_: (stack) => {
							return suffix === 'hardmode';
						}
					},
					global.resourceLocation('kubejs:treasure_bag/' + lootTable)
				)).displayName(displayName);

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

		/**
		 * 
		 * @param {string} id 
		 * @param {number} flightTime 
		 * @param {number} horizontalAccelerationMultiplier 
		 * @param {number} verticalMultiplier 
		 * @param {number} maxHorizontalSpeed 
		 * @param {Internal.ResourceLocation_} model 
		 */
		function createWings(id, flightTime, horizontalAccelerationMultiplier, verticalMultiplier, maxHorizontalSpeed, model) {
			registry.createCustom(id, () => new $WingsItem(properties(), flightTime, horizontalAccelerationMultiplier, verticalMultiplier, maxHorizontalSpeed, model))
				.tag('curios:accessory');
		}

		createWings('angel_wings', 34, 1.0, 1.5, 1.0, global.resourceLocation('botania:icon/tiara_wing_1'));
		createWings('dark_wings', 34, 1.0, 1.5, 1.0, global.resourceLocation('botania:icon/tiara_wing_2'));
		createWings('frozen_wings', 44, 1.05, 1.5, 1.0, global.resourceLocation('botania:icon/tiara_wing_3'));
		createWings('flame_wings', 54, 1.1, 1.5, 1.0, global.resourceLocation('botania:icon/tiara_wing_4'));
		createWings('butterfly_wings', 54, 1.1, 1.5, 1.0, global.resourceLocation('botania:icon/tiara_wing_5'));
		createWings('demon_wings', 54, 1.1, 1.5, 1.0, global.resourceLocation('botania:icon/tiara_wing_6'));
		createWings('ugly_wings', 54, 1.1, 1.5, 1.0, global.resourceLocation('botania:icon/tiara_wing_7'));
		createWings('golden_wings', 54, 1.1, 1.5, 1.0, global.resourceLocation('botania:icon/tiara_wing_8'));
		createWings('code_wings', 54, 1.1, 1.5, 1.0, global.resourceLocation('botania:icon/tiara_wing_9'));
	});
})();
