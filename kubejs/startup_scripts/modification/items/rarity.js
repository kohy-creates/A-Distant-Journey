/** @type {any} */
const $Rarity = Java.loadClass("net.minecraft.world.item.Rarity")
/** @type {any} */
const $UnaryOperator = Java.loadClass("java.util.function.UnaryOperator")
/** @type {any} */
const $UtilsJS = Java.loadClass("dev.latvian.mods.kubejs.util.UtilsJS")
/** @type {any} */
const $Style = Java.loadClass("net.minecraft.network.chat.Style")
const withColorMethod = $Style.EMPTY.class.declaredMethods.filter((method) => method.name.includes("m_131148_"))[0]

function obscureTooltipsPath(path) {
	return `kubejs/assets/adj/tooltips/${path}`
}

function darkenHex(hex, percent, noHash) {
	return ((noHash) ? '' : '#') + hex
		.replace('#', '')
		.match(/.{2}/g)
		.map(c => Math.max(0, Math.min(255, Math.round(parseInt(c, 16) * (1 - percent / 100)))))
		.map(c => c.toString(16).padStart(2, '0'))
		.join('');
}

function createRarity(/** @type {string} */ name, /** @type {number} */ colorCode) {
	let color = $UtilsJS.makeFunctionProxy("startup", $UnaryOperator, (style) => {
		return withColorMethod.invoke(style, Color.of(colorCode).createTextColorJS())
	})

	// ObscureTooltips integration
	JsonIO.write(obscureTooltipsPath(`definition/${name}.json`), {
		priority: 50,
		style: `adj:${name}`,
		filter: {
			type: "obscure_tooltips:rarity",
			rarity: `${name}`
		}
	})

	JsonIO.write(obscureTooltipsPath(`style/${name}.json`), {
		panel: `adj:${name}`,
		frame: "obscure_tooltips:default",
		slot: "obscure_tooltips:default",
		icon: "obscure_tooltips:default",
		effects: []
	})

	JsonIO.write(obscureTooltipsPath(`element/panel/${name}.json`), {
		type: "obscure_tooltips:color_rect",
		background_palette: {
			top_left: "@DEFAULT_PANEL_BACKGROUND_TOP",
			top_right: "@DEFAULT_PANEL_BACKGROUND_TOP",
			bottom_left: "@DEFAULT_PANEL_BACKGROUND_BOTTOM",
			bottom_right: "@DEFAULT_PANEL_BACKGROUND_BOTTOM"
		},
		border_palette: {
			top_left: `#60${colorCode.replace('#', '')}`,
			top_right: `#60${colorCode.replace('#', '')}`,
			bottom_left: `#50${darkenHex(colorCode, 25, true)}`,
			bottom_right: `#50${darkenHex(colorCode, 25, true)}`
		}
	})

	return $Rarity["create(java.lang.String,java.util.function.UnaryOperator)"](name, color)
}

createRarity("chapter_0", '#FFFFFF')
createRarity("chapter_0_uncommon", '#9696FF')
createRarity("chapter_0_rare", '#96FF96')
createRarity("chapter_1", '#FFC896')
createRarity("chapter_1_uncommon", '#FF9696')
createRarity("chapter_1_rare", '#FF96FF')
createRarity("chapter_2", '#D2A0FF')
createRarity("chapter_2_uncommon", '#96FF0A')
createRarity("chapter_2_rare", '#FFFF0A')
createRarity("chapter_3", '#05C8FF')
createRarity("chapter_3_uncommon", '#05C8FF')
createRarity("chapter_3_rare", '#B428FF')
createRarity("chapter_4", '#00FFC8')
createRarity("chapter_4_uncommon", '#00FF00')
createRarity("chapter_4_rare", '#2B60DE')
createRarity("chapter_5", '#6C2DC7')
createRarity("chapter_5_uncommon", '#FF00FF')
createRarity("chapter_5_rare", '#A3191A')
createRarity("chapter_6", '#ff288c')

