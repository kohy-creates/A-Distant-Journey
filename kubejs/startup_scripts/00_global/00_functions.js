//priority: 1000

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
 * @param {Internal.Entity_} entity 
 * @returns {String}
 */
global.getBiome = function (entity) {
	return entity.level.getBiome(entity.block.pos).unwrapKey().get().location().toString();
}

global.baseCritChance = 0.04;

/**
 * Returns a list of all entities in a given radius around coordinates
 * @param {Internal.Level} world
 * @param {double} x 
 * @param {double} y 
 * @param {double} z 
 * @param {double} radius 
 * @returns {Internal.Entity_[]}
 */
global.getEntitiesInRadius = function (world, x, y, z, radius) {
	let entities = [];
	world.getEntitiesWithin(AABB.of(
		x - radius, y - radius, z - radius,
		x + radius, y + radius, z + radius
	)).forEach((entity) => {
		if (entity.distanceToSqr(new Vec3d(x, y, z) <= radius)) {
			entities.push(entity);
		}
	});
	return entities;
};

const $ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey");
const DAMAGE_TYPE = $ResourceKey.createRegistryKey("damage_type");
const $DamageSource = Java.loadClass('net.minecraft.world.damagesource.DamageSource');
/**
 * Returns a damage type instance by its ResourceLocation.
 * @param {Internal.Level_} level 
 * @param {Internal.DamageType_} damageType 
 * @param {Internal.Entity_|null} projectile 
 * @param {Internal.Entity_|null} thrower 
 * @returns 
 */
global.getDamageSource = function (level, damageType, projectile, thrower) {
	const resourceKey = $ResourceKey.create(DAMAGE_TYPE, Utils.id(damageType));
	const holder = level.registryAccess().registryOrThrow(DAMAGE_TYPE).getHolderOrThrow(resourceKey);
	return new $DamageSource(holder, projectile, thrower);
};

/**
 * Returns a random number between min (inclusive) and max (inclusive)
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
global.getRandomNumber = function (min, max) {
	return Math.random() * (max - min + 1) + min;
};

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * @param {integer} min 
 * @param {integer} max 
 * @returns {number}
 */
