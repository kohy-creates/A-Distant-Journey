//priority: 750
/**
 * What mobs drop what eyes 
 * @type {Record<Internal.EntityType_, string>} 
 */
global.eyeDrops = {
	'minecraft:wither': 'cinders',
	'lost_aether_content:aerwhale_king': 'angels',
	'rediscovered:red_dragon': 'dreams',
	'cataclysm:ender_guardian': 'desolation'
};

global.replaceItemsMap = {
	'farmersdelight:wheat_dough': 'create:dough',
	'rediscovered:quiver': 'supplementaries:quiver',
	'create:copper_nugget': 'mythicmetals:copper_nugget',
	'minecraft:chest': 'quark:oak_chest',

	'minecraft:stone_sword': 'mythicmetals:copper_sword',
	'minecraft:stone_shovel': 'mythicmetals:copper_shovel',
	'minecraft:stone_axe': 'mythicmetals:copper_axe',
	'minecraft:stone_hoe': 'mythicmetals:copper_hoe',
	'minecraft:stone_pickaxe': 'mythicmetals:copper_pickaxe',

	"minecraft:totem_of_undying": "twilightforest:charm_of_life_1",

	'create:crushed_raw_iron': 'raw_iron',
	'create:crushed_raw_gold': 'raw_gold',
	'create:crushed_raw_copper': 'raw_copper',
	'create:crushed_raw_zinc': 'create:raw_zinc',
	'create:experience_nugget': 'ars_nouveau:experience_gem',

	'minecraft:diamond_helmet': 'additionaladditions:rose_gold_helmet',
	'minecraft:diamond_chestplate': 'additionaladditions:rose_gold_chestplate',
	'minecraft:diamond_leggings': 'additionaladditions:rose_gold_leggings',
	'minecraft:diamond_boots': 'additionaladditions:rose_gold_boots',
	'minecraft:diamond_sword': 'additionaladditions:rose_gold_sword',
	'minecraft:diamond_shovel': 'additionaladditions:rose_gold_shovel',
	'minecraft:diamond_axe': 'additionaladditions:rose_gold_axe',
	'minecraft:diamond_hoe': 'additionaladditions:rose_gold_hoe',
	'minecraft:diamond_pickaxe': 'additionaladditions:rose_gold_pickaxe',

	'minecraft:iron_helmet': 'rediscovered:plate_helmet',
	'minecraft:iron_chestplate': 'rediscovered:plate_chestplate',
	'minecraft:iron_leggings': 'rediscovered:plate_leggings',
	'minecraft:iron_boots': 'rediscovered:plate_boots',

	'create:brass_ingot': 'mythicmetals:tin_ingot',
	'create:brass_nugget': 'mythicmetals:tin_nugget',
	'create:brass_block': 'mythicmetals:tin_block',

	'ars_nouveau:wilden_wing': 'miners_delight:bat_wing',

	'minecraft:enchanted_golden_apple': 'quark:ancient_fruit',
	'twilightforest:transformation_powder': 'botania:mana_powder',

	'quark:rope': 'supplementaries:rope',
	'farmersdelight:rope': 'supplementaries:rope',

	'twilightforest:charm_of_keeping_1': 'twilightforest:charm_of_life_1',
	'alexscaves:banana': 'neapolitan:banana',
	'create:bar_of_chocolate': 'neapolitan:chocolate_bar',
	'upgrade_aquatic:thrasher_tooth': 'alexsmobs:shark_tooth',
	'hybrid_aquatic:shark_tooth': 'alexsmobs:shark_tooth',

	'rubinated_nether:ruby': 'rediscovered:ruby',
	'rubinated_nether:ruby_block': 'rediscovered:ruby_block',

	'minecraft:shield': 'shieldexp:iron_shield',
	'twilightforest:raw_venison': 'naturalist:venison',
	'twilightforest:cooked_venison': 'naturalist:cooked_venison',
	'farmersdelight:canvas': 'xercapaint:item_canvas',

	'aether:skyroot_stick': 'stick',

	'brass_geodes:ruby': 'rediscovered:ruby',
	'majruszsdifficulty:bandage': 'kubejs:bandage',
	'majruszsdifficulty:golden_bandage': 'kubejs:golden_bandage',
	'alexsmobs:maggot': 'born_in_chaos_v1:corpse_maggot',
};


/**
 * List of swords that make up the Zenith.
 * If an entry has 'ingredient: true', then it will be a part of the crafting recipe.
 */
global.zenithSwords = [
	{ item: "minecraft:wooden_sword", ingredient: true, color: 0x956445, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "botania:terra_sword", ingredient: true, color: 0x69E561, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "mythicmetals:palladium_sword", color: 0xFC8F08, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "botania:elementium_sword", color: 0xDD82A3, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "mythicmetals:stormyx_sword", color: 0xAE347D, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "mcdw:sword_sinister", color: 0x800012, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "mythicmetals:star_platinum_sword", color: 0xEEBE6C, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "mythicmetals:orichalcum_sword", color: 0x77D96F, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "ancient_aether:valkyrum_sword", color: 0xF1EAD9, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "unusualend:pearlescent_sword", color: 0xDD6DCF, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "mythicmetals:metallurgium_sword", ingredient: true, color: 0xFCDE49, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "majruszsdifficulty:enderium_sword", color: 0x7E5885, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "minecraft:netherite_sword", color: 0x8F7F82, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "additionaladditions:rose_gold_sword", color: 0xFCCDC2, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "minecraft:iron_sword", color: 0xC6C4BA, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "create:cardboard_sword", ingredient: true, color: 0xECC599, rotation_center_height: 0.125, rotation: 0.785, scale: 2.75, trail_width: 3 },
	{ item: "lost_aether_content:phoenix_sword", ingredient: true, color: 0xFCBB42, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "twilightforest:ice_sword", ingredient: true, color: 0x7D9CB9, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "twilightforest:knightmetal_sword", ingredient: true, color: 0xC2D3AC, rotation_center_height: 0.125, rotation: 0.785, scale: 4.5, trail_width: 3 },
	{ item: "zenith:zenith", color: 0xb2ffb4, rotation_center_height: 0.125, rotation: 0.785, scale: 7.5, trail_width: 5 }
];

/**
 * Broadcasts a message to every player on the server.
 * @type {void}
 * @param {Internal.MinecraftServer_} server 
 * @param {Internal.ComponentKJS_} msg 
 */
global.broadcast = function (server, msg) {
	server.players.forEach(player => {
		player.tell(msg);
	});
};

/**
 * @type {Record<String, Internal.Color>}
 */
global.messageColors = {
	newOre: '#32FF82',
	newDimension: '#FFD700',
	difficultyIncrease: '#c50909',
	bossSpawned: '#af4bff',
	bossDefeated: '#ce93ff',
	twilightForestProgress: '#86fbff'
};

/**
 * Returns an announcement style message (italic and with a specific color) 
 * Look into global.messageColors for a list of default colors)
 * @param {String} text 
 * @param {Internal.Color} color
 * @param {boolean} noItalic
 * @returns {Internal.TextWrapper}
 */
global.announcementMsg = function (text, color, noItalic) {
	return (noItalic) ? Text.of(text).color(color) : Text.of(text).color(color).italic();
};

/**
 * Grants the specified advancement to the specified player
 * @param {Internal.MinecraftServer_} server 
 * @param {Internal.Player_} player 
 * @param {Internal.ResourceLocation_} advancement 
 */
global.grantAdvancement = function (server, player, advancement) {
	server.runCommandSilent(
		`/advancement grant ${player.getUsername()} only ${advancement}`
	);
};
