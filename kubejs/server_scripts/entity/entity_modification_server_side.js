const $LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity')
const $Attributes = Java.loadClass("net.minecraft.world.entity.ai.attributes.Attributes")

const chapterMultipliers = {
	hp: [1.0, 1.05, 1.1, 2.0, 2.0, 3.2],
	damage: [1.0, 1.05, 1.2, 1.9, 1.9, 2.6],
	armor: [1.0, 1.0, 1.05, 2.2, 2.2, 2.75]
}

// ---------------- HELPERS ---------------- //
function getStageValue(arr, stage) {
	if (!Array.isArray(arr)) return arr
	for (let i = stage; i > 0; i--) {
		if (arr[i] != null) return arr[i]
	}
	return null
}

function setHealth(entity, value) {
	entity.maxHealth = value;
	entity.health = value;
}

function setEntityAttributes(entity, health, damage, armor) {
	if (health != null) {
		setHealth(entity, health);
	}
	if (damage != null) {
		entity.setAttributeBaseValue($Attributes.ATTACK_DAMAGE, damage)
	}
	if (armor != null) {
		entity.setAttributeBaseValue($Attributes.ARMOR, armor)
	}
}

const entitiesScalingWithSize = [
	'minecraft:magma_cube',
	'minecraft:slime',
	'minecraft:phantom',
	'the_bumblezone:honey_slime'
]

/**
 * @param {Internal.LivingEntity_} entity 
 * @param {number} currentStage 
 */
function scaleEntity(entity, currentStage) {
	let base = global.hpModifications[entity.type]
	if (!base) return

	let health, damage, armor;

	// Case 1: simple [hp, dmg, armor]
	if (!Array.isArray(base[0])) {
		health = base[0] || 100;
		damage = base[1] || 15;
		armor = base[2] || 0;
		if (global.autoscaleMobs.includes(entity.type)) {
			health = Math.ceil(health * chapterMultipliers.hp[currentStage])
			damage = Math.ceil(damage * chapterMultipliers.damage[currentStage])
			armor = Math.ceil(armor * chapterMultipliers.armor[currentStage])
		}
	}
	// Case 2: arrays per stage (hp[], dmg[], armor[])
	else {
		let hpArr = base[0]
		let dmgArr = base[1]
		let armorArr = base[2]

		health = getStageValue(hpArr, currentStage)
		damage = getStageValue(dmgArr, currentStage)
		armor = getStageValue(armorArr, currentStage)
	}

	if (entitiesScalingWithSize.includes(entity.type)) {
		let size = entity.getNbt().getInt('Size');
		health *= Math.pow(2, size + 1)
	}
	setEntityAttributes(entity, health, damage, armor)
}

function weightedRandom(weightMap) {
	let entries = Object.keys(weightMap)
	let totalWeight = 0
	for (let i = 0; i < entries.length; i++) {
		totalWeight += weightMap[entries[i]]
	}
	let random = Math.random() * totalWeight
	for (let j = 0; j < entries.length; j++) {
		let key = entries[j]
		let weight = weightMap[key]
		if (random < weight) return key
		random -= weight
	}
}

function randomChance(chance) {
	return (Math.random() <= chance / 100)
}

function randomAmount(min, max) {
	return (Math.floor(Math.random() * (max - min + 1)) + min)
}

/**
 * 
 * @param {Internal.Entity_} entity 
 */
function specialCase(entity) {
	// switch (entity.type) {
	// 	case 'quark:glass_frame':
	// 	case 'quark:dyed_item_frame': {
	// 		entity.kill()
	// 		break
	// 	}
	// }
}

/**
 * 
 * @param {Internal.LivingEntity_} entity 
 */
function setGear(entity, isHardcore) {
	switch (entity.type) {
		case 'minecraft:piglin': {
			entity.setItemSlot('mainhand', weightedRandom({
				'minecraft:golden_sword': 8,
				'mcdw:crossbow_pride_of_the_piglins': 8,
				'minecraft:golden_axe': 4,
				'minecraft:golden_pickaxe': 4,
			}))
			break;
		}
		case 'minecraft:skeleton': {
			if (entity.getLevel().getDimension() == 'minecraft:the_nether') {
				entity.setItemSlot('mainhand', 'mcdw:bow_bonebow')
			}
			break;
		}
		case 'minecraft:wither_skeleton': {
			const main = weightedRandom({
				'golden_sword': 14,
				'mcdw:scythe_soul_scythe': 1
			});
			entity.setItemSlot("mainhand", main);
			if (main.startsWith('mcdw:')) {
				entity.setDropChance("mainhand", 1.0);
			}
			break;
		}

		case 'minecraft:husk':
		case 'minecraft:zombie': {
			entity.setItemSlot("mainhand", weightedRandom({
				'minecraft:air': 44,
				'mythicmetals:copper_axe': 1,
				'mythicmetals:copper_shovel': 2,
				'mythicmetals:copper_hoe': 2,
				'mythicmetals:copper_sword': 1
			}));

			if ((isHardcore) ? randomChance(15) : randomChance(12)) {
				entity.setItemSlot("head", 'slime_block');
				entity.setDropChance("head", 1.0);
			}

			if (randomChance(15)) {
				entity.setItemSlot('offhand', Item.of('torch', randomAmount(7, 15)));
				entity.setDropChance("offhand", 1.0);
			}

			if (entity.type == 'minecraft:husk') {
				if (randomChance(2)) {
					entity.setItemSlot("head", 'alexsmobs:sombrero');
				}
			}
			break;
		}

		case 'minecraft:vindicator': {
			const main = weightedRandom({
				'mcdw:scythe_jailors_scythe': 1,
				'iron_axe': 9
			});
			entity.setItemSlot("mainhand", main);
			if (main.startsWith('mcdw:')) {
				entity.setDropChance("mainhand", 1.0);
			}
			break;
		}
	}

}

/**
 * 
 * @param {Internal.LivingEntity_} entity 
 */
function hardcoreModifications(entity) {
	setHealth(entity, Math.ceil(entity.maxHealth * 1.5));
	switch (entity.type) {
		case 'minecraft:wither_skeleton': {
			if (randomChance(10)) {
				entity.setItemSlot("mainhand", "mythicmetals:midas_gold_sword")
				entity.setItemSlot("head", "mythicmetals:midas_gold_helmet")
				entity.setItemSlot("chest", "mythicmetals:midas_gold_chestplate")
			}
			break;
		}
		case 'minecraft:vindicator': {
			entity.setItemSlot("mainhand", weightedRandom({
				'mcdw:scythe_jailors_scythe': 2,
				'minecraft:iron_axe': 9,
				'minecraft:diamond_axe': 2
			}));
			break;
		}
	}
}

// ---------------- EVENTS ---------------- //
EntityEvents.spawned((event) => {
	let entity = event.entity
	entity.server.scheduleInTicks(1, () => {
		specialCase(entity)
	})

	if (!(entity instanceof $LivingEntity)) return

	let isHardcore = event.server.worldData.isHardcore()
	let chapters = event.server.persistentData.chapters || {}
	let currentStage = parseInt((chapters.current_stage || "chapter_0").replace("chapter_", ""))

	scaleEntity(entity, currentStage)
	setGear(entity, isHardcore)
	if (isHardcore) {
		hardcoreModifications(entity)
	};
})

ServerEvents.loaded(function (event) {
	event.server.runCommandSilent(
		"/scoreboard players set @s trueEnding_settings.dragonhealth " + global.hpModifications['minecraft:ender_dragon'][0]
	)
})
