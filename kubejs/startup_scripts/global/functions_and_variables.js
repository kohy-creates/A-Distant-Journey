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
 * 
 * @param {$MinecraftServer_} server 
 * @param {$ComponentKJS_} msg 
 */
global.broadcast = function (server, msg) {
	server.players.forEach(player => {
		player.tell(msg)
	})
}

/**
 * @type {Record<String, $Color_>}
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
 * @param {Color} color
 * @returns 
 */
global.announcementMsg = function (text, color, noItalic) {
	return (!noItalic) ? Text.of(text).color(color).italic() : Text.of(text).color(color);
}
