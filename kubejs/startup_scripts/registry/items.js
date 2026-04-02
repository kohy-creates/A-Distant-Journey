/**
 * 
 * @param {Internal.ProjectileHitBlockEventJS} event 
 */
global.elsaCrossbowBlockHit = function (event) {
	const arrow = event.getArrow();
	arrow.level.spawnParticles('minecraft:smoke', true, arrow.x, arrow.y - 0.1, arrow.z, 0.15, 0.15, 0.15, 10, 0.01);
	arrow.level.spawnParticles('cataclysm:spark', true, arrow.x, arrow.y - 0.1, arrow.z, 0, 0, 0, 4, 0.08);
	arrow.kill();
};

/**
 * 
 * @param {Internal.CrossbowUseContext} event 
 */
global.elsaCrossbowShoot = function (event) {
	const player = event.getPlayer();
	if (player) {
		player.level.playSound(null, playet.x, player.y + player.getEyeHeight(), player.z, 'minecraft:block.anvil.place', 'players', 1, Math.random() * .25 + 0.95)
		player.getPersistentData().elsa_crossbow_tickdown = 1;
	}
};

/** 
 * @param {Internal.SlotContext} slotContext 
 * @param {Internal.ItemStack} stack 
 */
global.chaliceOfBloodTick = function (slotContext, stack) {
	if (!stack.hasNBT()) {
		stack.nbt = {};
	}
	stack.nbt.t = !(stack.nbt.getBoolean('t') || false);
};
/**
 * @param {Internal.CapabilityCurios$AttributeModificationContext_} ctx 
 */
global.chaliceOfBloodAttributeTick = function (ctx) {

}

/**
 * @param {Internal.SlotContext} slotContext 
 * @param {Internal.ItemStack} stack 
 */
global.theCommunityTick = function (slotContext, stack) {
	if (!stack.hasNBT()) {
		stack.nbt = {};
	}
	stack.nbt.t = !(stack.nbt.getBoolean('t') || false);
};
/**
 * @param {Internal.CapabilityCurios$AttributeModificationContext_} ctx 
 */
global.theCommunityAttributeTick = function (ctx) {

}

/**
 * @param {Internal.SlotContext} slotContext 
 * @param {Internal.ItemStack} oldStack 
 * @param {Internal.ItemStack} newStack 
 */
global.roseRingOnEquip = function (slotContext, oldStack, newStack) {
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
		.maxDamage(100);

	registry.create('gravisand_paper', 'create:sandpaper')
		.displayName('Gravisand Paper')
		.unstackable()
		.maxDamage(300);

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
					.fullChargeTick(9999, 0)
				)
				.onArrowHit(arrow => {
					arrow.hitBlock(event => global.elsaCrossbowBlockHit(event))
				})
				.onUse(event => {
					event.shoot(event => global.elsaCrossbowShoot(event))
				});
		})
		.unstackable()
		.maxDamage(3000)
		.displayName('Monster-Piercing Elephant Crossbow');

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
		.tag('curios:accessory');

	registry.create('chalice_of_blood')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.modifyAttribute(ctx => global.chaliceOfBloodAttributeTick(ctx))
				.curioTick((slotContext, stack) => global.chaliceOfBloodTick(slotContext, stack))
				.canEquipFromUse((slotContext, stack) => false)
		)
		.unstackable()
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
		.tag('curios:accessory');

	registry.create('ring/test_ring')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.textureJson({
			'layer0': 'kubejs:item/ring_base_iron',
			'layer1': 'kubejs:item/ring_base_gem'
		})
		.color(1, 0xAA00EE)
		.tag('curios:accessory');

	registry.create('kiketsu_card')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.displayName('Kiketsu Matriarch\'s Threat')
		.unstackable()
		.tag('curios:accessory')

	registry.create('rose_ring')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.onEquip(((slotContext, oldStack, newStack) => global.roseRingOnEquip(slotContext, oldStack, newStack)))
		)
		.displayName('Ring of Roses')
		.unstackable()
		.tag('curios:accessory');

	registry.create('wither_rose_ring')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.onEquip(((slotContext, oldStack, newStack) => global.roseRingOnEquip(slotContext, oldStack, newStack)))
		)
		.unstackable()
		.displayName('Dead Ring of Roses')
		.tag('curios:accessory');

	registry.create('ring_of_fire')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory');

	registry.create('pocketful_of_sunshine')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory');

	registry.create('decayed_clover')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
		)
		.unstackable()
		.tag('curios:accessory');

	registry.create('slider_pickaxe', 'pickaxe')
		.maxDamage(2500)
		.tier('slider_pickaxe');

	registry.create('the_community')
		.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.modifyAttribute(ctx => global.theCommunityAttributeTick(ctx))
				.curioTick((slotContext, stack) => global.theCommunityTick(slotContext, stack))
		)
		.unstackable()
		.tag('curios:accessory');
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
		tier.repairIngredient = '#forge:ingots/iron'
	});
});

