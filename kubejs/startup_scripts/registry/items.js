global.itemEffects = {
	/**
	 * @param {Internal.SlotContext} slotContext 
	 * @param {Internal.ItemStack} oldStack 
	 * @param {Internal.ItemStack} newStack 
	 * @param {boolean} isWither
	 */
	roseRingOnEquip: function (slotContext, oldStack, newStack, isWither) {
		const wearer = slotContext.getWearer();
		if (wearer instanceof $Player && !wearer.getLevel().isClientSide()) {
			wearer.attack((isWither) ? 10 : 5);
		}
	},

	theCommunity: {
		buffs: {
			'adjcore:player.damage_dealt': ['multiply_base', 0.05, 0.15],
			'generic.armor': ['addition', 0, 4],
			'generic.attack_speed': ['multiply_base', 0.04, 0.1],
			'generic.movement_speed': ['multiply_total', 0.04, 0.1],
			'adjcore:generic.health_regeneration': ['addition', 0.25, 2],
			'adjcore:generic.damage_reduction': ['addition', 0, 0.05],
		},
		/**
		 * @param {Internal.CapabilityCurios$AttributeModificationContext_} ctx 
		 */
		attributeTick: function (ctx) {
			const entity = ctx.slotContext.wearer;

			if (!(entity instanceof $Player)) return;
			if (entity.level.isClientSide()) return; // run server only

			const total = global.getOrDefault(global.bossMobs.length, 1);
			const progress = global.getKilledBosses(entity.getServer(), true) / total;

			for (let [attributeKey, values] of Object.entries(this.buffs)) {
				let value = values[1] + (values[2] - values[1]) * progress;

				ctx.modify(
					attributeKey,
					global.uuid('the_community'),
					value,
					values[0]
				);

			}

			entity.getAttributes().getSyncableAttributes().forEach(attr => {
				attr.setDirty();
			});
		},
		/**
		 * @param {Internal.SlotContext} slotContext 
		 * @param {Internal.ItemStack} stack 
		 */
		tick: function (slotContext, stack) {
			global.updateCurioEveryTick(stack);
		}
	},

	chaliceOfBlood: {
		/** 
		 * @param {Internal.SlotContext} slotContext 
		 * @param {Internal.ItemStack} stack 
		 */
		tick: function (slotContext, stack) {
			global.updateCurioEveryTick(stack);
		},
		/**
		 * @param {Internal.CapabilityCurios$AttributeModificationContext_} ctx 
		 */
		attributeTick: function (ctx) {
			const item = ctx.stack;
			let nbt = item.nbt;
			let lvl = 0;
			if (nbt && nbt.adj_chalice_blood_amount) {
				lvl = nbt.adj_chalice_blood_amount;
			}
			const regenAmounts = [1, 1.2, 1.4, 1.7, 2.1, 2.5, 3.1, 3.8, 4.5, 5.2, 6];
			ctx.modify(global.attribute('health_regen'), global.uuid('chalice_of_blood'), regenAmounts[lvl], "addition")
		}
	},

	ringOfUnity: {
		/** 
		 * @param {Internal.SlotContext} slotContext 
		 * @param {Internal.ItemStack} stack 
		 */
		tick: function (slotContext, stack) {
			global.updateCurioEveryTick(stack);
		},
		/**
		 * @param {Internal.CapabilityCurios$AttributeModificationContext_} ctx 
		 */
		attributeTick: function (ctx) {
			const wearer = ctx.slotContext.wearer;
			if (wearer instanceof $Player) {
				let amount = 1;
				global.getEntitiesInRadius(wearer.getLevel(), wearer.x, wearer.y, wearer.z, 32).forEach(entity => {
					if (entity instanceof $Player && entity != wearer && entity.isCuriosEquipped('kubejs:ring_of_unity')) {
						amount++;
					}
				});
				ctx.modify(global.attribute('attack_damage'), global.uuid('ring_of_unity'), amount, 'addition');
			}
		}
	},

	warriorsTrophy: {
		/**
		 * @param {Internal.SlotContext} slotContext
		 * @param {Internal.ItemStack} stack
		 */
		tick: function (slotContext, stack) {
			global.updateCurioEveryTick(stack);
		},
		/**
		 * 	
		 * @param {Internal.CapabilityCurios$AttributeModificationContext_} ctx
		 */
		attributeTick: function (ctx) {
			const wearer = ctx.slotContext.wearer;
			if (wearer instanceof $Player && global.getHealthPercent(wearer) >= 0.666) {
				ctx.modify(global.attribute('crit_chance'), global.uuid('warriors_trophy'), 0.15, 'addition');
			}
		}
	},

	heartOfStone: {
		/** 
		 * @param {Internal.SlotContext} slotContext 
		 * @param {Internal.ItemStack} stack 
		 */
		tick: function (slotContext, stack) {
			global.updateCurioEveryTick(stack);
		},
		/**
		 * @param {Internal.CapabilityCurios$AttributeModificationContext_} ctx 
		 */
		attributeTick: function (ctx) {
			const wearer = ctx.slotContext.wearer;
			if (wearer instanceof $Player && !wearer.getLevel().isClientSide()) {
				let amount = 1;
				const currentY = wearer.y;
				amount += Math.ceil(-(x / 14) + (62 / 14));
				ctx.modify(global.attribute('armor'), global.uuid('heart_of_stone'), amount, 'addition');
			}
		}
	},
	palladiumHeroAegis: {
		/**
		 * @param {Internal.SlotContext} slotContext
		 * @param {Internal.ItemStack} stack
		 */
		tick: function (slotContext, stack) {
			let player = slotContext.wearer;
			if (
				player instanceof $Player
				&& !player.getLevel().isClientSide()
				&& player.getLevel().time % 200 == 0
			) {
				let team = player.getTeam();
				for (let onlinePlayer of player.getLevel().getPlayers().toArray()) {
					if (onlinePlayer.getTeam() != team) continue;
					onlinePlayer.addEffect(global.newMobEffectInstance('terra_curio:paladins_shield', '0:30', onlinePlayer == player ? 1 : 0));
				}
			}
		}
	},
};

/** @type {Record<string, string[]>} */
global.curioTooltips = {};

