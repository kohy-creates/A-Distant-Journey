const $LivingEntity = Java.loadClass('net.minecraft.world.entity.LivingEntity')
const $Attributes = Java.loadClass("net.minecraft.world.entity.ai.attributes.Attributes")

const EntityModifications = {
	chapterMultipliers: {
		hp: [1.0, 1.05, 1.1, 2.6, 2.6, 4.1],
		damage: [1.0, 1.05, 1.2, 2.2, 2.2, 3.5],
		armor: [1.0, 1.0, 1.15, 2.2, 2.2, 3.0]
	},
	_logic: {
		/**
		 * Helper function to get the value on mobs that have chapter-specific stats.
		 * @param {number[]} arr 
		 * @param {number} stage 
		 * @returns {number}
		 */
		getStageValue: function (arr, stage) {
			if (!Array.isArray(arr)) return arr
			for (let i = stage; i > 0; i--) {
				if (arr[i] != null) return arr[i]
			}
			return null
		},
		/**
		 * Helper function to set health of an entity.
		 * Separated in case I ever need to do anything else with it.
		 * @param {Internal.LivingEntity_} entity 
		 * @param {number} value 
		 */
		setHealth: function (entity, value) {
			entity.maxHealth = value;
			entity.health = value;
		},
		/**
		 * Helper function to update entity attribtues.
		 * Also separated in case I ever want to modify the logic.
		 * @param {Internal.LivingEntity_} entity 
		 * @param {number?} health 
		 * @param {number?} damage 
		 * @param {number?} armor 
		 */
		setEntityAttributes: function (entity, health, damage, armor) {
			if (health != null) this.setHealth(entity, health);
			if (damage != null) entity.setAttributeBaseValue($Attributes.ATTACK_DAMAGE, damage)
			if (armor != null) entity.setAttributeBaseValue($Attributes.ARMOR, armor)
			entity.setAttributeBaseValue($ALObjects.Attributes.CRIT_CHANCE.get(), 0);
		},
		/**
		 * Scales Boss HP based on the number of nearby players.
		 * @param {Internal.LivingEntity_} entity 
		 * @param {number} health
		 * @param {Internal.MinecraftServer_} server
		 * @returns {number}
		 */
		scaleBossHP: function (entity, health, server) {
			let extraPlayerCount = server.getPlayerCount() - 1;
			return health + health * (extraPlayerCount * 0.15);
		},
		/**
		 * The main function for scaling entity stats.
		 * @type {void}
		 * @param {Internal.LivingEntity_} entity 
		 * @param {number} currentStage 
		 * @param {Internal.MinecraftServer_} server
		 */
		scaleEntity: function (entity, currentStage, server) {
			let type = entity.type;
			let base = global.hpModifications[type]
			if (!base) return

			let health, damage, armor;

			// Case 1: simple [hp, dmg, armor]
			if (!Array.isArray(base[0])) {
				health = base[0] || 100;
				damage = base[1] || 15;
				armor = base[2] || 0;
				if (global.autoscaleMobs.includes(type)) {
					health = Math.ceil(health * EntityModifications.chapterMultipliers.hp[currentStage])
					damage = Math.ceil(damage * EntityModifications.chapterMultipliers.damage[currentStage])
					armor = Math.ceil(armor * EntityModifications.chapterMultipliers.armor[currentStage])
				}
			}
			// Case 2: arrays per stage (hp[], dmg[], armor[])
			else {
				health = this.getStageValue(base[0], currentStage);
				damage = this.getStageValue(base[1], currentStage);
				armor = this.getStageValue(base[2], currentStage);
			}

			if (global.entitiesScalingWithSize.includes(type)) {
				let size = entity.getNbt().getInt('Size');
				health *= Math.pow(2, size);
				damage += (damage * Math.ceil(size * 1.5));
				armor += (armor * size);
			}
			if (global.bossMobs.includes(type)) {
				health = this.scaleBossHP(entity, server);
			}
			this.setEntityAttributes(entity, health, damage, armor)
		}
	},
	_modifications: {
		/**
		 * Special case logic for certain mobs.
		 * This is just for handling very specific things a tick after the mob has spawned for various reasons.
		 * E.g. in the case of Nigthmare Stalkers, they weren't getting scaled properly on spawn and had to have their logic delayed.
		 * 
		 * I also use it to modify entity hitboxes with Pehkui.
		 * @param {Internal.LivingEntity_} entity 
		 * @param {number} currentStage 
		 * @param {Internal.MinecraftServer_} server
		 */
		specialCase: function (entity, currentStage, server) {
			let uuid = entity.getUuid();
			switch (entity.type) {
				case 'minecraft:villager':
				case 'minecraft:wandering_trader':
				case 'born_in_chaos_v1:nightmare_stalker': {
					EntityModifications._logic.scaleEntity(entity, currentStage);
					break;
				}
				case 'minecraft:warden': {
					server.runCommand(`/scale set pehkui:hitbox_width 3.0 ${uuid}`);
					break;
				}
				case 'minecraft:wither': {
					server.runCommand(`/scale set pehkui:hitbox_width 3.5 ${uuid}`);
					server.runCommand(`/scale set pehkui:hitbox_height 1.5 ${uuid}`);
					break;
				}
			}
		},

		/**
		 * Sets a mob's spawning gear.
		 * @param {Internal.LivingEntity_} entity 
		 * @param {boolean} isHardcore 
		 * @param {number} currentStage 
		 */
		setGear: function (entity, isHardcore, currentStage) {
			switch (entity.type) {
				case 'minecraft:piglin': {
					entity.setItemSlot('mainhand', global.weightedRandom({
						'minecraft:golden_sword': 8,
						'mcdw:crossbow_pride_of_the_piglins': 8,
						'minecraft:golden_axe': 4,
						// 'minecraft:golden_pickaxe': 4,
					}));
					break;
				}

				case 'minecraft:stray':
				case 'minecraft:skeleton': {
					if (entity.getLevel().getDimension() == 'minecraft:the_nether') {
						entity.setItemSlot('mainhand', global.weightedRandom({
							'mcdw:bow_bonebow': 10,
							'mcwd:bow_twisting_vine_bow': 4,
							'mcwd:bow_twisting_weeping_bow': 4,
						}));
						entity.setDropChance('mainhand', 0.05);
					}
					else if (currentStage >= 3) {
						entity.setItemSlot('mainhand', 'mcdw:bow_power_bow');
					}
					break;
				}

				case 'minecraft:wither_skeleton': {
					const main = global.weightedRandom({
						'golden_sword': 14,
						'mcdw:scythe_soul_scythe': 1
					});
					entity.setItemSlot("mainhand", main);
					if (main.startsWith('mcdw:')) {
						entity.setDropChance("mainhand", 1.0);
					}
					break;
				}

				case 'witherstormmod:sickened_zombie':
				case 'minecraft:husk':
				case 'minecraft:zombie': {
					entity.setItemSlot("mainhand", global.weightedRandom({
						'minecraft:air': (isHardcore) ? 35 : 44,
						'mythicmetals:copper_axe': 1,
						'mythicmetals:copper_shovel': 2,
						'mythicmetals:copper_hoe': 2,
						'mythicmetals:copper_sword': 1
					}));

					if ((isHardcore) ? global.ifRandomChance(15) : global.ifRandomChance(10)) {
						entity.setItemSlot("head", 'slime_block');
						entity.setDropChance("head", (isHardcore) ? 1.0 : 0.5);
					}

					if (global.ifRandomChance(12)) {
						entity.setItemSlot('offhand', Item.of('torch', global.getRandomInt(4, 11)));
						entity.setDropChance("offhand", 1.0);
					}

					if (entity.type == 'minecraft:husk') {
						if (global.ifRandomChance(2)) {
							entity.setItemSlot("head", 'alexsmobs:sombrero');
						}
					}
					break;
				}

				case 'witherstormmod:sickened_vindicator':
				case 'minecraft:vindicator': {
					const main = global.weightedRandom({
						'mcdw:scythe_jailors_scythe': 1,
						'iron_axe': 9
					});
					entity.setItemSlot("mainhand", main);
					if (main.startsWith('mcdw:')) {
						entity.setDropChance("mainhand", 1.0);
					}
					break;
				}

				case 'twilightforest:skeleton_druid': {
					entity.setItemSlot("mainhand", 'simplyswords:mythicmetals_compat/bronze/bronze_scythe');
					break;
				}
			}

		},
		/**
		 * Applies Hardcore-specific entity modifications and buffs.
		 * This only runs on Hardcore worlds.
		 * @param {Internal.LivingEntity_} entity 
		 */
		hardcoreModifications: function (entity) {
			setHealth(entity, Math.ceil(entity.maxHealth * 1.5));
			entity.setAttributeBaseValue($ALObjects.Attributes.CRIT_CHANCE.get(), 0.1);
			switch (entity.type) {
				case 'minecraft:wither_skeleton': {
					if (global.ifRandomChance(10)) {
						entity.setItemSlot("mainhand", "mythicmetals:midas_gold_sword");
						entity.setItemSlot("head", "mythicmetals:midas_gold_helmet");
						entity.setItemSlot("chest", "mythicmetals:midas_gold_chestplate");
					}
					break;
				}

				case 'witherstormmod:sickened_vindicator':
				case 'minecraft:vindicator': {
					entity.setItemSlot("mainhand", global.weightedRandom({
						'mcdw:scythe_jailors_scythe': 2,
						'minecraft:iron_axe': 9,
						'minecraft:diamond_axe': 2

					}));
					break;
				}

				case 'twilightforest:skeleton_druid': {
					entity.setItemSlot("head", 'mythicmetals:bronze_helmet');
					break;
				}

				case 'minecraft:piglin_brute': {
					entity.setItemSlot('head', 'mythicmetals:midas_gold_helmet');
					entity.setItemSlot('chest', 'mythicmetals:midas_gold_chestplate');
					entity.setItemSlot('mainhand', 'mythicmetals:midas_gold_axe');
					entity.setItemSlot('offhand', 'shieldexpansion:gold_shield');
					break;
				}
			}
		}


	}

};

// Events
EntityEvents.spawned((event) => {
	let entity = event.entity;

	if (entity.getType() === 'minecraft:player') return;
	const tags = entity.getTags().toArray();
	if (!global.scaleThroughChapters.includes(entity.getType())) {
		if (!tags.includes('adj.scaled')) {
			entity.addTag('adj.scaled');
		}
		else return;
	}

	if (!(entity instanceof $LivingEntity)) return;

	let server = event.server;
	let isHardcore = server.worldData.isHardcore();
	let currentStage = global.getCurrentChapter(server);

	EntityModifications._logic.scaleEntity(entity, currentStage, server);
	EntityModifications._modifications.setGear(entity, isHardcore, currentStage);
	if (isHardcore) {
		EntityModifications._modifications.hardcoreModifications(entity);
	};

	server.scheduleInTicks(1, () => {
		EntityModifications._modifications.specialCase(entity, currentStage, server);
	});
})
