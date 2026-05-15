const $BlockItem = Java.loadClass('net.minecraft.world.item.BlockItem');

ItemEvents.tooltip(event => {
	const currentPlayer = Client.player;

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
	event.addAdvanced([
		'ars_nouveau:ring_of_lesser_discount',
		'ars_nouveau:ring_of_greater_discount',
		'ars_nouveau:magebloom',
		'ars_nouveau:experience_gem',
		'ars_nouveau:greater_experience_gem',
		'ars_nouveau:source_gem',
		'ars_nouveau:wilden_horn',
		'ars_nouveau:wilden_spike',
		'evilcraft:vengeance_ring',
		'botania:ancient_will_ahrim',
		'botania:ancient_will_dharok',
		'botania:ancient_will_guthan',
		'botania:ancient_will_torag',
		'botania:ancient_will_verac',
		'botania:ancient_will_karil',
	], (item, advanced, text) => {
		for (let i = text.size() - 1; i > 0; i--) {
			if (!text[i].toString().includes('color=dark_gray')) {
				text.remove(i);
				if (!advanced) {
					// text.remove(i - 1);
				}
				return;
			}
		}
	})

	event.addAdvanced([
		/_counter/,
		/_fancy_bed/,
		/_bench/,
		/_chair/,
		/_side_table/,
		/_nightstand/,
		/_desk/,
		/handcrafted:.*_table/,
		/hc.*_table/,
		/_couch/,
		'handcrafted:hammer',
		'handcrafted:kitchen_hood_pipe',
		/crockery_combo/,
		/handcrafted:.*cushion/,
		/handcrafted:.*sheet/,
		/wallpapers:.*wallpaper_roll$/,
		/wallpapers:.*skirting_board$/,
	], (item, advanced, text) => {

		let startPos = 0;
		for (let i = text.size() - 1; i > 0; i--) {
			if (!text[i].toString().includes('color=dark_gray')) {
				startPos = i;
				break;
			}
		}
		if (!startPos) return;
		const id = item.getId();
		let linesToRemove = 1;
		if (event.shift) {
			if (id.includes('counter')
				|| id.includes('fancy_bed')) {
				linesToRemove = 4
			}
			else if (id.includes('bench')
				|| id.includes('chair')
				|| id.includes('couch')
				|| id.includes('nightstand')
				|| id.includes('side_table')
				|| id.includes('table')
				|| id.includes('crockery_combo')) {
				linesToRemove = 2
			}
			// else if (id.includes('desk')) {
			// 	linesToRemove = 1
			// }
		}
		if (advanced) linesToRemove++;

		let i = 0;
		for (let a = startPos; a > 0; a--) {
			text.remove(a)
			i++;
			if (i === linesToRemove) break;
		}
	})

	function parseMath(expr) {
		return Function(`'use strict'; return (${expr})`)()
	}

	// Global tooltip modifications
	// Targetted mainly towards tools
	const attributesIgnoredItems = [
		'sortilege:lapis_shield'
	]
	/** @type {$Item$$Type} */
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
			let weapon = false;
			let food = false;
			let enchantingTableItem = (() => {
				let attributeModifiers = item.getAttributeModifiers('mainhand');
				if (attributeModifiers.size() == 1) {
					let isCorrectOne = false;
					attributeModifiers.forEach((attribute, modifier) => {
						if (attribute.descriptionId === 'Enchanting Table Power') {
							isCorrectOne = true;
						}
					});
					return isCorrectOne;
				}
				return false;
			})();

			for (let i = 1; i < text.length; i++) {
				let line = text[i].toString();
				if (line.includes('color=dark_green') && line.includes('attack_damage')) weapon = true;
				if (line.includes('color=blue') && line.includes('Mining Speed')) {
					let match = line.match(/attributeslib\.value\.flat', args=\[(\d+(?:\.\d+)?)\]/);
					if (match) {
						let number = parseFloat(match[1]);

						// Round to 1 decimal, then remove trailing .0 if present
						number = Math.round(number * 10) / 10;

						text.remove(i);
						text.add(i, Text.darkGreen(' ' + number + ' Mining Speed'));
					}

				}
				else if (line.includes('color=blue') && line.includes('Harvest Level')) {
					let match = line.match(/attributeslib\.value\.flat', args=\[(\d+)\]/);
					if (match) {
						let number = parseInt(match[1], 10);
						text.remove(i);
						text.add(i, Text.darkGreen(' ' + number + ' Tool Power'))
					}
				}
				else if (line.includes('mainhand') && Object.keys(global.arrowDamage).includes(item.getId())) {
					text.remove(i);
					text.add(i, Text.gray('When used as Ammo:'))
				}
				else if (enchantingTableItem) {
					if (line.includes('mainhand')) {
						text.remove(i);
						text.add(i, Text.gray('When placed near an Enchanting Table:'));
					}
					else if (line.includes('color=blue') && line.includes('Enchanting Table Power')) {
						let match = line.match(/attributeslib\.value\.flat', args=\[([\d.]+)\]/);
						if (match) {
							let number = parseInt(match[1]);
							text.remove(i);
							text.add(i, Text.darkGreen(' Increases enchanting power by ' + number));
						}
					}
				}
				else if (item.getItem().getFoodProperties() != null) {
					if (line.includes('mainhand')) {
						text.remove(i);
						text.add(i, Text.gray('When eaten:'));
					}
					else if (line.includes('color=blue') && line.includes('Hunger Restored')) {
						let match = line.match(/attributeslib\.value\.flat', args=\[([\d.]+)\]/);
						if (match) {
							let number = parseFloat(match[1]);
							text.remove(i);
							text.add(i, Text.darkGreen(' Restores ' + number + ' Hunger'));
						}
					}
					else if (line.includes('color=blue') && line.includes('Saturation Restored')) {
						let match = line.match(/attributeslib\.value\.flat', args=\[([\d.]+)\]/);
						if (match) {
							let number = parseFloat(match[1]);
							text.remove(i);
							text.add(i, Text.darkGreen(' Restores ' + number + ' Saturation'));
						}
					}
				}
				else if (weapon && line.includes('color=blue') && line.includes('attributeslib:crit_chance')) {
					let match = line.match(/attributeslib\.value\.percent', args=\[(\d+)\]/);
					if (match) {
						let number = parseInt(match[1], 10);
						text.remove(i);
						text.add(i, Text.darkGreen(' ' + number + '% Critical Strike Chance'))
					}
				}
				else if (Object.keys(global.bowDamage).includes(item.getId())) {
					if (line.includes('color=blue') && line.includes('attributeslib:crit_chance')) {
						let match = line.match(/attributeslib\.value\.percent', args=\[(\d+)\]/);
						if (match) {
							let number = parseInt(match[1], 10);
							text.remove(i);
							text.add(i, Text.darkGreen(' ' + number + '% Critical Strike Chance'))
						}
					}
					else if (line.includes('color=blue') && line.includes('Ranged Damage')) {
						let match = line.match(/attributeslib\.value\.flat', args=\[(\d+)\]/);
						if (match) {
							let number = parseInt(match[1], 10);
							text.remove(i);
							text.add(i, Text.darkGreen(' ' + number + ' Ranged Damage'))
						}
					}
				}
				else if (line.includes('color=blue') && line.includes('unbreakable')) {
					text.remove(i);
					text.add(i, Text.of('<neon r=0.66><rainbow f=0.2>Unbreakable</rainbow></neon>'));
					text.add(i, '');
				}
			}
		}

		// Customize the enchantment line because I can
		for (let i = 1; i < text.length; i++) if (text[i].toString().includes('Enchantments')) {
			let str = text[i].toString();
			let match = str.match(/(\d+)\/(\d+) Enchantments/);

			if (!match) return;

			let enchantCount = item.getEnchantments().size()

			let firstNumber = Text.of(enchantCount.toString().replace('.0', ''));
			let secondNumber = Text.of(parseInt(match[2]).toString().replace('.0', ''));

			let grayFormatting = (enchantCount == 0) ? true : false;
			let redFormatting = (enchantCount === match[2]) ? true : false;

			text.remove(i)
			let enchantments = [];
			if (item.isEnchanted()) for (let newEnchantLine = 1; newEnchantLine < text.length; newEnchantLine++) {
				if (text[newEnchantLine].toString().includes('enchantments')) {
					text.remove(newEnchantLine)
					for (let iter = 0; iter < enchantCount; iter++) {
						enchantments.push(text[newEnchantLine]);
						text.remove(newEnchantLine)
					}
					text.remove(newEnchantLine - 1)
					break;
				}
			}
			let enchLine = Text.join([
				Text.gray("Enchantments: "),
				(redFormatting) ? firstNumber.color('#FF3D3D') : ((grayFormatting) ? firstNumber.color('#454545') : firstNumber.color('#DF3DFF')),
				Text.of("/").gray(),
				(redFormatting) ? secondNumber.darkRed('#8F0E0E') : ((grayFormatting) ? secondNumber.color('#999999') : secondNumber.color('#6D0E8F')),
			]);
			let enchLinePos = text.length;
			// This looks wrong but it works so don't touch it
			if (advanced) for (let j = text.length - 1; j > -1; j--) {
				let line = text[j].toString();
				if (!line.includes('}[style={color=dark_gray}]')) {
					enchLinePos = j + 1;
					break;
				}
			}

			text.add(enchLinePos, enchLine)
			text.add(enchLinePos, '')
			enchLinePos++;

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

		if (item.maxDamage != 0 && (item.nbt && !item.nbt.Unbreakable)) {
			let pos = text.length;
			if (advanced) {
				for (let e = 0; e < text.length; e++) {
					let line = text[e].toString();
					if (line.includes('durability')) {
						text.remove(e);
						break;
					}
				}

				for (let g = text.length - 1; g > -1; g--) {
					let line = text[g].toString();
					if (!line.includes('}[style={color=dark_gray}]')) {
						pos = g + 1;
						break;
					}
				}
			}

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

		// Enchantment descriptions
		let isEnchantedBook = (item.id === 'minecraft:enchanted_book');
		if (item.isEnchanted() && event.isShift() || isEnchantedBook) {
			/** @type {any[]} */
			let nbt = item.nbt;
			if (!nbt) return;
			let enchantments = isEnchantedBook ? nbt.StoredEnchantments : nbt.Enchantments;
			if (!enchantments) return;
			let amount = enchantments.length;
			if (amount == 0) return;

			let startAt = 2;
			if (!isEnchantedBook) for (let a = 0; a < text.length; a++) {
				let line = text[a];
				if (line.toString().includes('Enchantments: ')) {
					startAt = a + 1;
					break;
				}

			}

			// Prettier entries
			if (isEnchantedBook) for (let i = startAt; i < amount + startAt; i++) {
				let line = text[i];
				text.remove(i);
				text.add(i, Text.join([
					Text.gray(' ◇'),
					Text.of(line)
				]));
			}

			// Descriptions
			for (let i = startAt; i < amount * 2 + startAt; i = i + 2) {
				let enchant = enchantments[(i - startAt) / 2];
				let id = enchant.id;
				let level = enchant.lvl;

				/**	@type {Internal.MutableComponent_|String} */
				let desc = EnchantmentDescriptions[id];
				if (desc) {
					if (desc.base) {
						let base = desc.base;
						let args = desc.args;
						for (let i = 0; i < args.length; i++) {
							let arg = args[i];
							let value = parseMath(arg.replace('level', level));
							base = base.replace('{}', value);
						}
						desc = Text.of(base);
					}
					else {
						desc = Text.of(desc);
					}
				}
				// Fallback logic
				else {
					let idSplit = id.split(':')
					desc = Text.translate(`enchantment.${idSplit[0]}.${idSplit[1]}.desc`);
				}

				text.add(i + 1, Text.join([Text.darkGray('   ▷ '), desc.darkGray()]))
			}
		}
	});

	event.addAdvanced([
		'potion',
		'splash_potion',
		'lingering_potion'
	], (item, advanced, text) => {
		const original = text.toArray();

		let drinkingTime, cooldown;
		if (original[1] && original[1].toString().includes('sortilege.potion.drinking_time')) {
			drinkingTime = original[1].toString().match(/(\d+(?:\.\d+)?)/g);
		}
		if (original[1] && original[1].toString().includes('sortilege.staff.cooldown')) {
			cooldown = original[1].toString().match(/(\d+(?:\.\d+)?)/g);
		}
		else if (original[2] && original[2].toString().includes('sortilege.staff.cooldown')) {
			cooldown = original[2].toString().match(/(\d+(?:\.\d+)?)/g);
		};

		let potionLine;
		if (cooldown) {
			text.remove(1);
			potionLine = Text.join([
				((item.id != 'minecraft:potion') ? Text.gray('Tʜʀᴏᴡ ᴄᴏᴏʟᴅᴏᴡɴ: ') : Text.gray('Cᴏᴏʟᴅᴏᴡɴ: ')),
				Text.gold(Text.join([parseFloat(cooldown).toString().replace('.0', ''), 's']))
			]);
		}

		if (drinkingTime) {
			text.remove(1);
			potionLine = Text.join([
				potionLine,
				Text.white(' | ').bold(),
				Text.gray('Dʀɪɴᴋɪɴɢ ᴛɪᴍᴇ: '),
				Text.gold(Text.join([parseFloat(drinkingTime).toString().replace('.0', ''), 's'])),
			]);
		}

		if (potionLine) {
			text.add(1, potionLine);
			text.add(2, '');
		}
	});

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
	 * Adds tooltip lines to one or more items, simplified
	 *
	 * @param {string|string[]|RegExp|RegExp[]} items  
	 * Item ID, array of IDs, or regex patterns.  
	 *
	 * @param {string|string[]} text  
	 * Tooltip text to add.  
	 * - Single string -> one line  
	 * - Array of strings -> multiple lines
	 *
	 * @param {Object} [opts]  
	 * Optional settings that control how the tooltip behaves.
	 *
	 * @param {boolean} [opts.gray=true]  
	 * Whether to render the tooltip in gray text. Defaults to true
	 *
	 * @param {number|null} [opts.position=null]  
	 * Priority / ordering of the tooltip:  
	 * - null -> default behavior
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
		let items = data.items;
		let text = Array.isArray(data.text) ? data.text : [data.text];
		let gray = data.gray !== undefined ? data.gray : true;
		let position = data.position !== undefined ? data.position : null;
		let last = data.last !== undefined ? data.last : false;

		event.addAdvanced(items, (item, advanced, tooltip) => {
			if (tooltip[0].toString().includes('gray,obfuscated')) return;

			let maxLen = 50;
			let iter = 0;

			let pos = (last) ? (tooltip[tooltip.size() - 1].toString().includes('color=dark_gray') ? tooltip.size() - 1 : tooltip.size()) : (position !== null ? position : 1);

			text.forEach(line => {
				if (typeof line === 'string') {
					wrapLine(line, maxLen).forEach(wrapped => {
						tooltip.add(pos + iter, gray ? Text.gray(wrapped) : Text.of(wrapped));
						iter++;
					});
				}
				else {
					tooltip.add(pos + iter, line);
					iter++;
				}
			});
		});
	}

	function wrapLine(str, max) {
		let words = str.split(' ');
		let out = [];
		let current = '';

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

	for (const entry of TooltipEdits.TIP_CONFIG) {
		tip(entry.items, entry.text, entry.opts);
	}
})
