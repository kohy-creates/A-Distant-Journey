JEIEvents.information(event => {

	event.addItem('minecraft:apple', [
		'An apple a day keeps the doctor away. At least that\'s what they say...'
	]);
	event.addItem(['#minecraft:beds', '#upgrade_aquatic:bedrolls'], [
		'Beds no longer skip the night instantly, instead they will greatly accelerate the flow of time while sleeping, speeding up some processes.'
	]);
	event.addItem('#upgrade_aquatic:bedrolls', [
		'A fancy name for a sleeping bag! You can place those anywhere and use them like Beds, however they won\'t change your respawn point.'
	])
	event.addItem(['supplementaries:soap', 'supplementaries:soap_block'], [
		'Can be used to return any colored block back into its colorless form.'
	])

	event.addItem(['minecraft:item_frame', 'minecraft:glow_item_frame'], [
		'Item Frames can be turned invisible by sneaking and clicking them with an empty hand if they have an item inside and can be dyed with Dyes.'
	])

	event.addItem(['minecraft:suspicious_stew'], [
		'Barely looks apetizing. Cooking it with different types of flowers will result in different potion effects when eaten.'
	])

	// event.addItem(['berry_good:glowgurt'], [
	// 	'Gurt: Glow.'
	// ])

	event.addItem(['minecraft:compass', 'minecraft:recovery_compass', 'minecraft:clock', 'additionaladditions:depth_meter', 'mythicmetals:platinum_watch', 'naturescompass:naturescompass'], [
		'Having any of the informational items in your inventory or a Bundle will show an overlay on the side of your screen that will show the item\'s relevant information. Hooray for convenience!'
	])

	event.addItem(['naturescompass:naturescompass'], [
		'Points you in the direction of any chosen biome.', 'Due to how abhorrently its display is coded, you might lag while holding it if it finds anything. This is not the modpack\'s fault, I actually had to remove a mod to make this thing\'s display not break into pieces in the first place, it\'s really bad...'
	])

	event.addItem(['tiab:time_in_a_bottle'], [
		'Collects passing time while in your inventory which can then be spent to accelerate the tick speed of any block.'
	])

	event.addItem(['minecraft:fletching_table', '@morevillagers', /*'dungeonsweaponry:weaponry_table'*/], [
		'Workstation for Villagers. Serves no purpose outside of that.'
	])

	event.addItem(['minecraft:glass_bottle', 'buzzier_bees:bee_bottle', 'buzzier_bees:endermite_bottle', 'buzzier_bees:silverfish_bottle'], [
		'Smaller insects can be right-clicked with an Empty Bottle to catch them and can be later released anywhere at any time.'
	])

	event.addItem('kubejs:enchanters_guide', [
		'Sold by Wandering Traders. Used to craft an Enchanting Table.'
	])

	event.addItem('majruszsdifficulty:recall_potion', [
		'Teleports to your spawnpoint when drank. Brewed by adding a Glowfish to an Awkward Potion.',
		'Alternatively, can be crafted by tossing the required ingredients into a Cauldron (filled with water) situated above any Campfire!'
	])

	event.addItem('additionaladditions:mysterious_bundle', [
		'Sold by Wandering Traders. Contains random items.'
	])

	event.addItem(['cauldron', /campfire/], [
		'Cauldrons can be used to brew some of the more basic potions.',
		'\\n\\n',
		'Place a Campfire right below it and fill it with water. Then toss up to 3 of the potion ingredients and voila! You can the take your potions out of the Cauldron with empty Glass Bottles!',
		'\\n\\n',
		'Look through your recipe browser to see what potions can be crafted that way.'
	])

	event.addItem([/^(?!.*(?:magic_mirror|star)).*confluence.*/], [
		'The info for all of those accessories is wrong and I have no idea if it is even possible to remove it'
	])

	event.addItem(/^(?!.*floating).*_ore.*$/, [
		'All ores are highly resistant to explosives, making mining with explosives more efficient with Fortune!'
	])

	/* 
		Botania
	*/
	event.addItem(['#botania:mystical_flowers', '#botania:double_mystical_flowers', '#botania:shimmering_mushrooms'], [
		'Mystical flora that can be turned into petals which can then be used to craft a wide array of magical plants at a Petal Apothecary.'
	])
	event.addItem(['#botania:shimmering_mushrooms'], [
		'Shimmering Mushrooms can be used in place of Petals in recipes.'
	])
	event.addItem(['#botania:petals'], [
		'Petals from a mystical flower. Can be used at a Petal Apothecary to craft magical plants.'
	])
	event.addItem([/botania\:.*_petal_block/], [
		'9 Petals combined. For what is known as \'efficient storage\'.'
	])
	event.addItem([/botania\:apothecary_.*/], [
		'Used to craft magical flora. First fill it up with Water and then toss in your ingredients. In order to finish the crafting process, toss in any Seed.'
	])

	event.addItem(['botania:conjuration_catalyst', 'botania:alchemy_catalyst', 'botanicadds:terra_catalyst'], [
		'Catalysts placed below a Mana Pool will amplify its recipes'
	])

	event.addItem(['botania:alchemy_catalyst'], [
		'Alchemy Catalyst can transform certain items into different ones. It can also be turned to turn magical flora into smaller variants that have a smaller area of effect.'
	])

	event.addItem(['botania:conjuration_catalyst'], [
		'Conjuration Catalyst can duplicate certain materials to ease the grind.'
	])

	event.addItem(['botanicadds:terra_catalyst'], [
		'Terra Catalyst only serves one purpose - to break down Gaia Spirits into smaller Shards.'
	])

	event.addItem(['botania:mana_diamond', 'botania:mana_diamond_block', 'botania:mana_pearl', 'botania:mana_string', 'botania:mana_quartz', 'botania:mana_powder'], [
		'When tossed into a Mana Pool certain items can be infused with stored Mana, gaining magical properties used in crafting recipes.'
	])

	event.addItem(['botania:mana_spreader', 'botania:redstone_spreader', 'botania:elven_spreader', 'botania:gaia_spreader'], [
		'Mana Spreaders are the easiest way of transporting Mana from one point to another. They can be pointed in a specified direction using a Wand of the Forest.'
	])

	event.addItem(['botania:twig_wand', 'botania:dreamwood_wand'], [
		'Wand of the Forest is used to bind Generating Flora to Mana Spreaders and to point Spreaders in a given direction. And some other misc functions you probably don\'t need to know.'
	])

	/* 
		Etched
	*/
	event.addItem(['#minecraft:music_discs', 'etched:blank_music_disc'], [
		'Music Discs can be smelted in a Furnace and turned into Blank Music Discs for use in an Etching Table.'
	])
	event.addItem(['etched:etching_table', 'etched:music_label', 'etched:blank_music_disc'], [
		'Can be used to create custom Music Discs. For this you will need to get a Blank Music Disc, a Label and an URL address leading to your track.'
	])
	event.addItem(['etched:music_label'], [
		'Right-click while holding it to edit the title and the author of a track.'
	])
	event.addItem(['etched:album_cover', 'etched:album_jukebox', 'etched:boombox', '#minecraft:music_discs'], [
		'Albums hold up to 9 Music Discs and can be played inside Album Jukeboxes and Boomboxes.'
	])

	/*
		Progression
	*/
	event.addItem(['minecraft:ancient_debris', 'minecraft:netherite_ingot', 'minecraft:netherite_scrap', 'minecraft:netherite_block'], [
		'Netherite generates in The Nether only after collecting the Eye of Angels.'
	])
	event.addItem(['majruszsdifficulty:enderium_shard_ore', 'majruszsdifficulty:enderium_ingot', 'majruszsdifficulty:enderium_block', 'majruszsdifficulty:enderium_shard'], [
		'Enderium generates in The End only after The Ender Dragon is defeated.'
	])

	/*
		Enchanting
	*/
	event.addItem(['minecraft:enchanted_book', 'sortilege:limitite'], [
		'Most items have an enchantment limit of 3. Limitite can be fused with items to increase the cap up to 3 times (6 enchantments total). Curses add slots, rather than occupy them.'
	])

	/*
		Fishing
	*/
	event.addItem(['tide:angler_workshop', /.*fishing_rod/], [
		'Angler Workshop is used to upgrade/edit your Fishing Rod.'
	])

	/*
		Crops
	*/
	event.addItem(['#c:hoes', '#forge:hoes'], [
		'Harvests multiple crops at the same time with right-click',
	])
})
