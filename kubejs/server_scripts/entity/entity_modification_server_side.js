const $LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity')
const $Attributes = Java.loadClass("net.minecraft.world.entity.ai.attributes.Attributes")

const chapterMultipliers = {
	hp: [1.0, 1.05, 1.1, 2.6, 2.6, 3.2],
	damage: [1.0, 1.05, 1.1, 1.8, 1.8, 2.3],
	armor: [1.0, 1.0, 1.0, 2.0, 2.0, 2.75]
}


// ---------------- HELPERS ---------------- //
function getStageValue(arr, stage) {
	if (!Array.isArray(arr)) return arr
	for (let i = stage; i > 0; i--) {
		if (arr[i] != null) return arr[i]
	}
	return null
}

function setEntityAttributes(entity, health, damage, armor) {
	if (health != null) {
		entity.maxHealth = health
		entity.health = health
	}
	if (damage != null) {
		entity.setAttributeBaseValue($Attributes.ATTACK_DAMAGE, damage)
	}
	if (armor != null) {
		entity.setAttributeBaseValue($Attributes.ARMOR, armor)
	}
}

function scaleEntity(entity, currentStage) {
	let base = global.hpModifications[entity.type]
	if (!base) return

	// Case 1: simple [hp, dmg, armor]
	if (Array.isArray(base) && !Array.isArray(base[0])) {
		let health = base[0] || 100,
			damage = base[1] || 15,
			armor = base[2] || 0;
		if (global.autoscaleMobs.includes(entity.type)) {
			health = Math.ceil(health * chapterMultipliers.hp[currentStage])
			damage = Math.ceil(damage * chapterMultipliers.damage[currentStage])
			armor = Math.ceil(armor * chapterMultipliers.armor[currentStage])
		}
		setEntityAttributes(entity, health, damage, armor)
		return;
	}

	// Case 2: arrays per stage (hp[], dmg[], armor[])
	if (Array.isArray(base)) {
		let hpArr = base[0]
		let dmgArr = base[1]
		let armorArr = base[2]

		let health = getStageValue(hpArr, currentStage)
		let damage = getStageValue(dmgArr, currentStage)
		let armor = getStageValue(armorArr, currentStage)

		setEntityAttributes(entity, health, damage, armor)
	}
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

/**
 * 
 * @param {Internal.Entity_} entity 
 */
function specialCase(entity) {
	switch (entity.type) {
		case 'quark:glass_frame':
		case 'quark:dyed_item_frame': {
			entity.kill()
			break
		}
	}
}

/**
 * 
 * @param {Internal.Entity_} entity 
 */
function hardcoreModifications(entity) {
	switch (entity.type) {
		case 'minecraft:wither_skeleton': {
			entity.setItemSlot("mainhand", "golden_sword")
			if (Math.random() <= 0.1) {
				entity.setItemSlot("mainhand", "mythicmetals:midas_gold_sword")
				entity.setItemSlot("head", "mythicmetals:midas_gold_helmet")
			}
			break
		}
		case 'minecraft:vindicator': {
			entity.setItemSlot("mainhand", weightedRandom({
				'minecraft:iron_axe': 2,
				'minecraft:diamond_axe': 1
			}));
			break
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
	if (isHardcore) {
		hardcoreModifications(entity)
	};
})

ServerEvents.loaded(function (event) {
	event.server.runCommandSilent(
		"/scoreboard players set @s trueEnding_settings.dragonhealth " + global.hpModifications['minecraft:ender_dragon'][0]
	)
})
