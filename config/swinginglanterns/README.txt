Swinging Lanterns configuration

Files:
- swinginglanterns.json: main gameplay settings.
- lantern_overrides.json: force-enable or force-disable lantern support.
- raycast_ignored_blocks.json: blocks ignored by wind raycasts.

lantern_overrides.json
- forceEnable: list of entries to always treat as supported lanterns.
- forceDisable: list of entries to never treat as supported lanterns.
- Use "modid" to apply to all blocks from a mod.
- Use "modid:block_id" to target a single block.

raycast_ignored_blocks.json
- ignored: list of block ids or block tags (tags start with '#').
- Example entries: "minecraft:torch" or "#minecraft:leaves".

Notes:
- Entries are case-insensitive; spaces are trimmed.
- Restart the game after editing config files.