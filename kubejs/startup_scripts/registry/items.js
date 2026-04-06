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
		/**
		 * @param {Internal.CapabilityCurios$AttributeModificationContext_} ctx 
		 */
		attributeTick: function (ctx) {
			const entity = ctx.slotContext.wearer;

			if (!(entity instanceof $Player)) return;
			if (entity.level.isClientSide()) return; // server only

			const buffs = {
				'generic.attack_damage': ['addition', 0.05, 0.15],
				'generic.armor': ['addition', 0, 4],
				'generic.attack_speed': ['multiply_base', 0.04, 0.1],
				'generic.movement_speed': ['multiply_base', 0.04, 0.1],
				'adjcore:generic.health_regeneration': ['addition', 0.25, 2],
				'adjcore:generic.damage_reduction': ['addition', 0, 0.05],
				'attributeslib:arrow_damage': ['addition', 0.05, 0.15],
				'ars_nouveau:ars_nouveau.perk.spell_damage': ['addition', 5, 15],
			};

			const serverData = entity.getServer().persistentData.killedBosses || [];
			const killed = serverData.length;

			const total = global.bossMobs.length || 1;
			const progress = killed / total;

			for (let [attributeKey, values] of Object.entries(buffs)) {
				let value = values[1] + (values[2] - values[1]) * progress;

				ctx.modify(
					attributeKey,
					'749eb13f-84c3-4ef3-ab92-f373fa30dd28',
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
			if (!stack.hasNBT()) {
				stack.nbt = {};
			}
			stack.nbt.t = !(stack.nbt.getBoolean('t') || false);
		}
	},

	chaliceOfBlood: {
		/** 
		 * @param {Internal.SlotContext} slotContext 
		 * @param {Internal.ItemStack} stack 
		 */
		tick: function (slotContext, stack) {
			if (!stack.hasNBT()) {
				stack.nbt = {};
			}
			stack.nbt.t = !(stack.nbt.getBoolean('t') || false);
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
			ctx.modify('adjcore:generic.health_regeneration', '03adf3eb-6c4f-47e9-9539-705b3c1fca4f', regenAmounts[lvl], "addition")
		}
	},

	elsaCrossbow: {
		/**
		 * 
		 * @param {Internal.ProjectileHitBlockEventJS} event 
		 */
		blockHit: function (event) {
			const arrow = event.getArrow();
			arrow.level.spawnParticles('minecraft:smoke', true, arrow.x, arrow.y - 0.1, arrow.z, 0.15, 0.15, 0.15, 10, 0.01);
			arrow.level.spawnParticles('cataclysm:spark', true, arrow.x, arrow.y - 0.1, arrow.z, 0, 0, 0, 4, 0.08);
			arrow.kill();
		},
		/**
		 * 
		 * @param {Internal.CrossbowUseContext} event 
		 */
		shoot: function (event) {
			const player = event.getPlayer();
			if (player) {
				player.level.playSound(null, player.x, player.y + player.getEyeHeight(), player.z, 'minecraft:block.anvil.place', 'players', 1, Math.random() * .25 + 0.95);
				player.getPersistentData().elsa_crossbow_tickdown = 1;
			}
		}
	},

	ringOfUnity: {
		/** 
		 * @param {Internal.SlotContext} slotContext 
		 * @param {Internal.ItemStack} stack 
		 */
		tick: function (slotContext, stack) {
			if (!stack.hasNBT()) {
				stack.nbt = {};
			}
			stack.nbt.t = !(stack.nbt.getBoolean('t') || false);
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
				ctx.modify('generic.attack_damage', '816b42f4-3255-4c02-8ee7-9cfe7ddc1e50', amount, 'addition');
			}
		}
	},

	heartOfStone: {
		/** 
		 * @param {Internal.SlotContext} slotContext 
		 * @param {Internal.ItemStack} stack 
		 */
		tick: function (slotContext, stack) {
			if (!stack.hasNBT()) {
				stack.nbt = {};
			}
			stack.nbt.t = !(stack.nbt.getBoolean('t') || false);
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
				ctx.modify('generic.armor', '2db7c219-f7bd-4fa9-a98a-cd660b9e9a56', amount, 'addition');
			}
		}
	}
};

