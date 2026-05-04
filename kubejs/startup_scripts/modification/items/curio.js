ItemEvents.modification(event => {

	event.modify('supplementaries:quiver', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute('attributeslib:arrow_damage', 'd24514f1-276b-4732-a92e-de1e47bd6996', 0.15, "addition")
				.addAttribute('attributeslib:arrow_velocity', 'd24514f1-276b-4732-a92e-de1e47bd6996', 0.4, "addition")
		);
	});

	event.modify('terra_curio:sorcerer_emblem', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute('ars_nouveau:ars_nouveau.perk.spell_damage', '378ef4cf-94c2-4432-95ce-95ee6c74d17a', 40, 'addition')
				.addAttribute('ars_nouveau:ars_nouveau.perk.max_mana', '378ef4cf-94c2-4432-95ce-95ee6c74d17a', 60, 'addition')
		);
	});

	event.modify('terra_curio:avenger_emblem', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute('kubejs:damage_dealt', '01737022-40a3-4aba-a062-9be48d052661', 0.12, "multiply_base")
		);
	});

	event.modify('terra_curio:destroyer_emblem', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute('attributeslib:crit_chance', '46118a26-23a3-4653-8312-254c5f975d3e', 0.1, "addition")
				.addAttribute('kubejs:damage_dealt', '46118a26-23a3-4653-8312-254c5f975d3e', 0.1, "multiply_base")
		);
	});

	event.modify('terra_curio:celestial_stone', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute('generic.attack_speed', '86695f4b-dd1d-4b4c-a5d0-e029556b5e76', 0.1, "multiply_base")
				.addAttribute('generic.armor', '86695f4b-dd1d-4b4c-a5d0-e029556b5e76', 4, "addition")
				.addAttribute('attributeslib:crit_chance', '86695f4b-dd1d-4b4c-a5d0-e029556b5e76', 0.02, "addition")
				.addAttribute('kubejs:damage_dealt', '86695f4b-dd1d-4b4c-a5d0-e029556b5e76', 0.1, "multiply_base")
		)
	})

	event.modify('terra_curio:putrid_scent', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute('attributeslib:crit_chance', 'c34266b0-9edb-4274-9e0a-cac12ab24803', 0.05, "addition")
				.addAttribute('kubejs:damage_dealt', 'c34266b0-9edb-4274-9e0a-cac12ab24803', 0.05, "multiply_base")
		)
	})

	event.modify('ars_nouveau:ring_of_lesser_discount', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute('adjcore:player.mana_cost_reduction', '75675432-ef02-4eed-9225-e44c433fb936', 0.08, 'addition')
				.addAttribute('ars_nouveau:ars_nouveau.perk.max_mana', '75675432-ef02-4eed-9225-e44c433fb936', 20, 'addition')
		);
	});

	event.modify('ars_nouveau:ring_of_greater_discount', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute('adjcore:player.mana_cost_reduction', '3cba6935-a4c0-46b6-973a-0f6138662685', 0.16, 'addition')
				.addAttribute('ars_nouveau:ars_nouveau.perk.max_mana', '3cba6935-a4c0-46b6-973a-0f6138662685', 30, 'addition')
		);
	});

	event.modify('cataclysm:chitin_claw', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute('forge:block_reach', '241fdb51-8a06-4fc1-bcaf-8520c75b29c1', 2, 'addition')
		);
	});

	event.modify('terra_curio:band_of_regeneration', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute('adjcore:generic.health_regeneration', '42c679df-5324-421c-8648-1b4440a51c0e', 1, 'addition')
		);
	});

	event.modify('aether:regeneration_stone', item => {
		item.attachCuriosCapability(
			CuriosJSCapabilityBuilder.create()
				.addAttribute('adjcore:generic.health_regeneration', '42c679df-5324-421c-8648-1b4440a51c0e', 4, 'addition')
		);
	});

	const gloves = {
		'aether:iron_gloves': {
			damage: 2,
			operation: 'addition',
			extra: []
		},
		'aether:golden_gloves': {
			damage: 2,
			operation: 'addition',
			extra: [
				{
					attribute: 'generic.luck',
					value: 1,
					operation: 'addition'
				}
			]
		},
		'aether:zanite_gloves': {
			damage: 0.06,
			operation: 'multiply_base',
			extra: [
				{
					attribute: 'adjcore:player.mana_cost_reduction',
					operation: 'addition',
					value: 0.05
				}
			]
		},
		'aether:diamond_gloves': {
			damage: 3,
			operation: 'addition',
			extra: []
		},
		'aether:leather_gloves': {
			damage: 1,
			operation: 'addition',
			extra: []
		},
		'aether:neptune_gloves': {
			damage: 0.06,
			operation: 'multiply_base',
			extra: [
				{
					attribute: 'forge:swim_speed',
					value: 0.25,
					operation: 'multiply_base'
				}
			]
		},
		'aether:phoenix_gloves': {
			damage: 0,
			operation: 'addition',
			extra: [
				{
					attribute: 'attributeslib:fire_damage',
					value: 4,
					operation: 'addition'
				}
			]
		},
		'aether:obsidian_gloves': {
			damage: 10,
			operation: 'addition',
			extra: [
				{
					attribute: 'generic.attack_speed',
					value: -0.25,
					operation: 'multiply_total'
				}
			]
		},
		'ancient_aether:valkyrum_gloves': {
			damage: 0,
			operation: 'addition',
			extra: [
				{
					attribute: 'forge:block_reach',
					value: 3,
					operation: 'addition'
				},
				{
					attribute: 'generic.attack_damage',
					value: 0.1,
					operation: 'multiply_base'
				}
			]
		},
		'aether:gravitite_gloves': {
			damage: 0.1,
			operation: 'multiply_base',
			extra: [
				{
					attribute: 'adjcore:player.mana_cost_reduction',
					operation: 'addition',
					value: 0.05
				},
				{
					attribute: 'ars_nouveau:perk.spell_damage',
					operation: 'addition',
					value: 8
				}
			]
		},
		'aether:netherite_gloves': {
			damage: 5,
			operation: 'addition',
			extra: [
				{
					attribute: 'attributeslib:crit_chance',
					value: 0.04,
					operation: 'addition'
				}
			]
		},
		'lost_aether_content:power_gloves': {
			damage: 0.05,
			operation: 'multiply_base',
			extra: [
				{
					attribute: 'generic.attack_knockback',
					value: 0.25,
					operation: 'addition'
				}
			]
		},
		'umbral_skies:ironwood_gloves': {
			damage: 0,
			operation: 'addition',
			extra: [
				{
					attribute: 'forge:block_reach',
					value: 1,
					operation: 'addition'
				},
				{
					attribute: 'forge:entity_reach',
					value: 1,
					operation: 'addition'
				}
			]
		},
		'umbral_skies:fiery_gloves': {
			damage: 0,
			operation: 'addition',
			extra: [
				{
					attribute: 'attributeslib:fire_damage',
					value: 3,
					operation: 'addition'
				}
			]
		},
		'umbral_skies:knightmetal_gloves': {
			damage: -0.04,
			operation: 'addition',
			extra: [
				{
					attribute: 'adjcore:generic.damage_reduction',
					value: 0.08,
					operation: 'addition'
				}
			]
		},
		'umbral_skies:yeti_gloves': {
			damage: 0,
			operation: 'addition',
			extra: [
				{
					attribute: 'attributeslib:cold_damage',
					value: 3,
					operation: 'addition'
				}
			]
		}
	};

	let i = 0;
	for (const [glove, entry] of Object.entries(gloves)) {
		event.modify(glove, item => {
			const capability = CuriosJSCapabilityBuilder.create();
			const uuid = `56a40da3-6e0c-4838-8842-e3b4638dcb${(i < 10) ? `0${i}` : i}`;

			if (entry.damage > 0) {
				capability.addAttribute(
					'generic.attack_damage',
					uuid,
					entry.damage,
					entry.operation || 'addition'
				)
			}

			entry.extra.forEach(element => {
				capability.addAttribute(
					element.attribute,
					uuid,
					element.value,
					element.operation || 'addition'
				)
			});

			item.attachCuriosCapability(capability)
		});
		i++;
	}
})