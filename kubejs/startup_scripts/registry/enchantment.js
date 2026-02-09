StartupEvents.registry('enchantment', registry => {
	registry.create('radiance', 'basic')
		.weapon()
		// .category('weapon')
		.veryRare()
		.treasureOnly()
		.minCost(level => { return 7 + 6 * (level - 1) })
		.maxCost(level => { return 8 + 6 * level })
		.maxLevel(4)

	registry.create('echo', 'basic')
		.weapon()
		// .category('weapon')
		.rare()
		.minCost(level => { return 7 + 6 * (level - 1) })
		.maxCost(level => { return 14 + 6 * level })
		.maxLevel(5)

	registry.create('leeching', 'basic')
		.weapon()
		// .category('weapon')
		.uncommon()
		.minCost(level => { return 10 + 5 * (level - 1) })
		.maxCost(level => { return 10 + 9 * level })
		.maxLevel(4)

	registry.create('prospector', 'basic')
		.weapon()
		// .category('weapon')
		.veryRare()
		.treasureOnly()
		.minCost(level => { return 7 + 6 * (level - 1) })
		.maxCost(level => { return 8 + 6 * level })
		.maxLevel(4)

	registry.create('rampaging', 'basic')
		.weapon()
		// .category('weapon')
		.veryRare()
		.minCost(level => { return 10 + 5 * (level - 1) })
		.maxCost(level => { return 16 + 6 * level })
		.maxLevel(4)

	registry.create('cowardice', 'basic')
		.armorChest()
		// .category('armor_chest')
		.veryRare()
		.minCost(level => { return 10 + 5 * (level - 1) })
		.maxCost(level => { return 16 + 6 * level })
		.maxLevel(4)

	registry.create('lucky_explorer', 'basic')
		.armorFeet()
		.treasureOnly()
		.untradeable()

	registry.create('reckless', 'basic')
		.armorChest()
		// .category('armor_chest')
		.veryRare()
		.untradeable()
		.treasureOnly()
		.minCost(level => { return 10 + 5 * (level - 1) })
		.maxCost(level => { return 16 + 5 * level })
		.maxLevel(4)
		.checkCompatibility(
			/** @param {Internal.Enchantment} enchant */(other) => {
				switch (other.getId().toString()) {
					case 'kubejs:cowardice': {
						return false;
					}
					default: {
						return true;
					}
				}
			})

	registry.create('rapid_regen', 'basic')
		.armorChest()
		// .category('armor_chest')
		.rare()
		.treasureOnly()
		.minCost(level => { return 15 + 10 * (level - 1) })
		.maxCost(level => { return 16 + 13 * level })
		.maxLevel(4)

	registry.create('void_strike')
		.untradeable()
		.treasureOnly()
		.weapon()
		.curse()


	registry.create('void_shot')
		.untradeable()
		.treasureOnly()
		.bow()
		.crossbow()
		.curse()

	registry.create('committed')
		.weapon()
		.rare()
		.minCost(level => { return 7 + 6 * (level - 1) })
		.maxCost(level => { return 14 + 6 * level })
		.maxLevel(5)

})