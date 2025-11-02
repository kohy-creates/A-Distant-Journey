/**
 * @type {Internal.Player}
 */
let currentPlayer = null;

ClientEvents.tick(event => {
	if (!currentPlayer && event.player) {
		currentPlayer = event.player;
	}
});

ItemEvents.tooltip(event => {

	/*
		2 nukes for tooltips
		First one completely removes descriptions of items
		Second one removes the mentions of items protecting against bleeding
	*/
	//priority: 100
	event.addAdvanced([
		'@mcdw',
		'sortilege:limitite',
		'botanicadds:dreaming_pool',
		'majruszsdifficulty:recall_potion',
		'heart_crystals:heart_crystal',
	], (item, advanced, text) => {
		const original = text.toArray();

		for (let i = 1; i < original.length; i++) {
			if (text[1].toString().includes('Enchantments')) {
				if (!event.shift) text.add(1, '')
				break
			};
			text.remove(1)
		}
	})
	//priority: 100
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
		'born_in_chaos_v1:dark_metal_armor_boots'
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
						text.add(i, Text.darkGreen(' ' + number + ' Harvest Level'))
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

	//priority: 200
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

			text.clear()

			text.add(0, Text.darkGray('Unknown Item'))
			text.add(1, Text.darkGray('Unlocked in Chapter ' + chapter.replace('chapter_', '')))

			if (advanced && global.developerMode) {
				let advancedTooltipLines = [];
				for (let i = 1; i < 3; i++) {
					if (original[original.length - i].toString().includes('color=dark_gray')) advancedTooltipLines.push(original[original.length - i]);
				}
				advancedTooltipLines.reverse();

				for (let i = 0; i < advancedTooltipLines.length; i++) {
					text.add(2 + i, Text.darkGray(advancedTooltipLines[i]));
				}
				text.add(2, '')
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
	 * Adds a tooltip line to a set of items.
	 * 
	 * @param {InputItem_ | InputItem_[]} items - A single item or array of items to which the tooltip should be added.
	 * @param {string | string[]} lineText - The tooltip text to add (can be a string or array of strings).
	 * @param {boolean} gray - Whether the tooltip text should be gray-colored (defaults to true).
	 * @param {number} position - The position in the tooltip to insert the new line(s).
	 * @param {boolean} last - Whether this should be placed on the last line.
	 */
	function addTooltipLine(items, lineText, gray, position, last) {
		if (!gray) gray = true;

		// Ensure lineText is an array
		if (!Array.isArray(lineText)) {
			lineText = [lineText];
		}

		// Utility function to split long lines at word boundaries
		function wrapLine(line, maxLen) {
			const words = line.split(' ');
			const lines = [];
			let current = '';

			for (const word of words) {
				if ((current + word).length + 1 <= maxLen) {
					current += (current ? ' ' : '') + word;
				} else {
					if (current) lines.push(current);
					current = word;
				}
			}
			if (current) lines.push(current);
			return lines;
		}

		event.addAdvanced(items, (item, advanced, text) => {
			if (text[0].toString().includes('Unknown Item')) return;

			let iter = 0;
			const maxLength = 50;
			const pos = (last)
				? (text[text.size() - 1].toString().includes('color=dark_gray')) ? text.size() - 1 : text.size()
				: (typeof position !== 'undefined' && position !== null)
					? position
					: 1;

			lineText.forEach(line => {
				const wrappedLines = wrapLine(line, maxLength);
				wrappedLines.forEach(wrapped => {
					const formatted = gray ? Text.gray(wrapped) : Text.of(wrapped);
					text.add(pos + iter, formatted);
					iter++;
				})
			});
		});
	}

	// Add tooltips to all of these items
	addTooltipLine([
		global.rediscoveredFurniture
	], [
		'Comes with a unique feeling of nostalgia',
	], true);

	addTooltipLine('rediscovered:cyan_rose', 'Also known as Blue Rose');
	addTooltipLine([
		'wooden_sword',
		'wooden_axe',
		'wooden_pickaxe',
		'wooden_hoe',
		'wooden_shovel',
		'shieldexp:wooden_shield'
	], 'We all have to start somewhere!')

	addTooltipLine([
		'golden_apple',
		'enchanted_golden_apple',
		'majruszsdifficulty:bandage',
		'majruszsdifficulty:golden_bandage'
	], 'Stops bleeding')

	addTooltipLine([
		'enchanted_golden_apple'
	], 'You can unenchant it. But why would you?', true, 2)

	addTooltipLine([
		/campfire/
	], 'Provides health regeneration')

	addTooltipLine([
		'sortilege:limitite'
	], [
		'Increases the maximum amount of enchantments an item can hold by 1, up to 3 total times',
		'Combine the item with it in a Smithing Table using Lapis Lazuli as the template for the recipe'
	], true)

	addTooltipLine([
		'dummmmmmy:target_dummy'
	], [
		'An invulnerable, punchable dummy',
		'Quite perfect for measuring dealt damage'
	], true)

	addTooltipLine([
		/botania\:.*_mystical_flower/,
		/botania\:.*_double_flower/
	], 'It sparkles with magic')

	addTooltipLine([
		/botania\:apothecary.*/
	], 'The crafting table for all that is vivid')

	addTooltipLine([
		'botania:diluted_pool'
	], [
		'Has 10x smaller Mana capacity than a normal Mana Pool'
	], true)

	addTooltipLine([
		'berry_good:glowgurt'
	], 'Gurt: Glow.')

	addTooltipLine([
		'suspicious_stew'
	], 'Like a box of chocolates, just disgusting')

	addTooltipLine([
		'quark:seed_pouch'
	], [
		'Can hold 10 stacks of Bone Meal or any Seed, Sapling, Crop or Mushroom'
	], true)

	addTooltipLine([
		'quark:slime_in_a_bucket'
	], 'Jumps with enthusiasm if you are in a slime chunk')

	addTooltipLine([
		'minecraft:compass',
		'minecraft:recovery_compass'
	], 'Tells your horizontal location')
	addTooltipLine([
		'minecraft:clock',
		'mythicmetals:platinum_watch'
	], 'Tells the time and weather')
	addTooltipLine([
		'additionaladditions:depth_meter'
	], 'Tells your vertical location')
	addTooltipLine([
		'additionaladditions:depth_meter',
		'minecraft:clock',
		'minecraft:compass',
		'minecraft:recovery_compass',
		'mythicmetals:platinum_watch'
	], 'Works from a Bundle', true, 2)
	addTooltipLine([
		'minecraft:recovery_compass'
	], ['Points you towards the location of your last death'], true, 3)
	addTooltipLine([
		/botania:floating/,
		/botanicadds:*.floating.*/
	], ['Can be planted on any surface'], true)
	addTooltipLine([
		/botania:.*\_chibi/
	], ['Has a smaller area of effect than its regular size counterpart'], true, 1)

	addTooltipLine([
		/netherexp:etched_.*/,
		/netherexp:chiseled_soul_slate_.*/
	], ['Can be ignited with Flint and Steel'], true)

	addTooltipLine([
		/domesticationinnovation:pet_bed/
	], ['Allows your pets to respawn at dawn', 'Move your pet onto the pet bed to set its respawn point'], true)

	addTooltipLine([
		'domesticationinnovation:collar_tag'
	], ['Can be enchanted', 'Give it to your pet to transfer the enchantments\' power to it'], true)

	addTooltipLine([
		'bell'
	], ['Ring while holding an Emerald to call a Wandering Trader'], true)

	addTooltipLine([
		'upgrade_aquatic:elder_eye'
	], ['Emits redstone signal if there is an entity in front of it'], true)

	addTooltipLine([
		'cauldron'
	], ['Can be used to brew some basic potions'], true)

	addTooltipLine([
		'majruszsdifficulty:recall_potion'
	], ['Teleports you to your spawn point'], true)

	addTooltipLine([
		'naturescompass:naturescompass'
	], ['Points in the direction of any biome in the world'], true)

	addTooltipLine([
		/bedroll/
	], ['Also known as \'sleeping bag\''], true)

	// Dungeons Weaponry
	addTooltipLine([
		'dungeonsweaponry:chill_gale_knife'
	], ['Slows down hit mobs', 'Grants a burst of speed on kill'], true)
	addTooltipLine([
		'dungeonsweaponry:dark_katana'
	], ['Deals 50% more damage against undead mobs'], true)
	addTooltipLine([
		'dungeonsweaponry:glaive'
	], ['Trades a bit of attack speed for longer range compared to swords'], true)
	addTooltipLine([
		'dungeonsweaponry:venom_glaive'
	], ['Inflicts hit mobs with acid venom for a short time, dealing extra damage'], true)
	addTooltipLine([
		'dungeonsweaponry:claymore'
	], ['Deals a stupid amount of damage but requires both hands to use'], true)
	addTooltipLine([
		'dungeonsweaponry:frost_slayer'
	], ['It just deals massive damage with every swing', 'Doesn\'t really utilize the \'frost\' part, just deals absurd damage'], true)
	addTooltipLine([
		'dungeonsweaponry:heartstealer'
	], ['Heals its user a bit on attacks', 'Very slow attack speed'], true)

	// Alex's Caves
	addTooltipLine([
		'alexscaves:dreadbow'
	], ['Does the name \'Daedalous Stormbow\' ring a bell perchance?', 'Rains Darkness Arrows around target location'], true)
	addTooltipLine([
		'alexscaves:desolate_dagger'
	], ['Summons extra copies of itself on hit which hit with a delayed impact', 'Copies deal low, but armor-piercing damage'], true)

	// Alloy
	addTooltipLine([
		'alloy_forgery:cracked_stone_bricks_forge_controller'
	], ['Speed Multiplier: 1.0x', 'Building Material: Stone Bricks (+Variants)'], true, null, true)
	addTooltipLine([
		'alloy_forgery:cracked_deepslate_bricks_forge_controller'
	], ['Speed Multiplier: 1.25x', 'Building Material: Deepslate Bricks (+Variants)'], true, null, true)
	addTooltipLine([
		'alloy_forgery:nether_bricks_forge_controller'
	], ['Speed Multiplier: 1.75x', 'Building Material: Nether Bricks (+Variants)'], true, null, true)
	addTooltipLine([
		'alloy_forgery:adamantite_forge_casing_forge_controller'
	], ['Speed Multiplier: 2.0x', 'Building Material: Adamantite Forge Casing'], true, null, true)
	addTooltipLine([
		'alloy_forgery:ender_forge_casing_forge_controller'
	], ['Speed Multiplier: 2.5x', 'Building Material: Ender Forge Casing'], true, null, true)
	addTooltipLine([
		/adj\:.*forge_casing/
	], 'Used to build an Alloy Forge')

	addTooltipLine('majruszsdifficulty:enderium_helmet', 'Makes all Endermen less hostile');

	addTooltipLine('mythicmetals:hallowed_ingot', 'Seems oddly familiar...');
	addTooltipLine('mythicmetals:orichalcum_hammer', 'Mines a 3x2 area');

	// Galosphere
	addTooltipLine('galosphere:allurite_block', 'Silences nearby blocks');
	addTooltipLine('galosphere:monstrometer', 'Requires Lumiere Blocks as fuel');
	addTooltipLine('galosphere:warped_anchor', 'Requires Allurite Blocks as fuel');
	addTooltipLine('galosphere:combustion_table', 'Used to customize Silver Bombs');
	addTooltipLine('galosphere:stranded_membrane_block', 'Pushes items and entities in the direction its facing');
	addTooltipLine('galosphere:silver_balance', 'Produces a redstone signal that gets stronger the harder the block placed directly on top of it is to break');

	addTooltipLine('witherstormmod:command_block_book', 'Combine with any Diamond tool in an Anvil to create a Command Block tool');
	addTooltipLine('witherstormmod:firework_bundle', 'Might distract The Wither Storm when activated');
	addTooltipLine('witherstormmod:super_tnt', 'Creates a bit bigger explosion than a regular TNT');
	addTooltipLine('witherstormmod:formidibomb', ['The key to defeating The Wither Storm', 'Place it nearby and detonate once it has 3 heads', 'Creates a massive explosion on its own']);

	addTooltipLine(/ars_nouveau:arcanist/, [
		'Can be upgraded (twice total)',
		'Can be imbued with different magical threads'
	])

	addTooltipLine([
		'mutantmonsters:mutant_skeleton_skull',
		'mutantmonsters:mutant_skeleton_chestplate',
		'mutantmonsters:mutant_skeleton_leggings',
		'mutantmonsters:mutant_skeleton_boots'
	], 'WIP! PLEASE DON\'T USE')

	addTooltipLine([
		/.*delight.*:.*stove.*/
	], 'Acts like a Campfire with 6 total slots')

	addTooltipLine([
		'heart_crystals:heart_crystal'
	], 'Increases max health by 20, up to 400')

	addTooltipLine([
		'naturalist:bug_net'
	], 'Used to catch butterflies')

	addTooltipLine([
		/the_bumblezone:string_curtain/
	], 'Can be extended downwards by right-clicking with a String')

	addTooltipLine([
		/mcdw:soul_dagger/
	], 'Attacks temporarily boost mana regeneration')

});

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
