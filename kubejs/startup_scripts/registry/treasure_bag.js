const $TreasureBag = Java.loadClass('com.majruszsdifficulty.items.TreasureBag')

/**
 * @type {Internal.EntityType_}
 */
global.bossMobs = [
	'minecraft:ender_dragon',
	'minecraft:wither',
	'minecraft:warden',
	global.bossMobsNoTreasureBag
]

/**
 * @type {Internal.EntityType_}
 */
global.bossMobsNoTreasureBag = [
	'witherstormmod:witherstorm',
	'witherstormmod:withered_symbiont',
	'botania:doppleganger',
	'cataclysm:ignis',
	'cataclysm:netherite_monstrosity',
	'cataclysm:ender_guardian',
	'cataclysm:the_harbinger',
	'cataclysm:the_leviathan',
	'cataclysm:ancient_remnant',
	'cataclysm:maledictus',
	'cataclysm:scylla',
	'unusualend:endstone_golem',
	'unusualend:enderblob_queen',
	'ars_nouveau:wilden_boss',
	'aether:slider',
	'aether:valkyrie_queen',
	'aether:sun_spirit',
	'alexscaves:luxtructosaurus',
	'lost_aether_content:aerwhale_king',
	'rediscovered:red_dragon',
	'twilightforest:naga',
	'twilightforest:lich',
	'twilightforest:minoshroom',
	'twilightforest:hydra',
	'twilightforest:knight_phantom',
	'twilightforest:ur_ghast',
	'twilightforest:alpha_yeti',
	'twilightforest:snow_queen',
	'twilightforest:plateau_boss',
	'ancient_aether:mutated_aechor_plant',
	'aquamirae:captain_cornelia'
]

StartupEvents.registry('item', event => {

	function createTreasureBag(name, suffix) {
		let modAndEntity = name.split(':');
		let nameTitleCase = modAndEntity[1]
			.replace('_', ' ')
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');

		if (suffix) {
			nameTitleCase += ` (${suffix.charAt(0).toUpperCase() + suffix.slice(1)})`;
		}

		let lootTable = modAndEntity[0] + '_' + modAndEntity[1] + (suffix ? `_${suffix}` : '');

		event.createCustom('treasure_bag_' + modAndEntity[1] + (suffix ? `_${suffix}` : ''), () =>
			new $TreasureBag($ResourceLocation.fromNamespaceAndPath('kubejs', 'treasure_bag/' + lootTable))
		)
			.displayName(nameTitleCase + ' Treasure Bag');

		let lootFilePath = 'kubejs/data/kubejs/loot_tables/treasure_bag/' + lootTable + '.json';
		if (!JsonIO.read(lootFilePath)) {
			JsonIO.write(lootFilePath, {});
			console.log(`Created missing loot table: ${lootFilePath}`);
		}

		let modelFilePath = 'kubejs/assets/kubejs/models/item/' + 'treasure_bag_' + modAndEntity[1] + (suffix ? `_${suffix}` : '') + '.json';
		if (!JsonIO.read(modelFilePath)) {
			JsonIO.write(modelFilePath, {
				parent: 'item/generated',
				textures: {
					layer0: 'kubejs:item/treasure_bag/placeholder'
				}
			});
			console.log(`Created missing model: ${modelFilePath}`);
		}
	}

	global.bossMobsNoTreasureBag.forEach(mob => {
		if (mob === 'botania:doppleganger') {
			createTreasureBag(mob);
			createTreasureBag(mob, 'hardmode');
		} else {
			createTreasureBag(mob);
		}
	});

});
