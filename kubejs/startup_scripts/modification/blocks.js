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
})
