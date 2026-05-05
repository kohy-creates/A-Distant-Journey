const ExplosionDamage = {
	'minecraft:creeper': [150, true, 0.6, 1.0, 0.7],
	'born_in_chaos_v1:phantom_creeper_copy': [110, true, 0.6, 1.0, 0.6],
	'minecraft:wither_skull': [20, false, 0.8, 1.0, 0.5],
	'minecraft:tnt': [80, true, 0.5, 0.9, 0.5]
};

ADJServerEvents.explosionDamageCalc(event => {
	let damage = 20;

	const sourceEntity = event.getSourceEntity();
	const ownerEntity = event.getIndirectSourceEntity();
	const affectedEntity = event.getAffectedEntity();

	if (ExplosionDamage[sourceEntity.type]) {
		const entry = ExplosionDamage[sourceEntity.type];
		if (entry[1] == true) {
		}
		damage = entry[0];
		event.setFalloff(entry[2], entry[3], entry[4]);
	}
	event.setDamage(damage);
});
