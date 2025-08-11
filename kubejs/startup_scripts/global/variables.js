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

global.developerMode = true;
