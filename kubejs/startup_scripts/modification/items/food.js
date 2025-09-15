ItemEvents.modification(event => {

	const nourishment = 'farmersdelight:nourishment'

	event.modify('aquamirae:poseidons_breakfast', item => {
		item.setFoodProperties(food => {
			food.removeEffect('obscure_api:fury')
				.removeEffect('obscure_api:rush')
				.effect(nourishment, duration("30:00"), 0, 1);
		})
	})

	event.modify('aquamirae:sea_stew', item => {
		item.setFoodProperties(food => {
			food.removeEffect('obscure_api:fury')
				.removeEffect('minecraft:strength')
				.effect(nourishment, duration("10:00"), 0, 1);
		})
	})

	event.modify('aquamirae:sea_casserole', item => {
		item.setFoodProperties(food => {
			food.removeEffect('obscure_api:rush');
		})
	})

	event.modify('honeycomb', item => {
		item.setFoodProperties(food => {
			food.effect('alexscaves:sugar_rush', duration("00:08"), 0, 0.1);
			food.hunger(2).saturation(0.1);
			food.fastToEat();
			food.alwaysEdible();
		})
	})

	/**
	 * @type {InputItem_[]}
	 */
	const fastToEat = [
		'beetroot',
		'delightful:source_berry_cookie',
		'arsdelight:source_berry_cookie',
		'minecraft:cookie',
		'farmersdelight:honey_cookie',
		'farmersdelight:sweet_berry_cookie',
		'delightful:glow_jam_cookie',
		'miners_delight:bat_cookie',
		'fruitsdelight:persimmon_cookie',
		'fruitsdelight:lemon_cookie',
		'fruitsdelight:cranberry_cookie',
		'fruitsdelight:bayberry_cookie',
		'upgrade_aquatic:boiled_pickerelweed',
		'sweet_berries',
		'glow_berries',
		'upgrade_aquatic:mulberry',
		/fruitsdelight\:.*_cookie/,
		/delightful\:.*_cookie/,
	]
	fastToEat.forEach(entry => {
		event.modify(entry, item => {
			item.setFoodProperties(food => {
				food.fastToEat();
			})
		})
	})

	/**
	 * @type {InputItem_[]}
	 */
	const rawFish = [
		'beef',
		'porkchop',
		'mutton',
		'chicken',
		'rabbit',
		'cod',
		'rediscovered:raw_fish',
		'salmon',
		'tide:pike',
		'upgrade_aquatic:pike',
		'upgrade_aquatic:perch',
		'upgrade_aquatic:lionfish',
		'netherdepthsupgrade:obsidianfish',
		'netherdepthsupgrade:searing_cod',
		'netherdepthsupgrade:bonefish',
		'netherdepthsupgrade:wither_bonefish',
		'netherdepthsupgrade:blazefish',
		'netherdepthsupgrade:magmacubefish',
		'netherdepthsupgrade:glowdine',
		'netherdepthsupgrade:eyeball_fish',
		/netherdepthsupgrade:.*_slice/,
		'tide:mint_carp',
		'tide:trout',
		'tide:angelfish',
		'tide:barracuda',
		'tide:sailfish',
		'tide:catfish',
		'tide:pike',
		'tide:bass',
		'tide:tuna',
		'tide:yellow_perch',
		'tide:ocean_perch',
		'tide:bluegill',
		'tide:mackarel',
		'unusualend:raw_bluk',
		'naturalist:catfish',
		'naturalist:bass',
		'alexsmobs:moose_ribs',
		'alexsmob:raw_catfish',
		'alexscaves:trilocaris_tail',
		'mynethersdelight:hoglin_loin',
		'farmersdelight:ham',
		'delightful:raw_goat',
		'born_in_chaos_v1:rotten_fish'
	]
	/**
	 * @type {InputItem_[]}
	 */
	const rawMeatNoFish = [
		'beef',
		'porkchop',
		'mutton',
		'chicken',
		'rabbit',
		'naturalist:duck',
		'farmersdelight:minced_beef',
		'miners_delight:squid',
		'miners_delight:glow_squid',
		'born_in_chaos_v1:monster_flesh'
	]

	const rawMeat = rawFish.concat(rawMeatNoFish);

	/**
	 * @type {[InputItem_|InputItem_[], number|number[]][]}
	 */
	const foodMap = [
		['apple', 2],
		['melon_slice', 1],
		['sweet_berries', 1],
		['glow_berries', 1],
		['upgrade_aquatic:mulberry', 1],
		['galosphere:lichen_cordyceps', 1],
		['galosphere:golden_lichen_cordyceps', 3],
		['chorus_fruit', 2],
		['golden_carrot', [5, 1.2]],
		['baked_potato', 4],
		[[
			'carrot',
			'potato',
			'miners_delight:cave_carrot'
		], [2, 0.3]],
		[rawMeat, [2, 0.2]],
		[[
			'cooked_beef',
			'cooked_porkchop',
			'cooked_mutton',
			'cooked_beef',
			'naturalist:cooked_duck'
		], [6, 0.6]],
		['rotten_flesh', [1, 0.2]],
		[[
			'cooked_cod',
			'cooked_salmon',
			'tide:cooked_fish',
			'upgrade_aquatic:cooked_pike',
			'upgrade_aquatic:cooked_perch',
			'upgrade_aquatic:cooked_lionfish'
		], [5, 0.6]],
		['bread', 6],
		// ['buzzier_bees:honey_bread', 7],
		// ['buzzier_bees:glazed_porkchop', [8, 0.8]],
		['berry_good:sweet_berry_mince', [3, 0.3]],
		['berry_good:glowgurt', [8, 0.8]],
		[['mushroom_stew', 'beetroot_soup', 'suspicious_stew'], [8, 1.0]],
		[['rabbit_stew'], [12, 1.1]],
		[[
			'cookie',
			/fruitsdelight\:.*_cookie/,
			/delightful\:.*_cookie/,
		], [1, 0.3]],
		['netherexp:hogham', [3, 0.4]],
		['mynethersdelight:burnt_roll', [5, 0.6]],
		['delightful:acorn', [1, 0.1]],
		['delightful:roasted_acorn', [3, 0.5]],
		['endersdelight:uncanny_cookies', [4, 0.5]],
		['endersdelight:chorus_stew', [6, 0.5]],
		['endersdelight:endermite_stew', [6, 0.5]],
		['dustydecorations:cooked_bratwurst', [8, 0.6]]

	];

	for (const [matcher, data] of foodMap) {
		event.modify(matcher, item => {
			item.setFoodProperties(food => {
				if (Array.isArray(data)) {
					food.hunger(data[0]);       // first = hunger
					food.saturation(data[1]);   // second = saturation
				} else {
					food.hunger(data);
				}
			});
		});
	}

	event.modify(rawMeat, item => {
		item.setFoodProperties(food => {
			food.effect('hunger', duration("0:30"), 0, 0.3)
		})
	})
});

function duration(string, mul) {
	let timeTotal, times = string.split(':');
	if (times.length === 3) {
		timeTotal =
			(parseInt(times[0]) * 60 * 60 * 20) + //Hours
			(parseInt(times[1]) * 60 * 20) + // Minutes
			(parseInt(times[2]) * 20); // Seconds
	} else if (times.length === 2) {
		timeTotal =
			(parseInt(times[0]) * 60 * 20) + // Minutes
			(parseInt(times[1]) * 20); // Seconds
	}
	if (mul) timeTotal *= mul;
	return timeTotal;
}