ADJClientEvents.itemIsLockedRenderCheck(event => {

	const item = event.getItemStack();
	const player = event.getPlayer();

	if (item.getId().includes('valkyrum')) {
		if (!player.stages.has('valkyrum_unlocked')) {
			event.cancel();
			return;
		}
	}

	let chapters = [],
		exceptions = [];
	item.getTags().toArray().forEach(tag => {
		const str = tag.toString();
		if (!str.includes('chapter_')) return;
		const match = str.match(/adj:locked_until\/.*[^ ]*?(chapter_\w+)/);
		if (str.includes('exceptions')) {
			exceptions.push(match[1]);
		}
		else {
			chapters.push(match[1]);
		}
	});

	if (chapters.length == 0) return;

	let
		chapter = chapters.sort()[chapters.length - 1],
		exception = exceptions.sort()[exceptions.length - 1];;

	if ((!exception || chapter != exception) && !player.getStages().has(chapter)) {
		event.cancel();
	}
})