global.rings = {
	'minecraft:diamond': {
		name: 'Diamond Ring',
		color: '#27D3F5',
		attributes: {
			iron: [
				['attributeslib:crit_chance', 'c90d50d7-1489-4c10-9621-7de4c40d9500', 0.02, 'addition']
			],
			gold: [
				['attributeslib:crit_chance', 'c90d50d7-1489-4c10-9621-7de4c40d9501', 0.04, 'addition']
			]
		}
	},
	'rediscovered:ruby': {
		name: 'Ruby Ring',
		color: '#ce1111',
		attributes: {
			iron: [
				['generic.attack_damage', 'c90d50d7-1489-4c10-9621-7de4c40d9502', 1, 'addition']
			],
			gold: [
				['generic.attack_damage', 'c90d50d7-1489-4c10-9621-7de4c40d9503', 2, 'addition']
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
		.maxStackSize(64)
		.texture('kubejs:item/manasteel_sheet')
		.displayName('Manasteel Sheet')
		.tooltip('§7Used to craft Manasteel Armor');

	registry.create('skull_fragment', 'basic')
		.maxStackSize(64)
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
		.tooltip('§7while in your inventory')
		.tooltip('§7Works from inside of a Backpack!')
		.rarity('epic');

	// Eye of Ethercraft pieces
	for (let i = 0; i < 3; i++) {
		registry.create(`ethercraft_piece_${i + 1}`)
			.unstackable()
			.displayName(`Piece of Ethercraft (#${i + 1})`)
			.rarity('epic');
	}

	// Wooden Armor
	registry.create('wooden_helmet', 'helmet')
		.unstackable()
		.maxDamage(110)
		.displayName('Wooden Helmet')
		.tier('wooden');

	registry.create('wooden_chestplate', 'chestplate')
		.unstackable()
		.maxDamage(110)
		.displayName('Wooden Chestplate')
		.tier('wooden');

	registry.create('wooden_leggings', 'leggings')
		.unstackable()
		.maxDamage(110)
		.displayName('Wooden Leggings')
		.tier('wooden');

	registry.create('wooden_boots', 'boots')
		.unstackable()
		.maxDamage(110)
		.displayName('Wooden Boots')
		.tier('wooden');

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
				.onArrowHit(arrow => {
					arrow.hitBlock(event => global.itemEffects.elsaCrossbow.blockHit(event))
				})
				.onUse(event => {
					event.shoot(event => global.itemEffects.elsaCrossbow.shoot(event))
				});
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

	registry.create('bloodstone_choker')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'combatroll:recharge',
					'b888ea99-c203-42db-a337-4898c812aaad',
					0.35,
					'multiply_base'
				)
				.addAttribute(
					'adjcore:generic.damage_reduction',
					'b888ea99-c203-42db-a337-4898c812aaad',
					0.06,
					'addition'
				)
				.addAttribute(
					'generic.movement_speed',
					'b888ea99-c203-42db-a337-4898c812aaad',
					0.08,
					'multiply_base'
				)
				.addAttribute(
					'generic.attack_damage',
					'b888ea99-c203-42db-a337-4898c812aaad',
					0.12,
					'multiply_base'
				)
				.addAttribute(
					'attribtueslib:arrow_damage',
					'b888ea99-c203-42db-a337-4898c812aaad',
					0.12,
					'addition'
				)
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.spell_power',
					'b888ea99-c203-42db-a337-4898c812aaad',
					12,
					'addition'
				)
		)
		.unstackable()
		.tooltip(Text.gray('Major boost to most physical stats'))
		.tooltip(Text.gray('(and magic damage for some reason)'))
		.tooltip(Text.gray('Dashing gives 10 extra absorption'))
		.tag('curios:accessory')
		.rarity('epic');

	registry.create('chalice_of_blood')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.modifyAttribute(ctx => global.itemEffects.chaliceOfBlood.attributeTick(ctx))
				// .curioTick((slotContext, stack) => global.itemEffects.chaliceOfBlood.tick(slotContext, stack))
				.canEquipFromUse((slotContext, stack) => false)
		)
		.unstackable()
		.tooltip(Text.gray('Right-click to prick yourself on its sharp gems,'))
		.tooltip(Text.gray('pouring some of your blood inside'))
		.tooltip(Text.gray('The Chalice will pour some of it back to you very slowly,'))
		.tooltip(Text.gray('increasing your health regeneration the more you prick yourself'))
		.tooltip(Text.gray('If you die to The Chalice, it won\'t count as an upgrade'))
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
		})
		.tag('curios:accessory')
		.rarity('epic');

	function createRing(name, gem, base, color, curiosCapability) {
		let id = `${base}_${gem.replace(':', '_')}_ring`;
		let rarity = {
			iron: 'uncommon',
			gold: 'rare',
			netherite: 'epic'
		};
		registry.create(id)
			.attachCuriosCapability(curiosCapability)
			.unstackable()
			.textureJson({
				'layer0': `kubejs:item/ring_base_${base}`,
				'layer1': 'kubejs:item/ring_base_gem'
			})
			.color(1, color)
			.displayName(name)
			.tag('curios:accessory')
			.rarity(rarity[base]);
	}

	function ringName(baseName, baseMaterial) {
		return `${Utils.toTitleCase(baseMaterial)} ${baseName}`;
	}

	for (let [material, entry] of Object.entries(global.rings)) {
		for (let [base, attributes] of Object.entries(entry.attributes)) {
			let capability = CuriosJSCapabilityBuilder.create();
			attributes.forEach(attrArray => {
				capability.addAttribute(
					attrArray[0],
					attrArray[1],
					attrArray[2],
					attrArray[3]
				)
			});
			createRing(
				ringName(entry.name, base),
				material,
				base,
				entry.color,
				capability
			);
		}
	}

	registry.create('kiketsu_card')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.displayName('Kiketsu Matriarch\'s Threat')
		.unstackable()
		.tooltip(Text.gray('Killed mobs sometimes drop some resources'))
		.tag('curios:accessory')
		.rarity('rare');

	registry.create('withering_necklace')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.displayName('Necklace of Withering Heights')
		.unstackable()
		.tooltip(Text.gray('Attacks inflict Wither'))
		.tooltip(Text.gray('Heal for a portion of dealt Wither damage'))
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('rose_ring')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.onEquip(((slotContext, oldStack, newStack) => global.itemEffects.roseRingOnEquip(slotContext, oldStack, newStack, false)))
		)
		.displayName('Ring of Roses')
		.unstackable()
		.tooltip(Text.gray('Reflects some damage back at the attackers'))
		.rarity('uncommon')
		.tag('curios:accessory');

	registry.create('wither_rose_ring')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.onEquip(((slotContext, oldStack, newStack) => global.itemEffects.roseRingOnEquip(slotContext, oldStack, newStack, true)))
		)
		.unstackable()
		.displayName('Dead Ring of Roses')
		.tooltip(Text.gray('Reflects more damage back at the attackers'))
		.tooltip(Text.gray('and has a chance to apply weak damage over time'))
		.tag('curios:accessory')
		.rarity('rare');

	registry.create('ring_of_fire')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tooltip(Text.gray('Deal 5 extra damage to mobs on fire'))
		.tag('curios:accessory')
		.rarity('epic');

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
					'generic.luck',
					'05c70914-fe84-420d-9a2e-dbefeb6dc4a4',
					1,
					'addition'
				)
				.addAttribute(
					'generic.luck',
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

	registry.create('angler_earring')
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

	registry.create('arcane_flower')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('band_of_starpower')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.max_mana',
					'19ddfd7a-2a97-48e4-9946-b458628d8a0f',
					20,
					'addition'
				)
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('bone_glove')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('celestial_emblem')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.spell_damage',
					'91d29ded-2581-47f1-ac3b-006f51809326',
					20,
					'addition'
				)
				.addAttribute(
					'adjcore:player.mana_cost_reduction',
					'91d29ded-2581-47f1-ac3b-006f51809326',
					0.15,
					'addition'
				)
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

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

	registry.create('magic_cuffs')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.max_mana',
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
					'ars_nouveau:ars_nouveau.perk.mana_regen',
					'aa2ccf9c-0527-473f-9dd2-74f64d9303b7',
					20,
					'addition'
				)
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('mana_flower')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('mana_cloak')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('magnet_flower')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('moon_charm')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.tooltip(Text.gray('Transforms the wearer into a werewolf during nighttime'))
		.rarity('uncommon');

	registry.create('moon_shell')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.tooltip(Text.gray('Transforms the wearer into a werewolf during nighttime'))
		.tooltip(Text.gray('Transforms the wearer into a melfork while in the water'))
		.rarity('uncommon');

	registry.create('neptunes_shell')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.tooltip(Text.gray('Transforms the wearer into a melfork while in the water'))
		.rarity('uncommon');

	registry.create('celestial_shell')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'generic.attack_speed',
					'a4faf07c-1712-478b-b3b1-3b8a1b14d7d7',
					0.1,
					"multiply_base"
				)
				.addAttribute(
					'generic.armor',
					'a4faf07c-1712-478b-b3b1-3b8a1b14d7d7',
					4,
					"addition"
				)
				.addAttribute(
					'attributeslib:crit_chance',
					'a4faf07c-1712-478b-b3b1-3b8a1b14d7d7',
					0.02,
					"addition"
				)
				.addAttribute(
					'kubejs:damage_dealt',
					'a4faf07c-1712-478b-b3b1-3b8a1b14d7d7',
					0.1,
					"multiply_base"
				)
		)
		.unstackable()
		.tag('curios:accessory')
		.tooltip(Text.gray('Transforms the wearer into a werewolf during nighttime'))
		.tooltip(Text.gray('Transforms the wearer into a melfork while in the water'))
		.rarity('uncommon');

	registry.create('natures_gift')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('ring_of_greed')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('shiny_stone')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('soaring_insignia')
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

	registry.create('obsidian_necklace')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('wooden_pendant')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('insulated_cuffs')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('warriors_trophy')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('raptor_claws')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'generic.attack_speed',
					'e3c1788b-65ae-4c3e-bacd-8e712f54740d',
					0.12,
					'multiply_base'
				)
				.addAttribute(
					'attributeslib:armor_pierce',
					'e3c1788b-65ae-4c3e-bacd-8e712f54740d',
					5,
					'addition'
				)
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('glacial_claws')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'generic.attack_speed',
					'001d818e-0b66-4a25-8cc5-f228a2255d5f',
					0.12,
					'multiply_base'
				)
				.addAttribute(
					'attributeslib:armor_pierce',
					'001d818e-0b66-4a25-8cc5-f228a2255d5f',
					5,
					'addition'
				)
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('starstruck_necklace')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('seed_of_hope')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('tide_stone')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.max_mana',
					'3937ad46-de21-4c4f-aa3c-42160a3775fd',
					20,
					'addition'
				)
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('mana_bubble')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.max_mana',
					'cb06b9ee-2d7f-4f42-84c9-79d9ffbb474a',
					10,
					'addition'
				)
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('ring_of_unity')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.curioTick((slotContext, stack) => global.itemEffects.ringOfUnity.tick(slotContext, stack))
				.modifyAttribute((ctx) => global.itemEffects.ringOfUnity.attributeTick(ctx))
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('leviathan_tooth_necklace')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'attributeslib:armor_pierce',
					'84e4af6d-272a-49ed-a72d-6d30de53efbc',
					12,
					'addition'
				)
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('crietz')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');

	registry.create('heart_of_stone')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.curioTick((slotContext, stack) => global.itemEffects.heartOfStone.tick(slotContext, stack))
				.modifyAttribute((ctx) => global.itemEffects.heartOfStone.attributeTick(ctx))
		)
		.unstackable()
		.tag('curios:accessory')
		.rarity('uncommon');
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
});
