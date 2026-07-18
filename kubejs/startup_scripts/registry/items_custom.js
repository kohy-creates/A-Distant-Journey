(() => {
	/** @type {any} */
	const $QuiverItem = Java.loadClass('net.mehvahdjukaar.supplementaries.common.items.QuiverItem');

	StartupEvents.registry('item', registry => {

		const defaultProperties = new $ItemProperties();
		function createCustom(id, $itemClass, properties) {
			registry.createCustom(id, () => new $itemClass(properties ? properties : defaultProperties));
			global.writeJsonIfAbsent(`kubejs/assets/kubejs/models/item/${id}.json`, {
				parent: 'item/generated',
				textures: {
					layer0: 'minecraft:item/stick'
				}
			});
		}

		createCustom('molten_quiver', $QuiverItem, new $ItemProperties().stacksTo(1));
		createCustom('stalker_quiver', $QuiverItem, new $ItemProperties().stacksTo(1));
		createCustom('compound_quiver', $QuiverItem, new $ItemProperties().stacksTo(1));
		createCustom('shock_quiver', $QuiverItem, new $ItemProperties().stacksTo(1));
	});
})();
