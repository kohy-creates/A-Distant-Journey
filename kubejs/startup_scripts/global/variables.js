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

function rediscoveredFurniture() {
	let furniture = [];

	furnitureVariants.forEach(variant => {
		furnitureTypes.forEach(type => {
			furniture.push('rediscovered:' + variant + '_' + type)
		})
	})

	return furniture;
}

global.rediscoveredFurniture = rediscoveredFurniture();

global.developerMode = false;

global.armorSuffixes = {
	head: ['_helmet', '_helm', '_hood', '_skull'],
	chest: ['_chestplate', '_tunic', '_robes'],
	legs: ['_leggings', '_pants'],
	feet: ['_boots']
};

global.getBiome = function(entity) {
	return entity.level.getBiome(entity.block.pos).unwrapKey().get().location().toString();
}
