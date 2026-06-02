const ItemTraits = {
	overrides: {
		'can be placed': {
			add: [
				'end_crystal',
				/_boat$/,
				/_spawn_egg$/
			],
			remove: []
		},
		'material': {
			remove: []
		},
		'consumable': {
			'add': [
				/_spawn_egg$/,
			]
		}
	},
	/**
	 * @param {Internal.Item_} item 
	 * @returns {boolean}
	 */
	isThereOverrideFor: (item, trait, isRemove) => {
		const override = ItemTraits.overrides[trait];
		if (!override) return false;
		const addOrRemove = override[isRemove ? 'remove' : 'add'];
		if (!addOrRemove) return false;

		return addOrRemove.some(entry => {
			if (entry instanceof RegExp) {
				return entry.test(item.id);
			}
			return entry === item.id;
		});
	},
	materialList: new Set([typeof String]),
	cacheMaterials: () => {
		const level = Client.level;
		if (!level) return;

		level.getRecipeManager().getRecipes().forEach(recipe => {
			if (recipe.getId().toString().contains("repairing")) return;

			recipe.getIngredients().forEach(ing => {
				for (let ex of ing.getItemIds()) {
					ItemTraits.materialList.add(String(ex));
				}
			});
		});
	},
	extraTraitsPerTag: {
		'adj:vanity': 'vanity item',
		'adj:dyable_items': 'can be dyed',
		'minecraft:trim_materials': 'trim material',
		'adj:eyes': '<rainbow f=0.25 w=0><neon p=1 r=3>mythical eye</neon></rainbow>'
	}
};

NativeEvents.onEvent('low', false, $ItemTooltipEvent, /** @param {Internal.ItemTooltipEvent_} event */ event => {
	const itemStack = event.getItemStack();
	const item = itemStack.getItem();

	if (global.isItemDisabled(item.id) || UnavailableItems.cache.shouldHide(item.id)) return;

	const traits = [];
	if ((item instanceof $BlockItem || ItemTraits.isThereOverrideFor(item, 'can be placed') && !ItemTraits.isThereOverrideFor(item, 'can be placed', true))) {
		traits.push('can be placed');
	}

	if ((item.isEdible() || ItemTraits.isThereOverrideFor(item, 'consumable') && !ItemTraits.isThereOverrideFor(item, 'consumable', true))) {
		traits.push('consumable');
	}

	const equipmentSlot = $LivingEntity.getEquipmentSlotForItem(itemStack).toString();
	const isCurio = !CuriosApi.getCuriosHelper().getCurioTags(item).isEmpty();
	if ((item instanceof $Equipable || (equipmentSlot != 'MAINHAND' && equipmentSlot != 'OFFHAND') || isCurio || ItemTraits.isThereOverrideFor(item, 'equipable')) && !ItemTraits.isThereOverrideFor(item, 'equipable', true)) {
		traits.push('equipable');
	}

	if (ItemTraits.materialList.size <= 1) Utils.runAsync(() => ItemTraits.cacheMaterials());
	if (ItemTraits.materialList.has(String(item.id)) && !ItemTraits.isThereOverrideFor(item, 'material', true)) {
		traits.push('material');
	}

	for (let [tag, text] of Object.entries(ItemTraits.extraTraitsPerTag)) {
		if (itemStack.hasTag(tag)) {
			traits.push(text);
		}
	}

	let wip = [];
	let lines = [];
	let i = 0;
	let total = traits.length;
	for (let text of traits) {
		i++;
		wip.push(Component.gray(text).font('smallcaps'));
		if (i < 3 && i != total) {
			wip.push(Component.darkGray(' | ').bold());
		}
		if (i == 3 || i == total) {
			lines.push(wip)
			wip = [];
			i = 0;
			total -= 3;
		}
	}
	for (let a = lines.length - 1; a > -1; a--) {
		let entry = lines[a];
		let component = Component.empty();
		entry.forEach(e => component.append(e));
		event.getToolTip().add(1, component);
	}
});
