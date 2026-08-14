//priority: 1000

/**
 * @returns {string[]} All rediscovered table and chair IDs. 
 */
global.rediscoveredFurniture = () => {
	const furnitureTypes = ['chair', 'table'];
	const furnitureVariants = ['oak', 'cherry', 'birch', 'acacia', 'spruce', 'dark_oak', 'jungle', 'mangrove', 'warped', 'crimson', 'bamboo'];
	let furniture = [];
	furnitureVariants.forEach(variant => {
		furnitureTypes.forEach(type => {
			furniture.push('rediscovered:' + variant + '_' + type);
		});
	});
	return furniture;
};

/**
 * Utility object for possible armor suffixes.
 * All code that references this literally just mixes and matches
 * the suffix to base ID in hopes that it works.
 */
global.armorSuffixes = {
	head: ['_helmet', '_helm', '_hood', '_skull'],
	chest: ['_chestplate', '_tunic', '_robes'],
	legs: ['_leggings', '_pants'],
	feet: ['_boots']
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
 * Returns 'true' if the given value is a string, 'false' otherwise.
 * @param {any} value 
 * @returns {boolean}
 */
global.isString = function (value) {
	return (typeof value === 'string' || value instanceof String);
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
		if (entity.distanceToSqr(new Vec3d(x, y, z)) <= radius) {
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
 * Returns a random element from a given list.
 * @param {*} list 
 */
global.getRandomElement = function (list) {
	return list[Math.floor(Math.random() * list.length)];
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
 * Rounds a given number to the nearest step.
 * @param {number} value 
 * @param {number} step 
 * @returns {number}
 * @example
 * global.roundToNearest(10.12, 0.05);
 * // returns 10.1
 */
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

/**
 * Creates and returns a new MobEffectInstance
 * @param {Internal.Effect_} effect 
 * @param {string} duration 
 * @param {num} level 
 * @param {boolean} isAmbient 
 * @param {boolean} hideParticles 
 * @param {boolean} showIcon 
 * @returns {Internal.MobEffectInstance_}
 */
global.newMobEffectInstance = function (effect, duration, amplifier, isAmbient, hideParticles, showIcon) {
	let ambient = global.getOrDefault(isAmbient, false);
	let hide = global.getOrDefault(hideParticles, false);
	let icon = global.getOrDefault(showIcon, true);
	let amplifier = global.getOrDefault(amplifier, 0);
	return new $MobEffectInstance(
		effect,
		global.isString(duration) ? global.duration(duration) : duration,
		amplifier,
		ambient, hide, icon
	);
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
	let mul2 = (randomize) ? 1 + global.getRandomNumber(-0.15, 0.15) : 1;
	return baseAmount * mul * mul2;
};

/**
 * Highlight for the player menu, currently unused.
 */
// global.menuHighlightColor = '#77FFFFFF';

/** @type {Record<string, string>} */
global.lang = {};
/**
 * Adds a translated key to the bootleg lang datagen.
 * @param {string} key 
 * @param {string} value 
 */
global.addTranslation = function (key, value) {
	global.lang[key] = value;
};

/**
 * Returns a new ResourceLocation.
 * Ngl seeing `new ResourceLocation` without getting a deprecation warning is kinda weird.
 * @param {string} namespace
 * @param {string} path
 * @returns {Internal.ResourceLocation_}
 */
global.resourceLocation = function (namespace, path) {
	return new $ResourceLocation(namespace, path);
};

/**
 * Returns the health percentage of an entity as a number between 0 and 100.
 * @param {Internal.LivingEntity_} entity 
 * @returns {number}
 */
global.getHealthPercent = function (entity) {
	return entity.getHealth() / entity.getMaxHealth() * 100;
};

/**
 * Default function to updates the curio state every tick.
 * @param {Internal.ItemStack_} stack 
 */
global.updateCurioEveryTick = function (stack) {
	if (!stack.hasNBT()) {
		stack.nbt = {};
	}
	stack.nbt.t = !(global.getOrDefault(stack.nbt.t, false));
};

/**
 * Returns a list of all bosses that have been killed on the server.
 * Only usable on the server side, but present here due to it being used in some curio functions.
 * @param {Internal.MinecraftServer_} server 
 * @param {boolean} returnAmount 
 * Whether to return the amount of killed bosses (true) or the list of killed bosses (false, default).
 * @returns {string[]|number}
 */
global.getKilledBosses = function (server, returnAmount) {
	let pData = server.persistentData;
	if (!pData.killedBosses) {
		pData.killedBosses = {};
	}
	let list = Object.keys(pData.killedBosses);
	return (returnAmount) ? list.length : list;
};
