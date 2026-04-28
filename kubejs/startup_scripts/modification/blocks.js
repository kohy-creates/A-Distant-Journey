BlockEvents.modification(event => {
	event.modify(/waystones\:/, block => {
		block.setRequiresTool(true);
		block.setExplosionResistance(60000);
		block.setLightEmission(8);
		block.setDestroySpeed(100);
	});

	event.modify('ecologics:pot', block => {
		block.setDestroySpeed(0);
		block.setRequiresTool(false);
	});

	event.modify(/^(?!.*floating).*_ore.*$/, block => {
		block.setExplosionResistance(200);
	});

	event.modify(/aquamirae\:painting\_/, block => {
		block.setDestroySpeed(0);
		block.setRequiresTool(false);
	});

	event.modify('evilcraft:blood_stain', block => {
		block.setDestroySpeed(0);
		block.setRequiresTool(false);
	});

	event.modify([
		'summoningrituals:altar'
	], block => {
		block.setLightEmission(10);
		block.setRequiresTool(true);
		block.setExplosionResistance(60000);
		block.setDestroySpeed(100);
	});

	const lightEmission = {
		'witherstormmod:tainted_mushroom': 2,
		'witherstorm_delight:tainted_mushroom_colony': 4,
		'witherstormmod:withered_phlegm_block': 6,
		'witherstormmod:tainted_dust': 1,
		'torchflower': 14,
		'potted_torchflower': 14,
		'netherexp:soul_torchflower': 10,
		'netherexp:potted_soul_torchflower': 10,
		'ars_nouveau:portal': 10

	};
	for (let [blockId, lightValue] of Object.entries(lightEmission)) {
		event.modify(blockId, block => {
			block.setLightEmission(lightValue);
		});
	}
});
