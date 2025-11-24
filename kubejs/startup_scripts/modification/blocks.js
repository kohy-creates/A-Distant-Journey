BlockEvents.modification(event => {
	event.modify(/waystones\:/, block => {
		block.setRequiresTool(true);
		block.setExplosionResistance(60000);
		block.setLightEmission(8);
		block.setDestroySpeed(100);
	})

	event.modify('ecologics:pot', block => {
		block.setDestroySpeed(0);
		block.setRequiresTool(false);
	})

	event.modify(/^(?!.*floating).*_ore.*$/, block => {
		block.setExplosionResistance(1000);
	})

	event.modify(/aquamirae\:painting\_/, block => {
		block.setDestroySpeed(0);
		block.setRequiresTool(false);
	})

	event.modify('ars_nouveau:portal', block => {
		block.setLightEmission(12);
	})

	event.modify([
		'torchflower',
		'potted_torchflower'
	], block => {
		block.setLightEmission(14)
	});

	event.modify([
		'netherexp:soul_torchflower',
		'netherexp:potted_soul_torchflower'
	], block => {
		block.setLightEmission(10)
	})

	event.modify([
		'summoningrituals:altar'
	], block => {
		block.setLightEmission(10);
		block.setRequiresTool(true);
		block.setExplosionResistance(60000);
		block.setDestroySpeed(100);
	})
})
