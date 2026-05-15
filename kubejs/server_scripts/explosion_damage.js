const ExplosionDamage = {
	'minecraft:creeper': [150, true, 0.6, 1.0, 0.7],
	'born_in_chaos_v1:phantom_creeper_copy': [110, true, 0.6, 1.0, 0.6],
	'minecraft:wither_skull': [36, false, 0.8, 1.0, 0.5],
	'minecraft:tnt': [80, true, 0.5, 0.9, 0.5],
	'cataclysm:flame_strike': [60, false, 0.75, 1.0, 0.60],
	'cataclysm:wither_missile': [110, false, 0.5, 1.0, 0.75],
};

ADJServerEvents.explosionDamageCalc(event => {
	let damage = 20;

	const sourceEntity = event.getSourceEntity();
	const ownerEntity = event.getIndirectSourceEntity();
	const affectedEntity = event.getAffectedEntity();

	if (ExplosionDamage[sourceEntity.type]) {
		const entry = ExplosionDamage[sourceEntity.type];
		damage = entry[0];
		if (entry[1] == true) {
			let chapter = global.getCurrentChapter(sourceEntity.getServer());
			let multiplier = EntityModifications.chapterMultipliers.damage[chapter];
			damage *= multiplier;
		}
		event.setFalloff(entry[2], entry[3], entry[4]);
	}
	event.setDamage(damage);
});
