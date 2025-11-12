ItemEvents.modification(event => {

	event.modify('supplementaries:quiver', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'attributeslib:arrow_damage',
					'd24514f1-276b-4732-a92e-de1e47bd6996',
					0.15,
					"addition"
				)
				.addAttribute(
					'attributeslib:arrow_velocity',
					'd24514f1-276b-4732-a92e-de1e47bd6996',
					0.4,
					"addition"
				)
		)
	})

	event.modify('confluence:sorcerer_emblem', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.spell_damage',
					'378ef4cf-94c2-4432-95ce-95ee6c74d17a',
					6,
					"addition"
				)
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.max_mana',
					'378ef4cf-94c2-4432-95ce-95ee6c74d17a',
					30,
					"addition"
				)
		)
	})

	event.modify('confluence:avenger_emblem', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.spell_damage',
					'01737022-40a3-4aba-a062-9be48d052661',
					10,
					"addition"
				)
				.addAttribute(
					'generic.attack_damage',
					'01737022-40a3-4aba-a062-9be48d052661',
					0.12,
					"multiply_base"
				)
				.addAttribute(
					'attributeslib:arrow_damage',
					'01737022-40a3-4aba-a062-9be48d052661',
					0.12,
					"addition"
				)
		)
	})

	event.modify('confluence:destroyer_emblem', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.spell_damage',
					'46118a26-23a3-4653-8312-254c5f975d3e',
					8,
					"addition"
				)
				.addAttribute(
					'attributeslib:crit_chance',
					'46118a26-23a3-4653-8312-254c5f975d3e',
					0.15,
					"addition"
				)
				.addAttribute(
					'generic.attack_damage',
					'46118a26-23a3-4653-8312-254c5f975d3e',
					0.1,
					"multiply_base"
				)
				.addAttribute(
					'attributeslib:arrow_damage',
					'46118a26-23a3-4653-8312-254c5f975d3e',
					0.1,
					"addition"
				)
		)
	})

	event.modify('confluence:celestial_stone', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'generic.attack_speed',
					'86695f4b-dd1d-4b4c-a5d0-e029556b5e76',
					0.1,
					"multiply_base"
				)
				.addAttribute(
					'generic.attack_damage',
					'86695f4b-dd1d-4b4c-a5d0-e029556b5e76',
					0.1,
					"multiply_base"
				)
				.addAttribute(
					'generic.armor',
					'86695f4b-dd1d-4b4c-a5d0-e029556b5e76',
					4,
					"addition"
				)
				.addAttribute(
					'attributeslib:crit_chance',
					'86695f4b-dd1d-4b4c-a5d0-e029556b5e76',
					0.02,
					"addition"
				)
				.addAttribute(
					'attributeslib:arrow_damage',
					'86695f4b-dd1d-4b4c-a5d0-e029556b5e76',
					0.1,
					"multiply_base"
				)
				.addAttribute(
					'attributeslib:arrow_damage',
					'86695f4b-dd1d-4b4c-a5d0-e029556b5e76',
					0.1,
					"addition"
				)
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.spell_damage',
					'86695f4b-dd1d-4b4c-a5d0-e029556b5e76',
					3,
					"addition"
				)
		)
	})

	event.modify('confluence:putrid_scent', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.spell_damage',
					'c34266b0-9edb-4274-9e0a-cac12ab24803',
					2,
					"addition"
				)
				.addAttribute(
					'attributeslib:crit_chance',
					'c34266b0-9edb-4274-9e0a-cac12ab24803',
					0.05,
					"addition"
				)
				.addAttribute(
					'generic.attack_damage',
					'c34266b0-9edb-4274-9e0a-cac12ab24803',
					0.05,
					"multiply_total"
				)
				.addAttribute(
					'attributeslib:arrow_damage',
					'c34266b0-9edb-4274-9e0a-cac12ab24803',
					0.05,
					"addition"
				)
		)
	})

	event.modify('ars_nouveau:ring_of_lesser_discount', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'adjcore:player.mana_cost_reduction',
					'75675432-ef02-4eed-9225-e44c433fb936',
					0.08,
					'addition'
				)
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.mana_regen',
					'75675432-ef02-4eed-9225-e44c433fb936',
					1,
					'addition'
				)
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.max_mana',
					'75675432-ef02-4eed-9225-e44c433fb936',
					20,
					'addition'
				)
		)
	})

	event.modify('ars_nouveau:ring_of_greater_discount', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'adjcore:player.mana_cost_reduction',
					'3cba6935-a4c0-46b6-973a-0f6138662685',
					0.16,
					'addition'
				)
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.mana_regen',
					'3cba6935-a4c0-46b6-973a-0f6138662685',
					2,
					'addition'
				)
				.addAttribute(
					'ars_nouveau:ars_nouveau.perk.max_mana',
					'3cba6935-a4c0-46b6-973a-0f6138662685',
					20,
					'addition'
				)
		)
	})

	event.modify('cataclysm:chitin_claw', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute(
					'forge:block_reach',
					'241fdb51-8a06-4fc1-bcaf-8520c75b29c1',
					2,
					'addition'
				)
		)
	})

	/**
	 * @type {Record<string, { damage: number, operation: number, extra: { attribute: string, value: number, operation: number }[] }>}
	 */
	const gloves = {
		'aether:iron_gloves': {
			damage: 2,
			operation: 0,
			extra: []
		},
		'aether:golden_gloves': {
			damage: 2,
			operation: 0,
			extra: [
				{
					attribute: 'generic.luck',
					value: 1,
					operation: 0
				}
			]
		},
		'aether:zanite_gloves': {
			damage: 0.06,
			operation: 1,
			extra: [
				{
					attribute: 'adjcore:player.mana_cost_reduction',
					operation: 0,
					value: 0.05
				}
			]
		},
		'aether:diamond_gloves': {
			damage: 3,
			operation: 0,
			extra: []
		},
		'aether:leather_gloves': {
			damage: 1,
			operation: 0,
			extra: []
		},
		'aether:neptune_gloves': {
			damage: 0.06,
			operation: 1,
			extra: [
				{
					attribute: 'forge:swim_speed',
					value: 0.25,
					operation: 1
				}
			]
		},
		'aether:phoenix_gloves': {
			damage: 0,
			operation: 0,
			extra: [
				{
					attribute: 'attributeslib:fire_damage',
					value: 4,
					operation: 0
				}
			]
		},
		'aether:obsidian_gloves': {
			damage: 10,
			operation: 0,
			extra: [
				{
					attribute: 'generic.attack_speed',
					value: -0.25,
					operation: 2
				}
			]
		},
		'aether:valkyrie_gloves': {
			damage: 5,
			operation: 0,
			extra: [
				{
					attribute: 'forge:block_reach',
					value: 3,
					operation: 0
				}
			]
		},
		'aether:gravitite_gloves': {
			damage: 0.1,
			operation: 1,
			extra: [
				{
					attribute: 'adjcore:player.mana_cost_reduction',
					operation: 0,
					value: 0.05
				}
			]
		},
		'aether:netherite_gloves': {
			damage: 4,
			operation: 0,
			extra: [
				{
					attribute: 'attributeslib:crit_chance',
					value: 0.05,
					operation: 0
				}
			]
		},
		'lost_aether_content:power_gloves': {
			damage: 0.05,
			operation: 1,
			extra: [
				{
					attribute: 'generic.attack_knockback',
					value: 0.25,
					operation: 0
				}
			]
		}
	};

	for (const [glove, entry] of Object.entries(gloves)) {
		event.modify(glove, item => {
			const capability = CuriosJSCapabilityBuilder.create();
			if (entry.damage > 0) {
				capability.addAttribute(
					'generic.attack_damage',
					'56a40da3-6e0c-4838-8842-e3b4638dcbb3',
					entry.damage,
					$Operation.fromValue(entry.operation || 0)
				)
			}

			entry.extra.forEach(element => {
				capability.addAttribute(
					element.attribute,
					'56a40da3-6e0c-4838-8842-e3b4638dcbb3',
					element.value,
					$Operation.fromValue(element.operation || 0)
				)
			});

			item.attachCuriosCapability(capability)
		})
	}
})