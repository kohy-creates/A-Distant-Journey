const $TreasureBag = Java.loadClass('com.majruszsdifficulty.items.TreasureBag')

/**
 * @type {Internal.EntityType_}
 */
global.bossMobs = [
	"minecraft:ender_dragon",
	"minecraft:wither",
	"minecraft:warden",
	global.bossMobsNoTreasureBag
]

/**
 * @type {Internal.EntityType_}
 */
global.bossMobsNoTreasureBag = [
	"witherstormmod:witherstorm",
	"witherstormmod:withered_symbiont",
	"botania:doppleganger",
	"cataclysm:ignis",
	"cataclysm:netherite_monstrosity",
	"cataclysm:ender_guardian",
	"cataclysm:the_harbinger",
	"cataclysm:the_leviathan",
	"cataclysm:ancient_remnant",
	"cataclysm:maledictus",
	"cataclysm:scylla",
	"unusualend:endstone_golem",
	"unusualend:enderblob_queen",
	"ars_nouveau:wilden_boss",
	"aether:slider",
	"aether:valkyrie_queen",
	"aether:sun_spirit",
	"alexscaves:luxtructosaurus",
	"the_bumblezone:cosmic_crystal_entity",
	"lost_aether_content:aerwhale_king",
	"rediscovered:red_dragon",
]

StartupEvents.registry('item', event => {

	function createTreasureBag(name) {
		let modAndEntity = name.split(':');
		let nameTitleCase = modAndEntity[1]
			.replace('_', ' ')
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');

		let lootTable = modAndEntity[0] + '_' + modAndEntity[1];

		event.createCustom('treasure_bag_' + modAndEntity[1], () => new $TreasureBag($ResourceLocation.fromNamespaceAndPath('kubejs', lootTable)))
			.displayName(nameTitleCase + ' Treasure Bag')

		let lootFilePath = 'kubejs/data/kubejs/loot_tables/treasure_bag/' + lootTable + '.json';
		if (!JsonIO.read(lootFilePath)) {
			JsonIO.write(lootFilePath, {});
			console.log(`Created missing loot table: ${lootFilePath}`);
		}

		let modelFilePath = 'kubejs/assets/kubejs/models/item/' + 'treasure_bag_' + modAndEntity[1] + '.json';
		if (!JsonIO.read(modelFilePath)) {
			JsonIO.write(modelFilePath, {
				parent: "item/generated",
				textures: {
					layer0: "additionaladditions:item/mysterious_bundle"
				}
			});
			console.log(`Created missing model: ${modelFilePath}`);
		}
	}

	global.bossMobsNoTreasureBag.forEach(mob => {
		createTreasureBag(mob);
	});

})