ItemEvents.modification(event => {

	// For reference to self - editing those DOES impact the later Terraria-like rarity system
	event.modify([
		'terra_curio'
	], item => {
		item.rarity = 'common';
	});

	event.modify([
		/diamond/,
		'turtle_helmet',
		/zanite/,
		/orichalcum/,
		/mythril/,
		/palladium/,
		'ars_nouveau:novice_spell_book',
		'ars_nouveau:apprentice_spell_book',
		'ars_nouveau:archmage_spell_book',
		/obsidian/,
		'minecraft:potion',
		'the_bumblezone:potion_candle',
		/vinery:.*_wine/,
		/vinery:.*_mixture/,
		/vinery:.*_nectar/,
		/vinery:.*_fizz/,
		/vinery:.*_pinot/,
		/vinery:.*_grenache/,
		/vinery:.*_cider/,
		'vinery:eiswein',
		/ars_nouveau:.*essence/,
		'botanicadds:rune_energy',
		'botanicadds:rune_tp',
		'botania:rune_mana',
		'botania:rune_air',
		'botania:rune_fire',
		'botania:rune_earth',
		'botania:rune_water',
		'phantom_membrane',
		'rediscovered:purple_arrow',
		/music_disc/,
		'architects_palette:ender_pearl_block',
		'mythicmetals:osmium_chainmail_helmet',
		'mythicmetals:osmium_chainmail_chestplate',
		'mythicmetals:osmium_chainmail_leggings',
		'mythicmetals:osmium_chainmail_boots',
		/manasteel/,
		'botania:mana_powder',
		'ars_nouveau:source_gem',
		'ars_nouveau:source_gem_block',
		/botania:lens/,
		/botania:mana_/,
	], item => {
		item.rarity = 'uncommon';
	});

	event.modify([
		'ancient_debris',
		/veridium/,
		/netherite/,
		'netherexp:nether_pizza',
		/adamantite/,
		'vinery:villagers_fright',
		/witherstormmod:command_block_/,
		'botania:rune_spring',
		'botania:rune_summer',
		'botania:rune_autumn',
		'botania:rune_winter',
		/ars_elemental:.*essence/,
		'heart_crystals:heart_lantern',
		/banner_pattern/,
		'the_bumblezone:flower_headwear',
		'the_bumblezone:bee_soup',
		/ars_.*:thread.*/,
		'aether:altar',
		'aether:freezer',
		'aether:incubator'
	], item => {
		item.rarity = 'rare';
	});

	event.modify([
		/majruszsdifficulty\:enderium\_.*/,
		/creative/,
		/gravitite/,
		/treasure_bag/,
		/metallurgium/,
		/celestium/,
		/valkyrum/,
		/unobtainium/,
		/gaiasteel/,
		'minecraft:enchanted_book',
		'quark:ancient_tome',
		'botania:rune_lust',
		'botania:rune_pride',
		'botania:rune_envy',
		'botania:rune_gluttony',
		'botania:rune_wrath',
		'botania:rune_greed',
		'botania:rune_sloth',
		/the_bumblezone:essence/,
		'the_bumblezone:crystalline_flower',
		'the_bumblezone:stinger_spear',
		'the_bumblezone:bumble_bee_chestplate_trans_1',
		'the_bumblezone:bumble_bee_chestplate_trans_2',
		'the_bumblezone:windy_air',
		'aquamirae:coral_lance',
		/royal_jelly/,
		/experience_chunk/,
		'minecraft:experience_bottle',
		/ars_nouveau:arcanist/
	], item => {
		item.rarity = 'epic'
	});

	// Terraria-like rarity system
	function matchesAny(id, list) {
		// This looks weird but uhmm... Whatever works I guess
		return list.some(p => p instanceof RegExp ? p.test(id) : new RegExp(p).test(id))
	}

	function getRarity(chapter, baseRarity) {
		switch (baseRarity) {
			case 'epic': {
				let rar = Number.parseInt(chapter.replace('chapter_', ''));
				if (!rar) rar = 0;
				rar++;
				return `chapter_${rar}`
			};
			case 'rare':
			case 'uncommon': {
				return `${chapter}_${baseRarity}`;
			};
			default: {
				return chapter;
			}
		}
	}

	Item.getList().forEach(item => {
		const id = item.getId();

		let itemRarity = item.getRarity().name().toLowerCase();
		let foundMatch = false;
		let rarity = 'chapter_0';
		Object.keys(global.stageRestrictions).forEach(chapter => {
			const data = global.stageRestrictions[chapter];
			if (matchesAny(id, data.list) || matchesAny(id, data.light) && !matchesAny(id, data.exceptions)) {
				foundMatch = true;
				rarity = getRarity(chapter, itemRarity);
			}
		})
		if (!foundMatch) {
			rarity = getRarity('chapter_0', itemRarity);
		}
		event.modify(id, item => {
			item.rarity = rarity;
			item.fireResistant = (rarity != 'chapter_0');
		})
	});

	// Overrides
	event.modify([
		'quark:ancient_fruit'
	], item => {
		item.rarity = 'chapter_3_uncommon'
	})

	event.modify([
		'structure_gel:building_tool',
		/treasure_bag/
	], item => {
		item.rarity = 'chapter_6'
	})
});
