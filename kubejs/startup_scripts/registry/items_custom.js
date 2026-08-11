(() => {
	/** @type {any} */
	const $QuiverItem = Java.loadClass('net.mehvahdjukaar.supplementaries.common.items.QuiverItem');

	/** @type {any} */
	const $BannerPatternItem = Java.loadClass('net.minecraft.world.item.BannerPatternItem');

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
				$TagKey.create($Registries.BANNER_PATTERN, new $ResourceLocation('adj', `pattern_item/${id}`)),
				global.getOrDefault(properties, new $ItemProperties().stacksTo(1))
			), 'minecraft:item/thing_banner_pattern');
		}

		registerBannerPatternItem('field_masoned');
		registerBannerPatternItem('bordure_indented_masoned');
		registerBannerPatternItem('text');
		registerBannerPatternItem('heart');
		registerBannerPatternItem('peace');
		registerBannerPatternItem('pride');

	});
})();
