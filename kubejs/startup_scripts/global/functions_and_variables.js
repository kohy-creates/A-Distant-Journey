global.rediscoveredFurniture = () => {
	const furnitureTypes = [
		'chair',
		'table'
	]
	const furnitureVariants = [
		'oak',
		'cherry',
		'birch',
		'acacia',
		'spruce',
		'dark_oak',
		'jungle',
		'mangrove',
		'warped',
		'crimson',
		'bamboo'
	]

	let furniture = [];

	furnitureVariants.forEach(variant => {
		furnitureTypes.forEach(type => {
			furniture.push('rediscovered:' + variant + '_' + type)
		})
	})

	return furniture;
};

global.armorSuffixes = {
	head: ['_helmet', '_helm', '_hood', '_skull'],
	chest: ['_chestplate', '_tunic', '_robes'],
	legs: ['_leggings', '_pants'],
	feet: ['_boots']
};

/**
 * Returns the ID of the biome an entity is standing in
 * @param {$Entity_} entity 
 * @returns {String}
 */
global.getBiome = function (entity) {
	return entity.level.getBiome(entity.block.pos).unwrapKey().get().location().toString();
}

global.toTitleCase = function (str) {
	return str.replace(
		/\w\S*/g,
		function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	);
}

/**
 * @type {void}
 * @param {$MinecraftServer_} server 
 * @param {$ComponentKJS_} msg 
 */
global.broadcast = function (server, msg) {
	server.players.forEach(player => {
		player.tell(msg)
	})
}

/**
 * @type {Record<String, Internal.Color>}
 */
global.messageColors = {
	newOre: '#32FF82',
	newDimension: '#FFD700',
	difficultyIncrease: '#c50909',
	bossSpawned: '#af4bff',
	bossDefeated: '#ce93ff'
}

/**
 * Returns an announcement style message (italic and with a specific color) 
 * Look into global.messageColors for a list of default colors)
 * @param {String} text 
 * @param {Internal.Color} color
 * @param {boolean} noItalic
 * @returns {Internal.TextWrapper}
 */
global.announcementMsg = function (text, color, noItalic) {
	return (!noItalic) ? Text.of(text).color(color).italic() : Text.of(text).color(color);
}

global.baseCritChance = 0.04;

/**
 * Returns a list of all entities in a given radius around coordinates
 * @param {Internal.Level} world
 * @param {double} x 
 * @param {double} y 
 * @param {double} z 
 * @param {double} radius 
 * @returns {Internal.Entity[]}
 */
global.getEntitiesInRadius = function (world, x, y, z, radius) {
	let entities = [];
	world.getEntitiesWithin(AABB.of(
		x - radius, y - radius, z - radius,
		x + radius, y + radius, z + radius
	)).forEach((entity) => {
		if (entity.distanceToSqr(new Vec3d(x, y, z) <= radius)) {
			entities.push(entity)
		}
	})
	return entities;
}

const $ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey")
const DAMAGE_TYPE = $ResourceKey.createRegistryKey("damage_type")
const $DamageSource = Java.loadClass('net.minecraft.world.damagesource.DamageSource')
global.getDamageSource = function (/** @type {Internal.Level}*/ level, /** @type {Internal.DamageType_}*/ damageType, projectile, thrower) {
	const resourceKey = $ResourceKey.create(DAMAGE_TYPE, Utils.id(damageType))
	const holder = level.registryAccess().registryOrThrow(DAMAGE_TYPE).getHolderOrThrow(resourceKey)
	return new $DamageSource(holder, projectile, thrower)
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
global.getRandomNumber = function (min, max) {
	return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
global.getRandomInt = function (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
]
