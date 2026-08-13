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
					particle: global.getOrDefault(particle, north),
					south: south,
					up: up,
					west: west
				}
			}
		},
		cross: function (texture) {
			return {
				parent: "minecraft:block/cross",
				textures: {
					cross: texture
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
const $FlowerBlock = Java.loadClass('net.minecraft.world.level.block.FlowerBlock');
const $FlowerPotBlock = Java.loadClass('net.minecraft.world.level.block.FlowerPotBlock');
const $RootBlock = Java.loadClass('net.minecraft.world.level.block.RootBlock');

/// ----------------------------------------------------------- ///

let legacyCraftingTable, legacyGrassBlock, legacyFurnace,
	legacyOakLeaves, legacyBirchLeaves, legacySpruceLeaves, legacyJungleLeaves,
	legacyRedstoneBlock,
	goldenDandelionBlock,
	daybloomBlock, moonglowBlock, blinkrootBlock,
	deathweedBlock, waterleafBlock, fireblossomBlock,
	shiverthornBlock;

/// ----------------------------------------------------------- ///

StartupEvents.registry('block', registry => {

	function noVariantBlockstate(id) {
		return { variants: { '': { model: `kubejs:block/${id}` } } }
	}

	function defaultLottTable(id) {
		return { type: "minecraft:block", pools: [{ bonus_rolls: 0, conditions: [{ condition: "minecraft:survives_explosion" }], entries: [{ type: "minecraft:item", name: `kubejs:${id}` }], rolls: 1 }], random_sequence: `kubejs:blocks/${id}` };
	}

	/**
	 * @param {string} id 
	 * @param {Block|Internal.Supplier<Block>} block 
	 * @param {object} model 
	 * @param {Internal.BlockBehaviour$Properties_} properties 
	 */
	function registerCustomBlock(id, block, model, properties) {
		JsonIO.write(`kubejs/assets/kubejs/models/block/${id}.json`, model);
		global.writeJsonIfAbsent(`kubejs/assets/kubejs/blockstates/${id}.json`, noVariantBlockstate(id), `Created missing blockstate definition for block '${id}'`);
		global.writeJsonIfAbsent(`kubejs/data/kubejs/loot_tables/blocks/${id}.json`, defaultLottTable(id), `Created missing loot table for block '${id}'`);
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

	function registerPottedFlowerBlock(id, flowerBlock) {
		JsonIO.write(`kubejs/assets/kubejs/models/block/potted_${id}.json`, {
			parent: 'minecraft:block/flower_pot_cross',
			textures: {
				plant: `kubejs:block/${id}`
			}
		});
		global.writeJsonIfAbsent(`kubejs/assets/kubejs/blockstates/potted_${id}.json`, noVariantBlockstate(`potted_${id}`), `Created missing blockstate definition for block '${id}'`);
		global.writeJsonIfAbsent(
			`kubejs/data/kubejs/loot_tables/blocks/potted_${id}.json`,
			{ type: "minecraft:block", pools: [{ bonus_rolls: 0, conditions: [{ condition: "minecraft:survives_explosion" }], entries: [{ type: "minecraft:item", name: "minecraft:flower_pot" }], rolls: 1 }, { bonus_rolls: 0, conditions: [{ condition: "minecraft:survives_explosion" }], entries: [{ type: "minecraft:item", name: `kubejs:${id}` }], rolls: 1 }], random_sequence: `kubejs:blocks/potted_${id}` },
			`Created missing loot table for block '${id}'`
		);
		return registry.createCustom(`potted_${id}`, () => new $PottedFlowerBlock(flowerBlock, $BlockProperties.copy(Blocks.FLOWER_POT)));
	}

	function registerFlowerBlock(id, effect, properties) {
		JsonIO.write(`kubejs/assets/kubejs/models/block/${id}.json`, {
			parent: 'minecraft:block/cross',
			textures: {
				cross: `kubejs:block/${id}`
			}
		});
		global.writeJsonIfAbsent(`kubejs/assets/kubejs/blockstates/${id}.json`, noVariantBlockstate(id), `Created missing blockstate definition for block '${id}'`);
		global.writeJsonIfAbsent(`kubejs/data/kubejs/loot_tables/blocks/${id}.json`, defaultLootTable(id), `Created missing loot table for block '${id}'`);
		let builder = registry.createCustom(id, () => new $FlowerBlock(effect, properties))
		registerPottedFlowerBlock(id, builder);
		return builder;
	}

	goldenDandelionBlock = registerFlowerBlock('golden_dandelion', 'saturation', $BlockProperties.copy(Blocks.DANDELION));

	daybloomBlock = registerFlowerBlock('daybloom', 'saturation', $BlockProperties.copy(Blocks.DANDELION));
	moonglowBlock = registerFlowerBlock('moonglow', 'night_vision', $BlockProperties.copy(Blocks.DANDELION));
	blinkrootBlock = registerFlowerBlock('blinkroot', 'mining_fatigue', $BlockProperties.copy(Blocks.DANDELION));
	deathweedBlock = registerCustomBlock(
		'deathweed',
		$RootBlock,
		CustomBlockRegistry.Model.cross('kubejs:block/deathweed'),
		$BlockProperties.copy(Blocks.DANDELION)
	);
	waterleafBlock = registerFlowerBlock('waterleaf', 'water_breathing', $BlockProperties.copy(Blocks.DANDELION));
	fireblossomBlock = registerCustomBlock(
		'fireblossom',
		$RootBlock,
		CustomBlockRegistry.Model.cross('kubejs:block/fireblossom'),
		$BlockProperties.copy(Blocks.DANDELION)
	);
	shiverthornBlock = registerFlowerBlock('shiverthorn', 'slowness', $BlockProperties.copy(Blocks.DANDELION));
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
	registerBlockItem('golden_dandelion', goldenDandelionBlock);
	registerBlockItem('daybloom', daybloomBlock);
	registerBlockItem('moonglow', moonglowBlock);
	registerBlockItem('blinkroot', blinkrootBlock);
	registerBlockItem('deathweed', deathweedBlock);
	registerBlockItem('waterleaf', waterleafBlock);
	registerBlockItem('fireblossom', fireblossomBlock);
	registerBlockItem('shiverthorn', shiverthornBlock);
});
