const CustomBlockRegistry = {
	Model: {
		simple: function (texture) {
			return {
				parent: "minecraft:block/cube_all",
				textures: {
					all: texture
				}
			}
		},
		cube: function (down, east, north, west, south, up, particle) {
			return {
				parent: "minecraft:block/cube",
				textures: {
					down: down,
					east: east,
					north: north,
					particle: particle ? particle : north,
					south: south,
					up: up,
					west: west
				}
			}
		}
	}
};
/// ----------------------------------------------------------- ///

const $CraftingTableBlock = Java.loadClass('net.minecraft.world.level.block.CraftingTableBlock');
const $GrassBlock = Java.loadClass('net.minecraft.world.level.block.GrassBlock');
const $FurnaceBlock = Java.loadClass('net.minecraft.world.level.block.FurnaceBlock');
const $LeavesBlock = Java.loadClass('net.minecraft.world.level.block.LeavesBlock');
const $SaplingBlock = Java.loadClass('net.minecraft.world.level.block.SaplingBlock');
const $PoweredBlock = Java.loadClass('net.minecraft.world.level.block.PoweredBlock');

/// ----------------------------------------------------------- ///

let legacyCraftingTable, legacyGrassBlock, legacyFurnace,
	legacyOakLeaves, legacyBirchLeaves, legacySpruceLeaves, legacyJungleLeaves,
	legacyRedstoneBlock;

/// ----------------------------------------------------------- ///

StartupEvents.registry('block', registry => {

	/**
	 * 
	 * @param {any} blockRegistry 
	 * @param {string} id 
	 * @param {Block|Internal.Supplier<Block>} block 
	 * @param {object} model 
	 * @param {Internal.BlockBehaviour$Properties_} properties 
	 */
	function registerCustomBlock(id, block, model, properties) {
		JsonIO.write(`kubejs/assets/kubejs/models/block/${id}.json`, model);
		global.writeJsonIfAbsent(`kubejs/assets/kubejs/blockstates/${id}.json`, {
			variants: {
				'': {
					model: `kubejs:block/${id}`
				}
			}
		}, `Created missing blockstate definition for block '${id}'`);
		global.writeJsonIfAbsent(`kubejs/data/kubejs/loot_tables/blocks/${id}.json`, {}, `Created missing loot table for block '${id}'`);
		return registry.createCustom(id, (properties) ? () => new block(properties) : block);
	};

	legacyCraftingTable = registerCustomBlock(
		'legacy/crafting_table',
		$CraftingTableBlock,
		CustomBlockRegistry.Model.cube(
			'kubejs:block/legacy/oak_planks',
			'kubejs:block/legacy/crafting_table_side',
			'kubejs:block/legacy/crafting_table_front',
			'kubejs:block/legacy/crafting_table_front',
			'kubejs:block/legacy/crafting_table_side',
			'kubejs:block/legacy/crafting_table_top',
			'kubejs:block/legacy/crafting_table_front',
		),
		$BlockProperties.copy(Blocks.CRAFTING_TABLE)
	);

	legacyGrassBlock = registerCustomBlock(
		'legacy/grass_block',
		$GrassBlock,
		{
			parent: "block/cube_bottom_top",
			textures: {
				particle: "kubejs:block/legacy/dirt",
				bottom: "kubejs:block/legacy/dirt",
				top: "kubejs:block/legacy/legacy_grass_block_top",
				side: "kubejs:block/legacy/legacy_grass_block",
			}
		},
		$BlockProperties.copy(Blocks.GRASS_BLOCK).sound(SoundType.GRASS)
	);

	legacyFurnace = registerCustomBlock(
		'legacy/furnace',
		$FurnaceBlock,
		{
			parent: "minecraft:block/orientable",
			textures: {
				front: "kubejs:block/legacy/furnace_front_off",
				side: "kubejs:block/legacy/furnace_side",
				top: "kubejs:block/legacy/furnace_top"
			}
		},
		$BlockProperties.copy(Blocks.FURNACE).sound(SoundType.STONE)
	);

	legacyRedstoneBlock = registerCustomBlock(
		'legacy/redstone_block',
		$PoweredBlock,
		CustomBlockRegistry.Model.simple('kubejs:block/legacy/redstone_block'),
		$BlockProperties.copy(Blocks.OAK_LEAVES).sound(SoundType.METAL).lightLevel((state) => { return 15; })
	);

	legacyOakLeaves = registerCustomBlock(
		'legacy/oak_leaves',
		$LeavesBlock,
		CustomBlockRegistry.Model.simple('kubejs:block/legacy/oak_leaves'),
		$BlockProperties.copy(Blocks.OAK_LEAVES).sound(SoundType.GRASS)
	);

	legacyBirchLeaves = registerCustomBlock(
		'legacy/birch_leaves',
		$LeavesBlock,
		CustomBlockRegistry.Model.simple('kubejs:block/legacy/birch_leaves'),
		$BlockProperties.copy(Blocks.BIRCH_LEAVES).sound(SoundType.GRASS)
	);

	legacySpruceLeaves = registerCustomBlock(
		'legacy/spruce_leaves',
		$LeavesBlock,
		CustomBlockRegistry.Model.simple('kubejs:block/legacy/spruce_leaves'),
		$BlockProperties.copy(Blocks.SPRUCE_LEAVES).sound(SoundType.GRASS)
	);

	legacyJungleLeaves = registerCustomBlock(
		'legacy/jungle_leaves',
		$LeavesBlock,
		CustomBlockRegistry.Model.simple('kubejs:block/legacy/jungle_leaves'),
		$BlockProperties.copy(Blocks.JUNGLE_LEAVES).sound(SoundType.GRASS)
	);

	// legacyCraftingTable = registerCustomBlock(
	// 	'legacy/oak_sapling',
	// 	new $SaplingBlock()
	// )
});

/// ----------------------------------------------------------- ///

StartupEvents.registry('item', registry => {

	/**
	 * @param {string} id 
	 * @param {Internal.CustomBuilderObject_} supplier 
	 */
	function registerBlockItem(id, supplier) {
		global.writeJsonIfAbsent(`kubejs/assets/kubejs/models/item/${id}.json`, {
			parent: `kubejs:block/${id}`
		});
		registry.createCustom(id, () => new $BlockItem(supplier.get(), new $ItemProperties()));
	}

	registerBlockItem('legacy/crafting_table', legacyCraftingTable);
	registerBlockItem('legacy/grass_block', legacyGrassBlock);
	registerBlockItem('legacy/furnace', legacyFurnace);
	registerBlockItem('legacy/oak_leaves', legacyOakLeaves);
	registerBlockItem('legacy/birch_leaves', legacyBirchLeaves);
	registerBlockItem('legacy/spruce_leaves', legacySpruceLeaves);
	registerBlockItem('legacy/jungle_leaves', legacyJungleLeaves);
	registerBlockItem('legacy/redstone_block', legacyRedstoneBlock);
});
