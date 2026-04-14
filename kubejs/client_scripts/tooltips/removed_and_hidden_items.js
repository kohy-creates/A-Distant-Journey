(() => {
	const $ItemTooltipEvent = Java.loadClass('net.minecraftforge.event.entity.player.ItemTooltipEvent');
	const $ItemAttributeModifierEvent = Java.loadClass('net.minecraftforge.event.ItemAttributeModifierEvent');

	NativeEvents.onEvent('lowest', false, $ItemTooltipEvent, /** @param {Internal.ItemTooltipEvent_} event */ event => {
		let item = event.getItemStack();
		if (UnavailableItems.cache.shouldHide(item.id)) {

			let tags = item.getTags().toArray();

			let maxChapter = null;
			let maxException = null;

			for (let tag of tags) {
				let str = tag.toString();
				if (!str.includes('chapter_')) continue;

				let chapter = str.slice(-2, -1);

				if (str.includes('exceptions') && (!maxException || chapter > maxException)) {
					maxException = chapter;
				}
				else if (!maxChapter || chapter > maxChapter) {
					maxChapter = chapter;
				}
			}

			let text = event.getToolTip();
			let original = text.toArray()

			let itemName = text.get(0);
			text.clear();
			text.add(0, itemName);
			text.add(1, Text.darkGray(`Unlocked in `).append(Text.darkGray(`Chapter #${maxChapter}`).underlined()));
			text.add(1, Text.darkGray('Unknown item!').bold());

			let flags = event.getFlags();
			let entity = event.getEntity();
			if (flags.isAdvanced() && (entity.isPlayer() && entity.isCreative())) {
				let lines = [];
				for (let index = original.length - 1; index > 0; index--) {
					let element = original[index];
					if (element.toString().includes('color=dark_gray')) {
						lines.push(element);
					}
					else break;
				}
				lines.forEach(t => text.add(3, t));
			}
		}
		else if (global.isItemDisabled(item.getId())) {
			let text = event.getToolTip();

			text.clear()
			text.add(0, Text.of('Removed item').darkGray())
			text.add(1, Text.of('This item is unobtainable in this modpack').darkGray())
			if (event.getFlags().isAdvanced()) text.add(2, Text.of(item.getId()).darkGray().italic())
		}
	});

	NativeEvents.onEvent('lowest', false, $ItemAttributeModifierEvent, /** @param {Internal.ItemAttributeModifierEvent_} event */ event => {
		const item = event.getItemStack();
		if (UnavailableItems.cache.shouldHide(item.id) || global.isItemDisabled(item.id)) {
			let attr = [];
			event.getModifiers().forEach((attribute, attribtueModifiers) => {
				attr.push(attribute);
			});
			attr.forEach(a => {
				event.removeAttribute(a);
			});
		}
	});
})();
