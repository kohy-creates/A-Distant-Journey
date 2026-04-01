StartupEvents.registry('banner_pattern', registry => {

	const lang = {};

	const $BannerPattern = Java.loadClass('net.minecraft.world.level.block.entity.BannerPattern');
	function registerBannerPattern(id, tag) {
		console.log(`Registering banner pattern kubejs:${id}`)
		registry.createCustom(id, () => new $BannerPattern(id)).tag(tag ? tag : 'minecraft:no_item_required');

		Color.DYE.forEach(color => {
			lang[`block.minecraft.banner.kubejs.${id}.${color}`] = `${global.toTitleCase(color)} ${global.toTitleCase(global.textReplaceAll(id.split('/')[1], '_', ''))}`
		})
	}

	registerBannerPattern('moxvallix/chequered');
	registerBannerPattern('moxvallix/circle_tiles');
	registerBannerPattern('moxvallix/cogs');
	registerBannerPattern('moxvallix/curtains');
	registerBannerPattern('moxvallix/double_bars');
	registerBannerPattern('moxvallix/double_gradient');
	registerBannerPattern('moxvallix/fancy');
	registerBannerPattern('moxvallix/tattered');

	registerBannerPattern('muki/25_fade');
	registerBannerPattern('muki/bend_tilted_sinister');
	registerBannerPattern('muki/bend_tilted');
	registerBannerPattern('muki/billet_bottom');
	registerBannerPattern('muki/billet_center');
	registerBannerPattern('muki/billet_left');
	registerBannerPattern('muki/billet_right');
	registerBannerPattern('muki/billet_top');
	registerBannerPattern('muki/bordure_center');
	registerBannerPattern('muki/bordure_corners');
	registerBannerPattern('muki/bottom_keystone_down');
	registerBannerPattern('muki/bottom_keystone_up');
	registerBannerPattern('muki/checkered_inverted');
	registerBannerPattern('muki/checkered');
	registerBannerPattern('muki/gradient_left');
	registerBannerPattern('muki/gradient_right');
	registerBannerPattern('muki/left_chevron');
	registerBannerPattern('muki/left_indented');
	registerBannerPattern('muki/quad_bezants');
	registerBannerPattern('muki/quarter_bottom_left');
	registerBannerPattern('muki/quarter_bottom_right');
	registerBannerPattern('muki/quarter_top_left');
	registerBannerPattern('muki/quarter_top_right');
	registerBannerPattern('muki/right_chevron');
	registerBannerPattern('muki/right_indented');
	registerBannerPattern('muki/top_keystone_down');
	registerBannerPattern('muki/top_keystone_up');

	registerBannerPattern('moxvallix/blam', 'minecraft:pattern_item/creeper');
	registerBannerPattern('moxvallix/ghast', 'minecraft:pattern_item/creeper');
	registerBannerPattern('moxvallix/pillager', 'minecraft:pattern_item/creeper');
	registerBannerPattern('moxvallix/ribs', 'minecraft:pattern_item/creeper');
	registerBannerPattern('moxvallix/villager', 'minecraft:pattern_item/creeper');

	registerBannerPattern('moxvallix/knot', 'minecraft:pattern_item/flower');
	registerBannerPattern('moxvallix/moon', 'minecraft:pattern_item/flower');
	registerBannerPattern('moxvallix/peace', 'minecraft:pattern_item/flower');
	registerBannerPattern('moxvallix/sun', 'minecraft:pattern_item/flower');
	registerBannerPattern('moxvallix/yin_yang', 'minecraft:pattern_item/flower');

	registerBannerPattern('moxvallix/horn', 'minecraft:pattern_item/globe');
	registerBannerPattern('moxvallix/pumpkin', 'minecraft:pattern_item/globe');

	registerBannerPattern('moxvallix/anchor', 'minecraft:pattern_item/thing');
	registerBannerPattern('moxvallix/clubs', 'minecraft:pattern_item/thing');
	registerBannerPattern('moxvallix/companion', 'minecraft:pattern_item/thing');
	registerBannerPattern('moxvallix/diamonds', 'minecraft:pattern_item/thing');
	registerBannerPattern('moxvallix/emoji', 'minecraft:pattern_item/thing');
	registerBannerPattern('moxvallix/eye', 'minecraft:pattern_item/thing');
	registerBannerPattern('moxvallix/hearts', 'minecraft:pattern_item/thing');
	registerBannerPattern('moxvallix/revolution', 'minecraft:pattern_item/thing');
	registerBannerPattern('moxvallix/spades', 'minecraft:pattern_item/thing');

	registerBannerPattern('moxvallix/castle', 'minecraft:pattern_item/snout');
	registerBannerPattern('moxvallix/palace', 'minecraft:pattern_item/snout');
	registerBannerPattern('moxvallix/pyramid', 'minecraft:pattern_item/snout');
	registerBannerPattern('moxvallix/tower', 'minecraft:pattern_item/snout');

	registerBannerPattern('moxvallix/crown', 'minecraft:pattern_item/skull');
	registerBannerPattern('moxvallix/hammer', 'minecraft:pattern_item/skull');
	registerBannerPattern('moxvallix/shield', 'minecraft:pattern_item/skull');
	registerBannerPattern('moxvallix/sword', 'minecraft:pattern_item/skull');
	registerBannerPattern('moxvallix/trident', 'minecraft:pattern_item/skull');

	JsonIO.write('kubejs/assets/kubejs/lang/en_us.json', lang)
})
