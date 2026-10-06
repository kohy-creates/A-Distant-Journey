StartupEvents.registry('block', registry => {

	function placementBasedAxis(event) {
		event.set(BlockProperties.AXIS, event.clickedFace.axis);
	}

	function registerBlockSet(baseId, name, texture, hardness, resistance, tag, requiresTool, soundType, mapColor, extraTypes) {
		let types = [
			'basic',
			'stairs',
			'slab',
		];
		if (extraTypes) types = types.concat(extraTypes);

		if (!texture || (texture && global.isString(texture))) {
			types.forEach(type => {
				registry.create(`${type == 'basic' ? baseId : `${baseId}_${type}`}`, type)
					.hardness(hardness)
					.resistance(resistance)
					.tagBlock(tag)
					.requiresTool(requiresTool)
					.mapColor(mapColor)
					.soundType(soundType)
					.textureAll(global.getOrDefault(texture, `kubejs:block/${baseId}`))
					.displayName(type == 'basic' ? name : `${name} ${global.toTitleCase(global.textReplaceAll(type, '_', ''))}`);
			});
		}
		else {
			types.forEach(type => {
				registry.create(`${type == 'basic' ? baseId : `${baseId}_${type}`}`, type)
					.hardness(hardness)
					.resistance(resistance)
					.tagBlock(tag)
					.requiresTool(requiresTool)
					.mapColor(mapColor)
					.soundType(soundType)
					.textureSide('east', texture.east)
					.textureSide('west', texture.west)
					.textureSide('north', texture.north)
					.textureSide('south', texture.south)
					.textureSide('up', texture.up)
					.textureSide('down', texture.down)
					.displayName(type == 'basic' ? name : `${name} ${global.toTitleCase(global.textReplaceAll(type, '_', ''))}`);
			});
		}
	}

	registerBlockSet('cinnabar', 'Cinnabar', 'kubejs:block/cinnabar', 1.5, 6, 'mineable/pickaxe', true, 'deepslate', 'color_red', ['wall']);
	registerBlockSet('polished_cinnabar', 'Polished Cinnabar', 'kubejs:block/polished_cinnabar', 1.5, 6, 'mineable/pickaxe', true, 'deepslate', 'color_red', ['pressure_plate', 'wall']);
	registerBlockSet('cinnabar_bricks', 'Cinnabar Bricks', 'kubejs:block/cinnabar_bricks', 1.5, 6, 'mineable/pickaxe', true, SoundType.DEEPSLATE_TILES, 'color_red', ['wall']);
	registry.create('chiseled_cinnabar')
		.hardness(1.5)
		.resistance(6)
		.soundType(SoundType.DEEPSLATE_TILES)
		.displayName('Chiseled Cinnabar')
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.mapColor('color_red');

	registerBlockSet('sulfur', 'Sulfur', 'kubejs:block/sulfur', 1.5, 6, 'mineable/pickaxe', true, 'tuff', 'color_red', ['wall']);
	registerBlockSet('polished_sulfur', 'Polished Sulfur', 'kubejs:block/polished_sulfur', 1.5, 6, 'mineable/pickaxe', true, 'deepslate', 'color_red', ['pressure_plate', 'wall']);
	registerBlockSet('sulfur_bricks', 'Sulfur Bricks', 'kubejs:block/sulfur_bricks', 1.5, 6, 'mineable/pickaxe', true, SoundType.DEEPSLATE_TILES, 'color_red', ['wall']);
	registry.create('chiseled_sulfur')
		.hardness(1.5)
		.resistance(6)
		.soundType(SoundType.DEEPSLATE_TILES)
		.displayName('Chiseled Sulfur')
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.mapColor('color_red');

	function getMapColor(color, defaultTo) {
		switch (color) {
			case 'white': return 'SNOW';
			case 'light_gray': return 'COLOR_LIGHT_GRAY';
			case 'gray': return 'COLOR_GRAY';
			case 'black': return 'COLOR_BLACK';
			case 'brown': return 'COLOR_BROWN';
			case 'red': return 'COLOR_RED';
			case 'orange': return 'COLOR_ORANGE';
			case 'yellow': return 'COLOR_YELLOW';
			case 'lime': return 'COLOR_LIGHT_GREEN';
			case 'green': return 'COLOR_GREEN';
			case 'cyan': return 'COLOR_CYAN';
			case 'light_blue': return 'COLOR_LIGHT_BLUE';
			case 'blue': return 'COLOR_BLUE';
			case 'purple': return 'COLOR_PURPLE';
			case 'magenta': return 'COLOR_MAGENTA';
			case 'pink': return 'COLOR_PINK';
			case 'maroon': return 'CRIMSON_HYPHAE';
			case 'rose': return 'TERRACOTTA_MAGENTA';
			case 'coral': return 'RAW_IRON';
			case 'indigo': return 'TERRACOTTA_BLUE';
			case 'navy': return 'COLOR_CYAN';
			case 'slate': return 'WARPED_NYLIUM';
			case 'olive': return 'TERRACOTTA_LIGHT_GREEN';
			case 'amber': return 'WOOD';
			case 'beige': return 'SAND';
			case 'teal': return 'TERRACOTTA_CYAN';
			case 'mint': return 'WARPED_WART_BLOCK';
			case 'aqua': return 'DIAMOND';
			case 'verdant': return 'TERRACOTTA_GREEN';
			case 'forest': return 'EMERALD';
			case 'ginger': return 'TERRACOTTA_ORANGE';
			case 'tan': return 'DIRT';
			default: return global.getOrDefault(defaultTo, 'STONE');
		}
	}

	function registerAsphalt(color) {
		let id = color != 'black' ? `${color}_asphalt` : 'asphalt';
		registry.create(id)
			.hardness(1.8)
			.resistance(4)
			.speedFactor(1.35)
			.mapColor(getMapColor(color))
			.soundType(SoundType.STONE)
			.displayName(global.toTitleCase(global.textReplaceAll(id, '_', ' ')))
			.requiresTool(true)
			.tagBlock('mineable/pickaxe')
			.tagBoth('adj:asphalt');
	}

	function registerTiles(color) {
		let id = `${color}_tiles`;
		registerBlockSet(id, global.toTitleCase(global.textReplaceAll(id, '_', ' ')), `kubejs:block/${color}_tiles`, 1.5, 6, 'mineable/pickaxe', true, 'stone', getMapColor(color), ['wall']);
	}

	function registerDyedStoneBricks(color) {
		let id = `${color}_stone_bricks`;
		registerBlockSet(id, global.toTitleCase(global.textReplaceAll(id, '_', ' ')), `kubejs:block/${color}_stone_bricks`, 1.5, 6, 'mineable/pickaxe', true, 'deepslate_tiles', getMapColor(color), ['wall']);
	}

	function registerNeon(color) {
		let id = `${color}_neon`;
		registry.create(id)
			.lightLevel(1)
			.hardness(1.5)
			.resistance(4)
			.mapColor(getMapColor(color))
			.soundType(SoundType.STONE)
			.displayName(global.toTitleCase(global.textReplaceAll(id, '_', ' ')))
			.requiresTool(true)
			.tagBlock('mineable/pickaxe')
			.tagBoth('adj:neon_block');

		JsonIO.write(`kubejs/assets/kubejs/models/block/${id}.json`, {
			parent: "minecraft:block/cube_all",
			ambientocclusion: false,
			gui_light: "front",
			textures: {
				all: `kubejs:block/${id}`
			}
		})
	}

	Color.DYE.forEach(c => registerAsphalt(c));
	Color.DYE.forEach(c => registerTiles(c));
	Color.DYE.forEach(c => registerDyedStoneBricks(c));
	Color.DYE.forEach(c => registerNeon(c));

	registry.create('white_stars_block')
		.mapColor('color_black')
		.soundType(SoundType.AMETHYST)
		.hardness(1)
		.resistance(1.5)
		.tagBlock('mineable/pickaxe')
		.requiresTool(false)
		.displayName('White Starry Block');

	registry.create('gold_stars_block')
		.mapColor('color_black')
		.soundType(SoundType.AMETHYST)
		.hardness(1)
		.resistance(1.5)
		.tagBlock('mineable/pickaxe')
		.requiresTool(false)
		.displayName('Gold Starry Block');

	registry.create('blue_stars_block')
		.mapColor('color_black')
		.soundType(SoundType.AMETHYST)
		.hardness(1)
		.resistance(1.5)
		.tagBlock('mineable/pickaxe')
		.requiresTool(false)
		.displayName('Blue Starry Block');

	registerBlockSet('rainbow_bricks', 'Rainbow Bricks', 'kubejs:block/rainbow_bricks', 1.5, 6, 'mineable/pickaxe', true, 'deepslate_tiles', 'color_red', ['wall']);
	registerBlockSet('rainbow_tiles', 'Rainbow Tiles', 'kubejs:block/rainbow_tiles', 1.5, 6, 'mineable/pickaxe', true, 'stone', 'color_blue', ['wall']);
	registerNeon('rainbow', 'color_red');

	registerBlockSet('phantom_purpur', 'Phantom Purpur', 'kubejs:block/phantom_purpur_block', 1.5, 6, 'mineable/pickaxe', true, 'stone', 'color_blue');
	registerBlockSet('phantom_purpur_bricks', 'Phantom Purpur Bricks', 'kubejs:block/phantom_purpur_bricks', 1.5, 6, 'mineable/pickaxe', true, 'stone', 'color_blue');
	registerBlockSet('phantom_purpur_squares', 'Phantom Purpur Squares', 'kubejs:block/phantom_purpur_squares', 1.5, 6, 'mineable/pickaxe', true, 'stone', 'color_blue');

	registry.create('phantom_purpur_pillar')
		.textureAll('kubejs:block/phantom_purpur_pillar_side')
		.textureSide('up', 'kubejs:block/phantom_purpur_pillar_top')
		.textureSide('down', 'kubejs:block/phantom_purpur_pillar_top')
		.textureSide('east', 'kubejs:block/phantom_purpur_pillar_side')
		.textureSide('west', 'kubejs:block/phantom_purpur_pillar_side')
		.textureSide('north', 'kubejs:block/phantom_purpur_pillar_side')
		.textureSide('south', 'kubejs:block/phantom_purpur_pillar_side')
		.displayName('Phantom Purpur Pillar')
		.property(BlockProperties.AXIS)
		.placementState(event => placementBasedAxis(event))
		.soundType(SoundType.STONE)
		.hardness(1.5)
		.resistance(6)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true);

	// Legacy blocks
	registry.create('legacy/bedrock')
		.hardness(-1)
		.resistance(3600000)
		.mapColor('stone')
		.displayName('Ancient Bedrock')
		.soundType(SoundType.STONE);

	registry.create('legacy/bookshelf')
		.textureSide('down', 'kubejs:block/legacy/planks_oak')
		.textureSide('up', 'kubejs:block/legacy/planks_oak')
		.textureSide('east', 'kubejs:block/legacy/bookshelf')
		.textureSide('west', 'kubejs:block/legacy/bookshelf')
		.textureSide('north', 'kubejs:block/legacy/bookshelf')
		.textureSide('south', 'kubejs:block/legacy/bookshelf')
		.soundType(SoundType.WOOD)
		.mapColor('wood')
		.resistance(1.5)
		.hardness(1.5)
		.displayName('Ancient Bookshelf')
		.tagBlock('mineable/axe')
		.tagBlock('enchantment_power_provider');

	registerBlockSet('legacy/bricks', 'Ancient Bricks', 'kubejs:block/legacy/bricks', 2, 6, 'mineable/pickaxe', true, SoundType.STONE, 'red');

	registerBlockSet('legacy/large_bricks', 'Ancient Large Bricks', 'kubejs:block/legacy/large_bricks', 2, 6, 'mineable/pickaxe', true, SoundType.STONE, 'red');

	registry.create('legacy/clay')
		.hardness(0.6)
		.resistance(0.6)
		.mapColor('clay')
		.soundType(SoundType.GRAVEL)
		.tagBlock('mineable/shovel')
		.displayName('Ancient Clay');

	registry.create('legacy/coal_block')
		.hardness(5)
		.resistance(6)
		.mapColor('black')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Coal Block');

	registry.create('legacy/coal_ore')
		.hardness(3)
		.resistance(3)
		.mapColor('stone')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Coal Ore');

	registerBlockSet('legacy/cobblestone', 'Ancient Cobblestone', 'kubejs:block/legacy/cobblestone', 2, 6, 'mineable/pickaxe', true, SoundType.STONE, 'stone', ['wall']);

	registry.create('legacy/cobblestone_mossy')
		.hardness(2)
		.resistance(6)
		.mapColor('stone')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Mossy Cobblestone');

	registry.create('legacy/command_block')
		.hardness(-1)
		.resistance(3600000)
		.mapColor('purple')
		.soundType(SoundType.STONE)
		.displayName('Command Block?');

	registry.create('legacy/dirt')
		.hardness(0.5)
		.resistance(0.5)
		.mapColor('dirt')
		.soundType(SoundType.GRAVEL)
		.tagBlock('mineable/shovel')
		.displayName('Ancient Dirt');

	registry.create('legacy/gravel', 'falling')
		.hardness(0.6)
		.resistance(0.6)
		.mapColor('stone')
		.soundType(SoundType.GRAVEL)
		.tagBlock('mineable/shovel')
		.displayName('Ancient Gravel');

	registry.create('legacy/sand', 'falling')
		.hardness(0.5)
		.resistance(0.5)
		.mapColor('sand')
		.soundType(SoundType.SAND)
		.tagBlock('mineable/shovel')
		.displayName('Ancient Sand');

	registry.create('legacy/stone')
		.hardness(1.5)
		.resistance(6)
		.mapColor('stone')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Stone');

	registry.create('legacy/diamond_block')
		.hardness(5)
		.resistance(6)
		.mapColor('cyan')
		.soundType(SoundType.METAL)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Diamond Block');

	registry.create('legacy/diamond_ore')
		.hardness(3)
		.resistance(3)
		.mapColor('stone')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Diamond Ore');

	registry.create('legacy/emerald_block')
		.hardness(5)
		.resistance(6)
		.mapColor('green')
		.soundType(SoundType.METAL)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Emerald Block');

	registry.create('legacy/emerald_ore')
		.hardness(3)
		.resistance(3)
		.mapColor('stone')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Emerald Ore');

	registry.create('legacy/gold_block')
		.hardness(3)
		.resistance(6)
		.mapColor('yellow')
		.soundType(SoundType.METAL)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Gold Block');

	registry.create('legacy/gold_ore')
		.hardness(3)
		.resistance(3)
		.mapColor('stone')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Gold Ore');

	registry.create('legacy/iron_block')
		.hardness(5)
		.resistance(6)
		.mapColor('light_gray')
		.soundType(SoundType.METAL)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Iron Block');

	registry.create('legacy/ruby_ore')
		.hardness(3)
		.resistance(3)
		.mapColor('stone')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Ruby Ore');

	registry.create('legacy/ruby_block')
		.hardness(5)
		.resistance(6)
		.mapColor('light_gray')
		.soundType(SoundType.METAL)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Ruby Block');

	registry.create('legacy/iron_ore')
		.hardness(3)
		.resistance(3)
		.mapColor('stone')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Ancient Iron Ore');

	registry.create('legacy/lapis_block')
		.hardness(3)
		.resistance(6)
		.mapColor('blue')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Lapis Block');

	registry.create('legacy/lapis_ore')
		.hardness(3)
		.resistance(3)
		.mapColor('stone')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Lapis Ore');

	registry.create('legacy/redstone_ore')
		.hardness(3)
		.resistance(3)
		.mapColor('stone')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Redstone Ore');

	registry.create('legacy/netherrack')
		.hardness(0.4)
		.resistance(0.4)
		.mapColor('red')
		.soundType(SoundType.NETHERRACK)
		.tagBlock('mineable/pickaxe')
		.displayName('Ancient Netherrack');

	registry.create('legacy/obsidian')
		.hardness(50)
		.resistance(1200)
		.mapColor('black')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Obsidian');

	registry.create('legacy/glowstone')
		.hardness(0.3)
		.resistance(0.3)
		.lightLevel(1)
		.mapColor('yellow')
		.soundType(SoundType.GLASS)
		.displayName('Ancient Glowstone');

	registry.create('legacy/ice')
		.hardness(0.5)
		.resistance(0.5)
		.slipperiness(1.98)
		.mapColor('ice')
		.transparent(true)
		.defaultTranslucent()
		.soundType(SoundType.GLASS)
		.displayName('Ancient Ice');

	registry.create('legacy/ice_packed')
		.hardness(0.5)
		.resistance(0.5)
		.mapColor('ice')
		.slipperiness(1.98)
		.soundType(SoundType.GLASS)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Packed Ice');

	registry.create('legacy/snow')
		.hardness(0.2)
		.resistance(0.2)
		.mapColor('snow')
		.soundType(SoundType.SNOW)
		.displayName('Ancient Snow Block');

	registry.create('legacy/glass')
		.hardness(0.3)
		.resistance(0.3)
		.mapColor('none')
		.transparent(true)
		.defaultTranslucent()
		.soundType(SoundType.GLASS)
		.displayName('Ancient Glass');

	Color.DYE.forEach(c => {
		if (global.isDyeDepotColor(c)) return;

		registry.create(`legacy/wool_colored_${c}`)
			.hardness(0.8)
			.resistance(0.8)
			.mapColor(getMapColor(c))
			.soundType(SoundType.WOOL)
			.displayName(`Ancient ${global.toTitleCase(c.replace('_', ' '))} Wool`);

		registry.create(`legacy/carpet_colored_${c}`, 'carpet')
			.hardness(0.8)
			.resistance(0.8)
			.mapColor(getMapColor(c))
			.soundType(SoundType.WOOL)
			.textureAll(`kubejs:block/legacy/wool_colored_${c}`)
			.displayName(`Ancient ${global.toTitleCase(c.replace('_', ' '))} Carpet`);

		registry.create(`legacy/glass_${c}`)
			.hardness(0.3)
			.resistance(0.3)
			.mapColor(getMapColor(c))
			.transparent(true)
			.defaultTranslucent()
			.soundType(SoundType.GLASS)
			.textureAll(`kubejs:block/legacy/glass_${c}`)
			.displayName(`${global.toTitleCase(c.replace('_', ' '))} Stained Glass`);
	});

	const logs = ['oak', 'birch', 'spruce', 'jungle'];

	logs.forEach(log => {
		registry.create(`legacy/log_${log}`)
			.hardness(2)
			.resistance(2)
			.property(BlockProperties.AXIS)
			.placementState(event => placementBasedAxis(event))
			.mapColor('wood')
			.soundType(SoundType.WOOD)
			.tagBlock('mineable/axe')
			.displayName(`Ancient ${global.toTitleCase(log.replace('_', ' '))} Log`)
			.textureSide('north', `kubejs:block/legacy/log_${log}`)
			.textureSide('south', `kubejs:block/legacy/log_${log}`)
			.textureSide('east', `kubejs:block/legacy/log_${log}`)
			.textureSide('west', `kubejs:block/legacy/log_${log}`)
			.textureSide('up', `kubejs:block/legacy/log_${log}_top`)
			.textureSide('down', `kubejs:block/legacy/log_${log}_top`)
			.tagBoth('logs_that_burn');
	});

	registerBlockSet('legacy/planks_oak', 'Ancient Oak Planks', null, 2, 3, 'mineable/axe', false, SoundType.WOOD, 'wood', ['fence', 'pressure_plate']);
	registerBlockSet('legacy/planks_birch', 'Ancient Birch Planks', null, 2, 3, 'mineable/axe', false, SoundType.WOOD, 'wood', ['fence', 'pressure_plate']);
	registerBlockSet('legacy/planks_spruce', 'Ancient Spruce Planks', null, 2, 3, 'mineable/axe', false, SoundType.WOOD, 'wood', ['fence', 'pressure_plate']);
	registerBlockSet('legacy/planks_jungle', 'Ancient Jungle Planks', null, 2, 3, 'mineable/axe', false, SoundType.WOOD, 'wood', ['fence', 'pressure_plate']);

	registry.create('legacy/melon')
		.hardness(1)
		.resistance(1)
		.mapColor('plant')
		.soundType(SoundType.WOOD)
		.displayName('Ancient Melon')
		.textureSide('north', 'kubejs:block/legacy/melon_side')
		.textureSide('south', 'kubejs:block/legacy/melon_side')
		.textureSide('east', 'kubejs:block/legacy/melon_side')
		.textureSide('west', 'kubejs:block/legacy/melon_side')
		.textureSide('up', 'kubejs:block/legacy/melon_top')
		.textureSide('down', 'kubejs:block/legacy/melon_top');

	registerBlockSet(
		'legacy/sandstone',
		'Ancient Sandstone',
		{
			north: 'kubejs:block/legacy/sandstone_normal',
			south: 'kubejs:block/legacy/sandstone_normal',
			east: 'kubejs:block/legacy/sandstone_normal',
			west: 'kubejs:block/legacy/sandstone_normal',
			up: 'kubejs:block/legacy/sandstone_top',
			down: 'kubejs:block/legacy/sandstone_bottom'
		},
		0.8, 0.8,
		'mineable/pickaxe', true,
		SoundType.STONE, 'sand'
	);

	registerBlockSet(
		'legacy/sandstone_smooth',
		'Ancient Smooth Sandstone',
		{
			north: 'kubejs:block/legacy/sandstone_smooth',
			south: 'kubejs:block/legacy/sandstone_smooth',
			east: 'kubejs:block/legacy/sandstone_smooth',
			west: 'kubejs:block/legacy/sandstone_smooth',
			up: 'kubejs:block/legacy/sandstone_top',
			down: 'kubejs:block/legacy/sandstone_bottom'
		},
		0.8, 0.8,
		'mineable/pickaxe', true,
		SoundType.STONE, 'sand'
	);

	registry.create('legacy/sandstone_carved')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('sand')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Cut Sandstone')
		.textureSide('north', 'kubejs:block/legacy/sandstone_carved')
		.textureSide('south', 'kubejs:block/legacy/sandstone_carved')
		.textureSide('east', 'kubejs:block/legacy/sandstone_carved')
		.textureSide('west', 'kubejs:block/legacy/sandstone_carved')
		.textureSide('up', 'kubejs:block/legacy/sandstone_top')
		.textureSide('down', 'kubejs:block/legacy/sandstone_bottom');

	registerBlockSet('legacy/quartz_block', 'Ancient Quartz Block', null, 0.8, 0.8, 'mineable/pickaxe', true, SoundType.STONE, 'white');

	registry.create('legacy/quartz_block_chiseled')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('white')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Chiseled Quartz Block')

	registry.create('legacy/quartz_pillar')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('white')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Quartz Pillar')
		.textureSide('north', 'kubejs:block/legacy/quartz_block_lines')
		.textureSide('south', 'kubejs:block/legacy/quartz_block_lines')
		.textureSide('east', 'kubejs:block/legacy/quartz_block_lines')
		.textureSide('west', 'kubejs:block/legacy/quartz_block_lines')
		.textureSide('up', 'kubejs:block/legacy/quartz_block_lines_top')
		.textureSide('down', 'kubejs:block/legacy/quartz_block_lines_top')
		.property(BlockProperties.AXIS);

	registry.create('legacy/quartz_ore')
		.hardness(3)
		.resistance(3)
		.mapColor('stone')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Quartz Ore')

	registerBlockSet('legacy/stonebrick', 'Ancient Stone Bricks', null, 1.5, 6, 'mineable/pickaxe', true, SoundType.STONE, 'stone', ['wall']);

	registry.create('legacy/stonebrick_cracked')
		.hardness(1.5)
		.resistance(6)
		.mapColor('stone')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Cracked Stone Bricks')

	registry.create('legacy/stonebrick_mossy')
		.hardness(1.5)
		.resistance(6)
		.mapColor('stone')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Mossy Stone Bricks')

	registry.create('legacy/stonebrick_carved')
		.hardness(1.5)
		.resistance(6)
		.mapColor('stone')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Chiseled Stone Bricks')

	registry.create('legacy/stone_slab', 'slab')
		.hardness(2)
		.resistance(6)
		.mapColor('stone')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Stone Slab')
		.textureSide('north', 'kubejs:block/stone_slab_side')
		.textureSide('south', 'kubejs:block/stone_slab_side')
		.textureSide('east', 'kubejs:block/stone_slab_side')
		.textureSide('west', 'kubejs:block/stone_slab_side')
		.textureSide('up', 'kubejs:block/stone_slab_top')
		.textureSide('down', 'kubejs:block/stone_slab_top');

	registerBlockSet('legacy/legacy_bricks', 'Legacy Bricks', null, 2, 6, 'mineable/pickaxe', true, SoundType.STONE, 'red', ['wall']);

	registry.create('legacy/glowing_obsidian')
		.hardness(50)
		.resistance(1200)
		.lightLevel(1)
		.mapColor('purple')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Glowing Obsidian')

	registry.create('legacy/legacy_nether_reactor_core')
		.hardness(3)
		.resistance(6)
		.mapColor('purple')
		.soundType(SoundType.METAL)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Nether Reactor Core?')

	registry.create('legacy/legacy_explosion_proof_gold_block')
		.hardness(5)
		.resistance(6000)
		.mapColor('yellow')
		.soundType(SoundType.METAL)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Explosion Proof Gold Block');

	registry.create('legacy/legacy_gold_block')
		.hardness(3)
		.resistance(6)
		.mapColor('yellow')
		.soundType(SoundType.METAL)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Legacy Gold Block')
		.textureSide('north', 'kubejs:block/legacy/legacy_gold_block')
		.textureSide('south', 'kubejs:block/legacy/legacy_gold_block')
		.textureSide('east', 'kubejs:block/legacy/legacy_gold_block')
		.textureSide('west', 'kubejs:block/legacy/legacy_gold_block')
		.textureSide('up', 'kubejs:block/legacy/legacy_gold_block_top')
		.textureSide('down', 'kubejs:block/legacy/legacy_gold_block_bottom');

	registry.create('legacy/legacy_iron_block')
		.hardness(5)
		.resistance(6)
		.mapColor('light_gray')
		.soundType(SoundType.METAL)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Legacy Iron Block')
		.textureSide('north', 'kubejs:block/legacy/legacy_iron_block')
		.textureSide('south', 'kubejs:block/legacy/legacy_iron_block')
		.textureSide('east', 'kubejs:block/legacy/legacy_iron_block')
		.textureSide('west', 'kubejs:block/legacy/legacy_iron_block')
		.textureSide('up', 'kubejs:block/legacy/legacy_iron_block_top')
		.textureSide('down', 'kubejs:block/legacy/legacy_iron_block_bottom');

	registry.create('legacy/legacy_diamond_block')
		.hardness(5)
		.resistance(6)
		.mapColor('cyan')
		.soundType(SoundType.METAL)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Legacy Diamond Block')
		.textureSide('north', 'kubejs:block/legacy/legacy_diamond_block')
		.textureSide('south', 'kubejs:block/legacy/legacy_diamond_block')
		.textureSide('east', 'kubejs:block/legacy/legacy_diamond_block')
		.textureSide('west', 'kubejs:block/legacy/legacy_diamond_block')
		.textureSide('up', 'kubejs:block/legacy/legacy_diamond_block_top')
		.textureSide('down', 'kubejs:block/legacy/legacy_diamond_block_bottom');

	registry.create('legacy/legacy_lapis_block')
		.hardness(3)
		.resistance(6)
		.mapColor('blue')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Legacy Lapis Block');

	registry.create('legacy/legacy_sponge')
		.hardness(0.6)
		.resistance(0.6)
		.mapColor('yellow')
		.soundType(SoundType.GRASS)
		.displayName('Ancient Sponge');

	// Deep Granite/Grimite
	registerBlockSet('grimite', 'Grimite', 'kubejs:block/deep_granite', 3, 6, 'mineable/pickaxe', true, SoundType.DEEPSLATE, 'blue', ['wall']);
	registerBlockSet('polished_grimite', 'Polished Grimite', 'kubejs:block/polished_deep_granite', 3, 6, 'mineable/pickaxe', true, SoundType.DEEPSLATE, 'blue', ['wall']);

	// Wool Stairs and Slabs + Concrete Stairs and Slabs (26.3 backport)
	Color.DYE.forEach(color => {
		registry.create(`${color}_wool_stairs`, 'stairs')
			.textureAll(`${global.ifDyeDepot(color, 'dye_depot', 'minecraft')}:block/${color}_wool`)
			.mapColor(getMapColor(color))
			.soundType(SoundType.WOOL)
			.resistance(0.8)
			.hardness(0.8);

		registry.create(`${color}_wool_slab`, 'slab')
			.textureAll(`${global.ifDyeDepot(color, 'dye_depot', 'minecraft')}:block/${color}_wool`)
			.mapColor(getMapColor(color))
			.soundType(SoundType.WOOL)
			.resistance(0.8)
			.hardness(0.8);

		registry.create(`${color}_concrete_stairs`, 'stairs')
			.textureAll(`${global.ifDyeDepot(color, 'dye_depot', 'minecraft')}:block/${color}_concrete`)
			.mapColor(getMapColor(color))
			.soundType(SoundType.STONE)
			.resistance(1.8)
			.hardness(1.8)
			.requiresTool(true)
			.tagBlock('mineable/pickaxe');

		registry.create(`${color}_concrete_slab`, 'slab')
			.textureAll(`${global.ifDyeDepot(color, 'dye_depot', 'minecraft')}:block/${color}_concrete`)
			.mapColor(getMapColor(color))
			.soundType(SoundType.STONE)
			.resistance(1.8)
			.hardness(1.8)
			.requiresTool(true)
			.tagBlock('mineable/pickaxe');
	});

	/**
	 * Registers a crop block for the given alchemy plant.
	 * @param {string} id 
	 * @param {string} cropItem 
	 * @param {Internal.ToDoubleFunction_<Internal.RandomTickCallbackJS_>} growCallback 
	 */
	function alchemyCrop(id, cropItem, growCallback) {
		registry.create(id, 'crop')
			.age(4, (box) => box
				.shape(0, 0.0, 0.0, 0.0, 16.0, 2.0, 16.0)
				.shape(1, 0.0, 0.0, 0.0, 16.0, 3.0, 16.0)
				.shape(2, 0.0, 0.0, 0.0, 16.0, 4.0, 16.0)
				.shape(3, 0.0, 0.0, 0.0, 16.0, 5.0, 16.0)
				.shape(4, 0.0, 0.0, 0.0, 16.0, 6.0, 16.0)
			)
			.crop(cropItem)
			.growTick(growCallback)
			.tagBoth('adj:alchemy_crops');
	}

	const noGrow = 0.0000001;

	alchemyCrop('daybloom_plant', 'kubejs:daybloom', (event) => {
		const level = event.getLevel();
		if (level.isDay()) return -1;
		return noGrow;
	});

	alchemyCrop('moonglow_plant', 'kubejs:moonglow', (event) => {
		const level = event.getLevel();
		if (level.isNight()) return -1;
		return noGrow;
	});

	alchemyCrop('blinkroot_plant', 'kubejs:blinkroot', (event) => {
		if (event.block.y < event.level.seaLevel) return 1.0;
		return 0.5;
	});

	alchemyCrop('shiverthorn_plant', 'kubejs:shiverthorn', (event) => {
		const season = global.getCurrentSeason(event.server.overworld());
		if (season == 'winter') return 1.5;
		return 0.5;
	});

	alchemyCrop('deathweed_plant', 'kubejs:deathweed', (event) => {
		const lunarEvent = global.getCurrentLunarEvent(event.server.overworld());
		if (lunarEvent == 'adj:blood_moon') return 15;
		return noGrow;
	});

	alchemyCrop('fireblossom_plant', 'kubejs:fireblossom', (event) => {
		const level = event.getLevel();
		if (level.isRaining() || level.isThundering()) return noGrow;
		return 0.5;
	});

	alchemyCrop('waterleaf_plant', 'kubejs:waterleaf', (event) => {
		const level = event.getLevel();
		if (level.isRaining() || level.isThundering()) return 1.5;
		return noGrow;
	});
});