global.rings = {
	'minecraft:redstone': {
		name: 'Redstone Ring',
		color: '#FF1100',
		attributes: {
			gold: [
				['mining_speed', 0.04, 'multiply_base']
			]
		}
	},
	'minecraft:lapis_lazuli': {
		name: 'Lapis Ring',
		color: '#1044A3',
		attributes: {
			gold: [
				['experience_gained', 0.1, 'addition']
			]
		}
	},
	'minecraft:emerald': {
		name: 'Emerald Ring',
		color: '#11B03E',
		attributes: {
			gold: [
				['luck', 1.0, 'addition']
			]
		}
	},
	'minecraft:diamond': {
		name: 'Diamond Ring',
		color: '#4CEDD3',
		attributes: {
			gold: [
				['crit_chance', 0.04, 'addition']
			]
		}
	},
	'rediscovered:ruby': {
		name: 'Ruby Ring',
		color: '#E0122B',
		attributes: {
			gold: [
				['attack_damage', 1.0, 'addition']
			]
		}
	},
	'minecraft:amethyst': {
		name: 'Amethyst Ring',
		color: '#9A5CC6',
		attributes: {
			gold: [
				['spell_damage', 4.0, 'addition']
			]
		}
	},
	'minecraft:ender_pearl': {
		name: 'Ender Pearl Ring',
		color: '#0B4C42',
		attributes: {
			gold: [
				['movement_speed', 0.04, 'multiply_total']
			]
		}
	},
	'minecraft:nether_star': {
		name: 'Ring of Might',
		color: '#FFFFFF',
		attributes: {
			gold: [
				['mining_speed', 0.04, 'multiply_base'],
				['experience_gained', 0.1, 'addition'],
				['luck', 1.0, 'addition'],
				['crit_chance', 0.04, 'addition'],
				['attack_damage', 1.0, 'addition'],
				['spell_damage', 4.0, 'addition'],
				['movement_speed', 0.04, 'multiply_total']
			]
		}
	}
};

