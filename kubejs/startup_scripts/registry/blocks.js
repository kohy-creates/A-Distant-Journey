StartupEvents.registry('block', registry => {

    registry.create('budding_chlorophyte');

    registry.create('chlorophyte_block');

    function registerBlockSet(baseId, name, texture, hardness, resistance, tag, requiresTool, soundType, mapColor, extraTypes) {
        let types = [
            'basic',
            'wall',
            'stairs',
            'slab',
        ];
        if (extraTypes) types.concat(extraTypes);
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

    registerBlockSet('cinnabar', 'Cinnabar', 'kubejs:block/cinnabar', 1.5, 6, 'mineable/pickaxe', true, 'deepslate', 'color_red');
    registerBlockSet('polished_cinnabar', 'Polished Cinnabar', 'kubejs:block/polished_cinnabar', 1.5, 6, 'mineable/pickaxe', true, 'deepslate', 'color_red', ['pressure_plate']);
    registerBlockSet('cinnabar_bricks', 'Cinnabar Bricks', 'kubejs:block/cinnabar_bricks', 1.5, 6, 'mineable/pickaxe', true, 'deepslate_bricks', 'color_red');
    registry.create('chiseled_cinnabar')
        .hardness(1.5)
        .resistance(6)
        .soundType('deepslate_bricks')
        .displayName('Chiseled Cinnabar')
        .tagBlock('mineable/pickaxe')
        .requiresTool(true)
        .mapColor('color_red');

    registerBlockSet('sulfur', 'Sulfur', 'kubejs:block/sulfur', 1.5, 6, 'mineable/pickaxe', true, 'tuff', 'color_red');
    registerBlockSet('polished_sulfur', 'Polished Sulfur', 'kubejs:block/polished_sulfur', 1.5, 6, 'mineable/pickaxe', true, 'deepslate', 'color_red', ['pressure_plate']);
    registerBlockSet('sulfur_bricks', 'Sulfur Bricks', 'kubejs:block/sulfur_bricks', 1.5, 6, 'mineable/pickaxe', true, 'deepslate_bricks', 'color_red');
    registry.create('chiseled_sulfur')
        .hardness(1.5)
        .resistance(6)
        .soundType('deepslate_bricks')
        .displayName('Chiseled Sulfur')
        .tagBlock('mineable/pickaxe')
        .requiresTool(true)
        .mapColor('color_red');
});
