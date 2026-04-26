const UnavailableItems = {
	/** @type {Internal.Stages_} */
	stages: null,
	cache: {
		ticker: 0,
		interval: 5,
		currentChapter: 0,
		chapterCached: null,
		bannedItems: new Set([typeof String]),
		shouldHide: function (id) {
			return this.bannedItems.has(String(id));
		}
	},
};

ClientEvents.tick(event => {
	UnavailableItems.cache.ticker++;
	if (UnavailableItems.cache.ticker == UnavailableItems.cache.interval) {
		UnavailableItems.cache.ticker = 0;

		let player = event.getPlayer();
		UnavailableItems.stages = player.getStages();
		let highestStage = 0;
		UnavailableItems.stages.all.toArray().forEach(stage => {
			if (!stage.includes('chapter_')) return;
			const s = stage.slice(-1);
			if (s > highestStage) highestStage = s;
		});
		UnavailableItems.cache.currentChapter = highestStage;
		if (UnavailableItems.cache.chapterCached == null || UnavailableItems.cache.chapterCached != UnavailableItems.cache.currentChapter) {

			Utils.runAsync(() => {
				console.log('Generating undiscovered item cache...', 'This is running async btw!')
				UnavailableItems.cache.bannedItems = new Set([typeof String]);
				Item.getTypeList().toArray().forEach(/** @param {Internal.Item} item*/ item => {
					const tags = Item.of(item).getTags().toArray();

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

					if (maxChapter && (!maxException || maxChapter != maxException) && UnavailableItems.cache.currentChapter < maxChapter) {
						UnavailableItems.cache.bannedItems.add(String(item));
					}
				});
				console.log(
					`Finished generating undiscovered item cache for chapter ${UnavailableItems.cache.currentChapter}`,
					`Cached list size: ${UnavailableItems.cache.bannedItems.size}`
				);
				UnavailableItems.cache.chapterCached = UnavailableItems.cache.currentChapter;
			});
		}
	}
});

ADJClientEvents.itemIsLockedRenderCheck(event => {

	const id = event.getItemStack().getItem().getId();

	if (UnavailableItems.cache.shouldHide(id)) {
		event.cancel();
		return;
	}

	if (id.includes('valkyrum') && !UnavailableItems.stages.has('valkyrum_unlocked')) {
		event.cancel();
	}
});
