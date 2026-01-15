/**
 * @type {$LocalPlayer_}
 */
let currentPlayer = null;

ClientEvents.tick(event => {
	if (!currentPlayer && event.player) {
		currentPlayer = event.player;
	}
});

ItemEvents.tooltip(event => {

	function colorDurabilityText(p, t) {
		if (p > 0.6) {
			return Text.green(t);
		} else if (p > 0.4) {
			return Text.yellow(t);
		} else if (p > 0.2) {
			return Text.gold(t);
		}
		return Text.red(t);
	}

	/*
		4 nukes for tooltips
		First one completely removes descriptions of items
		Second one removes the mentions of items protecting against bleeding
		Third one removes duplicate effect strings for food items
		Fourth one removes default Ars tooltips from some items
	*/
	event.addAdvanced([
		'@mcdw',
		'sortilege:limitite',
		'botanicadds:dreaming_pool',
		'majruszsdifficulty:recall_potion',
		'heart_crystals:heart_crystal',
		// 'aquamirae:sea_stew',
		// 'aquamirae:poseidons_breakfast',
		// 'aquamirae:sea_caserole'
		// '@evilcraft'
	], (item, advanced, text) => {
		const original = text.toArray();

		for (let i = 1; i < original.length; i++) {
			if (text[1].toString().includes('Enchantments')
				|| text[1].toString().includes('item.modifiers.')
				|| (text[1].toString().includes('color=dark_gray') && i > 1)) {
				// if (!event.shift) text.add(1, '')
				break
			};
			text.remove(1)
		}
	})
	event.addAdvancedToAll((item, advanced, text) => {
		const original = text.toArray();
		for (let i = original.length - 1; i > 0; i--) {
			if (text[i].toString().includes('item.majruszsdifficulty.bandage.effect')) {
				text.remove(i);
				text.remove(i - 1);
				text.remove(i - 2);
				break;
			}
		}
	})
	event.addAdvancedToAll((item, advanced, text) => {
		const foodProperties = item.getFoodProperties(currentPlayer)
		if (foodProperties) {
			const effects = foodProperties.getEffects();

			const original = text.toArray();
			let red = [], blue = [];
			for (let i = 1; i < original.length; i++) {
				if (text[i].toString().includes('color=red')) {
					red++;
				}
				else if (text[i].toString().includes('color=blue')) {
					blue++;
				}
				else break;
			}

			if (effects.size() * 2 == (blue + red)) {
				for (let i = 1; i < (blue + red) / 2 + 1; i++) {
					text.remove(1)
				}
			}
		}
	})
	event.addAdvanced([
		'ars_nouveau:ring_of_lesser_discount',
		'ars_nouveau:ring_of_greater_discount',
		'ars_nouveau:mana_gem',
		'ars_nouveau:magebloom',
		'ars_nouveau:experience_gem',
		'ars_nouveau:greater_experience_gem'
	], (item, advanced, text) => {
		for (let i = text.size() - 1; i > 1; i--) {
			let element = text[i];
			if (!text[i].toString().includes('color=dark_gray')) {
				text.remove(i);
				if (!advanced) {
					text.remove(i - 1);
				}
				return;
			}
		}
	})

	// Global tooltip modifications
	// Targetted mainly towards tools
	const attributesIgnoredItems = [
		'sortilege:lapis_shield'
	]
	/** @type {InputItem_} */
	const setBonusItems = [
		'botania:manasteel_helmet',
		'botania:manasteel_chestplate',
		'botania:manasteel_leggings',
		'botania:manasteel_boots',
		'botania:elementium_helmet',
		'botania:elementium_chestplate',
		'botania:elementium_leggings',
		'botania:elementium_boots',
		'botania:manaweave_helmet',
		'botania:manaweave_chestplate',
		'botania:manaweave_leggings',
		'botania:manaweave_boots',
		'botania:terrasteel_helmet',
		'botania:terrasteel_chestplate',
		'botania:terrasteel_leggings',
		'botania:terrasteel_boots',
		'majruszsdifficulty:enderium_helmet',
		'majruszsdifficulty:enderium_chestplate',
		'majruszsdifficulty:enderium_leggings',
		'majruszsdifficulty:enderium_boots',
		'born_in_chaos_v1:dark_metal_armor_helmet',
		'born_in_chaos_v1:dark_metal_armor_chestplate',
		'born_in_chaos_v1:dark_metal_armor_leggings',
		'born_in_chaos_v1:dark_metal_armor_boots',
		'born_in_chaos_v1:nightmare_mantleofthe_night_helmet',
		'born_in_chaos_v1:nightmare_mantleofthe_night_chestplate',
		'born_in_chaos_v1:nightmare_mantleofthe_night_leggings',
		'born_in_chaos_v1:nightmare_mantleofthe_night_boots'
	]
	//priority:-100
	event.addAdvancedToAll((item, advanced, text) => {
		// Remove attributes if SHIFT isn't pressed
		if (!event.shift && !attributesIgnoredItems.includes(item.id.toString())) {
			// Find from where to remove the lines
			let pos;
			for (let i = 1; i < text.length; i++) {
				if (text[i].toString().includes('item.modifiers.')) {
					pos = i - 1;
					break;
				};
			}

			for (let c = 0; c < 20; c++) {
				// Stop when there are either no attribute lines left
				// or we reach the advanced tooltips
				if (!text[pos] || text[pos].toString().includes('color=dark_gray')) break;
				text.remove(pos);
			}
		}
		else {
			for (let i = 1; i < text.length; i++) {
				let line = text[i].toString();
				if (line.includes('color=blue') && line.includes('Mining Speed')) {
					const match = line.match(/attributeslib\.value\.flat', args=\[(\d+(?:\.\d+)?)\]/);
					if (match) {
						let number = parseFloat(match[1]);

						// Round to 1 decimal, then remove trailing .0 if present
						number = Math.round(number * 10) / 10;

						text.remove(i);
						text.add(i, Text.darkGreen(' ' + number + ' Mining Speed'));
					}

				}
				else if (line.includes('color=blue') && line.includes('Harvest Level')) {
					const match = line.match(/attributeslib\.value\.flat', args=\[(\d+)\]/);
					if (match) {
						const number = parseInt(match[1], 10);
						text.remove(i);
						text.add(i, Text.darkGreen(' ' + number + ' Tool Power'))
					}
				}
			}
		}

		if (item.maxDamage != 0) {
			let pos = (advanced) ? text.length - 2 : text.length;

			let damage = [item.maxDamage - item.damageValue, item.maxDamage]

			let firstNumber = Text.of(parseInt(damage[0]).toString().replace('.0', ''));
			let secondNumber = Text.of(parseInt(damage[1]).toString().replace('.0', ''));

			let percent = parseFloat(damage[0]) / parseFloat(damage[1]);

			text.add(pos, Text.join([
				Text.gray("Durability: "),
				colorDurabilityText(percent, firstNumber),
				Text.gray("/"),
				Text.of(secondNumber).white(),
				" ",
				Text.join([
					"(",
					colorDurabilityText(percent, Text.join([(percent * 100).toFixed(1).toString().replace('.0', ''), "%"])),
					")"
				]).gray()
			]))
			text.add(pos, '')
		}

		// Customize the enchantment line because I can
		for (let i = 1; i < text.length; i++) {
			if (text[i].toString().includes('Enchantments')) {
				let str = text[i].toString();
				let match = str.match(/'(\d+)\/(\d+) Enchantments'/);

				let firstNumber = Text.of(parseInt(match[1]).toString().replace('.0', ''));
				let secondNumber = Text.of(parseInt(match[2]).toString().replace('.0', ''));

				let grayFormatting = (match[1] == 0) ? true : false;
				let redFormatting = (match[1] === match[2]) ? true : false;

				text.remove(i)
				let enchantments = [];
				if (item.isEnchanted()) {
					for (let newEnchantLine = 1; newEnchantLine < text.length; newEnchantLine++) {
						if (text[newEnchantLine].toString().includes('enchantments')) {
							text.remove(newEnchantLine)
							for (let iter = 0; iter < match[1]; iter++) {
								enchantments.push(text[newEnchantLine]);
								text.remove(newEnchantLine)
							}
							text.remove(newEnchantLine - 1)
							break;
						}
					}
				}
				const enchLine = Text.join([
					Text.gray("Enchantments: "),
					(redFormatting) ? firstNumber.red() : ((grayFormatting) ? firstNumber.darkGray() : firstNumber.lightPurple()),
					Text.of("/").gray(),
					(redFormatting) ? secondNumber.darkRed() : ((grayFormatting) ? secondNumber.gray() : secondNumber.darkPurple()),
				]);
				const enchLinePos = (advanced) ? text.length - 3 : text.length - 1;
				text.add(enchLinePos, enchLine)
				text.add(enchLinePos + 1, '')

				if (enchantments.length > 0) {
					for (let iter = 0; iter < enchantments.length; iter++) {
						text.add(enchLinePos + 1 + iter, Text.join([
							Text.gray(" ◇"),
							Text.of(enchantments[iter])
						]));
					}
				}
				break;
			}
		}


		// Remove default set bonus items
		if (setBonusItems.includes(item.getId().toString())) {
			// for (let i = 0; i < text.length; i++) {
			// 	if (text[i].toString().includes('Enchantments')) pos = i + 1;
			// }

			for (let i = 0; i < 100; i++) {
				if (text[1].toString().includes('item.modifiers.') || text[1].toString().includes('Enchantments')) {
					text.add(1, '')
					break;
				}
				text.remove(1);
			}
		}
	})

	event.addAdvanced([
		'potion',
		'splash_potion',
		'lingering_potion'
	], (item, advanced, text) => {
		const original = text.toArray();

		let drinkingTime, cooldown;
		if (original[1] && original[1].toString().includes('sortilege.potion.drinking_time')) {
			drinkingTime = original[1].toString().match(/\d+/g);
		}
		if (original[1] && original[1].toString().includes('sortilege.staff.cooldown')) {
			cooldown = original[1].toString().match(/\d+/g);
		}
		else if (original[2] && original[2].toString().includes('sortilege.staff.cooldown')) {
			cooldown = original[2].toString().match(/\d+/g);
		};

		let potionLine;
		if (cooldown) {
			text.remove(1);
			potionLine = Text.join([
				((item.id != 'minecraft:potion') ? Text.gray('Tʜʀᴏᴡ ᴄᴏᴏʟᴅᴏᴡɴ: ') : Text.gray('Cᴏᴏʟᴅᴏᴡɴ: ')),
				Text.gold(Text.join([parseInt(cooldown).toString().replace('.0', ''), 's']))
			]);
		}

		if (drinkingTime) {
			text.remove(1);
			potionLine = Text.join([
				potionLine,
				Text.white(' | ').bold(),
				Text.gray('Dʀɪɴᴋɪɴɢ ᴛɪᴍᴇ: '),
				Text.gold(Text.join([parseInt(drinkingTime).toString().replace('.0', ''), 's'])),
			]);
		}

		if (potionLine) {
			text.add(1, potionLine);
			text.add(2, '');
		}
	})

	event.addAdvanced(global.blacklistedItems, (item, advanced, text) => {
		text.clear()
		text.add(0, Text.of('Removed item').darkGray())
		text.add(1, Text.of('This item is unobtainable in this modpack').darkGray())
	})

	//priority: -9900
	event.addAdvancedToAll((item, advanced, text) => {
		const original = text.toArray();
		let chapters = [],
			exceptions = [];
		item.getTags().toArray().forEach(tag => {
			const str = tag.toString();
			if (!str.includes('chapter_')) return;
			const match = str.match(/adj:locked_until\/.*[^ ]*?(chapter_\w+)/);
			if (str.includes('exceptions')) {
				exceptions.push(match[1]);
			}
			else {
				chapters.push(match[1]);
			}
		});

		if (chapters.length == 0) return;

		let
			chapter = chapters.sort()[chapters.length - 1],
			exception = exceptions.sort()[exceptions.length - 1];;

		if ((!exception || chapter != exception) && !currentPlayer.stages.has(chapter)) {

			let itemName = text.get(0);

			text.clear()

			text.add(0, itemName)
			text.add(1, Text.darkGray(`Unlocked in `).append(Text.darkGray(`${global.toTitleCase(chapter.replace('_', ' '))}`).underlined()));
			text.add(1, Text.darkGray('Unknown item!').bold())

			if (advanced && currentPlayer.isCreative()) {
				let lines = [];
				for (let index = original.length - 1; index > 0; index--) {
					let element = original[index];
					if (element.toString().includes('color=dark_gray')) {
						lines.push(element)
					}
					else break;
				}
				lines.forEach(t => {
					text.add(3, t)
				})
			}
		}
	})

	// Set bonus messages
	event.addAdvanced(['#adj:reforges/armor'], (item, advanced, text) => {
		let stages = currentPlayer.stages.getAll().toArray();
		let bonusID = null;
		for (let tag of stages) {
			let match = tag.match(/^set_bonus\.([a-z0-9_\-]+)\.([a-z0-9_\-/]+)$/);
			if (match) {
				bonusID = match[1] + ":" + match[2];
				break;
			}
		}
		if (bonusID == null) return;

		// Base armor type of the hovered item
		const itemId = item.id.toString()
		let armorType;
		outer: for (const [slot, names] of Object.entries(global.armorSuffixes)) {
			for (const type of names) {
				if (itemId.endsWith(type)) {
					armorType = itemId.replace(type, '')
					break outer;
				}
			}
		}

		if (bonusID.startsWith('ars_nouveau:arcanist')) {
			let tier = bonusID.split('_')[2];
			armorType = armorType + '_' + tier

		}

		// Build a list of allowed types for this bonus
		let allowedTypes = [bonusID];
		if (global.bonusOverrides && global.bonusOverrides[bonusID]) {
			global.bonusOverrides[bonusID].forEach(combo => {
				combo.forEach(piece => {
					if (!allowedTypes.includes(piece)) {
						allowedTypes.push(piece);
					}
				});
			});
		}

		// Only show tooltip if this armor piece matches any of the allowed types
		if (!allowedTypes.includes(armorType)) return;

		const bonus = global.setBonusMap[bonusID];
		const description = bonus.description;

		text.add(text.length, '');
		text.add(text.length, Text.gray('Full set bonus:'));

		description.forEach(line => {
			text.add(text.length, Text.gray(' ' + line));
		});
	});


	/**
	 * Adds tooltip lines to one or more items using the simplified `tip()` interface.
	 *
	 * @param {string|string[]|RegExp|RegExp[]} items  
	 * Item ID, array of IDs, or regex patterns.  
	 * - Strings must be full item IDs (e.g. `"minecraft:stick"`).  
	 * - Regex patterns match multiple items.  
	 * - Arrays can mix strings and regex.
	 *
	 * @param {string|string[]} text  
	 * Tooltip text to add.  
	 * - Single string → one line  
	 * - Array of strings → multiple lines
	 *
	 * @param {Object} [opts]  
	 * Optional settings that control how the tooltip behaves.
	 *
	 * @param {boolean} [opts.gray=true]  
	 * Whether to render the tooltip in gray text.  
	 * Set `false` to keep original coloring.
	 *
	 * @param {number|null} [opts.position=null]  
	 * Priority / ordering of the tooltip:  
	 * - `null` → default behavior  
	 * - Higher numbers push the tooltip lower  
	 * - Lower numbers pull it higher
	 *
	 * @param {boolean} [opts.last=false]  
	 * If true, forces these tooltip lines to appear at the bottom.
	 *
	 * @example
	 * // Simple tooltip
	 * tip("minecraft:apple", "A tasty snack!");
	 *
	 * // Multiple items, one tooltip line
	 * tip(["wooden_sword", "wooden_axe"], "We all start somewhere");
	 *
	 * // Multiple lines, requires SHIFT, placed last
	 * tip(/campfire/, ["Provides warmth", "Restores health"], { last: true });
	 */
	function tip(items, text, opts) {
		if (!opts) opts = {};

		addTooltipLine({
			items: Array.isArray(items) ? items : [items],
			text: Array.isArray(text) ? text : [text],
			gray: opts.gray !== undefined ? opts.gray : true,
			position: opts.position !== undefined ? opts.position : null,
			last: opts.last !== undefined ? opts.last : false
		});
	}

	function addTooltipLine(data) {
		// Unpack fields with manual defaults (KubeJS cannot use default parameters)
		var items = data.items;
		var text = Array.isArray(data.text) ? data.text : [data.text];
		var gray = data.gray !== undefined ? data.gray : true;
		var position = data.position !== undefined ? data.position : null;
		var last = data.last !== undefined ? data.last : false;

		event.addAdvanced(items, (item, advanced, tooltip) => {
			if (tooltip[0].toString().includes('gray,obfuscated')) return;

			var maxLen = 50;
			var iter = 0;

			var pos = last
				? (tooltip[tooltip.size() - 1].toString().includes('color=dark_gray')
					? tooltip.size() - 1
					: tooltip.size())
				: (position !== null ? position : 1);

			text.forEach(line => {
				wrapLine(line, maxLen).forEach(wrapped => {
					tooltip.add(pos + iter, gray ? Text.gray(wrapped) : Text.of(wrapped));
					iter++;
				});
			});
		});
	}

	function wrapLine(str, max) {
		var words = str.split(' ');
		var out = [];
		var current = '';

		words.forEach(word => {
			if ((current + word).length + 1 <= max)
				current += (current ? ' ' : '') + word;
			else {
				out.push(current);
				current = word;
			}
		});

		if (current) out.push(current);
		return out;
	}


	const TIP_CONFIG = [
		{
			items: global.rediscoveredFurniture,
			text: 'Comes with a unique feeling of nostalgia'
		},
		{
			items: 'rediscovered:cyan_rose',
			text: 'Also known as Blue Rose'
		},
		{
			items: [
				'wooden_sword', 'wooden_axe', 'wooden_pickaxe',
				'wooden_hoe', 'wooden_shovel', 'shieldexp:wooden_shield'
			],
			text: 'We all have to start somewhere!'
		},
		{
			items: [
				'golden_apple', 'enchanted_golden_apple',
				'majruszsdifficulty:bandage', 'majruszsdifficulty:golden_bandage'
			],
			text: 'Stops bleeding'
		},
		{
			items: 'enchanted_golden_apple',
			text: 'You can unenchant it. But why would you?',
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
			items: [/carpet/, 'farmersdelight:canvas_rug'],
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

		// Botania flowers
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

		// Small misc
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

		// Compass / time / depth
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

		// Botania floating + chibi
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
		{
			items: 'galosphere:silver_balance',
			text: 'Produces a redstone signal that gets stronger the harder the block placed directly on top of it is to break'
		},

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

		// Ars Nouveau
		{
			items: /ars_nouveau:arcanist/,
			text: [
				'Can be upgraded (twice total)',
				'Can be imbued with different magical threads'
			]
		},

		// Mutant Monsters
		{
			items: [
				'mutantmonsters:mutant_skeleton_skull',
				'mutantmonsters:mutant_skeleton_chestplate',
				'mutantmonsters:mutant_skeleton_leggings',
				'mutantmonsters:mutant_skeleton_boots'
			],
			text: 'WIP! PLEASE DON\'T USE'
		},

		// Delight stoves
		{
			items: /.*delight.*:.*stove.*/,
			text: 'Acts like a Campfire with 6 total slots'
		},

		// Heart crystals
		{
			items: 'heart_crystals:heart_crystal',
			text: 'Increases max health by 20, up to 400'
		},

		// Naturalist
		{
			items: 'naturalist:bug_net',
			text: 'Used to catch butterflies'
		},

		// Bumblezone
		{
			items: /the_bumblezone:string_curtain/,
			text: 'Can be extended downwards by right-clicking with a String'
		},

		// MCDW
		{
			items: /mcdw:soul_dagger/,
			text: 'Attacks temporarily boost mana regeneration'
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
		{ items: "alexscaves:metal_swarf", text: "A ferrous sand which has reactive properties to magnetism" },
		{ items: "alexscaves:cooked_dinosaur_chop", text: "Can be made into dinosaur nuggets!" },
		{ items: "alexscaves:flytrap", text: "Natively venusian" },
		{ items: "alexscaves:volcanic_core", text: "The catalyst for mass extinction" },
		{ items: "alexscaves:nuclear_bomb", text: "Now I am become Death, the destroyer of worlds" },
		{ items: "alexscaves:radrock", text: "An irradiated variant of stone, seems to almost pulsate at a touch" },
		{ items: "alexscaves:acidic_radrock", text: "A particularly irradiated variant of stone, can cause Sulfur Buds to form and grow on Sulfur blocks if placed above one" },
		{ items: "alexscaves:radrock_uranium_ore", text: "The primary source of uranium. Volatile, it seems to hum when close" },
		{ items: "alexscaves:siren_light", text: "Dyeable light-emitting blocks that can be crafted using Bottles of Radon. Must be clicked with dye to change color" },
		{ items: "alexscaves:sulfur", text: "A yellow crystalline substance which drops sulfur dust. Can be grown by the droplets of acidic radrock" },
		{ items: "alexscaves:tremorzilla_egg", text: "A large neon egg made of the remains of other legendary monsters. Hatched by detonation" },
		{ items: "alexscaves:underweed", text: "A puny, yet hardy plant" },
		{ items: "alexscaves:unrefined_waste", text: "Disturbingly intact, yet sludgy. Used to craft waste drums or smelted into uranium shards. Made with toxic paste" },
		{ items: "alexscaves:uranium_rod", text: "Fuel for nuclear furnaces and surprisingly good at containing radioactivity. Used to reload rayguns!" },
		{ items: "alexscaves:waste_drum", text: "Favored by brainiacs, can be used to tame tremorzillas. Highly explosive. A byproduct of nuclear furnaces" },
		{ items: "alexscaves:abyssal_altar", text: "Used to trade with the Deep Ones. Pearls and Hearts of the Sea tend to attract their attention" },
		{ items: "alexscaves:bone_worms", text: "Wriggling organisms which feed on the carcasses of old" },
		{ items: "alexscaves:bioluminecent_torch", text: "Can be placed underwater" },
		{ items: "alexscaves:copper_valve", text: "Something of a delayed lever" },
		{ items: "alexscaves:depth_glass", text: "Raise visibility while looked through underwater" },
		{ items: "alexscaves:ping_pong_sponge", text: "Can be combined with bioluminesscence to make floaters" },
		{ items: "alexscaves:tube_worm", text: "Requires silk touch to harvest. Watch for the pokers under water, they're friendly!" },
		{ items: "alexscaves:beholder", text: "A block that allows players to see through it using an Occult Gem" },
		{ items: "alexscaves:porous_coprolith", text: "An uncomfortably trypophobic cluster" },
		{ items: "alexscaves:peering_coprolith", text: "Those aren't bats" },
		{ items: "alexscaves:forlorn_idol", text: "A totem to a thankless being" },
		{ items: "alexscaves:block_of_frosting", text: "Sickly sweet!" },
		{ items: "alexscaves:cake_layer", text: "A little springy!" },
		{ items: "alexscaves:sprinkles", text: "Colorful!" },
		{ items: "alexscaves:giant_sweetberry", text: "Can be used to top cakes or sundaes" },
		{ items: "alexscaves:frostmint", text: "Forms like icicles, and reacts explosively to purple soda" },
		{ items: "alexscaves:gummy_ring_red", text: "A ring of red gelatin" },
		{ items: "alexscaves:gummy_ring_green", text: "A ring of green gelatin" },
		{ items: "alexscaves:gummy_ring_yellow", text: "A ring of yellow gelatin" },
		{ items: "alexscaves:gummy_ring_blue", text: "A ring of blue gelatin" },
		{ items: "alexscaves:gummy_ring_pink", text: "A ring of pink gelatin" },
		{ items: "alexscaves:sundrop", text: "Luminous globs that, when near other sundrops, will form rainbows!" },

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
		{ items: "evilcraft:blood_extractor", text: ["Hold in inventory when slaying mobs.", "Shift + Right click to extract or auto-supply"] },
		{ items: "evilcraft:broom", text: "I think I'll try defying gravity" },
		{ items: "evilcraft:hardened_blood_shard", text: "Break Hardened Blood with Flint and Steel" },
		{ items: "evilcraft:dark_power_gem", text: "Throw a Dark Gem in the middle of a pool with at least five non-hardened Blood blocks. Or infuse a Dark Gem with blood" },
		{ items: "evilcraft:blood_container", text: "DEPRECATED! Place in crafting grid to convert to a Dark Tank" },
		{ items: "evilcraft:blook", text: "Can absorb item enchants when placed in the Purifier" },
		{ items: "evilcraft:potentia_sphere", text: "Infuse with blood to make an Ender Pearl" },
		{ items: "evilcraft:inverted_potentia", text: "Strike with lightning to empower" },
		{ items: "evilcraft:inverted_potentia_empowered", text: "Struck by lightning" },
		{ items: "evilcraft:kineticator", text: ["Shift + Right click to toggle attraction.", "Right click to change area"] },
		{ items: "evilcraft:kineticator_repelling", text: ["Shift + Right click to toggle repelling.", "Right click to change area"] },
		{ items: "evilcraft:vengeance_ring", text: ["Might attract or summon Vengeance Spirits.", "Shift + Right click to toggle boost"] },
		{ items: "evilcraft:vengeance_focus", text: "Right click to enable Vengeance Spirit-freezing beam" },
		{ items: "evilcraft:vengeance_pickaxe", text: "Might summon Vengeance Spirits" },
		{ items: "evilcraft:burning_gem_stone", text: "Passively converts Vengeance Spirit damage to hunger" },
		{ items: "evilcraft:creative_blood_drop", text: "Creative mode only item to drain and fill infinite amounts of Blood" },
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
		{ items: "evilcraft:biome_extract", text: "Transforms the target area into the contained biome. Crafted in Environmental Accumulator at desired biome" },
		{ items: "evilcraft:environmental_accumulation_core", text: "Obtained when breaking a regular Environmental Accumulator" },
		{ items: "evilcraft:garmonbozia", text: "\"Pain and Sorrow\"" },
		{ items: "evilcraft:vengeance_essence", text: "Drops when killing a Vengeance Spirit" },
		{ items: "evilcraft:piercing_vengeance_focus", text: "Right click to enable Vengeance Spirit-killing beam" },
		{ items: "evilcraft:spikey_claws", text: "Effective against soft materials" },
		{ items: "evilcraft:spectral_glasses", text: "Look into the spirit world" },

		// Twilight Forest
		{ items: "twilightforest:charm_of_life_1", text: "Will save you from dying, leaving you with minimal health" },
		{ items: "twilightforest:charm_of_life_2", text: "Will save you from dying, leaving you at full health" },
	];

	for (const entry of TIP_CONFIG) {
		tip(entry.items, entry.text, entry.opts);
	}
})