StartupEvents.registry('item', registry => {

	// Misc items
	registry.create('enchanters_guide', 'basic')
		.unstackable()
		.texture('kubejs:item/enchanters_guide')
		.displayName('Enchanter\'s Guide')
		.rarity('uncommon')
		.tooltip('§7You don\'t understand a single word inside')
		.tooltip('§7Used to craft an Enchanting Table');

	registry.create('manasteel_sheet', 'basic')
		.texture('kubejs:item/manasteel_sheet')
		.displayName('Manasteel Sheet');

	registry.create('skull_fragment', 'basic')
		.texture('kubejs:item/skull_fragment')
		.displayName('Skull Fragment');

	registry.create('diamond_upgrade', 'smithing_template')
		.helmetIcon().chestplateIcon().leggingsIcon().bootsIcon()
		.pickaxeIcon().axeIcon().swordIcon().shovelIcon().hoeIcon().swordIcon()
		.diamondIcon()
		.appliesTo('Rose Gold Armor and Tools')
		.ingredients('Another Diamond')
		.texture('kubejs:item/diamond_upgrade');

	registry.create('map_atlas')
		.unstackable()
		.displayName('Atlas')
		.tooltip('§7Provides a minimap and a world map')
		.tooltip('§7while equipped or in your inventory')
		.tooltip('§7Works from inside of a Backpack')
		.rarity('epic');

	// Eye of Ethercraft pieces
	for (let i = 0; i < 3; i++) {
		registry.create(`ethercraft_piece_${i + 1}`)
			.unstackable()
			.displayName(`Piece of Ethercraft (#${i + 1})`)
			.rarity('epic');
	}

	// Non-legacy armor sets
	function registerArmorSet(names, type, maxDamage, rarity) {
		let pieces = ['helmet', 'chestplate', 'leggings', 'boots'];
		for (let i = 0; i < pieces.length; i++) {
			let piece = registry.create(`${type}_${pieces[i]}`, pieces[i])
				.unstackable()
				.tier(type)
				.displayName(names[i])
				.rarity(global.getOrDefault(rarity, 'common'));

			if (maxDamage) {
				piece.maxDamage(maxDamage);
			}
		}
	}

	function registerToolset(names, type, maxDamage, rarity) {
		let pieces = ['sword', 'pickaxe', 'axe', 'shovel', 'hoe'];
		for (let i = 0; i < pieces.length; i++) {
			let piece = registry.create(`${type}_${pieces[i]}`, pieces[i])
				.unstackable()
				.tier(type)
				.displayName(names[i])
				.rarity(global.getOrDefault(rarity, 'common'));

			if (maxDamage) {
				piece.maxDamage(maxDamage);
			}
		}
	}

	registerArmorSet([
		'Wooden Helmet',
		'Wooden Chestplate',
		'Wooden Leggings',
		'Wooden Boots'
	], 'wooden', 100);

	registerArmorSet([
		'Sculk Hood',
		'Sculk Tunic',
		'Sculk Leggings',
		'Sculk Boots'
	], 'sculk', 300, 'rare');

	registerArmorSet([
		'Templar Helmet',
		'Templar Chestplate',
		'Templar Leggings',
		'Templar Boots'
	], 'templar', 300, 'rare');

	registerArmorSet([
		'Undead Wolf Helmet',
		'Undead Wolf Chestplate',
		'Undead Wolf Leggings',
		'Undead Wolf Boots'
	], 'undead_wolf', 300, 'rare');

	registerArmorSet([
		'Red Fox Helmet',
		'Red Fox Chestplate',
		'Red Fox Leggings',
		'Red Fox Boots'
	], 'red_fox', 300, 'rare');

	registerArmorSet([
		'Dark Helmet',
		'Dark Chestplate',
		'Dark Leggings',
		'Dark Boots'
	], 'dark', 300, 'rare');

	// Upgraded Sand Paper
	registry.create('soul_sand_paper', 'create:sandpaper')
		.displayName('Soul Sand Paper')
		.unstackable()
		.maxDamage(100)
		.rarity('uncommon');

	registry.create('gravisand_paper', 'create:sandpaper')
		.displayName('Gravisand Paper')
		.unstackable()
		.maxDamage(300)
		.rarity('rare');

	registry.create('tainted_sand_paper', 'create:sandpaper')
		.displayName('Tainted Sand Paper')
		.unstackable()
		.maxDamage(99999);

	registry.create('elsa_crossbow', 'crossbow')
		.crossbow(crossbow => {
			crossbow
				.modifyCrossbow(attr => attr
					.ammo(itemstack => false)
					.infinity()
				)
		})
		.unstackable()
		.maxDamage(3000)
		.displayName('Monster-Piercing Elephant Crossbow')
		.tooltip(Text.gray('Can\'t be loaded normally'))
		.tooltip(Text.gray('After dashing while in either hand,'))
		.tooltip(Text.gray('it will remain loaded for the next 6 seconds'))
		.tooltip('')
		.tooltip(Text.gray('\'Love that kick!\''))
		.rarity('epic');

	/**
	 * Creates a new curio item. Returns the builder in case I need to add more stuff to it.
	 * @param {string} id 
	 * @param {string} name 
	 * @param {Internal.Rarity_?} rarity - defaults to 'uncommon' 
	 * @param {string[]?} tooltipLines 
	 * @param {Internal.CapabilityCurios_} capabilityBuilder 
	 * @returns {Internal.BasicItemJS$Builder_}
	 */
	function createCurio(id, name, rarity, tooltipLines, capabilityBuilder) {
		if (tooltipLines) {
			global.curioTooltips[`kubejs:${id}`] = tooltipLines;
		}
		return registry.create(id)
			.attachCuriosCapability(global.getOrDefault(capabilityBuilder, CuriosJSCapabilityBuilder.create()))
			.unstackable()
			.displayName(name)
			.rarity(global.getOrDefault(rarity, 'uncommon'))
			.tag('curios:accessory');
	}

	createCurio('bloodstone_choker', 'Bloodstone Choker', 'epic',
		[
			'Major boost to most physical stats',
			'(and magic damage for some reason)',
			'Dashing gives 10 extra absorption'
		], CuriosJSCapabilityBuilder.create()
			.addAttribute(
				global.attribute('dash_recharge'),
				global.uuid('bloodstone_choker'),
				0.35,
				'multiply_base'
			)
			.addAttribute(
				global.attribute('damage_reduction'),
				global.uuid('bloodstone_choker'),
				0.06,
				'addition'
			)
			.addAttribute(
				global.attribute('movement_speed'),
				global.uuid('bloodstone_choker'),
				0.08,
				'multiply_base'
			)
			.addAttribute(
				global.attribute('damage'),
				global.uuid('bloodstone_choker'),
				0.12,
				'multiply_base'
			)
	);

	createCurio('chalice_of_blood', 'Chalice of Blood', 'epic', [
		'Right-click to prick yourself on its sharp gems,',
		'pouring some of your blood inside',
		'The Chalice will pour some of it back to you very slowly,',
		'increasing your health regeneration the more you prick yourself',
		'If you die to The Chalice, it won\'t count as an upgrade'
	], CuriosJSCapabilityBuilder.create()
		.modifyAttribute(ctx => global.itemEffects.chaliceOfBlood.attributeTick(ctx))
		// .curioTick((slotContext, stack) => global.itemEffects.chaliceOfBlood.tick(slotContext, stack))
		.canEquipFromUse((slotContext, stack) => false)
	)
		.modelJson({
			"parent": "kubejs:item/chalice_of_blood_0",
			"elements": [],
			"overrides": [
				{ "predicate": { "custom_model_data": 1 }, "model": "kubejs:item/chalice_of_blood_1" },
				{ "predicate": { "custom_model_data": 2 }, "model": "kubejs:item/chalice_of_blood_2" },
				{ "predicate": { "custom_model_data": 3 }, "model": "kubejs:item/chalice_of_blood_3" },
				{ "predicate": { "custom_model_data": 4 }, "model": "kubejs:item/chalice_of_blood_4" },
				{ "predicate": { "custom_model_data": 5 }, "model": "kubejs:item/chalice_of_blood_5" }
			]
		});

	function createRing(name, gem, base, color, curiosCapability) {
		let id = `${base}_${gem.replace(':', '_')}_ring`;
		let rarity = {
			iron: 'uncommon',
			gold: 'rare',
			netherite: 'epic'
		};

		createCurio(id, name, rarity[base], null, curiosCapability)
			.textureJson({
				'layer0': `kubejs:item/ring_base_${base}`,
				'layer1': 'kubejs:item/ring_base_gem'
			})
			.color(1, color);
	}

	for (let [material, entry] of Object.entries(global.rings)) {
		for (let [base, attributes] of Object.entries(entry.attributes)) {
			let capability = CuriosJSCapabilityBuilder.create();
			attributes.forEach(attrArray => {
				capability.addAttribute(
					global.attribute(attrArray[0]),
					global.uuid(material),
					attrArray[2],
					attrArray[3]
				)
			});
			createRing(
				`${Utils.toTitleCase(entry.name)} ${base}`,
				material,
				base,
				entry.color,
				capability
			);
		}
	}

	createCurio('kiketsu_card', 'Kiketsu Matriarch\'s Threat', 'rare', [
		'Killed mobs sometimes drop some resources'
	]);

	createCurio('withering_necklace', 'Necklace of Withering Heights', null, [
		'Healed players are cleansed of Wither and Poison',
	], CuriosJSCapabilityBuilder.create()
		.addAttribute(
			global.attribute('healing_power'),
			global.uuid('withering_necklace'),
			1,
			'addition'
		)
	);

	createCurio('rose_ring', 'Rose Ring', 'uncommon', [
		'Reflects some damage back at the attackers'
	], CuriosJSCapabilityBuilder.create()
		.onEquip(((slotContext, oldStack, newStack) => global.itemEffects.roseRingOnEquip(slotContext, oldStack, newStack, false)))
	);

	createCurio('wither_rose_ring', 'Ring of Thorns', 'rare', [
		'Reflects damage back at the attackers',
		'Heals for a portion of reflected damage'
	], CuriosJSCapabilityBuilder.create()
		.onEquip(((slotContext, oldStack, newStack) => global.itemEffects.roseRingOnEquip(slotContext, oldStack, newStack, true)))
	);

	createCurio('ring_of_fire', 'Ring of Fire', 'epic', [
		'Deal 4 extra damage to mobs on fire'
	]);

	createCurio('shield_of_fire', 'Shield of Fire', 'epic', [
		'Defense increased by 4 while on fire',
		'Grants immunity to fire'
	], CuriosJSCapabilityBuilder.create()
		.addAttribute(
			global.attribute('armor'),
			global.uuid('shield_of_fire'),
			2,
			'addition'
		)
		.addAttribute(
			global.attribute('knockback_resistance'),
			global.uuid('shield_of_fire'),
			0.6,
			'addition'
		)
	);

	createCurio('palladium_hero_aegis', 'Palladium Hero Aegis', 'epic', [
		'Defense increased by 6 while on fire',
		'Absorbs 25% of damage done to players on your team while above 25% health',
		'Grants immunity to fire'
	], CuriosJSCapabilityBuilder.create()
		.curioTick((slotContext, stack) => global.itemEffects.palladiumHeroAegis.tick(slotContext, stack))
		.addAttribute(
			global.attribute('armor'),
			global.uuid('palladium_hero_aegis'),
			6,
			'addition'
		)
		.addAttribute(
			global.attribute('knockback_resistance'),
			global.uuid('palladium_hero_aegis'),
			0.8,
			'addition'
		)
	);

	registry.create('pocketful_of_sunshine')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.tooltip(Text.gray('Periodically generates some absorption'))
		.unstackable()
		.tag('curios:accessory');

	registry.create('decayed_clover')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					global.attribute('luck'),
					'05c70914-fe84-420d-9a2e-dbefeb6dc4a4',
					2,
					'addition'
				)
				.addAttribute(
					global.attribute('luck'),
					'97ba7618-1b3d-4e63-bd58-42a6646d6618',
					0.1,
					'multiply_total'
				)
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('epic');

	registry.create('slider_pickaxe', 'pickaxe')
		.maxDamage(2500)
		.tier('slider_pickaxe')
		.rarity('rare');

	registry.create('the_community')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.modifyAttribute(ctx => global.itemEffects.theCommunity.attributeTick(ctx))
				.curioTick((slotContext, stack) => global.itemEffects.theCommunity.tick(slotContext, stack))
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('epic');

	registry.create('band_of_starpower')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					global.attribute('max_mana'),
					'19ddfd7a-2a97-48e4-9946-b458628d8a0f',
					20,
					'addition'
				)
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	createCurio('celestial_emblem', 'Celestial Emblem', null, null,
		CuriosJSCapabilityBuilder.create()
			.addAttribute(
				global.attribute('spell_damage'),
				global.uuid('celestial_emblem'),
				40,
				'addition'
			)
			.addAttribute(
				global.attribute('mana_cost'),
				global.uuid('celestial_emblem'),
				0.17,
				'addition'
			)
	);

	/*
	registry.create('high_test_fishing_line')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('lavaproof_tackle_bag')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('angler_earring')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('tackle_box')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('angler_tackle_bag')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');
	*/

	registry.create('magic_cuffs')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					global.attribute('max_mana'),
					'19ddfd7a-2a97-48e4-9946-b458628d8a0f',
					20,
					'addition'
				))
		.unstackable()
		.tooltip(Text.gray('Restores Mana when damaged'))
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('mana_regeneration_band')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					global.attribute('mana_regen'),
					'aa2ccf9c-0527-473f-9dd2-74f64d9303b7',
					20,
					'addition'
				)
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	function manaFlowerTooltip(amount, extra) {
		let base = [
			`Passively restore ${global.getOrDefault(amount, 2)}% of maximum mana every second (doesn't stack)`,
			'This is separate from the default mana regeneration rate',
			'and will proc even while using magic weapons',
		];
		if (extra) {
			if (!Array.isArray(extra)) {
				base.push(extra);
			}
			else {
				extra.forEach(line => base.push(line));
			}
		}
		return base;
	}

	createCurio('mana_flower', 'Mana Flower', null, manaFlowerTooltip(),
		CuriosJSCapabilityBuilder.create()
	);

	createCurio('arcane_flower', 'Arcane Flower', null, manaFlowerTooltip(),
		CuriosJSCapabilityBuilder.create()
			.addAttribute(
				global.attribute('spell_damage'),
				global.uuid('arcane_flower'),
				15,
				'addition'
			)
	);

	createCurio('mana_cloak', 'Mana Cloak', null, manaFlowerTooltip(null, 'Stars will rain down when you get hit'),
		CuriosJSCapabilityBuilder.create()
	);

	createCurio('magnet_flower', 'Magnet Flower', null, manaFlowerTooltip(3, 'Increases item pickup range'),
		CuriosJSCapabilityBuilder.create()
			.addAttribute(
				global.attribute('pickup_range'),
				global.uuid('magnet_flower'),
				7,
				'addition'
			)
	);

	createCurio('moon_charm', 'Moon Charm', null, [
		'Transforms the wearer into a werewolf during nighttime'
	]);

	createCurio('moon_shell', 'Moon Shell', null, [
		'Transforms the wearer into a werewolf during nighttime',
		'Transforms the wearer into a melfork while in the water'
	]);

	createCurio('neptunes_shell', 'Neptune\'s Shell', null, [
		'Transforms the wearer into a melfork while in the water'
	]);

	createCurio('celestial_shell', 'Celestial Shell', null, [
		'Transforms the wearer into a werewolf during nighttime',
		'Transforms the wearer into a melfork while in the water'
	], CuriosJSCapabilityBuilder.create()
		.addAttribute(
			global.attribute('attack_speed'),
			global.uuid('celestial_shell'),
			0.1,
			"multiply_base"
		)
		.addAttribute(
			global.attribute('armor'),
			global.uuid('celestial_shell'),
			4,
			"addition"
		)
		.addAttribute(
			global.attribute('crit_chance'),
			global.uuid('celestial_shell'),
			0.02,
			"addition"
		)
		.addAttribute(
			global.attribute('damage'),
			global.uuid('celestial_shell'),
			0.1,
			"multiply_base"
		)
	);

	createCurio('ring_of_greed', 'Greedy Ring', 'epic', [
		'Killed mobs drop some resources',
		'Bosses will drop extra resources when killed'
	]);

	createCurio('shiny_stone', 'Shiny Stone', 'uncommon', [
		'Increases healing power by 3 while standing still',
	]);

	createCurio('soaring_insignia', 'Soaring Insignia', 'epic', [
		'Boost flight time of equipped wings'
	],
		CuriosJSCapabilityBuilder.create()
			.addAttribute(
				global.attribute('flight_time'),
				global.uuid('soaring_insignia'),
				0.25,
				'multiply_total'
			)
	);

	createCurio('obsidian_necklace', 'Obsidian Necklace', 'uncommon', [
		'Grants immunity to fire blocks'
	], CuriosJSCapabilityBuilder.create()
		.addAttribute(
			global.attribute('armor_pierce'),
			global.uuid('obsidian_necklace'),
			5,
			'addition'
		));

	createCurio('insulated_cuffs', 'Insulated Cuffs', 'uncommon', [
		'Attacks slow down and freeze enemies'
	]);

	createCurio('warriors_trophy', 'Warrior\'s Trophy', 'rare', [
		'15% increased critical strike chance while above 66% of life'
	], CuriosJSCapabilityBuilder.create()
		.modifyAttribute(ctx => global.itemEffects.warriorsTrophy.attributeTick(ctx))
		.curioTick((slotContext, stack) => global.itemEffects.warriorsTrophy.tick(slotContext, stack))
	);

	createCurio('raptor_claws', 'Raptor Claws', 'uncommon', null,
		CuriosJSCapabilityBuilder.create()
			.addAttribute(
				global.attribute('attack_speed'),
				global.uuid('raptor_claws'),
				0.12,
				'multiply_base'
			)
			.addAttribute(
				global.attribute('armor_pierce'),
				global.uuid('raptor_claws'),
				5,
				'addition'
			)
	);

	createCurio('glacial_claws', 'Glacial Claws', 'uncommon', [
		'Attacks slow down and freeze enemies'
	],
		CuriosJSCapabilityBuilder.create()
			.addAttribute(
				global.attribute('attack_speed'),
				global.uuid('glacial_claws'),
				0.12,
				'multiply_base'
			)
			.addAttribute(
				global.attribute('armor_pierce'),
				global.uuid('glacial_claws'),
				5,
				'addition'
			)
	);

	createCurio('starstruck_necklace', 'Starstruck Necklace', 'uncommon', [
		'Releases bees, douses the user in honey and increases movement speed when damaged'
	], CuriosJSCapabilityBuilder.create()
		.addAttribute(
			global.attribute('armor_pierce'),
			global.uuid('starstruck_necklace'),
			10,
			'addition'
		)
	);

	createCurio('seed_of_hope', 'Seed of Hope', 'uncommon', [
		'Planting saplings increases movement speed and health regeneration'
	]);

	createCurio('tide_stone', 'Tide Stone', 'uncommon', [
		'Dealing magic damage restores a small amount of mana'
	], CuriosJSCapabilityBuilder.create()
		.addAttribute(
			global.attribute('max_mana'),
			global.uuid('tide_stone'),
			20,
			'addition'
		)
	);

	createCurio('mana_bauble', 'Mana Bubble', 'uncommon', null, CuriosJSCapabilityBuilder.create()
		.addAttribute(
			global.attribute('max_mana'),
			global.uuid('mana_bauble'),
			10,
			'addition'
		)
	);

	createCurio('ring_of_unity', 'Ring of Unity', 'uncommon', [
		'Increases damage by 1',
		'Increases damage by additional 1 for every nearby player who also wears it'
	],
		CuriosJSCapabilityBuilder.create()
			.curioTick((slotContext, stack) => global.itemEffects.ringOfUnity.tick(slotContext, stack))
			.modifyAttribute((ctx) => global.itemEffects.ringOfUnity.attributeTick(ctx))
	);

	registry.create('leviathan_tooth')
		.rarity('epic');

	registry.create('dragon_scale')
		.rarity('epic');

	createCurio('leviathan_tooth_necklace', 'Leviathan Tooth Necklace', 'uncommon', null,
		CuriosJSCapabilityBuilder.create()
			.addAttribute(
				global.attribute('armor_pierce'),
				global.uuid('leviathan_tooth_necklace'),
				12,
				'addition'
			)
	);

	createCurio('crietz', 'Criez', 'uncommon', [
		'Critical strikes release damaging sparks'
	]);

	createCurio('heart_of_stone', 'Heart of Stone', 'uncommon', [
		'Defense increases based on depth'
	],
		CuriosJSCapabilityBuilder.create()
			.curioTick((slotContext, stack) => global.itemEffects.heartOfStone.tick(slotContext, stack))
			.modifyAttribute((ctx) => global.itemEffects.heartOfStone.attributeTick(ctx))
	);

	registry.create('a_very_fine_item')
		.displayName('A Very Fine Item')
		.unstackable()
		.rarity('epic');

	registry.create('gloopy_bow', 'bow')
		.bow(bow => { })
		.unstackable()
		.maxDamage(1200)
		.displayName('Gloopy Bow')
		.tooltip(Text.gray(''))
		.rarity('uncommon');

	createCurio('alchemist_glove', 'Alchemist\'s Glove', 'uncommon', [
		'Healing spells will heal 1 additional life',
		'Drinking healing potions will also heal every nearby player for a third of the amount'
	], CuriosJSCapabilityBuilder.create()
		.addAttribute(
			global.attribute('healing_power'),
			global.uuid('alchemist_glove'),
			1,
			'addition'
		)
	);

	createCurio('buzzing_crown', 'Buzzing Crown', 'uncommon', [
		'Healing spells will heal 1 additional life',
		'Healed players are doused in honey'
	], CuriosJSCapabilityBuilder.create()
		.addAttribute(
			global.attribute('healing_power'),
			global.uuid('buzzing_crown'),
			1,
			'addition'
		)
	);

	createCurio('celestial_blessing', 'Rune of Power', 'epic',
		manaFlowerTooltip(5, [
			'Spell power increases as your mana decreases',
			'For up to 40% more damage when at 0 mana'
		])
	);

	createCurio('concussive_glove', 'Concussive Glove', 'uncommon', [
		'Healing spells will heal 1 additional life',
		'Melee hits stun mobs for a short time'
	], CuriosJSCapabilityBuilder.create()
		.addAttribute(
			global.attribute('healing_power'),
			global.uuid('concussive_glove'),
			1,
			'addition'
		)
	);

	createCurio('corrupted_ring', 'Corrupted Ring', 'uncommon', [
		'Healing spells will heal you for a small portion of healing done to other players',
	], CuriosJSCapabilityBuilder.create()
		.addAttribute(
			global.attribute('max_health'),
			global.uuid('corrupted_ring'),
			-20,
			'addition'
		)
		.addAttribute(
			global.attribute('healing_power'),
			global.uuid('corrupted_ring'),
			-1,
			'addition'
		)
	);

	createCurio('damage_blessing', 'Sigil of Wrath', 'epic', [
		'Dealing damage builds wrath',
		'Each stack of wrath decreases your defense by 1 and increases your damage by 2%',
		'Upon reaching 10 stacks all wrath will be converted into a 40% damage boost buff and then reset'
	]);

	createCurio('highlander_blessing', 'Sigil of Wind', 'epic', [
		'Grants 4 short range dashes'
	], CuriosJSCapabilityBuilder.create()
		.addAttribute(
			global.attribute('dash_count'),
			global.uuid('highlander_blessing'),
			4,
			'addition'
		)
		.addAttribute(
			global.attribute('movement_speed'),
			global.uuid('highlander_blessing'),
			0.05,
			'multiply_total'
		)
	);

	createCurio('pyromancer_blessing', 'Sigil of Flames', 'epic', [
		'Hitting mobs on fire will cause a small explosion and spread flames to other nearby mobs',
		'Grants immunity to fire and lava'
	]);

	// createCurio('scroll_of_containment')
	// 	.attachCuriosCapability(
	// 		CuriosJSCapabilityBuilder.create()
	// 	)
	// 	.unstackable()
	// 	.tag('curios:accessory')
	// 	.rarity('uncommon');

	createCurio('surgical_glove', 'Surgical Glove', 'uncommon', [
		'Healing spells will heal 2 additional life'
	], CuriosJSCapabilityBuilder.create()
		.addAttribute(
			global.attribute('healing_power'),
			global.uuid('surgical_glove'),
			2,
			'addition'
		)
	);

	createCurio('sweeping_blessing', 'Sigil of Protection', 'epic', [
		'Healed players will generate overshield with every attack for a short time'
	], CuriosJSCapabilityBuilder.create()
		.addAttribute(
			global.attribute('healing_power'),
			global.uuid('sweeping_blessing'),
			3,
			'addition'
		)
		.addAttribute(
			global.attribute('max_mana'),
			global.uuid('sweeping_blessing'),
			40,
			'addition'
		)
		.addAttribute(
			global.attribute('max_health'),
			global.uuid('sweeping_blessing'),
			40,
			'addition'
		)
	);

	createCurio('vampire_blessing', 'Sigil of Vampirism', 'epic', [
		'Major improvement to all stats',
		'Causes you to burn in sunlight and take damage from water',
	], CuriosJSCapabilityBuilder.create()
		.addAttribute(
			global.attribute('max_health'),
			global.uuid('vampire_blessing'),
			50,
			'addition'
		)
		.addAttribute(
			global.attribute('damage'),
			global.uuid('vampire_blessing'),
			0.1,
			'multiply_base'
		)
		.addAttribute(
			global.attribute('movement_speed'),
			global.uuid('vampire_blessing'),
			0.1,
			'multiply_base'
		)
		.addAttribute(
			global.attribute('armor'),
			global.uuid('vampire_blessing'),
			6,
			'addition'
		)
	);

	createCurio('vengeful_band', 'Enchanted Band', null, null, CuriosJSCapabilityBuilder.create()
		.addAttribute(
			global.attribute('spell_damage'),
			global.uuid('vengeful_band'),
			5,
			'addition'
		)
		.addAttribute(
			global.attribute('max_mana'),
			global.uuid('vengeful_band'),
			20,
			'addition'
		)
		.addAttribute(
			global.attribute('crit_chance'),
			global.uuid('vengeful_band'),
			0.05,
			'addition'
		)
	);

	registry.create('prismarine_bow', 'bow')
		.bow(bow => { })
		.unstackable()
		.maxDamage(1200)
		.displayName('Prismarine Bow')
		.tooltip(Text.gray(''))
		.rarity('uncommon')

	registry.create('the_phantom', 'bow')
		.bow(bow => { })
		.unstackable()
		.maxDamage(1200)
		.displayName('The Phantom')
		.tooltip(Text.gray(''))
		.rarity('rare')

	createCurio('ambrosia', 'Ambrosia', null, [
		'Healed players will have increased movement speed for a short time',
		'Healed players will regenerate 2 health per second for the next 3 seconds (does not stack)'
	]);

	createCurio('cactus_concoction', 'Cactus Concoction', null, [
		'Healed players will have increased movement speed for a short time'
	]);

	// registry.create('diamond_berry')
	// 	.attachCuriosCapability(
	// 		CuriosJSCapabilityBuilder.create()
	// 	)
	// 	.unstackable()
	// 	.tag('curios:accessory')
	// 	.rarity('uncommon');

	// registry.create('gigashroom')
	// 	.attachCuriosCapability(
	// 		CuriosJSCapabilityBuilder.create()
	// 	)
	// 	.unstackable()
	// 	.tag('curios:accessory')
	// 	.rarity('uncommon');

	createCurio('truffle_blue', 'Blue Truffle', null, [
		'Healed players have a chance to be cured of Slowness',
		'Grants immunity to Slowness'
	]);

	createCurio('truffle_green', 'Green Truffle', null, [
		'Healed players have a chance to be cured of Poison',
		'Grants immunity to Poison'
	]);

	createCurio('truffle_purple', 'Purple Truffle', null, [
		'Healed players have a chance to be cured of Weakness',
		'Grants immunity to Weakness'
	]);

	createCurio('truffle_red', 'Red Truffle', null, [
		'Healed players have a chance to be cured of Bleeding',
		'Grants immunity to Bleeding'
	]);

	createCurio('truffle_white', 'White Truffle', null, [
		'Healed players have a chance to be cured of Slowness, Poison, Weakness and Bleeding',
		'Grants immunity to Slowness, Poison, Weakness and Bleeding'
	]);

	createCurio('celestial_crystal', 'Celestial Crystal', null, null,
		CuriosJSCapabilityBuilder.create()
			.addAttribute(
				global.attribute('healing_power'),
				global.uuid('celestial_crystal'),
				1,
				'addition'
			)
			.addAttribute(
				global.attribute('max_mana'),
				global.uuid('celestial_crystal'),
				20,
				'addition'
			)
			.addAttribute(
				global.attribute('max_health'),
				global.uuid('celestial_crystal'),
				20,
				'addition'
			)
	);

	registry.create('enchanted_string')
		.displayName('Elven String');

	registry.create('eternal_tear')
		.rarity('uncommon');

	registry.create('philosopher_stone')
		.unstackable()
		.rarity('epic');

	function registerDust(name, color) {
		registry.create(global.textReplaceAll(name.toLowerCase(), ' ', '_'))
			.displayName(name)
			.textureJson({
				'layer0': `kubejs:item/ore_dust_base`,
				'layer1': `kubejs:item/ore_dust`,
			})
			.color(1, color)
			.tag('adj:ore_dusts');
	}
	// registerDust('Gravitite Dust', 0x895983);
	// registerDust('Valkyrum Dust', 0xb18e6d);
	// registerDust('Veridium Dust', 0x365b8a);
	// registerDust('Azure Neodymium Dust', 0x122a6e);
	// registerDust('Scarlet Neodymium Dust', 0x6b1017);
	registerDust('Zinc Dust', 0x80908a);
	registerDust('Bismuth Dust', 0x6e676f);
	registerDust('Silver Dust', 0x5a7072);
	registerDust('Copper Dust', 0x8e6149);
	registerDust('Gold Dust', 0xd19f30);
	registerDust('Iron Dust', 0x9a8570);
	registerDust('Adamantite Dust', 0x792129);
	registerDust('Aquarium Dust', 0x3b6b9e);
	registerDust('Kyber Dust', 0x6b4782);
	registerDust('Midas Gold Dust', 0xb76e19);
	registerDust('Mythril Dust', 0x2e5471);
	registerDust('Orichalcum Dust', 0x437a50);
	registerDust('Osmium Dust', 0x4b5f78);
	registerDust('Palladium Dust', 0xbb5718);
	registerDust('Platinum Dust', 0xbdacf5);
	registerDust('Prometheum Dust', 0x377c5f);
	registerDust('Runite Dust', 0x1a5c75);
	registerDust('Stormyx Dust', 0x7d4371);
	registerDust('Tin Dust', 0x7f6164);
	registerDust('Sulfur Dust', 0xbeaf66);

	registry.create('rune_life')
		.tag('botania:runes')
		.displayName('Rune of Life')
		.texture('kubejs:item/rune_of_life');

	registry.create('bandage')
		.tag('adj:bandage')
		.displayName('Bandage')
		.texture('majruszsdifficulty:item/bandage');

	registry.create('golden_bandage')
		.tag('adj:bandage')
		.displayName('Golden Bandage')
		.texture('majruszsdifficulty:item/golden_bandage')
		.rarity('uncommon');

	registry.create('legacy/apple')
		.displayName('Ancient Apple')
		.food(food => {
			food.hunger(4)
			food.saturation(0.3)
		});

	registry.create('legacy/apple_golden')
		.displayName('Ancient Golden Apple')
		.food(food => {
			food.hunger(4)
			food.saturation(1.2)
			food.alwaysEdible()
		});

	registry.create('legacy/bread')
		.displayName('Ancient Bread')
		.food(food => {
			food.hunger(5)
			food.saturation(0.6)
		});

	registry.create('legacy/carrot')
		.displayName('Ancient Carrot')
		.food(food => {
			food.hunger(3)
			food.saturation(0.6)
		});

	registry.create('legacy/carrot_golden')
		.displayName('Ancient Golden Carrot')
		.food(food => {
			food.hunger(6)
			food.saturation(1.2)
		});

	registry.create('legacy/melon_slice')
		.texture('kubejs:item/legacy/melon')
		.displayName('Ancient Melon Slice')
		.food(food => {
			food.hunger(2)
			food.saturation(0.3)
		});

	registry.create('legacy/potato')
		.displayName('Ancient Potato')
		.food(food => {
			food.hunger(1)
			food.saturation(0.3)
		});

	registry.create('legacy/potato_baked')
		.displayName('Ancient Baked Potato')
		.food(food => {
			food.hunger(5)
			food.saturation(0.6)
		});

	registry.create('legacy/potato_poisonous')
		.displayName('Ancient Poisonous Potato')
		.food(food => {
			food.hunger(2)
			food.saturation(0.3)
		});

	registry.create('legacy/pumpkin_pie')
		.displayName('Ancient Pumpkin Pie')
		.food(food => {
			food.hunger(8)
			food.saturation(0.3)
		});

	registry.create('legacy/bone')
		.displayName('Ancient Bone')

	registry.create('legacy/brick')
		.displayName('Ancient Brick')

	registry.create('legacy/clay_ball')
		.displayName('Ancient Clay Ball')

	registry.create('legacy/coal')
		.displayName('Ancient Coal')

	registry.create('legacy/diamond')
		.displayName('Ancient Diamond')

	registry.create('legacy/emerald')
		.displayName('Ancient Emerald')

	registry.create('legacy/ruby')
		.displayName('Ancient Ruby')

	registry.create('legacy/feather')
		.displayName('Ancient Feather')

	registry.create('legacy/flint')
		.displayName('Ancient Flint')

	registry.create('legacy/glowstone_dust')
		.displayName('Ancient Glowstone Dust')

	registry.create('legacy/gold_ingot')
		.displayName('Ancient Gold Ingot')

	registry.create('legacy/gunpowder')
		.displayName('Ancient Gunpowder')

	registry.create('legacy/iron_ingot')
		.displayName('Ancient Iron Ingot')

	registry.create('legacy/leather')
		.displayName('Ancient Leather')

	registry.create('legacy/redstone_dust')
		.displayName('Ancient Redstone Dust')

	registry.create('legacy/rotten_flesh')
		.displayName('Ancient Rotten Flesh')
		.food(food => {
			food.hunger(4)
			food.saturation(0.1)
		});

	registry.create('legacy/slimeball')
		.displayName('Ancient Slimeball')

	registry.create('legacy/spider_eye')
		.displayName('Ancient Spider Eye')
		.food(food => {
			food.hunger(2)
			food.saturation(0.3)
		});

	registry.create('legacy/string')
		.displayName('Ancient String')

	registry.create('legacy/sugar')
		.displayName('Ancient Sugar')

	registry.create('legacy/dye_powder_blue')
		.displayName('Ancient Lapis Lazuli')

	registry.create('legacy/flint_and_steel')
		.displayName('Ancient Flint and Steel')

	registry.create('legacy/record_cat', 'music_disc')
		.song('adj:legacy.record.cat_and_dog', 333)
		.displayName('Ancient Music Disc')
		.tag("music_discs")

	registerToolset([
		'Ancient Wooden Sword',
		'Ancient Wooden Pickaxe',
		'Ancient Wooden Axe',
		'Ancient Wooden Shovel',
		'Ancient Wooden Hoe'
	], 'legacy/wood');

	registerToolset([
		'Ancient Stone Sword',
		'Ancient Stone Pickaxe',
		'Ancient Stone Axe',
		'Ancient Stone Shovel',
		'Ancient Stone Hoe'
	], 'legacy/stone');

	registerToolset([
		'Ancient Iron Sword',
		'Ancient Iron Pickaxe',
		'Ancient Iron Axe',
		'Ancient Iron Shovel',
		'Ancient Iron Hoe'
	], 'legacy/iron');

	registerToolset([
		'Ancient Gold Sword',
		'Ancient Gold Pickaxe',
		'Ancient Gold Axe',
		'Ancient Gold Shovel',
		'Ancient Gold Hoe'
	], 'legacy/gold');

	registerToolset([
		'Ancient Diamond Sword',
		'Ancient Diamond Pickaxe',
		'Ancient Diamond Axe',
		'Ancient Diamond Shovel',
		'Ancient Diamond Hoe'
	], 'legacy/diamond');

	registerArmorSet([
		'Ancient Plate Helmet',
		'Ancient Plate Chestplate',
		'Ancient Plate Leggings',
		'Ancient Plate Boots'
	], 'legacy/plate');

	registerArmorSet([
		'Ancient Iron Helmet',
		'Ancient Iron Chestplate',
		'Ancient Iron Leggings',
		'Ancient Iron Boots'
	], 'legacy/iron');

	registerArmorSet([
		'Ancient Chainmail Helmet',
		'Ancient Chainmail Chestplate',
		'Ancient Chainmail Leggings',
		'Ancient Chainmail Boots'
	], 'legacy/chainmail');

	registerArmorSet([
		'Ancient Gold Helmet',
		'Ancient Gold Chestplate',
		'Ancient Gold Leggings',
		'Ancient Gold Boots'
	], 'legacy/gold');

	registerArmorSet([
		'Ancient Diamond Helmet',
		'Ancient Diamond Chestplate',
		'Ancient Diamond Leggings',
		'Ancient Diamond Boots'
	], 'legacy/diamond');
});

