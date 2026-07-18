const CustomBlockRegistry = {
	customBlocks: [],
	builders: [],
	registerCustomBlock: function (id, block, model, properties) {
		this.customBlocks.push({
			id: id,
			block: block,
			model: model,
			properties: (properties) ? properties : $Properties.of()
		});
	},
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

(() => {
	// Not gonna trash the global scope with those.
	const $CraftingTableBlock = Java.loadClass('net.minecraft.world.level.block.CraftingTableBlock');
	const $GrassBlock = Java.loadClass('net.minecraft.world.level.block.GrassBlock');
	const $FurnaceBlock = Java.loadClass('net.minecraft.world.level.block.FurnaceBlock');
	const $LeavesBlock = Java.loadClass('net.minecraft.world.level.block.LeavesBlock');
	const $SaplingBlock = Java.loadClass('net.minecraft.world.level.block.SaplingBlock');
	const $PoweredBlock = Java.loadClass('net.minecraft.world.level.block.PoweredBlock');

	CustomBlockRegistry.registerCustomBlock(
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

	CustomBlockRegistry.registerCustomBlock(
		'legacy/grass_block',
		$GrassBlock,
		{
			parent: "block/block",
			textures: {
				particle: "kubejs:block/legacy/dirt",
				bottom: "kubejs:block/legacy/dirt",
				top: "kubejs:block/legacy/legacy_grass_block_top",
				side: "kubejs:block/legacy/legacy_grass_block",
			}
		},
		$BlockProperties.copy(Blocks.GRASS_BLOCK).sound(SoundType.GRASS)
	);

	CustomBlockRegistry.registerCustomBlock(
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

	CustomBlockRegistry.registerCustomBlock(
		'legacy/redstone_block',
		$PoweredBlock,
		CustomBlockRegistry.Model.simple('kubejs:block/legacy/redstone_block'),
		$BlockProperties.copy(Blocks.OAK_LEAVES).sound(SoundType.METAL).lightLevel((state) => { return 15; })
	);

	CustomBlockRegistry.registerCustomBlock(
		'legacy/oak_leaves',
		$LeavesBlock,
		CustomBlockRegistry.Model.simple('kubejs:block/legacy/oak_leaves'),
		$BlockProperties.copy(Blocks.OAK_LEAVES).sound(SoundType.GRASS)
	);

	CustomBlockRegistry.registerCustomBlock(
		'legacy/birch_leaves',
		$LeavesBlock,
		CustomBlockRegistry.Model.simple('kubejs:block/legacy/birch_leaves'),
		$BlockProperties.copy(Blocks.BIRCH_LEAVES).sound(SoundType.GRASS)
	);

	CustomBlockRegistry.registerCustomBlock(
		'legacy/spruce_leaves',
		$LeavesBlock,
		CustomBlockRegistry.Model.simple('kubejs:block/legacy/spruce_leaves'),
		$BlockProperties.copy(Blocks.SPRUCE_LEAVES).sound(SoundType.GRASS)
	);

	CustomBlockRegistry.registerCustomBlock(
		'legacy/jungle_leaves',
		$LeavesBlock,
		CustomBlockRegistry.Model.simple('kubejs:block/legacy/jungle_leaves'),
		$BlockProperties.copy(Blocks.JUNGLE_LEAVES).sound(SoundType.GRASS)
	);

	// CustomBlockRegistry.registerCustomBlock(
	// 	'legacy/oak_sapling',
	// 	new $SaplingBlock()
	// )
})();

/// ----------------------------------------------------------- ///

StartupEvents.registry('block', registry => {
	CustomBlockRegistry.customBlocks.forEach(b => {
		const $Capture = b.block;
		let builder = registry.createCustom(b.id, () => new $Capture(b.properties));
		CustomBlockRegistry.builders.push(builder);
		JsonIO.write(`kubejs/assets/kubejs/models/block/${b.id}.json`, b.model);
		global.writeJsonIfAbsent(`kubejs/assets/kubejs/blockstates/${b.id}.json`, {
			variants: {
				'': {
					model: `kubejs:block/${b.id}`
				}
			}
		}, `Created missing blockstate definition for block '${b.id}'`);
		global.writeJsonIfAbsent(`kubejs/data/kubejs/loot_tables/blocks/${b.id}.json`, {}, `Created missing loot table for block '${b.id}'`);
	});
});

StartupEvents.registry('item', registry => {
	let i = 0;
	CustomBlockRegistry.customBlocks.forEach(b => {
		registry.createCustom(b.id, () => new $BlockItem(CustomBlockRegistry.builders[i], new $ItemProperties()));
		global.writeJsonIfAbsent(`kubejs/assets/kubejs/models/item/${b.id}.json`, {
			parent: `kubejs:block/${b.id}`
		});
		i++;
	});
});