global.getRandomInt = function (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Returns a true at a specified chance.
 * Chance is a number from 0 to 100.
 * @param {number} chance 
 * @returns {boolean}
 */
global.ifRandomChance = function (chance) {
	return (Math.random() <= chance / 100);
};

/**
 * Transforms uncapitalized strings To Title Case.
 * @param {string} str 
 * @returns {string}
 */
global.toTitleCase = function (str) {
	return str.replace(
		/\w\S*/g,
		text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
	);
};

/**
 * Replaces all occurences of a string with whatever you want to.
 * Because for some reason JS' 'replaceAll' and 'replace' were a bit wonky.
 * @param {string} str 
 * @param {string} find 
 * @param {string} replace 
 * @returns {string}
 * @example
 * const text = 'Cherry Cherry Banana Cherry';
 * const afterReplace = global.textReplaceAll(text, 'Cherry', 'Apple');
 * // returns 'Apple Apple Banana Apple'
 */
global.textReplaceAll = function (str, find, replace) {
	return str.replace(new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
};

/**
 * Returns a randomly picked object from a weigted list.
 * @param {Record<object, number>} weightMap 
 * @returns {object}
 * @example
 * entity.setItemSlot('mainhand', global.weightedRandom({
 * 		'mcdw:bow_bonebow': 10,
 *		'mcwd:bow_twisting_vine_bow': 4,
 *		'mcwd:bow_twisting_weeping_bow': 4,
 *	}));
 */
global.weightedRandom = function (weightMap) {
	let entries = Object.keys(weightMap);
	let totalWeight = 0;
	for (let i = 0; i < entries.length; i++) {
		totalWeight += weightMap[entries[i]];
	}
	let random = Math.random() * totalWeight;
	for (let j = 0; j < entries.length; j++) {
		let key = entries[j];
		let weight = weightMap[key];
		if (random < weight) return key;
		random -= weight;
	}
};

/**
 * Returns the current chapter the player/server is on.
 * Since it requires a server argument, it is server-side only.
 * @param {Internal.MinecraftServer_} server
 * @returns {integer}
 */
global.getCurrentChapter = function (server) {
	let chapters = server.persistentData.chapters || {};
	let currentStage = parseInt((chapters.current_stage || "chapter_0").replace("chapter_", ""));
	return currentStage;
};

global.roundToNearest = function (value, step) {
	return Math.round(value / step) * step;
};

/**
 * Makes a hex color either lighter or darker based on the second argument.
 * Percent can be either on a [0, 1) scale or [1, 100]. It can also be negative.
 * Taken somewhere from StackOverflow
 * @param {*} color 
 * @param {number} percent 
 * @param {boolean} noHash 
 * @returns {string} 
 */
global.amplifyHexColor = function shadeColor(color, percent, noHash) {

	if (percent < 1 && percent > -1) percent *= 100;
	if (!color.startsWith('#')) color = '#' + color;

	let R = parseInt(color.substring(1, 3), 16);
	let G = parseInt(color.substring(3, 5), 16);
	let B = parseInt(color.substring(5, 7), 16);

	R = parseInt(R * (100 + percent) / 100);
	G = parseInt(G * (100 + percent) / 100);
	B = parseInt(B * (100 + percent) / 100);

	R = (R < 255) ? R : 255;
	G = (G < 255) ? G : 255;
	B = (B < 255) ? B : 255;

	R = Math.round(R)
	G = Math.round(G)
	B = Math.round(B)

	let RR = ((R.toString(16).length == 1) ? '0' + R.toString(16) : R.toString(16));
	let GG = ((G.toString(16).length == 1) ? '0' + G.toString(16) : G.toString(16));
	let BB = ((B.toString(16).length == 1) ? '0' + B.toString(16) : B.toString(16));

	return ((noHash) ? '' : '#') + RR + GG + BB;
};

/**
 * 
 * @param {string} string 
 * Duration as a timestamp, e.g. `0:30`for 30 seconds 
 * @param {number} mul
 * Additional multiplier, e.g. if timestamp is `0:30` and multiplier is 2, the total duration will be 60 seconds
 * @returns {number}
 * Specified duration in ticks
 */
global.duration = function (string, mul) {
	let timeTotal, times = string.split(':');
	if (times.length === 3) {
		timeTotal =
			(parseInt(times[0]) * 60 * 60 * 20) + // hours
			(parseInt(times[1]) * 60 * 20) + // minutes
			(parseInt(times[2]) * 20); // seconds
	} else if (times.length === 2) {
		timeTotal =
			(parseInt(times[0]) * 60 * 20) + // minutes
			(parseInt(times[1]) * 20); // seconds
	}
	if (mul) timeTotal *= mul;
	return timeTotal;
};

const $MobEffectInstance = Java.loadClass(`net.minecraft.world.effect.MobEffectInstance`);
/**
 * 
 * @param {Internal.Effect_} effect 
 * @param {string} duration 
 * @param {num} level 
 * @param {boolean} isAmbient 
 * @param {boolean} hideParticles 
 * @param {boolean} showIcon 
 * @returns {Internal.MobEffectInstance_}
 */
global.newMobEffectInstance = function (effect, duration, level, isAmbient, hideParticles, showIcon) {
	let ambient = isAmbient ? isAmbient : false;
	let hide = hideParticles ? hideParticles : false;
	let icon = showIcon ? showIcon : true;
	let amplifier = (level) ? level - 1 : 0;
	return new $MobEffectInstance(effect, global.duration(duration), amplifier, ambient, hide, icon);
};

/**
 * Returns either the first or second argument if first is null.
 * Because Rhino wouldn't always work well with '||'.
 * @param {object} value
 * @param {object} ifNull
 * @returns {object} 
 */
global.getOrDefault = function (value, ifNull) {
	return (value) ? value : ifNull;
};

/**
 * Writes to a JSON file only if it isn't already present.
 * @param {string} path 
 * @param {object} json 
 */
global.writeJsonIfAbsent = function (path, json, logAfter) {
	let p = path;
	if (!p.endsWith('.json')) p = p + '.json';
	if (!JsonIO.read(p)) {
		JsonIO.write(p, json);
		if (logAfter) console.log(logAfter);
	}
};

/**
 * Calculates the amount of damage dealt by a magic weapon.
 * @param {Internal.Player_} player 
 * @param {number} baseAmount 
 * @returns {number} - total amount of damage
 */
global.calculateSpellDamage = function (player, baseAmount, randomize) {
	let spellPower = player.getAttribute('ars_nouveau:ars_nouveau.perk.spell_damage').getValue();
	let mul = 1 + spellPower / 100;
	let mul2 = (randomize) ? 1 + Math.random() * 0.3 - 0.15 : 1;
	return baseAmount * mul * mul2;
};

global.menuHighlightColor = '#77FFFFFF';