ItemEvents.armorTierRegistry(event => {
	event.add('wooden', tier => {
		tier.durabilityMultiplier = 4
		tier.slotProtections = [0, 1, 1, 1]
		tier.enchantmentValue = 5
		tier.equipSound = 'minecraft:item.armor.equip_turtle'
		tier.repairIngredient = '#planks'
		tier.toughness = 0
		tier.knockbackResistance = 0
	});

	event.add('red_fox', tier => {
		tier.durabilityMultiplier = 4
		tier.slotProtections = [0, 1, 1, 1]
		tier.enchantmentValue = 5
		tier.equipSound = 'minecraft:item.armor.equip_turtle'
		tier.repairIngredient = 'leather'
		tier.toughness = 0
		tier.knockbackResistance = 0
	});

	event.add('undead_wolf', tier => {
		tier.durabilityMultiplier = 4
		tier.slotProtections = [0, 1, 1, 1]
		tier.enchantmentValue = 5
		tier.equipSound = 'minecraft:item.armor.equip_turtle'
		tier.repairIngredient = 'leather'
		tier.toughness = 0
		tier.knockbackResistance = 0
	});

	event.add('dark', tier => {
		tier.durabilityMultiplier = 4
		tier.slotProtections = [0, 1, 1, 1]
		tier.enchantmentValue = 5
		tier.equipSound = 'minecraft:item.armor.equip_turtle'
		tier.repairIngredient = 'obsidian'
		tier.toughness = 0
		tier.knockbackResistance = 0
	});

	event.add('templar', tier => {
		tier.durabilityMultiplier = 4
		tier.slotProtections = [0, 1, 1, 1]
		tier.enchantmentValue = 5
		tier.equipSound = 'minecraft:item.armor.equip_turtle'
		tier.repairIngredient = 'iron_ingot'
		tier.toughness = 0
		tier.knockbackResistance = 0
	});

	event.add('legacy/iron', tier => {
		tier.durabilityMultiplier = 15
		tier.slotProtections = [0, 1, 1, 1]
		tier.enchantmentValue = 9
		// tier.equipSound = 'adj:empty'
		tier.repairIngredient = 'kubejs:legacy/iron_ingot'
		tier.toughness = 0
		tier.knockbackResistance = 0
	});

	event.add('legacy/chainmail', tier => {
		tier.durabilityMultiplier = 15
		tier.slotProtections = [0, 1, 1, 1]
		tier.enchantmentValue = 12
		// tier.equipSound = 'adj:empty'
		tier.toughness = 0
		tier.knockbackResistance = 0
	});

	event.add('legacy/diamond', tier => {
		tier.durabilityMultiplier = 33
		tier.slotProtections = [0, 1, 1, 1]
		tier.enchantmentValue = 10
		// tier.equipSound = 'adj:empty'
		tier.repairIngredient = 'kubejs:legacy/diamond'
		tier.toughness = 0
		tier.knockbackResistance = 0
	});

	event.add('legacy/gold', tier => {
		tier.durabilityMultiplier = 7
		tier.slotProtections = [0, 1, 1, 1]
		tier.enchantmentValue = 25
		// tier.equipSound = 'adj:empty'
		tier.repairIngredient = 'kubejs:legacy/gold_ingot'
		tier.toughness = 0
		tier.knockbackResistance = 0
	});

	event.add('legacy/plate', tier => {
		tier.durabilityMultiplier = 15
		tier.slotProtections = [0, 1, 1, 1]
		tier.enchantmentValue = 8
		// tier.equipSound = 'adj:empty'
		tier.repairIngredient = 'kubejs:legacy/iron_ingot'
		tier.toughness = 0
		tier.knockbackResistance = 0
	});
});

