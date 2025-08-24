const $AbstractArrow = Java.loadClass('net.minecraft.world.entity.projectile.AbstractArrow')

EntityEvents.spawned(event => {
	const { entity } = event;
	const isHardcore = entity.getServer().getWorldData().isHardcore();
	if (entity instanceof $AbstractArrow) {
		entity.setBaseDamage(2.0)
	}
	switch (entity.type) {
		case 'minecraft:wither_skeleton': {
			entity.setItemSlot("mainhand", "golden_sword");

			if (isHardcore
				&& Math.random <= 0.1) {
				entity.setItemSlot("mainhand", "mythicmetals:midas_gold_sword");
				entity.setItemSlot("head", "mythicmetals:midas_gold_helmet");
			}
		}
		case 'minecraft:vindicator': {
			if (isHardcore) {
				entity.setItemSlot("mainhand", weightedRandom({
					'minecraft:iron_axe': 2,
					'minecraft:diamond_axe': 1,
				}))
			}
		}
	}
})

function weightedRandom(weightMap) {
	const entries = Object.entries(weightMap);
	const totalWeight = entries.reduce((sum, [, weight]) => sum + weight, 0);
	let random = Math.random() * totalWeight;

	for (const [value, weight] of entries) {
		if (random < weight) {
			return value;
		}
		random -= weight;
	}
}
