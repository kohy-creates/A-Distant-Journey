StartupEvents.registry('block', registry => {

    // registry.create('budding_chlorophyte');

    // registry.create('chlorophyte_block');

    function registerBlockSet(baseId, name, texture, hardness, resistance, tag, requiresTool, soundType, mapColor, extraTypes) {
        let types = [
            'basic',
            'stairs',
            'slab',
        ];
        if (extraTypes) types = types.concat(extraTypes);

        types.forEach(type => {
            registry.create(`${type == 'basic' ? baseId : `${baseId}_${type}`}`, type)
                .hardness(hardness)
                .resistance(resistance)
                .tagBlock(tag)
                .requiresTool(requiresTool)
                .mapColor(mapColor)
                .soundType(soundType)
                .textureAll(texture)
                .displayName(type == 'basic' ? name : `${name} ${global.toTitleCase(global.textReplaceAll(type, '_', ''))}`);
        });
    }

    registerBlockSet('cinnabar', 'Cinnabar', 'kubejs:block/cinnabar', 1.5, 6, 'mineable/pickaxe', true, 'deepslate', 'color_red', ['wall']);
    registerBlockSet('polished_cinnabar', 'Polished Cinnabar', 'kubejs:block/polished_cinnabar', 1.5, 6, 'mineable/pickaxe', true, 'deepslate', 'color_red', ['pressure_plate', 'wall']);
    registerBlockSet('cinnabar_bricks', 'Cinnabar Bricks', 'kubejs:block/cinnabar_bricks', 1.5, 6, 'mineable/pickaxe', true, 'deepslate_bricks', 'color_red', ['wall']);
    registry.create('chiseled_cinnabar')
        .hardness(1.5)
        .resistance(6)
        .soundType('deepslate_bricks')
        .displayName('Chiseled Cinnabar')
        .tagBlock('mineable/pickaxe')
        .requiresTool(true)
        .mapColor('color_red');

    registerBlockSet('sulfur', 'Sulfur', 'kubejs:block/sulfur', 1.5, 6, 'mineable/pickaxe', true, 'tuff', 'color_red', ['wall']);
    registerBlockSet('polished_sulfur', 'Polished Sulfur', 'kubejs:block/polished_sulfur', 1.5, 6, 'mineable/pickaxe', true, 'deepslate', 'color_red', ['pressure_plate', 'wall']);
    registerBlockSet('sulfur_bricks', 'Sulfur Bricks', 'kubejs:block/sulfur_bricks', 1.5, 6, 'mineable/pickaxe', true, 'deepslate_bricks', 'color_red', ['wall']);
    registry.create('chiseled_sulfur')
        .hardness(1.5)
        .resistance(6)
        .soundType('deepslate_bricks')
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
            .soundType('stone')
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
            .lightLevel(15)
            .hardness(1.5)
            .resistance(4)
            .mapColor(getMapColor(color))
            .soundType('stone')
            .displayName(global.toTitleCase(global.textReplaceAll(id, '_', ' ')))
            .requiresTool(true)
            .tagBlock('mineable/pickaxe')
            .tagBoth('adj:neon_block');

        // JsonIO.write(`kubejs/assets/kubejs/models/block/${id}.json`, {
        //     parent: "minecraft:block/cube_all",
        //     ambientocclusion: false,
        //     gui_light: "front",
        //     textures: {
        //         all: `kubejs:block/${id}`
        //     }
        // })
    }

    Color.DYE.forEach(c => registerAsphalt(c));
    Color.DYE.forEach(c => registerTiles(c));
    Color.DYE.forEach(c => registerDyedStoneBricks(c));
    Color.DYE.forEach(c => registerNeon(c));

    registry.create('white_stars_block')
        .mapColor('color_black')
        .soundType('amethyst')
        .hardness(1)
        .resistance(1.5)
        .tagBlock('mineable/pickaxe')
        .requiresTool(false)
        .displayName('White Starry Block');

    registry.create('gold_stars_block')
        .mapColor('color_black')
        .soundType('amethyst')
        .hardness(1)
        .resistance(1.5)
        .tagBlock('mineable/pickaxe')
        .requiresTool(false)
        .displayName('Gold Starry Block');

    registry.create('blue_stars_block')
        .mapColor('color_black')
        .soundType('amethyst')
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

    // registry.create('phantom_purpur_pillar')
    //     .textureSide('up', 'kubejs:block/phantom_purpur_pillar_top')
    //     .textureSide('down', 'kubejs:block/phantom_purpur_pillar_top')
    //     .textureSide('east', 'kubejs:block/phantom_purpur_pillar_side')
    //     .textureSide('west', 'kubejs:block/phantom_purpur_pillar_side')
    //     .textureSide('north', 'kubejs:block/phantom_purpur_pillar_side')
    //     .textureSide('south', 'kubejs:block/phantom_purpur_pillar_side')
    //     .displayName('Phantom Purpur Pillar')
    //     .property('axis')
    //     .hardness(1.5)
    //     .resistance(6)
    //     .tagBlock('mineable/pickaxe')
    //     .requiresTool(true);
});
