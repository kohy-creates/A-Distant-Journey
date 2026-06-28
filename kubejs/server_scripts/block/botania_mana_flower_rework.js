ADJServerEvents.botaniaFlowerManaChange(event => {

	const amount = event.getAmount();
	if (amount == 0) return;

	if (event.isGeneration()) {
		const flower = event.getGeneratingFlower();
		switch (event.getBlock().id) {
			case 'botanicadds:flowers/vibrantia':
			case 'botanicadds:flowers/floating/vibrantia': {
				const overgrowth = flower.overgrowth;
				if (amount == 1) {
					event.setAmount(overgrowth ? 2 : 3);
				}
				break;
			}
			case 'botanicadds:flowers/rainute':
			case 'botanicadds:flowers/floating/rainute':
			case 'botanicadds:flowers/glaciflora':
			case 'botanicadds:flowers/floating/glaciflora': {
				const overgrowth = flower.overgrowth;
				if (amount > 0) {
					event.setAmount(overgrowth ? 6 : 12);
				}
				break;
			}
		}
	}
	else {
		const flower = event.getFunctionalFlower();
		switch (event.getBlock().id) {
			case 'botania:floating_exoflame':
			case 'botania:exoflame': {
				event.setAmount(amount == -300 ? -100 : amount);
				break;
			}
			case 'botania:fallen_kanade':
			case 'botania:floating_fallen_kanade': {
				event.setAmount(amount == -120 ? -25 : amount);
				break;
			}
			case 'botania:loonium':
			case 'botania:floating_loonium': {
				event.setAmount(amount == -35000 ? -20000 : amount);
				break;
			}
		}
	}
});
