const TooltipEdits = {
	TIP_CONFIG: [
		{
			items: global.rediscoveredFurniture(),
			text: 'Comes with a unique feeling of nostalgia'
		},
		{
			items: 'rediscovered:cyan_rose',
			text: 'Also known as Blue Rose'
		},

		{
			items: '#c:villager_job_sites',
			text: 'Work station for Villagers'
		},
		{
			items: [
				'summoningrituals:indestructible_altar'
			],
			text: [
				'Unbreakable. Found naturally in the Final Castle.'
			]
		},
		{
			items: [
				'summoningrituals:altar',
				'summoningrituals:indestructible_altar'
			],
			text: [
				'Used for crafting items and summoning mobs through not-so-complex rituals'
			]
		},
		{
			items: [
				'minecraft:smoker'
			],
			text: [
				'Used for cooking food'
			]
		},
		{
			items: [
				'accents:sewing_station'
			],
			text: [
				'Used for making vanity items and some decorations'
			]
		},
		{
			items: [
				'vinery:grapevine_pot'
			],
			text: [
				'Used for mashing Grapes into Juice'
			]
		},
		{
			items: [
				'brewinandchewin:keg'
			],
			text: [
				'Used for brewing the good stuff'
			]
		},
		{
			items: [
				'accents:sewing_station',
				'terra_curio:workshop',
				'vinery:grapevine_pot',
				'herbalbrews:cauldron',
				'brewinandchewin:keg',
				'botania:brewery',
				'summoningrituals:altar',
				'summoningrituals:indestructible_altar',
				'alexsmobs:capsid',
				'aether:incubator',
				'aether:freezer',
				'aether:altar',
				'rubinated_nether:freezer'
			],
			text: [
				'Used for special crafting',
			]
		},
		{
			items: /.*_spear$/,
			text: [
				'Critical hits reduce enemy defense'
			]
		},
		{
			items: [
				'wooden_sword',
				'wooden_axe',
				'wooden_pickaxe',
				'wooden_hoe',
				'wooden_shovel',
				'shieldexp:wooden_shield',
			],
			text: '\'We all have to start somewhere!\''
		},
		{
			items: [
				'kubejs:wooden_helmet',
				'kubejs:wooden_chestplate',
				'kubejs:wooden_leggings',
				'kubejs:wooden_boots',
			],
			text: '\'It\'s better than nothing...\''
		},
		{
			items: [
				'golden_apple',
				'enchanted_golden_apple',
				'majruszsdifficulty:bandage',
				'majruszsdifficulty:golden_bandage'
			],
			text: 'Stops bleeding.'
		},
		{
			items: 'enchanted_golden_apple',
			text: 'You can unenchant it. But like... why?',
			opts: { position: 2 }
		},
		{
			items: /campfire/,
			text: 'Provides health regeneration'
		},
		{
			items: 'sortilege:limitite',
			text: [
				'Increases the maximum amount of enchantments an item can hold by 1, up to 3 total times',
				'Combine the item with it in a Smithing Table using Lapis Lazuli as the template for the recipe'
			]
		},
		{
			items: 'dummmmmmy:target_dummy',
			text: [
				'An invulnerable, punchable dummy',
				'Quite perfect for measuring dealt damage'
			]
		},
		{
			items: [
				/carpet$/,
				'farmersdelight:canvas_rug'
			],
			text: [
				'Can be placed on Stairs and Slabs'
			]
		},
		{
			items: 'flower_pot',
			text: [
				'Can hang from the ceiling'
			]
		},

		// Botania
		{
			items: [
				/botania\:.*_mystical_flower/,
				/botania\:.*_double_flower/
			],
			text: 'It sparkles with magic'
		},
		{
			items: /botania\:apothecary.*/,
			text: 'The crafting table for all that is vivid'
		},
		{
			items: 'botania:diluted_pool',
			text: 'Has 10x smaller Mana capacity than a normal Mana Pool'
		},
		{
			items: 'botania:alfheim_portal',
			text: 'Uncraftable. See \'Alfthorne Sapling\' instead.'
		},
		{
			items: [
				/window_box:floating/,
				/botania:floating/,
				/botanicadds:*.floating.*/
			],
			text: 'Can be planted on any surface'
		},
		{
			items: [
				/botania:.*_chibi/,
				/window_box:.*_chibi/
			],
			text: 'Has a smaller area of effect than its regular size counterpart',
			opts: { position: 1 }
		},
		{
			items: 'botania:ancient_will_ahrim',
			text: [
				Text.darkGray(' ◇ ').append(Text.red('Critical hits')).append(Text.gray(' apply Weakness'))
			],
			opts: { position: 2 }
		},
		{
			items: 'botania:ancient_will_dharok',
			text: [
				Text.darkGray(' ◇ ').append(Text.red('Critical hits')).append(Text.gray(' are stronger while low on health'))
			],
			opts: { position: 2 }
		},
		{
			items: 'botania:ancient_will_guthan',
			text: [
				Text.darkGray(' ◇ ').append(Text.red('Critical hits')).append(Text.gray(' heal for a fraction of dealt damage'))
			],
			opts: { position: 2 }
		},
		{
			items: 'botania:ancient_will_torag',
			text: [
				Text.darkGray(' ◇ ').append(Text.red('Critical hits')).append(Text.gray(' slow mobs downs'))
			],
			opts: { position: 2 }
		},
		{
			items: 'botania:ancient_will_verac',
			text: [
				Text.darkGray(' ◇ ').append(Text.red('Critical hits')).append(Text.gray(' splash to nearby mobs'))
			],
			opts: { position: 2 }
		},
		{
			items: 'botania:ancient_will_karil',
			text: [
				Text.darkGray(' ◇ ').append(Text.red('Critical hits')).append(Text.gray(' apply Wither'))
			],
			opts: { position: 2 }
		},

		{ items: 'berry_good:glowgurt', text: 'Gurt: Glow.' },
		{ items: 'suspicious_stew', text: 'Like a box of chocolates, just disgusting' },

		// Quark
		{
			items: 'quark:seed_pouch',
			text: 'Can hold 10 stacks of Bone Meal or any Seed, Sapling, Crop or Mushroom'
		},
		{
			items: 'quark:slime_in_a_bucket',
			text: 'Jumps with enthusiasm if you are in a slime chunk'
		},

		{
			items: ['minecraft:compass', 'minecraft:recovery_compass'],
			text: 'Tells your horizontal location'
		},
		{
			items: ['minecraft:clock', 'mythicmetals:platinum_watch'],
			text: 'Tells the time and weather'
		},
		{
			items: 'additionaladditions:depth_meter',
			text: 'Tells your vertical location'
		},
		{
			items: [
				'additionaladditions:depth_meter',
				'minecraft:clock', 'minecraft:compass',
				'minecraft:recovery_compass', 'mythicmetals:platinum_watch'
			],
			text: 'Works from a Bundle',
			opts: { position: 2 }
		},
		{
			items: 'minecraft:recovery_compass',
			text: 'Points you towards the location of your last death',
			opts: { position: 3 }
		},

		// Netherexp
		{
			items: [
				/netherexp:etched_.*/,
				/netherexp:chiseled_soul_slate_.*/
			],
			text: 'Can be ignited with Flint and Steel'
		},

		// Domestication Innovation
		{
			items: /domesticationinnovation:pet_bed/,
			text: [
				'Allows your pets to respawn at dawn',
				'Move your pet onto the pet bed to set its respawn point'
			]
		},
		{
			items: 'domesticationinnovation:collar_tag',
			text: [
				'Can be enchanted',
				'Give it to your pet to transfer the enchantments\' power to it'
			]
		},

		// Misc single items
		{ items: 'bell', text: 'Ring while holding an Emerald to call a Wandering Trader' },
		{ items: 'upgrade_aquatic:elder_eye', text: 'Emits redstone signal if there is an entity in front of it' },
		{ items: 'cauldron', text: 'Can be used to brew some basic potions' },
		{ items: 'majruszsdifficulty:recall_potion', text: 'Teleports you to your spawn point' },
		{ items: 'naturescompass:naturescompass', text: 'Points in the direction of any biome in the world' },
		{ items: /bedroll/, text: 'Also known as \'sleeping bag\'' },

		// Alex’s Caves
		{
			items: 'alexscaves:dreadbow',
			text: [
				'Does the name \'Daedalous Stormbow\' ring a bell perchance?',
				'Rains Darkness Arrows around target location'
			]
		},
		{
			items: 'alexscaves:desolate_dagger',
			text: [
				'Summons extra copies of itself on hit which hit with a delayed impact',
				'Copies deal low, but armor-piercing damage'
			]
		},

		// Alloy Controllers (all last = true)
		{
			items: 'alloy_forgery:cracked_stone_bricks_forge_controller',
			text: ['Speed Multiplier: 1.0x', 'Building Material: Stone Bricks (+Variants)'],
			opts: { last: true }
		},
		{
			items: 'alloy_forgery:cracked_deepslate_bricks_forge_controller',
			text: ['Speed Multiplier: 1.25x', 'Building Material: Deepslate Bricks (+Variants)'],
			opts: { last: true }
		},
		{
			items: 'alloy_forgery:nether_bricks_forge_controller',
			text: ['Speed Multiplier: 1.75x', 'Building Material: Nether Bricks (+Variants)'],
			opts: { last: true }
		},
		{
			items: 'alloy_forgery:adamantite_forge_casing_forge_controller',
			text: ['Speed Multiplier: 2.0x', 'Building Material: Adamantite Forge Casing'],
			opts: { last: true }
		},
		{
			items: 'alloy_forgery:ender_forge_casing_forge_controller',
			text: ['Speed Multiplier: 2.5x', 'Building Material: Ender Forge Casing'],
			opts: { last: true }
		},

		// Alloy casing
		{
			items: /adj\:.*forge_casing/,
			text: 'Used to build an Alloy Forge'
		},

		// Mythic Metals / Majrusz
		{ items: 'majruszsdifficulty:enderium_helmet', text: 'Makes all Endermen less hostile' },
		{ items: 'mythicmetals:hallowed_ingot', text: 'Seems oddly familiar...' },
		{ items: 'mythicmetals:orichalcum_hammer', text: 'Mines a 3x2 area' },

		// Galosphere
		{ items: 'galosphere:allurite_block', text: 'Silences nearby blocks' },
		{ items: 'galosphere:monstrometer', text: 'Requires Lumiere Blocks as fuel' },
		{ items: 'galosphere:warped_anchor', text: 'Requires Allurite Blocks as fuel' },
		{ items: 'galosphere:combustion_table', text: 'Used to customize Silver Bombs' },
		{ items: 'galosphere:stranded_membrane_block', text: 'Pushes items and entities in the direction its facing' },

		// Wither Storm Mod
		{
			items: 'witherstormmod:command_block_book',
			text: 'Combine with any Diamond tool in an Anvil to create a Command Block tool'
		},
		{
			items: 'witherstormmod:firework_bundle',
			text: 'Might distract The Wither Storm when activated'
		},
		{
			items: 'witherstormmod:super_tnt',
			text: 'Creates a bit bigger explosion than a regular TNT'
		},
		{
			items: 'witherstormmod:formidibomb',
			text: [
				'The key to defeating The Wither Storm',
				'Place it nearby and detonate once it has 3 heads',
				'Creates a massive explosion on its own'
			]
		},

		{
			items: /ars_nouveau:arcanist/,
			text: [
				'Can be upgraded (twice total)',
				'Can be imbued with different magical threads'
			]
		},
		{
			items: [
				'mutantmonsters:mutant_skeleton_skull',
				'mutantmonsters:mutant_skeleton_chestplate',
				'mutantmonsters:mutant_skeleton_leggings',
				'mutantmonsters:mutant_skeleton_boots'
			],
			text: 'WIP! PLEASE DON\'T USE'
		},
		{
			items: /.*delight.*:.*stove.*/,
			text: 'Acts like a Campfire with 6 total slots'
		},
		{
			items: 'heart_crystals:heart_crystal',
			text: 'Increases max health by 20, up to 400'
		},
		{
			items: 'naturalist:bug_net',
			text: 'Used to catch butterflies'
		},
		{
			items: /mcdw:soul_dagger/,
			text: 'Attacks temporarily boost mana regeneration'
		},
		{
			items: 'heart_crystals:heart_lantern',
			text: 'Increases health regeneration when placed'
		},

		// Handcrafted
		{
			items: [
				/handcrafted:.*cushion/,
				/handcrafted:.*sheet/,
				'handcrafted:hammer'
			],
			text: 'Changes the look of some furniture blocks when used on them'
		},

		// Alex's Caves

		{ items: "alexscaves:ominous_catalyst", text: "Can be used to awaken the Luxtructosaurus in the core of a volcano" },
		{ items: "alexscaves:remote_detonator", text: "Used to ignite TNT or Nuclear Bombs from any distance" },
		{ items: "alexscaves:guano", text: "Throwable feces" },
		{ items: "alexscaves:fertilizer", text: "Stronger Bone Meal" },
		{ items: "alexscaves:vanilla_ice_cream_scoop", text: "A basic, yet tasty, snowball" },
		{ items: "alexscaves:strawberry_ice_cream_scoop", text: "A berry good snowball" },
		{ items: "alexscaves:sharpened_candy_cane", text: "A dangerous food and a sweet weapon" },
		{ items: "alexscaves:peppermint_powder", text: "Crushed, minty sugar" },
		{ items: "alexscaves:sack_of_sating", text: "Craves food now, to feed you later" },
		{ items: "alexscaves:block_of_azure_neodymium", text: "Repulsive to metals" },
		{ items: "alexscaves:block_of_scarlet_neodymium", text: "Attractive to metals" },
		{ items: "alexscaves:hologram_projector", text: "Can display holograms of any mob when combined with a bound holocoder. Hologram will rotate with redstone" },
		{ items: "alexscaves:magnetic_levitation_rail", text: "Lifts and accellerates minecarts above the rail" },
		{ items: "alexscaves:cooked_dinosaur_chop", text: "Can be made into dinosaur nuggets!" },
		{ items: "alexscaves:flytrap", text: "Natively venusian" },
		{ items: "alexscaves:volcanic_core", text: "The catalyst for mass extinction" },
		{ items: "alexscaves:nuclear_bomb", text: "Now I am become Death, the destroyer of worlds" },
		{ items: "alexscaves:bioluminecent_torch", text: "Can be placed underwater" },
		{ items: "alexscaves:copper_valve", text: "Something of a delayed lever" },
		{ items: "alexscaves:depth_glass", text: "Raise visibility while looked through underwater" },
		{ items: "alexscaves:ping_pong_sponge", text: "Can be combined with bioluminesscence to make floaters" },
		{ items: "alexscaves:tube_worm", text: "Requires silk touch to harvest. Watch for the pokers under water, they're friendly!" },
		{ items: "alexscaves:peering_coprolith", text: "Those aren't bats" },
		{ items: "alexscaves:forlorn_idol", text: "A totem to a thankless being" },
		{ items: "alexscaves:block_of_frosting", text: "Sickly sweet!" },
		{ items: "alexscaves:cake_layer", text: "A little springy!" },
		{ items: "alexscaves:sprinkles", text: "Colorful!" },
		{ items: "alexscaves:giant_sweetberry", text: "Can be used to top cakes or sundaes" },
		{ items: "alexscaves:gummy_ring_red", text: "A ring of red gelatin" },
		{ items: "alexscaves:gummy_ring_green", text: "A ring of green gelatin" },
		{ items: "alexscaves:gummy_ring_yellow", text: "A ring of yellow gelatin" },
		{ items: "alexscaves:gummy_ring_blue", text: "A ring of blue gelatin" },
		{ items: "alexscaves:gummy_ring_pink", text: "A ring of pink gelatin" },

		// Etcetera
		{ items: "etcetera:handbell", text: "Can call pets to you if they aren't sitting" },
		{ items: "etcetera:glowing_item_stand", text: "A glowing vertical item frame which can be covered in glass" },
		{ items: "etcetera:item_stand", text: "A vertical item frame which can be covered in glass" },
		{ items: "etcetera:squid_lamp", text: "A glowy torch which is more potent underwater" },
		{ items: "etcetera:golden_eggple", text: "May be thrown to hatch a Golden Chapple" },
		{ items: "etcetera:eggple", text: "Can be thrown to hatch a Chapple" },

		// EvilCraft
		{ items: "evilcraft:inner_block", text: "Block: %s" },
		{ items: "evilcraft:blood_chest", text: "Item repairing" },
		{ items: "evilcraft:blood_stain", text: "A splash of Blood created when an entity falls to death" },
		{ items: "evilcraft:excrement_pile", text: "Will form below animals" },
		{ items: "evilcraft:hardened_blood", text: "Dried Blood. Liquidifies with rain or by breaking it" },
		{ items: "evilcraft:environmental_accumulator", text: "Found at Dark Temples, not craftable" },
		{ items: "evilcraft:undead_sapling", text: "Grows an Undead Tree" },
		{ items: "evilcraft:purifier", text: "Disenchanter" },
		{ items: "evilcraft:spirit_furnace", text: "Cook Vengeance Spirits to obtain their drops" },
		{ items: "evilcraft:dark_tank", text: "Place in crafting grid with other tanks to increase capacity. Shift + Right click to auto-supply" },
		{ items: "evilcraft:sanguinary_pedestal_0", text: "Drains blood from blood stains in the area" },
		{ items: "evilcraft:sanguinary_pedestal_1", text: "Drains more blood from blood stains in the area" },
		{ items: "evilcraft:spiked_plate", text: "Damages mobs, place on Pedestal to drain blood" },
		{ items: "evilcraft:spirit_reanimator", text: "Revive Vengeance Spirits" },
		{ items: "evilcraft:entangled_chalice", text: ["Contents of entangled chalices are omnipresent.", "Shift + Right click to omni-supply"] },
		{ items: "evilcraft:gem_stone_torch", text: "Blocks Vengeance Spirit spawning in a radius of 15 blocks" },
		{ items: "evilcraft:eternal_water", text: "An infinite source of water" },
		{ items: "evilcraft:colossal_blood_chest", text: "An industry-sized Blood Chest" },
		{ items: "evilcraft:sanguinary_environmental_accumulator", text: "Craftable Environmental Accumulator" },
		{ items: "evilcraft:flesh_rejuvenated", text: "Infinite source of food" },
		{ items: "evilcraft:blood_extractor", text: ["Hold in inventory when slaying mobs to fill it with Blood.", "Shift + Right click to extract or auto-supply"] },
		{ items: "evilcraft:broom", text: "I think I'll try defying gravity" },
		{ items: "evilcraft:dark_power_gem", text: "Throw a Dark Gem in the middle of a pool with at least five non-hardened Blood blocks. Or infuse a Dark Gem with blood" },
		{ items: "evilcraft:blood_container", text: "DEPRECATED! Place in crafting grid to convert to a Dark Tank" },
		{ items: "evilcraft:blook", text: "Can absorb item enchants when placed in the Purifier" },
		{ items: "evilcraft:potentia_sphere", text: "Infuse with blood to make an Ender Pearl" },
		{ items: "evilcraft:inverted_potentia", text: "Strike with lightning to empower" },
		{ items: "evilcraft:inverted_potentia_empowered", text: "Struck by lightning" },
		{ items: "evilcraft:kineticator", text: ["Shift + Right click to toggle attraction.", "Right click to change area"] },
		{ items: "evilcraft:kineticator_repelling", text: ["Shift + Right click to toggle repelling.", "Right click to change area"] },
		{ items: "evilcraft:vengeance_ring", text: ["Might attract or summon Vengeance Spirits"] },
		{ items: "evilcraft:vengeance_focus", text: "Right click to enable Vengeance Spirit-freezing beam" },
		{ items: "evilcraft:vengeance_pickaxe", text: "Might summon Vengeance Spirits" },
		{ items: "evilcraft:burning_gem_stone", text: "Passively converts Vengeance Spirit damage to hunger" },
		{ items: "evilcraft:necromancer_staff", text: "Summon hordes of zombies" },
		{ items: "evilcraft:invigorating_pendant", text: "Removes bad potion effects" },
		{ items: "evilcraft:bound_blood_drop", text: "Right click to bind with your Blood Magic soul network" },
		{ items: "evilcraft:promise_tier_1", text: ["Machine tier upgrade, also usable for lower tier recipes", "Tank capacity x2"] },
		{ items: "evilcraft:promise_tier_2", text: ["Machine tier upgrade, also usable for lower tier recipes", "Tank capacity x4"] },
		{ items: "evilcraft:promise_tier_3", text: ["Machine tier upgrade, also usable for lower tier recipes", "Tank capacity x8"] },
		{ items: "evilcraft:promise_speed_0", text: "Machine speed x2" },
		{ items: "evilcraft:promise_efficiency_0", text: "Machine Blood efficiency x1.5" },
		{ items: "evilcraft:bowl_of_promises_tier0", text: "Not used up in crafting" },
		{ items: "evilcraft:bowl_of_promises_tier1", text: "Not used up in crafting" },
		{ items: "evilcraft:bowl_of_promises_tier2", text: "Not used up in crafting" },
		{ items: "evilcraft:bowl_of_promises_tier3", text: "Not used up in crafting" },
		{ items: "evilcraft:dull_dust", text: "Quite boring dust... Or is it?" },
		{ items: "evilcraft:blood_waxed_coal", text: "Double your coal efficiency" },
		{ items: "evilcraft:ender_tear", text: "Rare drop from Endermen" },
		{ items: "evilcraft:blood_potash", text: "Double your bonemealing efficiency" },
		{ items: "evilcraft:bucket_eternal_water", text: "An infinite source of water" },
		{ items: "evilcraft:sceptre_of_thunder", text: "Spawns thunder when activated, single-use" },
		{ items: "evilcraft:origins_of_darkness", text: "Obtain by feeding a Darkened Apple to a mob and quickly throwing a Book at the resulting anomaly" },
		{ items: "evilcraft:darkened_apple", text: "I wouldn't eat this, maybe feed it to some animal" },
		{ items: "evilcraft:effortless_ring", text: "Walk faster and more efficient" },
		{ items: "evilcraft:condensed_blood", text: "Insert into any machine for extra Blood" },
		{ items: "evilcraft:primed_pendant", text: "Applies the chosen potion effect" },
		{ items: "evilcraft:environmental_accumulation_core", text: "Obtained when breaking a regular Environmental Accumulator" },
		{ items: "evilcraft:garmonbozia", text: "\"Pain and Sorrow\"" },
		{ items: "evilcraft:vengeance_essence", text: "Drops when killing a Vengeance Spirit" },
		{ items: "evilcraft:piercing_vengeance_focus", text: "Right click to enable Vengeance Spirit-killing beam" },
		{ items: "evilcraft:spikey_claws", text: "Effective against soft materials" },
		{ items: "evilcraft:spectral_glasses", text: "Look into the spirit world" },

		// Twilight Forest
		{ items: "twilightforest:charm_of_life_1", text: "Will save you from dying, leaving you with minimal health" },
		{ items: "twilightforest:charm_of_life_2", text: "Will save you from dying, leaving you at full health" },

		// Cracker's Wither Storm
		{
			items: [
				"witherstormmod:command_block_sword",
				"witherstormmod:command_block_axe",
				"witherstormmod:command_block_pickaxe",
				"witherstormmod:command_block_sword",
				"witherstormmod:command_block_hoe",
				"witherstorm_delight:command_block_knife"
			],
			text: [
				"Capable of damaging The Command Block",
				"Unbreakable"
			]
		},

		// Endergetic Expansion
		{
			items: "endergetic:booflo_vest",
			text: "Grants 5 extra jumps"
		}
	]
}
