// Remove all weapons from loot tables
// Or so I hope
LootJS.modifiers((event) => {
	event.removeGlobalModifier("@dungeonsweaponry");
	event.addLootTableModifier('dungeonsweaponry:chests/dungeonloot')
		.removeLoot(Ingredient.all)
});

// Recipes
ServerEvents.recipes(event => {
	event.remove({ mod: 'dungeonsweaponry' });

	event.shaped(
		Item.of('dungeonsweaponry:battlestaff'),
		[
			'S  ',
			' L ',
			'  S'
		],
		{
			S: 'stick',
			L: 'leather'
		}
	);
	event.shaped(
		Item.of('dungeonsweaponry:battlestaff'),
		[
			'  S',
			' L ',
			'S  '
		],
		{
			S: 'stick',
			L: 'leather'
		}
	)

	event.recipes.ars_nouveau.enchanting_apparatus(
		['#c:feathers', '#c:feathers', '#c:feathers', 'diamond', 'mythicmetals:hallowed_ingot'],
		'diamond_sword',
		'dungeonsweaponry:chill_gale_knife'
	)

	event.shaped(
		Item.of('dungeonsweaponry:hammer_of_gravity'),
		[
			'PBP',
			' D ',
			' E '
		],
		{
			P: Item.of('unusualend:pearlescent_ingot'),
			B: Item.of('unusualend:pearlescent_block'),
			D: Item.of('born_in_chaos_v1:dark_rod'),
			E: Item.of('majruszsdifficulty:enderium_shard'),
		}
	)

	event.shaped(
		Item.of('dungeonsweaponry:heartstealer'),
		[
			' S ',
			' A ',
			'RCR'
		],
		{
			R: Item.of('rediscovered:ruby'),
			A: Item.of('mythicmetals:adamantite_ingot'),
			S: Item.of('galosphere:silver_ingot'),
			C: Item.of('dungeonsweaponry:claymore'),
		}
	)

	event.shaped(
		Item.of('dungeonsweaponry:nameless_blade'),
		[
			'O ',
			'OC',
			' D'
		],
		{
			O: Item.of('obsidian'),
			C: Item.of('crying_obsidian'),
			D: Item.of('born_in_chaos_v1:dark_metal_ingot'),
		}
	)

	event.smithing(
		Item.of('dungeonsweaponry:claymore'),
		Item.of('galosphere:silver_upgrade_smithing_template'),
		Item.of('iron_sword'),
		Item.of('galosphere:silver_ingot'),
	)

	event.shaped(
		'dungeonsweaponry:dark_katana',
		[
			'  S',
			'DS ',
			'KD '
		],
		{
			S: 'born_in_chaos_v1:dark_metal_ingot',
			K: 'mythicmetals:stormyx_ingot',
			D: 'mythicmetals:steel_ingot'
		}
	)

	event.shaped(
		'dungeonsweaponry:frost_scythe',
		[
			'PPP',
			' IS',
			'SS '
		],
		{
			S: '#c:rods/wooden',
			P: 'born_in_chaos_v1:permafrost_shard',
			I: 'iron_ingot'
		}
	)

	event.shaped(
		'dungeonsweaponry:frost_slayer',
		[
			'PPP',
			'PCP',
			'PPP'
		],
		{
			P: 'born_in_chaos_v1:permafrost_shard',
			C: 'dungeonsweaponry:claymore'
		}
	)

	event.shaped(
		'dungeonsweaponry:glaive',
		[
			'  I',
			' S ',
			'S  '
		],
		{
			S: '#c:rods/wooden',
			I: 'iron_sword'
		}
	)

	event.shaped(
		'dungeonsweaponry:venom_glaive',
		[
			'WPW',
			'PGP',
			'WPW'
		],
		{
			G: 'dungeonsweaponry:glaive',
			W: 'wither_rose',
			P: 'mythicmetals:prometheum_ingot'
		}
	)
})

// Fix projectiles not having the Owner flag set
// Mostly prominent on Crossbows, I didn't test the Bows
const projectiles = [
	// "minecraft:arrow",
	// "minecraft:spectral_arrow",
	// "minecraft:firework_rocket",
	"dungeonsweaponry:dungeon_arrow"
]
EntityEvents.spawned(event => {
	const entity = event.getEntity();

	if (projectiles.includes(entity.type.toString()) && !entity.getNbt().contains('Owner')) {
		let nearestPlayer = event.level.getNearestPlayer(entity.x, entity.y, entity.z, 3, false);

		if (!nearestPlayer) return;

		if (nearestPlayer.mainHandItem.id.toString().includes('dungeonsweaponry')
			|| nearestPlayer.offhandItem.id.toString().includes('dungeonsweaponry')) {
			event.server.scheduleInTicks(1, () => {
				const command = 'data modify entity ' + entity.uuid + ' Owner set from entity ' + nearestPlayer.uuid + ' UUID'
				event.getLevel().runCommandSilent(
					command
				)
			})
		}
	}
})

// Changing on-kill effects
function wieldingWeapon(player, weapon) {
	return (player.mainHandItem.id.toString() === weapon
		|| player.offhandItem.id.toString() === weapon)
}

EntityEvents.death(event => {

	const source = event.getSource();
	const player = source.getPlayer();

	if (player) {

		if (wieldingWeapon(player, 'dungeonsweaponry:chill_gale_knife')) {
			player.addEffect(new $MobEffectInstance('speed', 100, 2, true, true, true))
		}
	}
});

const $MobEffectInstance = Java.loadClass(`net.minecraft.world.effect.MobEffectInstance`);

// Changing on-hit effects
EntityEvents.hurt(event => {
	const source = event.getSource();
	const player = source.getPlayer();

	if (player) {
		let entity = event.getEntity();
		event.server.scheduleInTicks(1, () => {
			if (wieldingWeapon(player, 'dungeonsweaponry:nameless_blade')) {
				entity.removeEffect("weakness");
				entity.addEffect(new $MobEffectInstance('weakness', 100, 0, true, true, true));
				entity.addEffect(new $MobEffectInstance('kubejs:armor_shred', 100, 0, true, true, true));
			}
		})

	}
})
