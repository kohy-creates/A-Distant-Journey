const CustomBlockRegistry = {
	Model: {
		simple: function (texture, renderType) {
			return {
				parent: 'minecraft:block/cube_all',
				textures: {
					all: texture
				},
				render_type: global.getOrDefault(renderType, 'minecraft:solid')
			}
		},
		cube: function (down, east, north, west, south, up, particle, renderType) {
			return {
				parent: 'minecraft:block/cube',
				textures: {
					down: down,
					east: east,
					north: north,
					particle: global.getOrDefault(particle, north),
					south: south,
					up: up,
					west: west
				},
				render_type: global.getOrDefault(renderType, 'minecraft:solid')
			}
		},
		cross: function (texture, renderType) {
			return {
				parent: 'minecraft:block/cross',
				render_type: global.getOrDefault(renderType, 'minecraft:cutout_mipped'),
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
const $RootBlock = Java.loadClass('net.minecraft.world.level.block.RootsBlock');
const $BlahajBlock = Java.loadClass('justblahaj.block.BlueBlahajBlock');
const $Block = Java.loadClass('net.minecraft.world.level.block.Block');

const $MobEffects = Java.loadClass('net.minecraft.world.effect.MobEffects');

/// ----------------------------------------------------------- ///

let legacyCraftingTable, legacyGrassBlock, legacyFurnace,
	legacyOakLeaves, legacyBirchLeaves, legacySpruceLeaves, legacyJungleLeaves,
	legacyRedstoneBlock,
	goldenDandelionBlock,
	daybloomBlock, moonglowBlock, blinkrootBlock,
	deathweedBlock, waterleafBlock, fireblossomBlock,
	shiverthornBlock,
	naturesGiftBlock, jungleRoseBlock,
	maroonBlahaj, roseBlahaj, coralBlahaj, indigoBlahaj,
	navyBlahaj, slateBlahaj, oliveBlahaj, amberBlahaj,
	beigeBlahaj, tealBlahaj, mintBlahaj, aquaBlahaj,
	verdantBlahaj, forestBlahaj, gingerBlahaj, tanBlahaj,
	legacyOakSapling, legacyBirchSapling, legacySpruceSapling, legacyJungleSapling;

/// ----------------------------------------------------------- ///

StartupEvents.registry('block', registry => {

	function noVariantBlockstate(id) {
		return { variants: { '': { model: `kubejs:block/${id}` } } }
	}

	function defaultLootTable(id) {
		return { type: 'minecraft:block', pools: [{ bonus_rolls: 0, conditions: [{ condition: 'minecraft:survives_explosion' }], entries: [{ type: 'minecraft:item', name: `kubejs:${id}` }], rolls: 1 }], random_sequence: `kubejs:blocks/${id}` };
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
		global.writeJsonIfAbsent(`kubejs/data/kubejs/loot_tables/blocks/${id}.json`, defaultLootTable(id), `Created missing loot table for block '${id}'`);
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
			parent: 'block/cube_bottom_top',
			textures: {
				particle: 'kubejs:block/legacy/dirt',
				bottom: 'kubejs:block/legacy/dirt',
				top: 'kubejs:block/legacy/legacy_grass_block_top',
				side: 'kubejs:block/legacy/legacy_grass_block',
			}
		},
		$BlockProperties.copy(Blocks.GRASS_BLOCK).sound(SoundType.GRASS)
	);

	legacyFurnace = registerCustomBlock(
		'legacy/furnace',
		$FurnaceBlock,
		{
			parent: 'minecraft:block/orientable',
			textures: {
				front: 'kubejs:block/legacy/furnace_front_off',
				side: 'kubejs:block/legacy/furnace_side',
				top: 'kubejs:block/legacy/furnace_top'
			}
		},
		$BlockProperties.copy(Blocks.FURNACE).sound(SoundType.STONE)
	);

	legacyRedstoneBlock = registerCustomBlock(
		'legacy/redstone_block',
		$PoweredBlock,
		CustomBlockRegistry.Model.simple('kubejs:block/legacy/redstone_block'),
		$BlockProperties.copy(Blocks.REDSTONE_BLOCK).sound(SoundType.METAL).lightLevel((state) => { return 15; })
	);

	legacyOakLeaves = registerCustomBlock(
		'legacy/oak_leaves',
		$LeavesBlock,
		CustomBlockRegistry.Model.simple('kubejs:block/legacy/oak_leaves', 'minecraft:cutout_mipped'),
		$BlockProperties.copy(Blocks.OAK_LEAVES).sound(SoundType.GRASS)
	);

	legacyBirchLeaves = registerCustomBlock(
		'legacy/birch_leaves',
		$LeavesBlock,
		CustomBlockRegistry.Model.simple('kubejs:block/legacy/birch_leaves', 'minecraft:cutout_mipped'),
		$BlockProperties.copy(Blocks.BIRCH_LEAVES).sound(SoundType.GRASS)
	);

	legacySpruceLeaves = registerCustomBlock(
		'legacy/spruce_leaves',
		$LeavesBlock,
		CustomBlockRegistry.Model.simple('kubejs:block/legacy/spruce_leaves', 'minecraft:cutout_mipped'),
		$BlockProperties.copy(Blocks.SPRUCE_LEAVES).sound(SoundType.GRASS)
	);

	legacyJungleLeaves = registerCustomBlock(
		'legacy/jungle_leaves',
		$LeavesBlock,
		CustomBlockRegistry.Model.simple('kubejs:block/legacy/jungle_leaves', 'minecraft:cutout_mipped'),
		$BlockProperties.copy(Blocks.JUNGLE_LEAVES).sound(SoundType.GRASS)
	);

	function registerPottedFlowerBlock(id) {
		JsonIO.write(`kubejs/assets/kubejs/models/block/potted_${id}.json`, {
			parent: 'minecraft:block/flower_pot_cross',
			render_type: 'minecraft:cutout_mipped',
			textures: {
				plant: `kubejs:block/${id}`
			}
		});
		global.writeJsonIfAbsent(`kubejs/assets/kubejs/blockstates/potted_${id}.json`, noVariantBlockstate(`potted_${id}`), `Created missing blockstate definition for block '${id}'`);
		global.writeJsonIfAbsent(
			`kubejs/data/kubejs/loot_tables/blocks/potted_${id}.json`,
			{ type: 'minecraft:block', pools: [{ bonus_rolls: 0, conditions: [{ condition: 'minecraft:survives_explosion' }], entries: [{ type: 'minecraft:item', name: 'minecraft:flower_pot' }], rolls: 1 }, { bonus_rolls: 0, conditions: [{ condition: 'minecraft:survives_explosion' }], entries: [{ type: 'minecraft:item', name: `kubejs:${id}` }], rolls: 1 }], random_sequence: `kubejs:blocks/potted_${id}` },
			`Created missing loot table for block '${id}'`
		);
		return registry.createCustom(`potted_${id}`, () => new $FlowerPotBlock(`kubejs:${id}`, $BlockProperties.copy(Blocks.FLOWER_POT)));
	}

	function registerFlowerBlock(id, effect, duration, properties) {
		JsonIO.write(`kubejs/assets/kubejs/models/block/${id}.json`, CustomBlockRegistry.Model.cross(`kubejs:block/${id}`));
		global.writeJsonIfAbsent(`kubejs/assets/kubejs/blockstates/${id}.json`, noVariantBlockstate(id), `Created missing blockstate definition for block '${id}'`);
		global.writeJsonIfAbsent(`kubejs/data/kubejs/loot_tables/blocks/${id}.json`, defaultLootTable(id), `Created missing loot table for block '${id}'`);
		let builder = registry.createCustom(id, () => new $FlowerBlock(effect, duration, properties))
		registerPottedFlowerBlock(id);
		return builder;
	}

	goldenDandelionBlock = registerFlowerBlock('golden_dandelion', $MobEffects.SATURATION, 2, $BlockProperties.copy(Blocks.DANDELION));

	daybloomBlock = registerFlowerBlock('daybloom', $MobEffects.REGENERATION, 180, $BlockProperties.copy(Blocks.DANDELION));
	moonglowBlock = registerFlowerBlock('moonglow', $MobEffects.NIGHT_VISION, 240, $BlockProperties.copy(Blocks.DANDELION));
	blinkrootBlock = registerFlowerBlock('blinkroot', $MobEffects.DIG_SLOWDOWN, 180, $BlockProperties.copy(Blocks.DANDELION));
	waterleafBlock = registerFlowerBlock('waterleaf', $MobEffects.WATER_BREATHING, 240, $BlockProperties.copy(Blocks.DANDELION));
	shiverthornBlock = registerFlowerBlock('shiverthorn', $MobEffects.MOVEMENT_SLOWDOWN, 180, $BlockProperties.copy(Blocks.DANDELION));
	jungleRoseBlock = registerFlowerBlock('jungle_rose', $MobEffects.DIG_SPEED, 240, $BlockProperties.copy(Blocks.DANDELION));
	naturesGiftBlock = registerFlowerBlock('natures_gift', $MobEffects.WEAKNESS, 240, $BlockProperties.copy(Blocks.DANDELION));

	/*
		Note to self: for some reason both JavaAdapters in this file so far don't work. 
		Kube treats them as regular, unedited classes.
	*/

	let flowerLike = () => new JavaAdapter($RootBlock, {
			/* m_5940_ */getShape: (blockState, blockGetter, blockPos, collisionContext) => { // note to self: if this is active the game crashes, FUCK KUBEJS ONG
			let box = $Block.box(5.0, 0.0, 5.0, 11.0, 10.0, 11.0);
			let vec3 = blockState.getOffset(blockGetter, blockPos);
			return box.move(vec3.x, vec3.y, vec3.z);
		},
	}, $BlockProperties.copy(Blocks.DANDELION));

	deathweedBlock = registerCustomBlock(
		'deathweed',
		flowerLike,
		CustomBlockRegistry.Model.cross('kubejs:block/deathweed')
	);
	registerPottedFlowerBlock('deathweed');

	fireblossomBlock = registerCustomBlock(
		'fireblossom',
		flowerLike,
		CustomBlockRegistry.Model.cross('kubejs:block/fireblossom')
	);
	registerPottedFlowerBlock('fireblossom');

	function createBlahaj(color) {
		let id = `${color}_blahaj`;
		JsonIO.write(
			`kubejs/assets/kubejs/models/block/${id}.json`,
			{
				parent: 'just_blahaj:custom/updatedblahajblue',
				textures: {
					all: `kubejs:block/blahaj/${color}`,
					particle: `kubejs:block/blahaj/${color}`,
					0: `kubejs:block/blahaj/${color}`
				},
				render_type: 'cutout_mipped'
			}
		);
		global.writeJsonIfAbsent(
			`kubejs/assets/kubejs/blockstates/${id}.json`,
			{
				variants: {
					'facing=north': { model: `kubejs:block/${id}` },
					'facing=east': { model: `kubejs:block/${id}`, y: 90 },
					'facing=south': { model: `kubejs:block/${id}`, y: 180 },
					'facing=west': { model: `kubejs:block/${id}`, y: 270 }
				}
			},
			`Created missing blockstate definition for block '${id}'`
		);
		global.writeJsonIfAbsent(`kubejs/data/kubejs/loot_tables/blocks/${id}.json`, defaultLootTable(id), `Created missing loot table for block '${id}'`);
		return registry.createCustom(id, () => new $BlahajBlock());
	}

	maroonBlahaj = createBlahaj('maroon');
	roseBlahaj = createBlahaj('rose');
	coralBlahaj = createBlahaj('coral');
	indigoBlahaj = createBlahaj('indigo');
	navyBlahaj = createBlahaj('navy');
	slateBlahaj = createBlahaj('slate');
	oliveBlahaj = createBlahaj('olive');
	amberBlahaj = createBlahaj('amber');
	beigeBlahaj = createBlahaj('beige');
	tealBlahaj = createBlahaj('teal');
	mintBlahaj = createBlahaj('mint');
	aquaBlahaj = createBlahaj('aqua');
	verdantBlahaj = createBlahaj('verdant');
	forestBlahaj = createBlahaj('forest');
	gingerBlahaj = createBlahaj('ginger');
	tanBlahaj = createBlahaj('tan');

	const $KJSTreeGrower = Java.loadClass('xyz.kohara.adjcore.misc.KJSTreeGrower');
	const $KJSMegaTreeGrower = Java.loadClass('xyz.kohara.adjcore.misc.KJSMegaTreeGrower');
	function registerSapling(id, featureNormal, featureLarge, properties) {

		let grower;
		if (featureLarge) {
			grower = new $KJSMegaTreeGrower(global.resourceLocation(featureNormal), global.resourceLocation(featureLarge));
		}
		else {
			grower = new $KJSTreeGrower(global.resourceLocation(featureNormal));
		}

		JsonIO.write(`kubejs/assets/kubejs/models/block/${id}.json`, CustomBlockRegistry.Model.cross(`kubejs:block/${id}`));
		global.writeJsonIfAbsent(`kubejs/assets/kubejs/blockstates/${id}.json`, noVariantBlockstate(id), `Created missing blockstate definition for block '${id}'`);
		global.writeJsonIfAbsent(`kubejs/data/kubejs/loot_tables/blocks/${id}.json`, defaultLootTable(id), `Created missing loot table for block '${id}'`);

		registerPottedFlowerBlock(id);
		return registry.createCustom(id, () => new $SaplingBlock(grower, properties));
	}

	legacyOakSapling = registerSapling('legacy_oak_sapling', 'adj:legacy/oak', null, $BlockProperties.copy(Blocks.OAK_SAPLING));
	legacyBirchSapling = registerSapling('legacy_birch_sapling', 'adj:legacy/birch', null, $BlockProperties.copy(Blocks.BIRCH_SAPLING));
	legacySpruceSapling = registerSapling('legacy_spruce_sapling', 'adj:legacy/spruce', 'adj:legacy/spruce_mega', $BlockProperties.copy(Blocks.SPRUCE_SAPLING));
	legacyJungleSapling = registerSapling('legacy_jungle_sapling', 'adj:legacy/jungle', 'adj:legacy/jungle_mega', $BlockProperties.copy(Blocks.JUNGLE_SAPLING));
});

/// ----------------------------------------------------------- ///

StartupEvents.registry('item', registry => {

	/**
	 * @param {string} id 
	 * @param {Internal.CustomBuilderObject_} block 
	 */
	function registerBlockItem(id, block, generated) {
		global.writeJsonIfAbsent(
			`kubejs/assets/kubejs/models/item/${id}.json`,
			generated
				? { parent: 'minecraft:item/generated', textures: { layer0: `kubejs:block/${id}` } }
				: { parent: `kubejs:block/${id}` },
			`Created missing item model for block item '${id}'`
		);
		registry.createCustom(id, () => new $BlockItem(`kubejs:${id}`, new $ItemProperties()));
	}

	registerBlockItem('legacy/crafting_table', legacyCraftingTable);
	registerBlockItem('legacy/grass_block', legacyGrassBlock);
	registerBlockItem('legacy/furnace', legacyFurnace);
	registerBlockItem('legacy/oak_leaves', legacyOakLeaves);
	registerBlockItem('legacy/birch_leaves', legacyBirchLeaves);
	registerBlockItem('legacy/spruce_leaves', legacySpruceLeaves);
	registerBlockItem('legacy/jungle_leaves', legacyJungleLeaves);
	registerBlockItem('legacy/redstone_block', legacyRedstoneBlock);
	registerBlockItem('golden_dandelion', goldenDandelionBlock, true);
	registerBlockItem('daybloom', daybloomBlock, true);
	registerBlockItem('moonglow', moonglowBlock, true);
	registerBlockItem('blinkroot', blinkrootBlock, true);
	registerBlockItem('deathweed', deathweedBlock, true);
	registerBlockItem('waterleaf', waterleafBlock, true);
	registerBlockItem('fireblossom', fireblossomBlock, true);
	registerBlockItem('shiverthorn', shiverthornBlock, true);
	registerBlockItem('natures_gift', naturesGiftBlock, true);
	registerBlockItem('jungle_rose', jungleRoseBlock, true);
	registerBlockItem('maroon_blahaj', maroonBlahaj);
	registerBlockItem('rose_blahaj', roseBlahaj);
	registerBlockItem('coral_blahaj', coralBlahaj);
	registerBlockItem('indigo_blahaj', indigoBlahaj);
	registerBlockItem('navy_blahaj', navyBlahaj);
	registerBlockItem('slate_blahaj', slateBlahaj);
	registerBlockItem('olive_blahaj', oliveBlahaj);
	registerBlockItem('amber_blahaj', amberBlahaj);
	registerBlockItem('beige_blahaj', beigeBlahaj);
	registerBlockItem('teal_blahaj', tealBlahaj);
	registerBlockItem('mint_blahaj', mintBlahaj);
	registerBlockItem('aqua_blahaj', aquaBlahaj);
	registerBlockItem('verdant_blahaj', verdantBlahaj);
	registerBlockItem('forest_blahaj', forestBlahaj);
	registerBlockItem('ginger_blahaj', gingerBlahaj);
	registerBlockItem('tan_blahaj', tanBlahaj);
	registerBlockItem('legacy_oak_sapling', legacyOakSapling, true);
	registerBlockItem('legacy_birch_sapling', legacyBirchSapling, true);
	registerBlockItem('legacy_spruce_sapling', legacySpruceSapling, true);
	registerBlockItem('legacy_jungle_sapling', legacyJungleSapling, true);
});
