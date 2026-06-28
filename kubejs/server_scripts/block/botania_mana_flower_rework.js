ADJServerEvents.botaniaFlowerManaChange(event => {
	if (event.isGeneration()) {
		const flower = event.getGeneratingFlower();
		switch (event.getBlock().id) { }
	}
	else {
		const flower = event.getFunctionalFlower();
		const amount = event.getAmount();
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
