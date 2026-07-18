StartupEvents.registry('block', registry => {

	function registerBlockSet(baseId, name, texture, hardness, resistance, tag, requiresTool, soundType, mapColor, extraTypes) {
		let types = [
			'basic',
			'stairs',
			'slab',
		];
		if (extraTypes) types = types.concat(extraTypes);

		if (!texture || (texture && typeof texture === 'string')) {
			types.forEach(type => {
				registry.create(`${type == 'basic' ? baseId : `${baseId}_${type}`}`, type)
					.hardness(hardness)
					.resistance(resistance)
					.tagBlock(tag)
					.requiresTool(requiresTool)
					.mapColor(mapColor)
					.soundType(soundType)
					.textureAll(texture ? texture : `kubejs:block/${baseId}`)
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
			default: return defaultTo ? defaultTo : 'STONE';
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
	registerBlockSet('phantom_purpur_bricks', 'Phantom Purpur Bricks', 'kubejs:block/phantom_purpur_brick', 1.5, 6, 'mineable/pickaxe', true, 'stone', 'color_blue');
	registerBlockSet('phantom_purpur_squares', 'Phantom Purpur Squares', 'kubejs:block/phantom_purpur_squares', 1.5, 6, 'mineable/pickaxe', true, 'stone', 'color_blue');

	registry.create('phantom_purpur_pillar')
		.textureSide('up', 'kubejs:block/phantom_purpur_pillar_top')
		.textureSide('down', 'kubejs:block/phantom_purpur_pillar_top')
		.textureSide('east', 'kubejs:block/phantom_purpur_pillar_side')
		.textureSide('west', 'kubejs:block/phantom_purpur_pillar_side')
		.textureSide('north', 'kubejs:block/phantom_purpur_pillar_side')
		.textureSide('south', 'kubejs:block/phantom_purpur_pillar_side')
		.displayName('Phantom Purpur Pillar')
		.property(BlockProperties.AXIS)
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

	registry.create('legacy/wool_colored_black')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('black')
		.soundType(SoundType.WOOL)
		.displayName('Ancient Black Wool');

	registry.create('legacy/wool_colored_blue')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('blue')
		.soundType(SoundType.WOOL)
		.displayName('Ancient Blue Wool');

	registry.create('legacy/wool_colored_brown')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('brown')
		.soundType(SoundType.WOOL)
		.displayName('Ancient Brown Wool');

	registry.create('legacy/wool_colored_cyan')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('cyan')
		.soundType(SoundType.WOOL)
		.displayName('Ancient Cyan Wool');

	registry.create('legacy/wool_colored_gray')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('gray')
		.soundType(SoundType.WOOL)
		.displayName('Ancient Gray Wool');

	registry.create('legacy/wool_colored_green')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('green')
		.soundType(SoundType.WOOL)
		.displayName('Ancient Green Wool');

	registry.create('legacy/wool_colored_light_blue')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('light_blue')
		.soundType(SoundType.WOOL)
		.displayName('Ancient Light Blue Wool');

	registry.create('legacy/wool_colored_lime')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('lime')
		.soundType(SoundType.WOOL)
		.displayName('Ancient Lime Wool');

	registry.create('legacy/wool_colored_magenta')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('magenta')
		.soundType(SoundType.WOOL)
		.displayName('Ancient Magenta Wool');

	registry.create('legacy/wool_colored_orange')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('orange')
		.soundType(SoundType.WOOL)
		.displayName('Ancient Orange Wool');

	registry.create('legacy/wool_colored_pink')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('pink')
		.soundType(SoundType.WOOL)
		.displayName('Ancient Pink Wool');

	registry.create('legacy/wool_colored_purple')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('purple')
		.soundType(SoundType.WOOL)
		.displayName('Ancient Purple Wool');

	registry.create('legacy/wool_colored_red')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('red')
		.soundType(SoundType.WOOL)
		.displayName('Ancient Red Wool');

	registry.create('legacy/wool_colored_light_gray')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('light_gray')
		.soundType(SoundType.WOOL)
		.textureAll('kubejs:block/legacy/wool_colored_silver')
		.displayName('Ancient Light Gray Wool');

	registry.create('legacy/wool_colored_white')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('white')
		.soundType(SoundType.WOOL)
		.displayName('Ancient White Wool');

	registry.create('legacy/wool_colored_yellow')
		.hardness(0.8)
		.resistance(0.8)
		.mapColor('yellow')
		.soundType(SoundType.WOOL)
		.displayName('Ancient Yellow Wool');

	const glassColors = [
		['black', 'black'],
		['blue', 'blue'],
		['brown', 'brown'],
		['cyan', 'cyan'],
		['gray', 'gray'],
		['green', 'green'],
		['light_blue', 'light_blue'],
		['lime', 'lime'],
		['magenta', 'magenta'],
		['orange', 'orange'],
		['pink', 'pink'],
		['purple', 'purple'],
		['red', 'red'],
		['silver', 'light_gray'],
		['white', 'white'],
		['yellow', 'yellow']
	];

	glassColors.forEach(color => {
		registry.create(`legacy/glass_${color[1]}`)
			.hardness(0.3)
			.resistance(0.3)
			.mapColor(color[1])
			.transparent(true)
			.defaultTranslucent()
			.soundType(SoundType.GLASS)
			.textureAll(`kubejs:block/legacy/glass_${color[0]}`)
			.displayName(`${global.toTitleCase(color[1].replace('_', ' '))} Stained Glass`);
	});

	registry.create('legacy/log_oak')
		.hardness(2)
		.resistance(2)
		.mapColor('wood')
		.soundType(SoundType.WOOD)
		.tagBlock('mineable/axe')
		.displayName('Ancient Oak Log')
		.textureSide('north', 'kubejs:block/legacy/log_oak')
		.textureSide('south', 'kubejs:block/legacy/log_oak')
		.textureSide('east', 'kubejs:block/legacy/log_oak')
		.textureSide('west', 'kubejs:block/legacy/log_oak')
		.textureSide('up', 'kubejs:block/legacy/log_oak_top')
		.textureSide('down', 'kubejs:block/legacy/log_oak_top')
		.property(BlockProperties.AXIS);

	registry.create('legacy/log_spruce')
		.hardness(2)
		.resistance(2)
		.mapColor('wood')
		.soundType(SoundType.WOOD)
		.tagBlock('mineable/axe')
		.displayName('Ancient Spruce Log')
		.textureSide('north', 'kubejs:block/legacy/log_spruce')
		.textureSide('south', 'kubejs:block/legacy/log_spruce')
		.textureSide('east', 'kubejs:block/legacy/log_spruce')
		.textureSide('west', 'kubejs:block/legacy/log_spruce')
		.textureSide('up', 'kubejs:block/legacy/log_spruce_top')
		.textureSide('down', 'kubejs:block/legacy/log_spruce_top')
		.property(BlockProperties.AXIS);

	registry.create('legacy/log_birch')
		.hardness(2)
		.resistance(2)
		.mapColor('wood')
		.soundType(SoundType.WOOD)
		.tagBlock('mineable/axe')
		.displayName('Ancient Birch Log')
		.textureSide('north', 'kubejs:block/legacy/log_birch')
		.textureSide('south', 'kubejs:block/legacy/log_birch')
		.textureSide('east', 'kubejs:block/legacy/log_birch')
		.textureSide('west', 'kubejs:block/legacy/log_birch')
		.textureSide('up', 'kubejs:block/legacy/log_birch_top')
		.textureSide('down', 'kubejs:block/legacy/log_birch_top')
		.property(BlockProperties.AXIS);

	registry.create('legacy/log_jungle')
		.hardness(2)
		.resistance(2)
		.mapColor('wood')
		.soundType(SoundType.WOOD)
		.tagBlock('mineable/axe')
		.displayName('Ancient Jungle Log')
		.textureSide('north', 'kubejs:block/legacy/log_jungle')
		.textureSide('south', 'kubejs:block/legacy/log_jungle')
		.textureSide('east', 'kubejs:block/legacy/log_jungle')
		.textureSide('west', 'kubejs:block/legacy/log_jungle')
		.textureSide('up', 'kubejs:block/legacy/log_jungle_top')
		.textureSide('down', 'kubejs:block/legacy/log_jungle_top')
		.property(BlockProperties.AXIS);

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

	registry.create('legacy/legacy_crying_obsidian')
		.hardness(50)
		.resistance(1200)
		.mapColor('purple')
		.soundType(SoundType.STONE)
		.tagBlock('mineable/pickaxe')
		.requiresTool(true)
		.displayName('Ancient Crying Obsidian')

	// registry.create('legacy/glowing_obsidian')
	//     .hardness(50)
	//     .resistance(1200)
	//     .lightLevel(1)
	//     .mapColor('purple')
	//     .soundType(SoundType.STONE)
	//     .tagBlock('mineable/pickaxe')
	//     .requiresTool(true)
	//     .displayName('Ancient Glowing Obsidian')

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
		.textureSide('up', 'kubejs:block/legacy/legacy_gold_top')
		.textureSide('down', 'kubejs:block/legacy/legacy_gold_bottom');

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
		.textureSide('up', 'kubejs:block/legacy/legacy_iron_top')
		.textureSide('down', 'kubejs:block/legacy/legacy_iron_bottom');

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
		.textureSide('up', 'kubejs:block/legacy/legacy_diamond_top')
		.textureSide('down', 'kubejs:block/legacy/legacy_diamond_bottom');;

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

});
