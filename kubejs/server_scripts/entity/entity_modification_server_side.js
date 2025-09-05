const $LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity')
const $Attributes = Java.loadClass("net.minecraft.world.entity.ai.attributes.Attributes")

const chapterMultipliers = {
	hp: [1.0, 1.0, 1.1, 2.6, 2.6, 3.2],
	damage: [1.0, 1.0, 1.1, 1.8, 1.8, 2.3],
	armor: [1.0, 1.0, 1.0, 2.0, 2.0, 2.75]
}

EntityEvents.spawned(event => {
	const entity = event.getEntity();
	const isHardcore = entity.getServer().getWorldData().isHardcore();

	if (entity instanceof $LivingEntity) {
		const chapters = event.getServer().getPersistentData().chapters || {};
		const currentStage = parseInt((chapters.current_stage || "chapter_0").replace('chapter_', ''));

		if (currentStage > 0) {

			if (currentStage > 1 && global.autoscaleMobs.includes(entity.type)) {

				const base = global.hpModifications[entity.type];
				if (!base) return;

				const
					health = Math.ceil(base[0] * chapterMultipliers.hp[currentStage]),
					damage = Math.ceil(base[1] * chapterMultipliers.damage[currentStage]),
					armor = Math.ceil(base[2] * chapterMultipliers.armor[currentStage]);

				entity.setAttributeBaseValue($Attributes.ARMOR, armor);
				entity.setAttributeBaseValue($Attributes.ATTACK_DAMAGE, damage);
				entity.maxHealth = health;
				entity.health = health;

			}
			else {

				const override = global.hpModifications[entity.type];
				if (!override) return;

				let [maxHealthArr, baseDamageArr, baseArmorArr] = override;

				if (Array.isArray(maxHealthArr)) {
					for (let i = currentStage; i > 0; i--) {
						if (maxHealthArr[i] != null) {
							const health = maxHealthArr[i];
							entity.maxHealth = health;
							entity.health = health;
							break;
						}
					}
				}
				if (Array.isArray(baseDamageArr)) {
					for (let i = currentStage; i > 0; i--) {
						if (baseDamageArr[i] != null) {
							const damage = baseDamageArr[i];
							entity.setAttributeBaseValue($Attributes.ATTACK_DAMAGE, damage);
							break;
						}
					}
				}
				if (Array.isArray(baseArmorArr)) {
					for (let i = currentStage; i > 0; i--) {
						if (baseArmorArr[i] != null) {
							const armor = baseArmorArr[i];
							entity.setAttributeBaseValue($Attributes.ARMOR, armor);
							break;
						}
					}
				}
			}
		}
		if (entity.type.includes('born_in_chaos_v1') && currentStage < 2) {
			let hp = global.hpModifications[entity.type][0];
			if (Array.isArray(hp)) {
				hp = hp[0];
			}
			entity.maxHealth = hp;
		}
	}

	if (entity.health) {
		entity.health = entity.maxHealth;
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

ServerEvents.loaded(event => {
	event.getServer().runCommandSilent(
		`/scoreboard players set @s trueEnding_settings.dragonhealth ${global.hpModifications['minecraft:ender_dragon'][0]}`
	)
})