ItemEvents.toolTierRegistry(event => {
	event.add('slider_pickaxe', tier => {
		tier.uses = 2500
		tier.speed = 7.5
		tier.attackDamageBonus = 2
		tier.level = 3
		tier.enchantmentValue = 20
		tier.repairIngredient = 'aether:holystone'
	});

	event.add('legacy/iron', tier => {
		tier.uses = 250
		tier.speed = 6
		tier.attackDamageBonus = 2
		tier.level = 2
		tier.enchantmentValue = 14
		tier.repairIngredient = 'kubejs:legacy/iron_ingot'
	});

	event.add('legacy/wood', tier => {
		tier.uses = 59
		tier.speed = 2
		tier.attackDamageBonus = 0
		tier.level = 0
		tier.enchantmentValue = 15
		tier.repairIngredient = '#adj:legacy/planks'
	});

	event.add('legacy/stone', tier => {
		tier.uses = 131
		tier.speed = 4
		tier.attackDamageBonus = 1
		tier.level = 1
		tier.enchantmentValue = 5
		tier.repairIngredient = 'kubejs:legacy/cobblestone'
	});

	event.add('legacy/gold', tier => {
		tier.uses = 32
		tier.speed = 12
		tier.attackDamageBonus = 0
		tier.level = 0
		tier.enchantmentValue = 22
		tier.repairIngredient = 'kubejs:legacy/gold_ingot'
	});

	event.add('legacy/diamond', tier => {
		tier.uses = 1561
		tier.speed = 8
		tier.attackDamageBonus = 3
		tier.level = 3
		tier.enchantmentValue = 10
		tier.repairIngredient = 'kubejs:legacy/diamond'
	});
});
