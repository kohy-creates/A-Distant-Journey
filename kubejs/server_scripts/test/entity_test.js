ItemEvents.dropped(event => {
    const droppedItem = event.getItem();
    if (droppedItem.getId().toString() != 'minecraft:bedrock') return;

    const itemEntity = event.getItemEntity();
    const startX = itemEntity.getX();
    const startY = itemEntity.getY();
    const startZ = itemEntity.getZ();
    const spacing = 5;

    let i = 0;

	console.log(i)
    global.mobs.forEach(mob => {
        const mobString = mob.toString() + "";

        // Skip unwanted entities
        if (mobString.includes('player')) return;
        if (mobString.includes('cursed_armor')) return;
        if (mobString.includes('wither_spawn_animation')) return;

        // Split the entity ID safely
        const parts = mobString.split('.');
        if (parts.length < 3) return; // skip invalid entries (if any)

        const namespace = parts[1];
        const entityName = parts[2];

        if (Object.keys(global.hpModifications).includes(`${namespace}:${entityName}`)) return;

        // Calculate grid position
        const x = startX + (i % 10) * spacing;
        const z = startZ + Math.floor(i / 10) * spacing;
        const y = startY;

        // Summon the entity
        event.getLevel().runCommandSilent(
            `/summon ${namespace}:${entityName} ${x} ${y} ${z} {NoAI:1b,Silent:1b,Invulnerable:1b,PersistenceRequired:1b,Tags:["kohy_rpg:bedrock_dropped"],NoGravity:1b,CustomName:'{"text":"${mobString}"}'}`
        );

		event.getLevel().runCommandSilent(
			`/tellraw @a[] {"text":"${namespace}:${entityName}"}`
		)
		event.getLevel().runCommandSilent(
			`/execute positioned ${x} ${y} ${z} store result score $misc misc run attribute @e[limit=1,sort=nearest,type=${namespace}:${entityName}] minecraft:generic.max_health base get`
		)
		event.getLevel().runCommandSilent(
			`/tellraw @a[] {"score":{"name":"$misc","objective":"misc"},"color":"yellow"}`
		)

		event.getLevel().runCommandSilent(
			`/execute positioned ${x} ${y} ${z} store result score $misc misc run attribute @e[limit=1,sort=nearest,type=${namespace}:${entityName}] minecraft:generic.attack_damage base get`
		)
		event.getLevel().runCommandSilent(
			`/tellraw @a[] {"score":{"name":"$misc","objective":"misc"},"color":"red"}`
		)

		event.getLevel().runCommandSilent(
			`/execute positioned ${x} ${y} ${z} store result score $misc misc run attribute @e[limit=1,sort=nearest,type=${namespace}:${entityName}] minecraft:generic.armor base get`
		)
		event.getLevel().runCommandSilent(
			`/tellraw @a[] {"score":{"name":"$misc","objective":"misc"},"color":"aqua"}`
		)
        i++;
    });
});
