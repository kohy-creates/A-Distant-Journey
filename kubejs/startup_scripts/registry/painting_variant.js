StartupEvents.registry('painting_variant', registry => {

	function registerPainting(id, width, height) {
		registry.create(id).height(height * 16).width(width * 16).tag('placeable');
	}

	registerPainting('pharaox', 2, 2)

	registerPainting('torrezx/amethyst_trim', 1, 1);
	registerPainting('torrezx/camel_s', 1, 2);
	registerPainting('torrezx/camel', 1, 1);
	registerPainting('torrezx/camels', 3, 2);
	registerPainting('torrezx/cherry_grove', 2, 1);
	registerPainting('torrezx/diamond_trim', 1, 1);
	registerPainting('torrezx/earth_chickens', 1, 1);
	registerPainting('torrezx/earth_heart', 1, 1);
	registerPainting('torrezx/earth_melon', 1, 1);
	registerPainting('torrezx/earth_pig', 1, 1);
	registerPainting('torrezx/earth_rainbow', 1, 1);
	registerPainting('torrezx/earth_tropical_slime', 1, 1);
	registerPainting('torrezx/earth_wooly_cow', 1, 1);
	registerPainting('torrezx/emerald_trim', 1, 1);
	registerPainting('torrezx/gold_trim', 1, 1);
	registerPainting('torrezx/netherite_trim', 1, 1);
	registerPainting('torrezx/redstone_trim', 1, 1);
	registerPainting('torrezx/sherd', 1, 1);
	registerPainting('torrezx/sniffer_egg', 2, 1);
	registerPainting('torrezx/sniffer', 2, 1);

});
