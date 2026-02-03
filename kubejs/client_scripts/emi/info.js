JEIEvents.information(event => {

	function addInfo(items, text) {
		let filtered = [];
		if (!Array.isArray(items)) {
			items = [items]
		}
		items.forEach(i => {
			if (i instanceof RegExp
				|| i.startsWith('#')
				|| i.startsWith('@')
				|| Item.exists(i)
			) {
				filtered.push(i)
			}
			else {
				console.log(`Invalid item id: ${i}`)
			}
		});

		if (filtered.length == 0) return;

		event.addItem(filtered, text);
	}

	addInfo('minecraft:apple', [
		'An apple a day keeps the doctor away. At least that\'s what they say...'
	]);
	addInfo(['#minecraft:beds', '#upgrade_aquatic:bedrolls'], [
		'Beds no longer skip the night instantly, instead they will greatly accelerate the flow of time while sleeping, speeding up some processes.'
	]);
	addInfo('#upgrade_aquatic:bedrolls', [
		'A fancy name for a sleeping bag! You can place those anywhere and use them like Beds, however they won\'t change your respawn point.'
	])
	addInfo(['supplementaries:soap', 'supplementaries:soap_block'], [
		'Can be used to return any colored block back into its colorless form.'
	])

	// event.addItem(['minecraft:item_frame', 'minecraft:glow_item_frame'], [
	// 	'Item Frames can be turned invisible by sneaking and clicking them with an empty hand if they have an item inside and can be dyed with Dyes.'
	// ])

	addInfo(['minecraft:suspicious_stew'], [
		'Barely looks apetizing. Cooking it with different types of flowers will result in different potion effects when eaten.'
	])

	addInfo(['galosphere:allurite_block'], [
		'Placing an Allurite Block adjacent to a block that produces sound will mitigate the sounds by 90%.',
	])

	addInfo(['galosphere:monstrometer'], [
		'Activate this block by right-clicking it with an Lumiere Block.',
		'Once activated, it emits aura particles in dark areas within a 16 block radius and highlights nearby hostile mobs.'
	])

	addInfo(['galosphere:warped_anchor'], [
		'Activate this block by right-clicking it with an Allurite Block.',
		'Once activated, if an Ender Pearl lands near a Warped Anchor, player will be teleported to the Warped Anchor instead.'
	])

	addInfo(['galosphere:charged_lumiere_block'], [
		'Obtained by striking a Lumiere Block with lightning. Not very useful in its current state, but at least the animated texture looks cool.',
	])

	addInfo(['galosphere:combustion_table', 'galosphere:silver_bomb'], [
		'Combustion Table can be used to customize Silver Bombs.',
		'Gunpowder increases blast radius, Strings increase fuse duration, Slimeballs increase the bounciness of the bomb.'
	])

	// event.addItem(['berry_good:glowgurt'], [
	// 	'Gurt: Glow.'
	// ])

	addInfo(['minecraft:compass', 'minecraft:recovery_compass', 'minecraft:clock', 'additionaladditions:depth_meter', 'mythicmetals:platinum_watch', 'naturescompass:naturescompass'], [
		'Having any of the informational items in your inventory or a Bundle will show an overlay on the side of your screen that will show the item\'s relevant information. Hooray for convenience!'
	])

	addInfo(['naturescompass:naturescompass'], [
		'Points you in the direction of any chosen biome.', 'Due to how abhorrently its display is coded, you might lag while holding it if it finds anything. This is not the modpack\'s fault, I actually had to remove a mod to make this thing\'s display not break into pieces in the first place, it\'s really bad...'
	])

	addInfo(['tiab:time_in_a_bottle'], [
		'Collects passing time while in your inventory which can then be spent to accelerate the tick speed of any block.'
	])

	addInfo(['minecraft:fletching_table', '@morevillagers'], [
		'Workstation for Villagers. Serves no purpose outside of that.'
	])

	addInfo('kubejs:enchanters_guide', [
		'Sold by Wandering Traders. Used to craft an Enchanting Table.'
	])

	addInfo('majruszsdifficulty:recall_potion', [
		'Teleports to your spawnpoint when drank. Brewed by adding a Glowfish to an Awkward Potion.',
		'Alternatively, can be crafted by tossing the required ingredients into a Cauldron (filled with water) situated above any Campfire!'
	])

	addInfo('additionaladditions:mysterious_bundle', [
		'Sold by Wandering Traders. Contains random items.'
	])

	addInfo(['cauldron', /campfire/], [
		'Cauldrons can be used to brew some of the more basic potions.',
		'\\n\\n',
		'Place a Campfire right below it and fill it with water. Then toss up to 3 of the potion ingredients and voila! You can the take your potions out of the Cauldron with empty Glass Bottles!',
		'\\n\\n',
		'Look through your recipe browser to see what potions can be crafted that way.'
	])

	addInfo(/^(?!.*floating).*_ore$/, [
		'All ores are highly resistant to explosives, making mining with explosives more efficient with Fortune!'
	])

	addInfo('artifacts:everlasting_beef', [
		'Infinitely renewable food source with a cooldown! 1/500 drop from Cows and Cow-like mobs. Looting boosts the odds to 1/400.'
	])

	/* 
		Botania
	*/
	addInfo(['#botania:mystical_flowers', '#botania:double_mystical_flowers', '#botania:shimmering_mushrooms'], [
		'Mystical flora that can be turned into petals which can then be used to craft a wide array of magical plants at a Petal Apothecary.'
	])
	addInfo(['#botania:shimmering_mushrooms'], [
		'Shimmering Mushrooms can be used in place of Petals in recipes.'
	])
	addInfo(['#botania:petals'], [
		'Petals from a mystical flower. Can be used at a Petal Apothecary to craft magical plants.'
	])
	addInfo([/botania\:.*_petal_block/], [
		'9 Petals combined. For what is known as \'efficient storage\'.'
	])
	addInfo([/botania\:apothecary_.*/], [
		'Used to craft magical flora. First fill it up with Water and then toss in your ingredients. In order to finish the crafting process, toss in any Seed.'
	])

	addInfo(['botania:conjuration_catalyst', 'botania:alchemy_catalyst', 'botanicadds:terra_catalyst'], [
		'Catalysts placed below a Mana Pool will amplify its recipes'
	])

	addInfo(['botania:alchemy_catalyst'], [
		'Alchemy Catalyst can transform certain items into different ones. It can also be turned to turn magical flora into smaller variants that have a smaller area of effect.'
	])

	addInfo(['botania:conjuration_catalyst'], [
		'Conjuration Catalyst can duplicate certain materials to ease the grind.'
	])

	addInfo(['botanicadds:terra_catalyst'], [
		'Terra Catalyst only serves one purpose - to break down Gaia Spirits into smaller Shards.'
	])

	addInfo(['botania:mana_diamond', 'botania:mana_diamond_block', 'botania:mana_pearl', 'botania:mana_string', 'botania:quartz_mana', /*'botania:mana_powder'*/], [
		'When tossed into a Mana Pool certain items can be infused with stored Mana, gaining magical properties used in crafting recipes.'
	])

	addInfo(['botania:mana_spreader', 'botania:redstone_spreader', 'botania:elven_spreader', 'botania:gaia_spreader'], [
		'Mana Spreaders are the easiest way of transporting Mana from one point to another. They can be pointed in a specified direction using a Wand of the Forest.'
	])

	addInfo(['botania:twig_wand', 'botania:dreamwood_wand'], [
		'Wand of the Forest is used to bind Generating Flora to Mana Spreaders and to point Spreaders in a given direction. And some other misc functions you probably don\'t need to know.'
	])


	addInfo(['botania:ender_air_bottle', 'glass_bottle'], [
		'Right click with an Empty Bottle to bottle up some Ender Air while in either The End dimension or in a Warped Forest.',
	])

	addInfo(
		[
			/functionalstorage:oak_.*/,
			'functionalstorage:compacting_drawer'
		], [
		'Storage Drawers can hold up to 16 stacks of a single item, being a perfect solution for mass single item storage.',
		'1x2 Drawers can hold 8 stacks of 2 different items, 2x2 Drawers can hold 4 stacks of 4 different items.',
		'Compacting Drawers automatically compact items into their storage forms (e.g. Iron Ingot -> Iron Block).'
	])

	/* 
		Etched
	*/
	addInfo(['#minecraft:music_discs', 'etched:blank_music_disc'], [
		'Music Discs can be smelted in a Furnace and turned into Blank Music Discs for use in an Etching Table.'
	])
	addInfo(['etched:etching_table', 'etched:music_label', 'etched:blank_music_disc'], [
		'Can be used to create custom Music Discs. For this you will need to get a Blank Music Disc, a Label and an URL address leading to your track.'
	])
	addInfo(['etched:music_label'], [
		'Right-click while holding it to edit the title and the author of a track.'
	])
	addInfo(['etched:album_cover', 'etched:album_jukebox', 'etched:boombox', '#minecraft:music_discs'], [
		'Albums hold up to 9 Music Discs and can be played inside Album Jukeboxes and Boomboxes.'
	])

	/*
		Progression
	*/
	addInfo(['minecraft:ancient_debris', 'minecraft:netherite_ingot', 'minecraft:netherite_scrap', 'minecraft:netherite_block'], [
		'Netherite generates in The Nether only after collecting the Eye of Angels.'
	])
	addInfo(['minecraft:ancient_debris',], [
		'Spelunker Potions do not highlight Ancient Debris. To compensate, Debris generates slightly more frequently'
	])
	addInfo(['ancient_aether:valkyrum_ore', 'aether_redux:raw_valkyrum', 'aether_redux:raw_valkyrum_block', 'ancient_aether:valkyrum', 'ancient_aether:valkyrum_block'], [
		'Valkyrum generates in the lower parts of The Aether after killing Valkyrie Queen.'
	])
	// event.addItem(['majruszsdifficulty:enderium_shard_ore', 'majruszsdifficulty:enderium_ingot', 'majruszsdifficulty:enderium_block', 'majruszsdifficulty:enderium_shard'], [
	// 	'Enderium generates in The End only after The Ender Dragon is defeated.'
	// ])

	/*
		Enchanting
	*/
	addInfo(['minecraft:enchanted_book', 'sortilege:limitite'], [
		'Most items have an enchantment limit of 3.',
		'Limitite can be fused with items to increase the cap up to 3 times (6 enchantments total).'/*, 'Curses add slots, rather than occupy them.'*/
	])

	/*
		Fishing
	*/
	addInfo(['tide:angler_workshop', /.*fishing_rod/], [
		'Angler Workshop is used to upgrade/edit your Fishing Rod.'
	])

	/*
		Crops
	*/
	addInfo(['#c:hoes', '#forge:hoes'], [
		'Harvests and replants multiple crops at the same time with right-click.',
	])

	/*
		Accessores
	*/
	addInfo(['terra_curio:honey_comb'], [
		'Can be found in any chest in The Bumblezone at a 5% chance.'
	])

	/*
		Alex's Caves
	*/
	addInfo("alexscaves:scarlet_neodymium_ingot", "Used to craft blocks that attract metal or add to magnets to increase range.")
	addInfo("alexscaves:azure_neodymium_ingot", "Used to craft blocks that repulse metal or add to magnets to decrease range.")
	addInfo("alexscaves:holocoder", "Clicking a mob will bind the mob's DNA and allow it to be displayed in a hologram, including yourself.")
	addInfo("alexscaves:quarry_smasher", "Requires a rectangle of magnetic lights of up to 20 blocks and a magnetic quarry to activate.")
	addInfo("alexscaves:resistor_shield", "A unique variant of shield that is used to block damage from oncoming attacks or explosions while simultaneously doing continuous damage and knockback to foes in a small radius.")
	addInfo(["alexscaves:trilocaris_tail", "alexscaves:cooked_trilocaris_tail"], "Dropped by Trilocaris, can be fed to Subterranodons to tame them. Tamed Subterranodon can be ridden and flown to navigate long distances.")
	addInfo("alexscaves:seething_stew", "Gifts the rage effect when eaten. Can be fed to mobs to heal six hearts of damage and send them into a rage.")
	addInfo("alexscaves:primordial_soup", "Gives haste when eaten. When fed to relicheirus, they will go on to push down nearby trees for 1 minute.")
	addInfo("alexscaves:primitive_club", "A slow swinging stump attached to bone which has a chance to stun enemies on hit.")
	addInfo("alexscaves:tree_star", "Can be used to breed Atlatitans, Grottoceratops, and Relicheirus, along with certain foods.")
	addInfo("alexscaves:fiddlehead", "Created when a Grottoceratops munches on a curly fern.")
	addInfo(["alexscaves:radgill", "alexscaves:cooked_radgill"], "Will irradiate you if eaten. Used to tame and breed Raycats.")
	addInfo("alexscaves:radon_bottle", "Obtained by capturing the gas emitted from a geothermal vent over acid.")
	addInfo("alexscaves:disc_fragment_fusion", "Dropped by Nucleepers killed by a Tremorzilla's energy beam.")
	addInfo("alexscaves:marine_snow", "Obtained by feeding sea pigs clay balls, mud, or muck. Can be used to revive coral or grow coral and mussels.")
	addInfo("alexscaves:pearl", "Obtained from mussels and can be used to barter with the deep ones.")
	addInfo("alexscaves:gazing_pearl", "Shows you your reputation with the deep ones. It's gleam and hue are indicative of your relations.")
	addInfo("alexscaves:magic_conch", "An extremely magical weapon capable of summoning loyal Deep Ones to aid you in battle.")
	addInfo("alexscaves:sea_staff", "A highly magical ranged weapon that utilizes summoning powerful bolts of water to damage enemies.")
	addInfo("alexscaves:moth_dust", "A unique item that can be sprayed onto mobs or other players to strategically mark them with the scent of a Gloomoth, making all forlorn denizens hostile toward them.")
	addInfo("alexscaves:totem_of_possession", "An ominous, magical weapon capable of binding to and controlling the behaviors of nearby creatures.")
	addInfo(["alexscaves:sweetish_fish_red", "alexscaves:sweetish_fish_red_bucket"], "Can be used to breed red gummy bears. Tastes of cherry.")
	addInfo(["alexscaves:sweetish_fish_green", "alexscaves:sweetish_fish_green_bucket"], "Can be used to breed green gummy bears. Tastes of apple.")
	addInfo(["alexscaves:sweetish_fish_yellow", "alexscaves:sweetish_fish_yellow_bucket"], "Can be used to breed yellow gummy bears. Tastes of lemon.")
	addInfo(["alexscaves:sweetish_fish_blue", "alexscaves:sweetish_fish_blue_bucket"], "Can be used to breed blue gummy bears. Tastes of blueberry.")
	addInfo(["alexscaves:sweetish_fish_pink", "alexscaves:sweetish_fish_pink_bucket"], "Can be used to breed pink gummy bears. Tastes of watermelon.")
	addInfo("alexscaves:hot_chocolate_bottle", "Removes insomnia upon consumption. Tastes of cocoa powder and undissolved sugar.")
	addInfo("alexscaves:caramel_apple", "Agressively sweet, can be used to tame Candicorns. Tacky.")
	addInfo("alexscaves:radiant_essence", "Only dropped from Licowitches, Radiant Essence is essential for converting the biomes of certain areas.")
	addInfo("alexscaves:disc_fragment_tasty", "Dropped by Gumbeepers when killed by Caniacs.")
	addInfo("alexscaves:spelunkery_table", "Exclusively found in Underground Cabins. They are useful for researching and decoding Cave Tablets.")
	addInfo("alexscaves:azure_magnet", "When powered, an Azure Magnet repulses magnetic blocks and items in the direction it's facing. Any blocks repulsed by the Magnet cannot be broken until they have left the magnet's range.")
	addInfo("alexscaves:scarlet_magnet", "When powered, a Scarlet Magnet attracts magnetic blocks and items in the direction it's facing. Any blocks attracted by the Magnet cannot be broken until the Magnet is switched off.")
	addInfo("alexscaves:ambersol", "A glowing, sol-similar block which emits light in a direct downwards ray from itself.")
	addInfo("alexscaves:amber_monolith", "Spawner-esque blocks which are found ontop of limestone pillars. The mob inside is dependent on the biome it's placed in, which will spawn.")
	addInfo([
		"alexscaves:atlatitan_egg",
		"alexscaves:grottoceratops_egg",
		"alexscaves:relicheirus_egg",
		"alexscaves:subterranodon_egg",
		"alexscaves:vallumraptor_egg"
	], "Will crack after 8-10 days, or 4-5 if on fern thatch.")
	addInfo("alexscaves:dinosaur_chop", "Dropped in large amounts by large prehistoric creatures.")
	addInfo("alexscaves:geothermal_vent", "When a liquid is placed under the largest vent size and fully enclosed, the vent will begin to spill out a color of steam. The only liquids that work for it are Acid, Water, and Lava.")
	addInfo("alexscaves:nuclear_furnace_component", "A multiblock which requires 8 blocks assembled in a 2x2 cube to smelt with uranium rods.")
	addInfo("alexscaves:nuclear_siren", "Can be powered with Redstone, causing them to emit a very loud wailing sound that can be heard from up to 256 blocks away. This sound remains audible even through blocks")
	addInfo([
		"alexscaves:radon_lamp_white",
		"alexscaves:radon_lamp_orange",
		"alexscaves:radon_lamp_magenta",
		"alexscaves:radon_lamp_light_blue",
		"alexscaves:radon_lamp_yellow",
		"alexscaves:radon_lamp_lime",
		"alexscaves:radon_lamp_pink",
		"alexscaves:radon_lamp_gray",
		"alexscaves:radon_lamp_light_gray",
		"alexscaves:radon_lamp_cyan",
		"alexscaves:radon_lamp_purple",
		"alexscaves:radon_lamp_blue",
		"alexscaves:radon_lamp_brown",
		"alexscaves:radon_lamp_green",
		"alexscaves:radon_lamp_red",
		"alexscaves:radon_lamp_black",
	], "A dyeable light-emitting blocks that are crafted using Bottles of Radon. Can be redyed.")
	addInfo("alexscaves:drain", "Act similarly to a reusable sponge, where they will remove any water above it and any water connected to that.")
	addInfo("alexscaves:enigmatic_engine", "Dropped from Hullbreakers, and used in a multiblock to build submarines in a 3x3 grid of copper blocks with a 3x2 window of depth glass.")
	addInfo("alexscaves:moth_ball", "Gloomoth deterrent. 5 can be placed in one block, and can dispel gloomoths from 15 blocks if clustered.")
	addInfo("alexscaves:block_of_chocolate", "Surprisingly resistant to melting. Can be used in the Conversion Crucible.")
	addInfo("alexscaves:conversion_crucible", "A golden cauldron which, with Radiant Essence and Biome Treats, can be used to transmute biomes.")
	addInfo("alexscaves:confection_oven", "A magical oven able to infinitely summon Gingerbread Men. If Rock Candy of any color is placed under the oven, the Gingerbread Men summoned will take on the color of the placed Rock Candy.")

	// Etcetera
	addInfo("etcetera:drum", "Will play a sound when hit or landed on, varying in pitch depending on where it's hit! Changes sound dependent on what's underneath.")
	addInfo("etcetera:crumbling_stone", "When interacted with, it will crumble and eventually break Can be waxed to preserve it")
})
