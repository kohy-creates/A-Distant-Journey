const $QuestObjectAccessor = Java.loadClass('xyz.kohara.adjcore.mixins.compat.FTBQuestObjectAccessor');

FTBQuestsEvents.completed(event => {
    const object = event.getObject();
    if (object.getObjectType().toString() === 'QUEST') {
        if (object instanceof $QuestObjectAccessor) {
            if (object.adj$isToastDisabled()) return;

            event.getServer().runCommandSilent(
                `tellraw @a ["",{"selector":"${event.getPlayer().getUuid()}"},{"text":" has made the achievement "},{"text":"[${object.getRawTitle()}]","color":"green","hoverEvent":{"action":"show_text","contents":"${object.getRawSubtitle()}"}}]`
            )
        }
    }
})
