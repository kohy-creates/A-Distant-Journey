NativeEvents.onEvent('normal', false, $PotionBrewEvent$Post, event => {

	/** @param {Internal.ItemStack_} potion */
	/** @param {Internal.ItemStack_} ingredient */
	function processPotion(index, potion, ingredient) {
		/** @type {Internal.CompoundTag_} */
		let tag = potion.getOrCreateTag();

		// Special cases
		switch (ingredient.getId()) {
			case 'minecraft:gunpowder':
				let thrownPotion = Item.of('minecraft:splash_potion', tag);
				event.setItem(index, thrownPotion);
				return;
			case 'minecraft:dragon_breath':
				let lingeringPotion = Item.of('minecraft:lingering_potion', tag);
				event.setItem(index, lingeringPotion);
				return;
			case 'minecraft:glow_ink_sac':
				let antidote = Item.of('sortilege:antidote', tag);
				event.setItem(index, antidote);
				return;
		}

		let list = global.getOrDefault(tag.ingredients, []);
		list.push(ingredient.getId());

		let newPotion = false;

		let listJS = [];
		list.forEach(/** @param {Internal.StringTag_} i */ i => {
			if (i instanceof String) listJS.push(i);
			else listJS.push(i.getAsString());
		});

		outer:
		for (let [potionId, ingredients] of Object.entries(global.potionRecipes)) {
			let found = false;
			let amountNeeded = ingredients.length;
			let amount = 0;
			inner:
			for (let a = 0; a < ingredients.length; a++) {
				let tested = ingredients[a];
				if (listJS.includes(ingredients[a])) {
					amount++;
				}
				if (amount == amountNeeded) {
					found = true;
					break inner;
				}
			}
			if (found) {
				if (potionId.startsWith('item:')) {
					let itemId = potionId.replace('item:', '');
					event.setItem(index, Item.of(itemId));
					return;
				}
				else {
					tag.Potion = potionId;
					newPotion = true;
					break outer;
				}
			}
		}

		if (newPotion) {
			tag.remove('ingredients');
		} else {
			tag.put('ingredients', list);
			tag.Potion = 'minecraft:awkward';
		}
		event.setItem(index, potion);
	}

	let ingredient = event.getItem(3);
	for (let i = 0; i < 3; i++) {
		let potion = event.getItem(i);
		if (potion.isEmpty()) continue;
		processPotion(i, potion, ingredient);
	}
});
