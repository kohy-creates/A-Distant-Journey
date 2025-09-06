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

global.quarkVerticalSlabs = [
	"quark:acacia_vertical_slab",
	"quark:ancient_planks_vertical_slab",
	"quark:andesite_bricks_vertical_slab",
	"quark:andesite_vertical_slab",
	"quark:azalea_planks_vertical_slab",
	"quark:bamboo_mosaic_vertical_slab",
	"quark:bamboo_vertical_slab",
	"quark:birch_vertical_slab",
	"quark:black_shingles_vertical_slab",
	"quark:blackstone_bricks_vertical_slab",
	"quark:blackstone_vertical_slab",
	"quark:blossom_planks_vertical_slab",
	"quark:blue_nether_bricks_vertical_slab",
	"quark:blue_shingles_vertical_slab",
	"quark:brick_vertical_slab",
	"quark:brown_shingles_vertical_slab",
	"quark:calcite_bricks_vertical_slab",
	"quark:calcite_vertical_slab",
	"quark:cherry_vertical_slab",
	"quark:cobbled_deepslate_vertical_slab",
	"quark:cobblestone_bricks_vertical_slab",
	"quark:cobblestone_vertical_slab",
	"quark:crimson_vertical_slab",
	"quark:cut_copper_vertical_slab",
	"quark:cut_red_sandstone_vertical_slab",
	"quark:cut_sandstone_vertical_slab",
	"quark:cut_soul_sandstone_vertical_slab",
	"quark:cyan_shingles_vertical_slab",
	"quark:dark_oak_vertical_slab",
	"quark:dark_prismarine_vertical_slab",
	"quark:deepslate_brick_vertical_slab",
	"quark:deepslate_tile_vertical_slab",
	"quark:diorite_bricks_vertical_slab",
	"quark:diorite_vertical_slab",
	"quark:dirt_bricks_vertical_slab",
	"quark:dripstone_block_vertical_slab",
	"quark:dripstone_bricks_vertical_slab",
	"quark:duskbound_block_vertical_slab",
	"quark:end_stone_brick_vertical_slab",
	"quark:exposed_cut_copper_vertical_slab",
	"quark:granite_bricks_vertical_slab",
	"quark:granite_vertical_slab",
	"quark:gray_shingles_vertical_slab",
	"quark:green_shingles_vertical_slab",
	"quark:iron_plate_vertical_slab",
	"quark:jasper_bricks_vertical_slab",
	"quark:jasper_vertical_slab",
	"quark:jungle_vertical_slab",
	"quark:light_blue_shingles_vertical_slab",
	"quark:light_gray_shingles_vertical_slab",
	"quark:lime_shingles_vertical_slab",
	"quark:limestone_bricks_vertical_slab",
	"quark:limestone_vertical_slab",
	"quark:magenta_shingles_vertical_slab",
	"quark:mangrove_vertical_slab",
	"quark:midori_block_vertical_slab",
	"quark:mossy_cobblestone_bricks_vertical_slab",
	"quark:mossy_cobblestone_vertical_slab",
	"quark:mossy_stone_brick_vertical_slab",
	"quark:mud_brick_vertical_slab",
	"quark:myalite_bricks_vertical_slab",
	"quark:myalite_vertical_slab",
	"quark:nether_brick_vertical_slab",
	"quark:netherrack_bricks_vertical_slab",
	"quark:oak_vertical_slab",
	"quark:orange_shingles_vertical_slab",
	"quark:oxidized_cut_copper_vertical_slab",
	"quark:permafrost_bricks_vertical_slab",
	"quark:permafrost_vertical_slab",
	"quark:pink_shingles_vertical_slab",
	"quark:polished_andesite_vertical_slab",
	"quark:polished_blackstone_brick_vertical_slab",
	"quark:polished_blackstone_vertical_slab",
	"quark:polished_calcite_vertical_slab",
	"quark:polished_deepslate_vertical_slab",
	"quark:polished_diorite_vertical_slab",
	"quark:polished_dripstone_vertical_slab",
	"quark:polished_granite_vertical_slab",
	"quark:polished_jasper_vertical_slab",
	"quark:polished_limestone_vertical_slab",
	"quark:polished_myalite_vertical_slab",
	"quark:polished_shale_vertical_slab",
	"quark:polished_tuff_vertical_slab",
	"quark:prismarine_brick_vertical_slab",
	"quark:prismarine_vertical_slab",
	"quark:purple_shingles_vertical_slab",
	"quark:purpur_vertical_slab",
	"quark:quartz_vertical_slab",
	"quark:raw_copper_bricks_vertical_slab",
	"quark:raw_gold_bricks_vertical_slab",
	"quark:raw_iron_bricks_vertical_slab",
	"quark:red_nether_brick_vertical_slab",
	"quark:red_sandstone_bricks_vertical_slab",
	"quark:red_sandstone_vertical_slab",
	"quark:red_shingles_vertical_slab",
	"quark:rusty_iron_plate_vertical_slab",
	"quark:sandstone_bricks_vertical_slab",
	"quark:sandstone_vertical_slab",
	"quark:shale_bricks_vertical_slab",
	"quark:shale_vertical_slab",
	"quark:shingles_vertical_slab",
	"quark:smooth_quartz_vertical_slab",
	"quark:smooth_red_sandstone_vertical_slab",
	"quark:smooth_sandstone_vertical_slab",
	"quark:smooth_soul_sandstone_vertical_slab",
	"quark:smooth_stone_vertical_slab",
	"quark:soul_sandstone_bricks_vertical_slab",
	"quark:soul_sandstone_vertical_slab",
	"quark:spruce_vertical_slab",
	"quark:stone_brick_vertical_slab",
	"quark:stone_vertical_slab",
	"quark:thatch_vertical_slab",
	"quark:tuff_bricks_vertical_slab",
	"quark:tuff_vertical_slab",
	"quark:warped_vertical_slab",
	"quark:waxed_cut_copper_vertical_slab",
	"quark:waxed_exposed_cut_copper_vertical_slab",
	"quark:waxed_oxidized_cut_copper_vertical_slab",
	"quark:waxed_weathered_cut_copper_vertical_slab",
	"quark:weathered_cut_copper_vertical_slab",
	"quark:white_shingles_vertical_slab",
	"quark:yellow_shingles_vertical_slab",
]

global.quarkVerticalSlabs.forEach(slab => {
	const path = `kubejs/assets/quark/models/item/${slab.replace('quark:', '')}.json`
	if (!JsonIO.read(path)) {
		let slabID = slab.replace('_vertical', '');
		if (!Item.exists(slabID)) slabID = `minecraft:${slab.split(':')[1].replace('vertical_', '')}`
		slabID = slabID.split(':')
		JsonIO.write(path, {
			parent: `${slabID[0]}:block/${slabID[1]}`
		})
	}
})

global.armorSuffixes = {
	head: ['_helmet', '_helm', '_hood', '_skull'],
	chest: ['_chestplate', '_tunic', '_robes'],
	legs: ['_leggings', '_pants'],
	feet: ['_boots']
};
