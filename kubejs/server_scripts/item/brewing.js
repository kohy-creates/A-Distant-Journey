NativeEvents.onEvent('normal', false, $PotionBrewEvent$Post, event => {

	/** @param {Internal.ItemStack_} potion */
	/** @param {Internal.ItemStack_} ingredient */
	function processPotion(index, potion, ingredient) {
		/** @type {Internal.CompoundTag_} */
		let tag = potion.getOrCreateTag();
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
				if (listJS.includes(ingredients[a])) {
					amount++;
				}
				if (amount == amountNeeded) {
					found = true;
					break inner;
				}
			}
			if (found) {
				tag.Potion = potionId;
				newPotion = true;
				break outer;
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
