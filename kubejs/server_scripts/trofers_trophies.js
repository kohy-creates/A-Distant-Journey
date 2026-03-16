const trophyConfig = {
    overrides: {
        'minecraft:ghast': 10,
        'minecraft:creeper': 25,
        'born_in_chaos_v1:phantom_creeper': 25,
        'minecraft:iron_golem': 15,
    },
    joinedProgress: {
        'born_in_chaos_v1:phantom_creeper_copy': 'born_in_chaos_v1:phantom_creeper',
        'majruszsdifficulty:giant': 'minecraft:giant'
    },
    disableTrophiesFor: [],
    noTrophyMessageFor: []
}

EntityEvents.death(event => {

    function getOrdinal(n) {
        let ord = 'th';
        if (n % 10 == 1 && n % 100 != 11) {
            ord = 'st';
        }
        else if (n % 10 == 2 && n % 100 != 12) {
            ord = 'nd';
        }
        else if (n % 10 == 3 && n % 100 != 13) {
            ord = 'rd';
        }
        return ord;
    }

    const entity = event.getEntity();
    if (entity.getEntityType().getCategory().toString() === 'MONSTER') {
        let type = entity.getType();
        if (trophyConfig.disableTrophiesFor.includes(type)) return;
        let player = event.getSource().getActual();
        if (player instanceof $Player) {
            let server = event.getServer();
            let data = server.getPersistentData();
            if (!data.monsterKills) {
                data.monsterKills = {};
            }
            if (trophyConfig.joinedProgress[type]) {
                type = trophyConfig.joinedProgress[type];
            }
            if (!data.monsterKills[type]) {
                data.monsterKills[type] = 0;
            }
            data.monsterKills[type]++;
            let amountRequired = (trophyConfig.overrides[type]) ? trophyConfig.overrides[type] : 50;
            if (data.monsterKills[type] % amountRequired === 0) {

                if (!trophyConfig.noTrophyMessageFor.includes(type)) {
                    server.runCommand(
                        `/tellraw @a ["",{"selector":"${player.getUuid()}", "color": "yellow"},{"text": " has killed the ${data.monsterKills[type]}${getOrdinal(data.monsterKills[type])} ", "color": "yellow"},{"translate":"${entity.getEntityType().getDescriptionId()}", "color": "yellow"}]`
                    );
                }
                player.give(Item.of('trofers:large_plate', `{BlockEntityTag:{Trophy:'adj:trophies/${type.replace(':', '_')}'}}`));
            }
        }
    }
})
