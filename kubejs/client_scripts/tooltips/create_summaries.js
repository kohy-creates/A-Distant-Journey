// Add your items here
const itemsToTooltip = [

	// Botania
	{
		item: /botania:.*agricarnation.*/,
		summary: [
			"_Grows crops faster._",
			"The slow growth of crops is a perpetual problem in the feeding of the masses.",
			"The _Agricarnation_ transforms _Mana_ into a type of natural fertilizer, causing nearby plant-life to grow faster.",
			"_Grandola Vila Morena_..."
		]
	},
	{
		item: "botania:alfheim_portal",
		summary: [
			"_The next step in the journey...._",
			"Once upon a time, _Elves_ shared the world with us _Minecraftians_.",
			"Due to events unknown to us, they were banished back to their own world, _Alfheim_, never to return.",
			"Experiments have been performed in an attempt to re-establish a connection between the two worlds, and a theoretical procedure for creating such a portal has been devised.",
			"Actually creating this portal would prove to be an arduous task: quite a few unusual resources would be necessary.",
			"The net requirements come down to 8 _Livingwood_ blocks, 3 _Glimmering Livingwood_ blocks, an _Elven Gateway Core_ (read on), and at least 2 _Mana Pools_ and _Natura Pylons_ (read on).",
			"The _Livingwood_ blocks can be of any variant (logs or wood, stripped or not, etc.), so feel free to mix it up if you're feeling fancy.",
		]
	},
	{
		item: "botania:terra_plate",
		summary: [
			"_Terrasteel_ is a complex and useful magical alloy, infused with ridiculous amounts of Mana.",
			"Its creation requires a _Terrestrial Agglomeration Plate_ placed over a checkerboard pattern of _Lapis Lazuli Blocks_ and _Livingrock_.",
			"This block then needs to be provided with _Mana_, with _Sparks_ being the most efficient mode of transfer.",
			"After a plate is set up and ready to receive Mana, tossing one _Manasteel Ingot_, _Mana Diamond_ and _Mana Pearl_ each upon the plate will begin the infusion.",
			"Picking up any of the items will halt the infusion, causing _severe Mana Loss_ (all mana transferred to the plate is lost).",
		]
	},
	{
		item: "botania:animated_torch",
		summary: [
			"_Compact systems with a floating redstone torch._",
			"The _Animated Torch_ is simply a _Redstone Torch_ with a spark of magical autonomy.",
			"And the ability to hover.",
			"The torch will point horizontally when placed, providing a redstone signal in that direction and no other.",
			"Sneak-right clicking the torch will rotate it 90 degrees, pointing the signal in the new direction instead.",
			"By default, the torch is in _Toggle_ mode: whenever the torch is actuated (by either a _Mana Burst_ or an adjacent _Hovering Hourglass_), it'll turn 180 degrees, serving as a T flip-flop.",
			"Using a _Wand of the Forest_ on the torch changes its mode.",
			"The default mode is _Toggle_, as previously stated; the other two modes are _Rotate_, in which the torch rotates 90 degrees each actuation, and _Random_, in which the torch points randomly each actuation...."
		]
	},
	{
		item: /botania:apothecary_.*/,
		summary: [
			"_What you use to make flowers._",
			"To create plant life that can do their bidding, a botanist needs a special means of infusing plants with mystical energy.",
			"Luckily, the _Petal Apothecary_ can do just that.",
			"The _Petal Apothecary_.",
			"This block, when placed in the world and given some water (by right-clicking or throwing in a _Water Bucket_), will accept any _Mystical Petals_ thrown into it, absorbing their energies.",
			"Once the correct petals have been provided, throwing any _Seeds_ in will finalize the crafting process...."
		]
	},
	{
		item: "botania:avatar",
		summary: [
			"_Rod effects in a block._",
			"Carving some _Livingwood_ into a humanoid and giving it a _Mana Diamond_ for a heart yields an apparatus known as the _Livingwood Avatar_.",
			"By itself, the block is just a pretty face; however, giving it a _Rod_ enables it to cast magic.",
			"At the cost of _Mana_, from a spreader, of course.",
			"Not all _Rods_ can be used by an avatar.",
			"Any that do, however, are detailed in this book.",
			"Try out the _Rod of the Skies_, _Rod of the Hells_ and _Rod of the Plentiful Mantle_, for starters.",
			"Applying a redstone signal to the avatar will prevent it from casting.",
			"But is it an anime?..."
		]
	},
	{
		item: /botania:.*bellethorn.*/,
		summary: [
			"_Damages mobs._",
			"The _Bellethorne_ is a malevolent flower.",
			"It twists any _Mana_ provided to slowly inflict harm in any living beings (save for _players_) around it.",
			"_Every rose has its thorn_."
		]
	},
	{
		item: "botania:bellows",
		summary: [
			"_Make Mana Pools' transferring and Furnaces faster._",
			"The _Manatide Bellows_ increases the speed of _Mana Pools_' output.",
			"Placing these bellows next to (and pointing towards) a _Mana Pool_ will increase the speed at which the pool outputs its _Mana_ into _Mana Tablets_ or other items.",
			"Multiple bellows will further increase the transfer rate.",
			"A slightly more mundane use of the _Manatide Bellows_ is to stoke a _Furnace_'s flames.",
			"A _Manatide Bellows_ can be operated manually via a right-click; pointing the bellows towards an active _Furnace_ and manning it will increase the speed and efficiency at which the items in the _Furnace_ get smelted.",
			"It is your duty to be stoked..."
		]
	},
	{
		item: /.*botania:bergamute.*/,
		summary: [
			"_Absorbs sound._",
			"Anyone who's ever attempted ranching knows of the cacophonous din emitted by herds of animals.",
			"Luckily, the _Bergamute_ can deafen such dins.",
			"The _Bergamute_ absorbs sound energy emitted in a close radius around itself, converting it into trace amounts of mana and dispersing it harmlessly.",
			"Additionally, _Horns_ or _Drums_ will not break blocks within its range.",
			"Deaf to All but the Song..."
		]
	},
	{
		item: "botania:blaze_block",
		summary: [
			"_Compact blaze rod storage and renewable obsidian source._",
			"Mashing a bunch of blaze essences together yields a functional (if crude) decorative light block.",
			"Like a _Block of Black_, the _Blaze Mesh_ can be burned in furnaces (or _Endoflames_).",
			"Strangely enough, when placed by a _Pure Daisy_, it transforms into _Obsidian_.",
			"0x1a4"
		]
	},
	{
		item: "botania:brewery",
		summary: [
			"_Create brews: better potions._",
			"Given the versatility of _Mana_, its practicality in _Potion_-making should come as a surprise to nobody.",
			"_Brews_ are, simply put, variants on _Potions_.",
			"They're created using _Mana_ as a base, but brewed with other ingredients.",
			"Unlike _Potions_, _Brews_ have fixed multi-reagent recipes, and each vial brewed will contain multiple doses of product.",
			"The process of creating a _Brew_ requires a _Botanical Brewery_, _Vials_, _Mana_, and (of course) the reagents themselves.",
			"The _Mana_ functions as the solvent and energy source for a _Brew_ and is drawn from _Mana Bursts_; simply pointing a _Mana Spreader_ at the _Brewery_ will work just fine.",
			"Additionally, partially empty _Vials_ can be topped up with others containing the same _Brew_ in a crafting grid.",
			"Crafting the _Botanical Brewery_..."
		]
	},
	{
		item: /botania:.*bubbell.*/,
		summary: [
			"_Makes underwater bubbles._",
			"Building underwater is no small feat; clearing air under the sea is incredibly troublesome and time-consuming.",
			"Placing a _Bubbell_ underwater and providing it with _Mana_ (preferably _a priori_) will have it generate a dome of air (of about 12 blocks in radius), keeping water at bay.",
			"A constant supply of _Mana_ is required to keep the dome online.",
			"_Like some casual game_."
		]
	},
	{
		item: /botania:.*clayconia.*/,
		summary: [
			"_Creates clay from sand._",
			"The _Clayconia_ is a simple flower.",
			"All it does is moisten nearby _Sand_, turning it into pellets of _Clay_.",
			"This process uses a decent amount of _Mana_, but won't break the bank (or pool, as it were).",
			"_What a killer joke_."
		]
	},
	{
		item: "botania:cocoon",
		summary: [
			"_Hatch your own animals._",
			"A cocoon is a symbol of change, of evolution.",
			"A _Cocoon of Caprice_, when placed, will slowly evolve the rudimentary bits of life inside into a _Baby Animal_.",
			"More often than not, the cocoon will hatch into a farm animal, but on rare occasions, different animals such as _Wolves_ or _Horses_ can be created.",
			"A cocoon near water seems to create aquatic animals instead.",
			"Rumor has it that giving a cocoon _Green Gems_, _Chorus Fruit_, or a certain _otherworldly essence_ will influence its outcome towards something...",
			"different.",
			"What such experiments would yield is anyone's guess, really.(Giving a cocoon an item can be done via right-click or by simply tossing the ) New World, Perfect World..."
		]
	},
	{
		item: "botania:corporea_crystal_cube",
		summary: [
			"_View and request items from a Corporea network._",
			"A seer usually looks through a crystal ball to see the future.",
			"Well, a Corporea handler can look through a crystal _cube_ to see the _present_.",
			"The _Corporea Crystal Cube_ is a visual medium for interacting with a _Corporea Network_.",
			"When the block is given a spark, right-clicking it with an item will make it display how many of that item exist in its spark's network.",
			"The display updates itself about once every second.",
			"Punching a Cube will request one of its current item from the network, and sneak-punching it will request a whole stack.",
			"I can see forever..."
		]
	},
	{
		item: "botania:corporea_funnel",
		summary: [
			"_Request items from a Corporea network automatically._",
			"A block that uses the _Corporea Network_ more simply than the Index is the _Corporea Funnel_.",
			"When given a redstone signal, it'll request an item from the network of the _Corporea Spark_ above it.",
			"Said item will be pushed into an inventory a block or two below the funnel, or just dropped into the world above the Funnel if no such inventory is available.",
			"To tell the _Corporea Funnel_ what to request, place the item in an _Item Frame_ on the block; if more than one _Item Frame_ is on the block, the _Corporea Funnel_ will pick one at random.",
			"Rotating the item in the frame will change the request quantity; at default rotation the funnel will request one item, and rotations will respectively make the funnel request 2, 4, 8, 16, 32, 48, and 64 items.",
			"Energistically applied..."
		]
	},
	{
		item: "botania:corporea_index",
		summary: [
			"_Request items from a Corporea network via chat._",
			"One of the most convenient applications of a _Corporea Network_ is that items can be requested verbally by name.",
			"The _Corporea Index_ is an _Ender Crystal_-like block that interfaces with the _Corporea Network_ that its _Corporea Spark_ is connected to.",
			"Approaching one of these will activate it; it shows its radius of effect when active.",
			"While activated, the index will intercept _Chat Messages_ from nearby players, processing them into _requests_ and preventing them from being broadcasted to chat.",
			"Each request will attempt to pull from the network items whose names match the chat message; for example, saying \"white ingot\" will make the Index search the network for a single _White Ingot_ and, if found, manifest it as a dropped  Requests can be quantified: for example, requesting \"10 apples\" will pull up to 10 _Apples_ at once.",
			"The word \"this\" will be interpreted as the item currently in the user's hand.",
			"Prepending or appending any of \"...\"], \"~\"], \"+\" or \"?\" to a query will request items whose names _contain_ the query instead: for example, \"white...\" could return any item with \"white\" in its name...."
		]
	},
	{
		item: "botania:corporea_interceptor",
		summary: [
			"_Catch unfulfillable requests._",
			"The _Corporea Interceptor_ does exactly as its name suggests: it intercepts unfulfillable Corporea requests.",
			"Items in _Item Frames_ attached to the block will filter the requests it'll intercept.",
			"If there are none, or they are all empty, it will intercept any unfulfilled request.",
			"When a request is made for an item that the network can't provide, but that matches the Interceptor's filter, the Interceptor will trigger and emit a short redstone pulse.",
			"This can be used to do all sorts of things: for example, craft the requisite item with a _Crafty Crate_, or light up a lamp indicating that the resource is out.",
			"So many automation prospects..."
		]
	},
	{
		item: "botania:corporea_retainer",
		summary: [
			"_Memory for re-doing Corporea requests._",
			"The _Corporea Retainer_ is an addon (of sorts) to the _Corporea Interceptor_.",
			"When placed adjacent to an Interceptor, one of these will remember the origin and contents of any requests that trigger the former.",
			"Once the _Corporea Retainer_ memorizes a request, when given a redstone signal it'll \"replay\" the request, performing it from its original position.",
			"For example: consider a _Funnel_ that requests _Wooden Planks_ when there are no more left.",
			"An Interceptor in the network could catch the request and trigger a mechanism to craft the missing planks; if an attached Retainer was triggered after that, it would make the original Funnel redo its request and get its planks.",
			"As the _Corporea Retainer_ is an addon to the Interceptor, it can proxy its requests through the latter, so it doesn't need a spark itself.",
			"The retainer can only memorize one request at a time; any additional incoming requests will overwrite the currently stored request.",
			"A _Redstone Comparator_ can read whether a request is being held, and if so, how many items...."
		]
	},
	{
		item: "botania:crafty_crate",
		summary: [
			"_A way to craft automatically._",
			"As its name suggests, the _Crafty Crate_ is a counterpart to the _Open Crate_, but with the ability to assemble items into other items as a _Crafting Table_ would.",
			"Like a _Crafting Table_, it has a 9-slot inventory, which can be filled with items in the shape of a crafting recipe.",
			"Item slots are filled from left to right and top to bottom (as illustrated later).",
			"The _Crafting Placeholder_, when input to the Crate, corresponds to an empty slot in a crafting table.",
			"This is used to allow for recipes with gaps (e.g.",
			"furnace, chest, pickaxe...) to be craftable as well.",
			"Creating the placeholder..."
		]
	},
	{
		item: "botania:daffomill",
		summary: [
			"_Moves items with wind._",
			"The _Daffomill_ is a fan of sorts: it uses _Mana_ to push any items in front of it forward.",
			"Sneak-right clicking it with a _Wand of the Forest_ changes its orientation; its current direction can be deduced from the subtle wind particles it emits.",
			"_Wind Turbines? I'm a big fan_."
		]
	},
	{
		item: "botania:dandelifeon",
		summary: [
			"_Mana from Life._",
			"The _Dandelifeon_ is not recommended for the faint of heart.",
			"While it's likely the most efficient available generating flower in the botanist's toolbox, it's also one of the least straightforward to use.",
			"This flower's function is based on a cellular automaton known as _Conway's Game of Life_.",
			"The area for this procedure is a 25x25 square, centered around the _Dandelifeon_ itself.",
			"As long as the flower receives a redstone signal, it'll step the automaton twice a second.",
			"Each location within the flower's 25x25 area of effect counts as a _Cell_.",
			"Cells may be alive or dead; a cell counts as alive if its respective block is a _Cellular Block_ (read on), or dead if it's anything else.",
			"The _Neighbors_ of a cell are the eight cells surrounding any cell...."
		]
	},
	{
		item: "botania:detector_light_relay",
		summary: [
			"_Fly through the skies._",
			"_Luminizers_ simply transport players (and other entities), by flying them through the air on trails of light._",
			"_Luminizers_ are placed in the world as blocks and function when bound to other _Luminizers_ (with a _Wand of the Forest_).",
			"Right-clicking a _Luminizer_ will transport its user to the _Luminizer_ it's bound to.",
			"_Luminizers_ have a range of twenty blocks each, but can be chained together to create quite long and complex paths._",
			"_Luminizer_ bindings are unidirectional unless explicitly bound both ways.",
			"Do note, though, that such a binding would create an endless loop.",
			"Multiple _Luminizers_ can bind to the same endpoint.",
			"Luminize to the future..."
		]
	},
	{
		item: "botania:diluted_pool",
		summary: [
			"_Mana storage for the masses._",
			"The _Mana Pool_ is, simply put, a storage for _Mana_.",
			"It accepts mana from _Mana Spreaders_, and any adjacent ones will fill from it automatically.",
			"All _Functional Flora_ require a nearby _Mana Pool_ to draw power from.",
			"Making a _Mana Pool_.",
			"Tossing certain resources into a _Mana Pool_ will infuse them with _Mana_ from the pool, turning them into more magically-useful forms, like _Blue Ingots_ or _Mana Pearls_.",
			"A _Wand of the Forest_ can read the _Mana_ levels in a pool, much like a _Mana Spreader_.",
			"A _Redstone Comparator_ can also output a signal based on percentage full...."
		]
	},
	{
		item: /botania:.*dreadthorn.*/,
		summary: [
			"_Damages adult animals._",
			"The _Dreadthorne_ is a slightly more specialized counterpart to the _Bellethorne_: instead of _all_ nearby beings, it only harms _adult animals_.",
			"_It's a modus operandi_."
		]
	},
	{
		item: "botania:elven_spreader",
		summary: [
			"_Harder, better, faster, stronger._",
			"When it comes right down to it, _Dreamwood_ simply conducts _Mana_ better than _Livingwood_.",
			"A few adjustments in recipe (like substituting _Elementium_ for _Yellow Ingot_) yield an _Elven Mana Spreader_, which conducts more _Mana_, faster, and for longer without _Mana Loss_.",
			"Unfortunately, these can't be turned into _Pulse Mana Spreaders_.",
			"Better spreaders, that's it Combining this already-powerful spreader with a _Gaia Spirit_ and a _Dragonstone_ gem yields an even more potent variant.",
			"The _Gaia Spreader_ is the gold standard of _Mana Spreaders_, with upgrades pretty much all around.",
			"Do note that these spreaders fire larger payloads at once (and thus might fire less often)...."
		]
	},
	{
		item: "botania:enchanter",
		summary: [
			"_Using mana to enchant your tools._",
			"With the magical power emitted from _Mana Pylons_, a structure can be built that performs enchants with books without consuming them.",
			"The construction of a _Mana Enchanter_ isn't cheap, though, neither in space nor materials.",
			"A _Mana Enchanter_ takes up an area around 11x7 in size, and is constructed from 17 _Obsidian_ blocks, 10 _Mystical Flowers_ of any color or their _Glimmering_ or _Floating_ variants, 6 _Mana Pylons_, and one _Block of Blue_.",
			"Instructions on assembling this marvelous contraption follow.",
			"Mana Enchanter..."
		]
	},
	{
		item: "botania:ender_eye_block",
		summary: [
			"_Look activated redstone detector._",
			"The eyes of _Ender_ creatures have a peculiar sensitivity to the gaze of certain beings.",
			"A block crafted from said eyes will output a redstone signal if a player within a 64 block radius looks directly at it.",
			"Of course, said player donning a _Pumpkin_ will prevent the block from triggering.",
			"MY BRAND"
		]
	},
	{
		item: /botania:.*endoflame.*/,
		summary: [
			"_Mana from fuel._",
			"The _Endoflame_ is a very rudimentary _generating flower_; it'll absorb any combustible items or blocks dropped on the nearby vicinity, one at a time, and burn through them to generate _Mana_.",
			"The amount of time it takes to burn through an item is roughly half of the time a _Furnace_ would.",
			"There're a few small caveats though: the _Endoflame_ will not burn anything that leave byproducts in _Furnaces_ (e.g.",
			"_Lava Buckets_, which leave _Buckets_ behind).",
			"Furthermore, the flower can only burn around four _Block of Black_s' worth of fuel at once.",
			"If any single fuel item with a longer burn time is used, its full efficiency will be lost.",
			"_When arson becomes useful_...."
		]
	},
	{
		item: /botania:.*entropinnyum.*/,
		summary: [
			"_Mana from TNT._",
			"To generate a blast of _Mana_, in fact, a blast might be required.",
			"Igniting a block of _TNT_ on dry land near an _Entropinnyum_ will have the latter absorb all the entropy generated by the blast, converting it into _Mana_ and nullifying any damage in the process.",
			"However, to absorb the explosion, the flower must not have any _Mana_ stored in it-- otherwise, explosions as usual.",
			"_Cool guys don't look at explosions_.",
			"Note that the Entropinnyum has taken a liking to _ethically-sourced_ TNT, produced by natural means.",
			"Feeding the flower unethically-sourced (for example, duplicated) TNT will incur a severe efficiency loss...."
		]
	},
	{
		item: /botania:.*exoflame.*/,
		summary: [
			"_Ignites and speeds up Furnaces._",
			"Conversely to its _Generating_ counterpart, the _Exoflame_ uses _Mana_ to generate heat.",
			"Any _Furnaces_ near an active _Exoflame_ are fueled and given a speed boost.",
			"_But we should be going nowhere fast_."
		]
	},
	{
		item: "botania:fabulous_pool",
		summary: [
			"_Mana storage for the masses._",
			"The _Mana Pool_ is, simply put, a storage for _Mana_.",
			"It accepts mana from _Mana Spreaders_, and any adjacent ones will fill from it automatically.",
			"All _Functional Flora_ require a nearby _Mana Pool_ to draw power from.",
			"Making a _Mana Pool_.",
			"Tossing certain resources into a _Mana Pool_ will infuse them with _Mana_ from the pool, turning them into more magically-useful forms, like _Blue Ingots_ or _Mana Pearls_.",
			"A _Wand of the Forest_ can read the _Mana_ levels in a pool, much like a _Mana Spreader_.",
			"A _Redstone Comparator_ can also output a signal based on percentage full...."
		]
	},
	{
		item: /botania:.*fallen_kanade.*/,
		summary: [
			"_Powerful, short range regeneration._",
			"The _Fallen Kanade_ is a flower with angelic properties; it creates an aura of healing from _Mana_ to apply a regeneration effect to any _players_ and _tamed pets_ nearby.",
			"_Hand Sonic, version four_."
		]
	},
	{
		item: "botania:fel_pumpkin",
		summary: [
			"_A pumpkin that can spawn blazes._",
			"A _Fel Pumpkin_ is a demented infusion of a _Pumpkin_ with the fel spirits of slain monsters.",
			"This vile pumpkin can be placed atop two _White Bars_, as one would with snow blocks for a _Snow Golem_, to spawn a _Blaze_.",
			"_Blazes_ thusly spawned are somewhat fragile, and drop a smattering of _Blaze Powder_ in place of a _Blaze Rod_.",
			"Spooky scary pumpkin"
		]
	},
	{
		item: "botania:forest_eye",
		summary: [
			"_Animal detector._",
			"The Ancients who used to watch over the world always looked out for the living beings on it.",
			"The _Eye of the Ancients_, while not an actual eye, is the next best thing.",
			"An adjacent _Comparator_ will output a redstone signal proportional to the number of nearby animals it can find.",
			"Its count starts from 2; with 2 animals around, it outputs a signal of strength 1; with 3 animals, signal strength 2; and so on.",
			"Unfortunately, time has worn down the sight of the Ancients, so this block can only see animals for about 6 blocks in any direction.",
			"Now you see me......"
		]
	},
	{
		item: "botania:fork_light_relay",
		summary: [
			"_Fly through the skies._",
			"_Luminizers_ simply transport players (and other entities), by flying them through the air on trails of light._",
			"_Luminizers_ are placed in the world as blocks and function when bound to other _Luminizers_ (with a _Wand of the Forest_).",
			"Right-clicking a _Luminizer_ will transport its user to the _Luminizer_ it's bound to.",
			"_Luminizers_ have a range of twenty blocks each, but can be chained together to create quite long and complex paths._",
			"_Luminizer_ bindings are unidirectional unless explicitly bound both ways.",
			"Do note, though, that such a binding would create an endless loop.",
			"Multiple _Luminizers_ can bind to the same endpoint.",
			"Luminize to the future..."
		]
	},
	{
		item: "botania:gaia_pylon",
		summary: [
			"_Summon the Guardian of Gaia for GREAT JUSTICE!._",
			"The _Ritual of Gaia_ is a trial often undertaken by elves.",
			"It yields _Gaia Spirits_, which are coveted as fragments of the power of the Goddess of Gaia herself.",
			"This ritual requires an _Active Beacon_ with _Gaia Pylons_ surrounding it (functioning as an altar), as well as a single _Green Ingot_ (as a sacrifice).",
			"Crafting _Gaia Pylons_ Ritual of Gaia..."
		]
	},
	{
		item: "botania:ghost_rail",
		summary: [
			"_Send minecarts flying._",
			"Using a _Spectral Platform_ as a _Rail_ component yields a _Spectral Rail_, which makes _Minecarts_ passing over it do interesting things: when launched off a _Spectral Rail_, a minecart will float for a short distance and briefly gain the ability to pass through walls.",
			"The cart loses the ability if it lands on a rail or collides with any variant of _Dreamwood_.",
			"Spirit Tracks, you could say"
		]
	},
	{
		item: /botania:.*gourmaryllis.*/,
		summary: [
			"_Mana from food._",
			"Mana from food.",
			"The _Gourmaryllis_ will eat any food items it finds in a small area, outputting _Mana_ once it's done.",
			"However, it can only digest a single food item at a time.",
			"While it will devour any other foods while digesting, it will yield no returns for those.",
			"The amount of time it takes to digest a delicacy is proportional to the number of food points it restores.",
			"Thus, a _Steak_ will take four seconds to digest, an _Apple_ will take two, and so on.",
			"The rate of _Mana_ production will also vary with nutrition: it prefers bigger foods.",
			"A _Steak_ will produce more _Mana_ than two _Apples_ per-second.",
			"Like any proper gourmand, it loves variety in its diet: feeding it many different foods can be rewarding, while giving it the same food repeatedly might not go so well.",
			"An experienced botanist can infer its mood from the sounds it makes......"
		]
	},
	{
		item: /botania:.*heisei_dream.*/,
		summary: [
			"_Turns mobs against each other._",
			"The _Heisei Dream_ uses _Mana_ to fuel artificial emotions of anger and revenge in any nearby _mobs_, turning them against each other.",
			"_A pleasant era will murder people_."
		]
	},
	{
		item: /botania:.*hopperhock.*/,
		summary: [
			"_Picks up items._",
			"The _Hopperhock_ simply picks up items around it and put them in adjacent inventories (like _Chests_).",
			"_Mana_ is optional, but will increase its range if provided.",
			"Placing _Item Frames_ on adjacent inventories will specify which items can or can't go in them.",
			"Any inventory with no adjacent _Item Frame_ can accept any items, but labelled inventories will take priority.",
			"The rule used to sort items can be changed by sneak-right clicking (or using a _Dispenser_) on the flower with a _Wand of the Forest_ in _Function Mode_.",
			"_Hungry hungry flowers_...."
		]
	},
	{
		item: "botania:hourglass",
		summary: [
			"_A simple timer, using the sands of time._",
			"The ability to keep time is an essential one for anyone who wishes to build any redstone-y contraptions.",
			"A classical timer, however, can take up frankly unfortunate amounts of space, to say nothing about efficiency.",
			"The _Hovering Hourglass_ is a simple, precise, sand-based timer.",
			"As its name implies, it's a hourglass that hovers and turns by itself.",
			"The hourglass can hold up to one stack of either _Sand_, _Red Sand_ or _Soul Sand_, added via right-click.",
			"Right-clicking a filled hourglass removes its sand.",
			"Once sand is added, it'll start draining from one of the chambers into the other.",
			"Once the sand finishes draining, the hourglass emits one redstone pulse and flips, restarting the process.",
			"The amount of time between pulses is dependent on the type and quantity of sand in the chamber.",
			"_Sand_ falls at a rate of for one second per block, _Red Sand_ ten seconds per, and _Soul Sand_ one minute per.",
			"Sand types can't be mixed; the current time between pulses can be seen by holding a _Wand of the Forest_ over the Hourglass...."
		]
	},
	{
		item: /botania:.*hyacidus.*/,
		summary: [
			"_Poisons mobs._",
			"For some reason, poison does not kill.",
			"The _Hyacidus_ conjures it within the bodies of nearby mobs, bringing them to their knees (after a wait) for a one-hit kill.",
			"_Steel is immune_."
		]
	},
	{
		item: /botania:.*hydroangeas/,
		summary: [
			"_Mana from water._",
			"_Hydroangeas_ flowers act as liquid-based passive generators.",
			"They suck up any _still water_ in a 3x3 area (at the same altitude) around them, converting the water into _Mana_.",
			"Unfortunately, even though they seem to function faster during _Rain_, their base _Mana_ throughput is still rather slow.",
			"In addition, they decay after around three days, making them nonviable for long-term Mana production.",
			"_Under the seeeeeeaaaaaaa~"
		]
	},
	{
		item: /botania:.*jaded_amaranthus.*/,
		summary: [
			"_Creates more Mystical Flowers._",
			"You like flowers, right? If so, the _Jaded Amaranthus_ is made just for you.",
			"When fed with _Mana_ from a _Mana Pool_, it'll grow new _Mystical Flowers_ on nearby soil at a rapid pace.",
			"_It was this or clematis._",
			"Wait a minute, did you just summon a bunch of flowers in one turn?Yeah, so?That's against the rules, isn't it?Screw the rules, I have mana!..."
		]
	},
	{
		item: /botania:.*jiyuulia.*/,
		summary: [
			"_Keeps mobs out._",
			"The _Jiyuulia_ is a flower that, for a small _Mana_ drain, keeps any nearby animals or monsters at bay, protecting a circular area from entry.",
			"_You're free to go everywhere but here_."
		]
	},
	{
		item: /botania:.*kekimurus.*/,
		summary: [
			"_Mana from cake._",
			"_Cake_ is delicious; everyone loves it, flowers included.",
			"The _Kekimurus_ is one of these _Cake_ aficionados, and will eat any placed in its vicinity, synthesizing the enriching nutrients into sweet, sweet _Mana_.",
			"_top kek_"
		]
	},
	{
		item: /botania:.*labellia.*/,
		summary: [
			"_Renames things._",
			"For a moderate sum of _Mana_, the _Labellia_ picks up _Name Tags_ dropped on top of it, and uses them to name nearby items and mobs within a 5x5 radius.",
			"_What's in a name?_."
		]
	},
	{
		item: "botania:light_launcher",
		summary: [
			"_Fly through the skies._",
			"_Luminizers_ simply transport players (and other entities), by flying them through the air on trails of light._",
			"_Luminizers_ are placed in the world as blocks and function when bound to other _Luminizers_ (with a _Wand of the Forest_).",
			"Right-clicking a _Luminizer_ will transport its user to the _Luminizer_ it's bound to.",
			"_Luminizers_ have a range of twenty blocks each, but can be chained together to create quite long and complex paths._",
			"_Luminizer_ bindings are unidirectional unless explicitly bound both ways.",
			"Do note, though, that such a binding would create an endless loop.",
			"Multiple _Luminizers_ can bind to the same endpoint.",
			"Luminize to the future..."
		]
	},
	{
		item: "botania:light_relay",
		summary: [
			"_Fly through the skies._",
			"_Luminizers_ simply transport players (and other entities), by flying them through the air on trails of light._",
			"_Luminizers_ are placed in the world as blocks and function when bound to other _Luminizers_ (with a _Wand of the Forest_).",
			"Right-clicking a _Luminizer_ will transport its user to the _Luminizer_ it's bound to.",
			"_Luminizers_ have a range of twenty blocks each, but can be chained together to create quite long and complex paths._",
			"_Luminizer_ bindings are unidirectional unless explicitly bound both ways.",
			"Do note, though, that such a binding would create an endless loop.",
			"Multiple _Luminizers_ can bind to the same endpoint.",
			"Luminize to the future..."
		]
	},
	{
		item: /botania:.*loonium.*/,
		summary: [
			"_Conjures dungeon loot._",
			"Any adventurer knows that _Dungeons_ can hold valuable goodies.",
			"The _Loonium_ will, when fed quite a bit of _Mana_, summon these items for said adventurers to collect.",
			"There's a catch, though: each item is held by a monster protecting it.",
			"These monsters are extra-strong, but will drop their precious _dungeon loot_ when killed.",
			"_I CAN HAZ PHAT LOOTZ_?"
		]
	},
	{
		item: "botania:mana_bomb",
		summary: [
			"_Manastorm Charge go BOOM.",
			"BOOM BOOM.",
			"BOOMBOOMBOOMBOOMBOOMBOOM._",
			"Infusing a _Gaia Spirit_ with some _TNT_ creates a _Manastorm Charge_, a type of explosive.",
			"In a sense.",
			"Once ignited with a _Mana Burst_, the charge will create an unstable _Manastorm Epicenter_.",
			"This will, over time, spawn supercharged explosive _Mana Bursts_.",
			"Needless to say, only a maniac would unleash such a destructive force near anything valuable or important.",
			"Prepare to face the mighty..."
		]
	},
	{
		item: "botania:mana_detector",
		summary: [
			"_Detects Mana Bursts and emits Redstone signals._",
			"The _Mana Detector_ detects when a _Mana Burst_ flows through it (bursts pass through this block like air) and provides a redstone signal for the occasion.",
			"Crafting the detector"
		]
	},
	{
		item: "botania:mana_distributor",
		summary: [
			"_Equally split Mana between multiple pools._",
			"Any botanist worth their weight in flowers will eventually reach a point where a single _Mana Pool_ can't hold all their _Mana_.",
			"The _Mana Splitter_ can fix that issue; any _Mana_ received from _Mana Bursts_ will be split evenly into _Mana Pools_ placed on adjacent sides.",
			"Crafting the splitter"
		]
	},
	{
		item: "botania:mana_fluxfield",
		summary: [
			"_Converts Mana into Energy._",
			"Passing _Mana_ through a field of redstone charge converts it from natural energy to _Forge Energy_ or _Tech Reborn Energy_, whichever is present.",
			"Any _Mana Bursts_ received by the Fluxfield are converted into _Energy_ and sent to any adjacent acceptors.",
			"Challenging the fabric of magic mod reality"
		]
	},
	{
		item: "botania:mana_pool",
		summary: [
			"_Mana storage for the masses._",
			"The _Mana Pool_ is, simply put, a storage for _Mana_.",
			"It accepts mana from _Mana Spreaders_, and any adjacent ones will fill from it automatically.",
			"All _Functional Flora_ require a nearby _Mana Pool_ to draw power from.",
			"Making a _Mana Pool_.",
			"Tossing certain resources into a _Mana Pool_ will infuse them with _Mana_ from the pool, turning them into more magically-useful forms, like _Blue Ingots_ or _Mana Pearls_.",
			"A _Wand of the Forest_ can read the _Mana_ levels in a pool, much like a _Mana Spreader_.",
			"A _Redstone Comparator_ can also output a signal based on percentage full...."
		]
	},
	{
		item: "botania:mana_pylon",
		summary: [
			"_Enchantment catalyst._",
			"A _Mana Pylon_ is a structure that pulls natural energies from the earth and uses them to power enchanting processes.",
			"Setting one adjacent to an _Enchanting Table_ as if it was a _Bookshelf_ will dramatically increase the power of the table: just two pylons are enough for a table to reach _Level 30_.",
			"_You must construct additional pylons!_"
		]
	},
	{
		item: "botania:mana_spreader",
		summary: [
			"_Your essential Mana transporter._",
			"The _Mana Spreader_ is the single most important tool a botanist needs to manipulate _Mana_.",
			"This block shoots _Mana_ from point A to point B.",
			"It faces a cardinal direction when placed, but sneak-right clicking it with a _Wand of the Forest_ on a face points it elsewhere.",
			"It can be aimed at other blocks with a wand in _Bind Mode_.",
			"The _Mana Spreader_, as seen with a _Wand of the Forest_ held The _Mana Spreader_ has a small internal buffer of _Mana_, which will get filled by _Generating Flora_ bound to it.",
			"(Flowers, when placed, auto-bind to the nearest spreader.) This buffer can be viewed by hovering over the _Spreader_ with a _Wand of the Forest_ in hand...."
		]
	},
	{
		item: "botania:mana_void",
		summary: [
			"_Destroys all mana that comes into it._",
			"The _Mana Void_ is, in layman's terms, a grave for _Mana_.",
			"Any _Mana_ poured into this block will simply vanish into the void, never to be seen again.",
			"Placing one of these under a _Mana Pool_ will allow the pool to always accept _Mana_, but void any it can't hold.",
			"Even Chad from accounting?"
		]
	},
	{
		item: /botania:.*manastar.*/,
		summary: [
			"_A flower for checking net mana flow._",
			"The imprecise measurements of the _Wand of the Forest_ sometimes won't cut it for telling if you're turning a profit or loss in your _Mana Pools_.",
			"Creating a _Manastar_ and placing it next to a pool will have the flower shine red if there's a loss, or blue if there's a profit.",
			"The measurement updates every few seconds.",
			"It's a shooting star leaping through the skies"
		]
	},
	{
		item: /botania:.*marimorphosis.*/,
		summary: [
			"_Creates new stone types._",
			"The _Marimorphosis_ is a flower that induces metamorphic transformations in nearby _Stone_ blocks.",
			"These blocks are transmogrified into one of 8 different types of _Metamorphic Stone_.",
			"All 8 types will generate everywhere, but the types that generate more will often depend on the biome.",
			"All varieties can be used for bricks, chiseled bricks, slabs, stairs, and _Petal Apothecary_ variants.",
			"The various flavors of _Metamorphic Stone_ _This flower is pretty gneiss_...."
		]
	},
	{
		item: /botania:.*medumone.*/,
		summary: [
			"_Freezes mobs._",
			"The _Medumone_ is a flower with the ability to completely halt a creature's movements.",
			"It converts _Mana_ into a powerful slowing field that halts any nearby non-player entities in their tracks.",
			"_Stop right there criminal scum"
		]
	},
	{
		item: /botania:.*munchdew.*/,
		summary: [
			"_Mana from leaves._",
			"Generating the form of natural energy that is _Mana_ is best done from other living materials.",
			"The _Munchdew_ will eat up any nearby _Leaves_ and convert them into _Mana_.",
			"However, no saplings (or any other items) will be dropped from the leaves.",
			"This flower outputs a hefty sum of mana per tree's worth of leaves.",
			"However, once it finishes eating all leaves in range, the _Munchdew_ will take a brief digestive break, and will only eat again after around a minute.",
			"_Itadakimasu~_..."
		]
	},
	{
		item: /botania:.*narslimmus.*/,
		summary: [
			"_Mana from slime._",
			"There's some unidentified power in the universe that creates _Slimes_ at certain points, seemingly at random.",
			"_Slime Chunks_, they call those points.",
			"The _Narslimmus_ is a flower that has the ability to tap into that energy; it'll absorb _Slimes_ created by that power and collect all the _Mana_ generated by the destruction.",
			"The larger the _Slime_, the more _Mana_ is created.",
			"(It also makes a bit of a sticky mess.) _Stick around, would ye_?"
		]
	},
	{
		item: "botania:natura_pylon",
		summary: [
			"_The next step in the journey...._",
			"Once upon a time, _Elves_ shared the world with us _Minecraftians_.",
			"Due to events unknown to us, they were banished back to their own world, _Alfheim_, never to return.",
			"Experiments have been performed in an attempt to re-establish a connection between the two worlds, and a theoretical procedure for creating such a portal has been devised.",
			"Actually creating this portal would prove to be an arduous task: quite a few unusual resources would be necessary.",
			"The net requirements come down to 8 _Livingwood_ blocks, 3 _Glimmering Livingwood_ blocks, an _Elven Gateway Core_ (read on), and at least 2 _Mana Pools_ and _Natura Pylons_ (read on).",
			"The _Livingwood_ blocks can be of any variant (logs or wood, stripped or not, etc.), so feel free to mix it up if you're feeling fancy.",
			"Crafting the _Elven Gateway Core_..."
		]
	},
	{
		item: "botania:open_crate",
		summary: [
			"_A simple device to drop things._",
			"Sometimes complex devices like _Droppers_ or _Dispensers_ can't offer enough precision or speed.",
			"A simple solution: Make a crate, then punch a hole in its bottom.",
			"Yeah, it's that easy.",
			"The _Open Crate_ accepts each item from a _Hopper_ or other item outputter, and drops the item directly below it.",
			"An interesting side-effect of the _Open Crate_'s construction is that, when given a redstone signal, any items it drops won't be picked up by flowers like the _Hopperhock_, _Rannuncarpus_, or _Pollidisiac_ for around ten seconds longer than they otherwise would.",
			"A super crate box..."
		]
	},
	{
		item: /botania:(?!.*_ignem).*orechid/,
		summary: [
			"_Creates ores from stone._",
			"While going mining is well and good, a renewable and sedentary means of acquiring ores is nothing to scoff at either.",
			"The _Orechid_ uses _Mana_ to synthesize _ores_ from nearby _Stone_ blocks.",
			"The ores it generates are random, but rarer ores seem to be created less often.",
			"_The less magical would call it a sieve_."
		]
	},
	{
		item: /botania:.*orechid_ignem.*/,
		summary: [
			"_Creates nether ores from netherrack._",
			"The _Orechid_ is a great flower; the ability to create raw ores from _Mana_ and _Stone_ can be a great boon to any sedentary botanist's life.",
			"However, it can't create ores of a more _Nether_-y variety.",
			"Getting that sorted out is easy: Switching around a few petals will yield an _Orechid Ignem_, which creates _Nether_ ores in _Netherrack_ instead.",
			"The flower must be in the _Nether_ dimension to work.",
			"_Getting hot in here_."
		]
	},
	{
		item: "botania:piston_relay",
		summary: [
			"_Remote piston extension._",
			"It seems that _Pistons_ and _Mana_ react in strange ways.",
			"The former, when infused with the latter, becomes a _Force Relay_, a block that tears the fabric of space.",
			"When one of these is pushed by a _Piston_, the block it's bound to is pushed the exact same way.",
			"To bind it to a block, right-click it with a _Wand of the Forest_, then right-click on the block you want to bind it to.",
			"This block is highly unstable and may cause uncanny effects; care should be taken with it.",
			"It cannot be pulled by _Sticky Pistons_, and does not move its bound block either when pushed by one.",
			"This allows for the building of piston \"frames\" by combining a sticky and non-sticky piston.",
			"Infusing a _Piston_ with _Mana_...."
		]
	},
	{
		item: /botania:.*pollidisiac.*/,
		summary: [
			"_Makes animals breed._",
			"Animals love eating.",
			"That's all they seem to do, really.",
			"Strangely enough, though, they only eat things that are fed to them.",
			"The _Pollidisiac_ will simply do just that; it uses mana to feed nearby food items on the ground (_Wheat_, _Carrots_, etc.) to animals within range, putting them in _better moods_.",
			"_Hell's Kitchen_."
		]
	},
	{
		item: "botania:prism",
		summary: [
			"_Switch a Mana Burst's effective Lens on the fly._",
			"_Mana Lenses_ manipulate _Mana Bursts_ to provide certain powers.",
			"The _Mana Prism_ extends this functionality to switch a burst's lens effects on the fly.",
			"With a _Spectral Platform_ as a component, this block does not have a physical presence; entities and bursts can pass through it as if it weren't there.",
			"Right-clicking a prism with any variety of _Mana Lens_ places the lens in the prism.",
			"Whenever a _Mana Burst_ passes through the prism, its color and effect will be set to that of the lens in the prism (if the lens is not dyed, the burst will turn white).",
			"Using any of the four basic lenses in the prism will also increase the time before the burst starts losing _Mana_, allowing it to go further.",
			"It can be disabled with a redstone signal...."
		]
	},
	{
		item: "botania:pump",
		summary: [
			"_Not a web framework._",
			"What could be an easier way to transport _Mana_ over large distances than attaching a _Mana Pool_ to a _Minecart_? It's simple! Similar to other types of carts in most respects, a _Minecart with Mana Pool_ can store and transport, well, _Mana_.",
			"On rails.",
			"Breaking a cart with any _Mana_ in it will lose all contained _Mana_, so be careful.",
			"Transferring _Mana_ between a cart and a pool is done with a _Mana Pump_.",
			"These can face in any of the four cardinal directions, and will transfer _Mana_ between an adjacent pool and a cart-with-pool on the opposite side.",
			"The transfer rate is extremely fast due to the mechanical nature of the pump-- so fast that overflow is possible, which can cause up to a whole diluted pools' worth of _Mana Loss_.",
			"_Mana_ will flow from the blue side of the pump in the direction of the arrow.",
			"The pump can be turned off with a redstone signal, and an attached _Comparator_ will measure the amount of _Mana_ in the cart.",
			"Lastly, a pool on a cart serves purely for transport, and can not receive, send, transfer, or infuse any items with its _Mana_...."
		]
	},
	{
		item: /botania:.*pure_daisy.*/,
		summary: [
			"_Purifies blocks and fluids._",
			"This flower will purify any adjacent _milk_ (flowing or not) into _White Powder_, along with _Wood_ and _Stone_ blocks into their purified counterparts, _Livingwood_ and _Livingrock_."
		]
	},
	{
		item: /botania:.*rafflowsia.*/,
		summary: [
			"_Mana from flowers._",
			"The _Rafflowsia_ functions similarly to a _Kekimurus_, but eats _man-made flowers_ in the _Petal Apothecary_ instead.",
			"It'll consume any nearby placed flowers and synthesize _Mana_ from them.",
			"While feeding it the same flower several times in a row yields diminishing returns, feeding it a large variety of them can yield ludicrous quantities of _Mana_.",
			"_A New Dawn, you could say_."
		]
	},
	{
		item: /botania:.*rannuncarpus.*/,
		summary: [
			"_Places blocks down._",
			"Quite a handy flower indeed, the _Rannuncarpus_ will pick up nearby placeable items and place them within a large radius around itself as blocks, preferably facing them towards itself.",
			"However, it will only place blocks on top of a specific block type at a time; to specify this block, place it right below the soil the flower rests on.",
			"Items such as _Sugar Cane_ can be placed as well, but only where a player could._",
			"_Mana_ for the flower is optional, but will increase its range if provided.",
			"Finally, placing item frames on the block under the soil will restrict the items the _Rannuncarpus_ will pick up, similarly to a _Hopperhock_.",
			"_Find it in a sandpit_?..."
		]
	},
	{
		item: "botania:redstone_spreader",
		summary: [
			"_A spreader that fires on a Redstone pulse._",
			"By combining a _Mana Spreader_ with a piece of _Redstone_, a _Pulse Mana Spreader_ is created, which (as the name implies) fires when given a _redstone pulse_, regardless of target.",
			"Keep in mind that it still won't shoot a burst until the last one dissipates or is absorbed.",
			"Lil' touch of redstone"
		]
	},
	{
		item: /botania:.*rosa_arcana.*/,
		summary: [
			"_Mana from experience._",
			"_Experience Points_ contain a magic of their own.",
			"The _Rosa Arcana_ can tap into this magic, absorbing the experience of nearby players and turning it into _Mana_.",
			"It can also synthesize mana from experience orbs and enchanted items in the world.",
			"_When this flower is planted, toss a coin_."
		]
	},
	{
		item: /botania:.*shulk_me_not.*/,
		summary: [
			"_Mana from Shulkers._",
			"The _Shulk Me Not_ is a generating flower that creates _Mana_ from the power of the Shulker's _Levitation_.",
			"If a nearby monster is targeted by and hit with a Shulker's projectile, and the _Shulk Me Not_'s internal buffer is empty, both mob and Shulker will be killed, generating ludicrous amounts of _Mana_ from the process.",
			"A few extra points should be made:Both entities' experience and loot are lost, and both entities must be within the flower's range.",
			"_Petal plucking not recommended_...."
		]
	},
	{
		item: /botania:.*solegnolia.*/,
		summary: [
			"_Creates spaces where the Ring of Magnetization doesn't work._",
			"The _Ring of Magnetization_ is quite the handy tool for any diggers or collectors.",
			"However, it can also pick up unwanted items, disrupting automation setups in the process.",
			"The _Solegnolia_ disrupts the ring's field of effect and prevents any items in its range from being pulled towards a ring-bearer.",
			"It also prevents any ring-bearers in its range from pulling any items.",
			"It does not consume _Mana_.",
			"On/Off"
		]
	},
	{
		item: "botania:spark_changer",
		summary: [
			"_Control augments on sparks with redstone._",
			"The _Spark Tinkerer_ is a block with the ability to modify the _Augments_ placed on _Sparks_.",
			"Placing one adjacent to a _Mana Pool_ (or other block with a _Spark_ attached) will connect it to that block.",
			"Right-clicking the _Spark Tinkerer_ with a _Spark Augment_ will put the augment in the block; the augment can be removed by right-clicking again.",
			"When the _Spark Tinkerer_ gets a redstone signal, it'll randomly pick an adjacent connected _Spark_ with a different augment and swap the augment on that _Spark_ with the one stored in the Tinkerer.",
			"The stored augment can be withdrawn or deposited with _Hoppers_ or other automation methods.",
			"_Comparators_ can read the type of augment stored.",
			"Mod your sparks..."
		]
	},
	{
		item: "botania:spawner_claw",
		summary: [
			"_Power spawners with Mana, even with no one around._",
			"_Monster Spawners_ are strange devices.",
			"They hold the ability to create life from thin air, but only when someone's nearby to witness their action.",
			"Thus, anyone wishing to exploit one of these oddities ends up tethered by necessity to the surrounding area.",
			"A _Life Imbuer_ is an alternative: when placed over a _Monster Spawner_, it'll use _Mana_ (fed from a _Spreader_) to induce spawning in the absence of players.",
			"Just a little push..."
		]
	},
	{
		item: "botania:spectral_platform",
		summary: [
			"_Disguisable platform with no solid body._",
			"The _Spectral Platform_ is an _Abstruse Platform_ with even less presence-- in fact, no physical body whatsoever.",
			"The _Abstruse Platform_ is tangible in certain cases; the _Spectral Platform_ is permeable to anything, regardless of its position.",
			"This reminds me of a Puzzle"
		]
	},
	{
		item: /botania:.*spectranthemum.*/,
		summary: [
			"_Teleports items._",
			"Long-distance item transport can be an arduous task; at some point, water channels and _Daffomills_ just won't cut it.",
			"The _Spectranthemum_ uses _Mana_ to warp the fabric of reality around any items near it, teleporting them elsewhere in the world.",
			"Note that _Mana_-containing items interfere with the warp and can't be teleported.",
			"Note also that cost scales with the distance teleported-- single items can go over 2000 blocks, though your mana pools won't like it!To specify the destination of warped items, use a _Wand of the Forest_ in _Bind Mode_ to bind the flower to a location, the same way one would to a pool.",
			"To view what block the flower is bound to (as opposed to the pool it's pulling _Mana_ from), sneak while looking at it with a wand.",
			"This flower is bound by the _axiom of chunkloading_; i.e.",
			"it won't send items to unloaded chunks.",
			"This topic, however, is beyond the scope of this lexicon...."
		]
	},
	{
		item: /botania:.*spectrolus.*/,
		summary: [
			"_Mana from wool._",
			"The _Spectrolus_ is a flower that's particularly fond of the various hues of _Wool_.",
			"It'll consume any and all _Wool_ blocks dropped nearby, converting them to _Mana_.",
			"However, it's picky as to what colors it wants.",
			"Starting from _White_, after it eats one piece of _Wool_, it'll rotate to the next color in the spectrum.",
			"While it'll consume all _Wool_ around it, it'll only create any mana if it gets the color it wants-- so haphazardly tossing _Wool_ at it is wasteful at best.",
			"The color craves at any given moment can be seen by hovering over the flower with a _Wand of the Forest_.",
			"_Taste the Rainbow_...."
		]
	},
	{
		item: "botania:starfield",
		summary: [
			"_Create a starry sky._",
			"The _Starfield Creator_ does exactly as its name suggests: at night, it releases Elven energies into the air to create a starry sky.",
			"Twinkle twinkle"
		]
	},
	{
		item: /botania:.*tangleberrie.*/,
		summary: [
			"_Keeps mobs in._",
			"The _Tangleberrie_ is a flower that, for a small _Mana_ drain, keeps any nearby animals or monsters within a circular ward, preventing them from getting out.",
			"_Tangled, brave and frozen_."
		]
	},
	{
		item: "botania:teru_teru_bozu",
		summary: [
			"_Weather control and cuteness overload._",
			"_Teru Teru Bozu_ are amulets that ward away bad weather.",
			"Simply crafting one of these and placing it in the world will decrease the durations of _Rain-_ and _Snowstorms_.",
			"During bad weather, offering it (via right-click or throw) a _Sunflower_ will make the sun return.",
			"Attaching a _Redstone Comparator_ to one of these allows it to detect bad weather.",
			"What makes the Sunflower so special, anyway?"
		]
	},
	{
		item: /botania:.*thermalily.*/,
		summary: [
			"_Mana from lava._",
			"The _Thermalily_ is a _Lava_-flavoured counterpart to the _Hydroangeas_.",
			"The flower absorbs _Lava_ around it (at the same altitude) to generate _Mana_.",
			"After absorbing one block of _Lava_, the flower will produce _Mana_ continually for around 45 seconds.",
			"Afterwards, though, it needs a bit of time to cool down before it can produce any more.",
			"As temperamental as its drink of choice, though, it tends to randomly vary how long a cooldown period lasts-- anywhere from 20 seconds to a full 5 minutes!You can tell how long its most recent cooldown period lasts with a _Redstone Comparator_: twenty seconds for each level of strength.",
			"The _Mana_ throughput the _Thermalily_ produces during its active phase is extremely high; it's an ideal flower for a quick boost in stores.",
			"However, during its \"cooldown\" period, any adjacent _Lava_ will be absorbed and reset the cooldown without yielding any _Mana_...."
		]
	},
	{
		item: /botania:.*tigerseye.*/,
		summary: [
			"_Scares and repels creepers._",
			"It's a known fact that _Creepers_ are terrified of _cats_.",
			"The _Tigerseye_ exploits that fact, emitting a feline aura to petrify any nearby _Creepers_ and preventing them from exploding.",
			"As a side-effect, it makes them flee nearby _players_.",
			"_Risin' up to the challenge of our rivals_."
		]
	},
	{
		item: "botania:tiny_potato",
		summary: [
			"_A friend for all of us._",
			"It's a tiny potato! It believes in you!No.",
			"Really, that's it.",
			"A _Potato_, thrown into a _Mana Pool_, gains a little spark of life and joy.",
			"The _Tiny Potato_ is lively, but patting it with a right-click will make it even more so!A Potato can also be named in an _Anvil_.",
			"Believe in it, who believes in you The potato can be given items (with right-click) to hold; one item per side of the Potato.",
			"(Items placed on its bottom face will show up on the lower half of the Potato's front.)Unfortunately, potatoes aren't exactly known for their dexterity, so some items may look out of place when held.",
			"(And that's okay.)..."
		]
	},
	{
		item: "botania:toggle_light_relay",
		summary: [
			"_Fly through the skies._",
			"_Luminizers_ simply transport players (and other entities), by flying them through the air on trails of light._",
			"_Luminizers_ are placed in the world as blocks and function when bound to other _Luminizers_ (with a _Wand of the Forest_).",
			"Right-clicking a _Luminizer_ will transport its user to the _Luminizer_ it's bound to.",
			"_Luminizers_ have a range of twenty blocks each, but can be chained together to create quite long and complex paths._",
			"_Luminizer_ bindings are unidirectional unless explicitly bound both ways.",
			"Do note, though, that such a binding would create an endless loop.",
			"Multiple _Luminizers_ can bind to the same endpoint.",
			"Luminize to the future..."
		]
	},
	{
		item: "botania:turntable",
		summary: [
			"_Spin spreaders around._",
			"The _Spreader Turntable_, as its name implies, continually rotates a _Mana Spreader_ placed upon it.",
			"Placing a spreader on a turntable will set it spinning; a redstone signal pauses its spin.",
			"To change the speed of a turntable, right-click it with a _Wand of the Forest_; sneak-right clicking it will change its direction.",
			"You spin me right round Similarly, a _Dispenser_ with a _Wand of the Forest_ from the side will change the speed, and one from the bottom will change the direction...."
		]
	},
	{
		item: /botania:.*vinculotus.*/,
		summary: [
			"_Intercepts Enderman teleportation._",
			"The _Vinculotus_ uses _Mana_ to hijack the powers of any _Enderman_ within a large radius around it.",
			"Whenever an _Enderman_ attempts a teleport within said radius, it's instead forced to the location of the _Vinculotus_.",
			"_Touch this black lotus with your fingers_."
		]
	},
	{
		item: "botania:astrolabe",
		summary: [
			"_A tool to help create planes._",
			"The _Worldshaper's Astrolabe_ is a handy tool to place blocks.",
			"A lot of them.",
			"Really quickly.",
			"To use it, sneak-right click the astrolabe on a block to choose the block to be placed, and sneak-right click the astrolabe in the air to choose the number of blocks to be placed.",
			"Once a block is selected, the astrolabe will display a preview of what it would construct at a given position.",
			"To actually construct the previewed blocks (using _Mana_ as well as blocks from the user's inventory), simply right-click the astrolabe.",
			"Blocks can also be supplied from items like a _Rod of the Shifting Crust_, a _Rod of the Depths_, or a _Hand of Ender_.",
			"Builds walls, creates worlds..."
		]
	},
	{
		item: "botania:aura_ring",
		summary: [
			"_Passive Mana Generator in a Ring._",
			"The _Band of Aura_ is a variant _Band of Mana_; instead of storing _Mana_, it generates a slow trickle of it (when equipped) and stores it in _Mana_-containing items in its wearer's inventory.",
			"Plating it with a _Green Ingot_ upgrades it to generate _Mana_ at a significantly faster rate.",
			"Creating the ring Upgrading the ring..."
		]
	},
	{
		item: "botania:bauble_box",
		summary: [
			"_A handy container to store your Trinkets in._",
			"It's possible to have _too_ many _Trinkets_ on hand-- after all, inventory space is limited.",
			"A solution: stash them in a _Trinket Case_, a handy container for _Trinkets_.",
			"The case's interface lets its user quickly swap their equipped _Trinkets_.",
			"The case can also store _Rods_ and _Mana_-containing items, like _Mana Tablets_ (though they can't provide _Mana_ when in the box).",
			"It could even be a boat!"
		]
	},
	{
		item: "botania:black_hole_talisman",
		summary: [
			"_Infinite storage of a block in a single slot._",
			"The void is a massive space full of...",
			"nothing.",
			"Really.",
			"There's nothing there.",
			"But with a bit of ingenuity, this nothingness can be exploited to store blocks for you to your heart's content.",
			"The _Black Hole Talisman_ utilizes powerful Gaia and Ender magics to store a virtually infinite quantity of a single type of block.",
			"Right-clicking a block with an empty Talisman will set it to store that type of block, and sneak-right clicking the Talisman in the air will enable or disable it.",
			"When enabled, a Talisman will absorb any blocks of its given type from its user's inventory.",
			"Placing the item in a crafting grid will yield its stored blocks, a stack at a time.",
			"Any blocks stored in a Talisman can be placed by simply right-clicking with it.",
			"Sneak-right clicking the Talisman on an inventory will dump up to a stack of blocks into that inventory.",
			"Finally, a Talisman can provide a _Rod of the Shifting Crust_ with the blocks it contains...."
		]
	},
	{
		item: "botania:black_lotus",
		summary: [
			"_Rare loot that can make mana._",
			"An elusive flower by the name of the _Black Lotus_ exists; however, it is not known to grow or reproduce.",
			"There are no known sources of the Lotus at this time.",
			"It is known, however, that each bloom contains a good deal of concentrated _Mana_ that can be released by dissolving it inside a non-empty _Mana Pool_.",
			"Just throwing it in will do."
		]
	},
	{
		item: "botania:blood_pendant",
		summary: [
			"_Brews, crystallized into pendants._",
			"The essences of the _Nether_, from which the original _Potions_ were created, are very efficient at storing the powers of effects.",
			"The _Tainted Blood Pendant_, crafted from such essences, can store a _Brew_ in a condensed, stable form.",
			"A Pendant with a stored _Brew_, when worn, will lens _Mana_ through itself to provide its stored effect.",
			"A pendant can be infused with a _Brew_ by substituting a _Vial_ on a _Botanical Brewery_ with an uninfused Pendant, costing about ten times the _Mana_.",
			"However, the pendant doesn't play well with effects like _Instant Health_ or _Absorption_, and can't handle _Brews_ with more than one effect.",
			"Always potted up..."
		]
	},
	{
		item: "botania:cacophonium",
		summary: [
			"_Mimic mob sounds._",
			"The _Cacophonium_ is an instrument that can mimic living beings' cries, allowing a \"musician\" to play sounds of nature at will.",
			"Right-clicking with it on an entity saves the sounds it can emit into the _Cacophonium_.",
			"Holding right-click, then, will play back those sounds.",
			"Why anyone would ever _want_ to use this contraption, however, is beyond moral comprehension.",
			"Hibike! Cacophonium For ultimate chaos, the _Cacophonium_ can be placed in a _Note Block_ with a sneak-right click, giving the block the ability to sound off animal or monster sounds on demand.",
			"You monster...."
		]
	},
	{
		item: "botania:clip",
		summary: [
			"_A Mana Blaster upgrade that lets it have multiple lenses._",
			"While a formidable and versatile tool, the _Mana Blaster_'s greatest downfall is its lack of an ability to hot-swap _Lenses_.",
			"But no more.",
			"The _Lens Clip_ will attach to a _Mana Blaster_ in a crafting grid and allow it to store up to 6 lenses rather than just one.",
			"After all, Russian Roulette's just not the same without a gun...",
			"Adding and removing _Lenses_ works just as before; the lens is added or removed in the slot that the clip is currently on.",
			"To change this slot (and therefore the selected lens), simply sneak-right click the _Mana Blaster_ in the air.",
			"An expansion of blasting..."
		]
	},
	{
		item: "botania:cloud_pendant",
		summary: [
			"_Lets you double jump._",
			"The _Cirrus Amulet_ is a _Trinket_ that can be worn in the _Amulet_ slot.",
			"Its wearer is granted the ability to _double-jump_-- the second jump negating all vertical momentum (and thus damage) from falling.",
			"It's all in the cloud"
		]
	},
	{
		item: "botania:cobble_rod",
		summary: [
			"_A rod for creating cobble._",
			"The _Rod of the Depths_ is a more geological variant to the _Rod of the Lands_; it does exactly the same thing, but with _Cobblestone_ and for a slightly higher price.",
			"For that same _Mana_ cost, this item can provide _Cobblestone_ to the _Rod of the Shifting Crust_.",
			"It's cobbling time"
		]
	},
	{
		item: "botania:crafting_halo",
		summary: [
			"_Portable crafting at its quickest._",
			"Lugging around a _Crafting Table_ is a generally troublesome task.",
			"The _Assembly Halo_, thus, is a portable _Crafting Table_, as well as a quick-start crafting option.",
			"Holding the item displays a \"halo\" of recipe slots around the holder, and right-clicking the displayed _Crafting Table_ will open a crafting interface.",
			"As long as the item is kept in-inventory, it'll remember its last recipe.",
			"Right-clicking an empty slot of the halo will save the last-used recipe to that slot, and right-clicking a slot with a recipe saved will attempt to craft it from available items.",
			"Sneak-punching a saved recipe will delete it.",
			"It has no taste if you cook it from the menu..."
		]
	},
	{
		item: "botania:crystal_bow",
		summary: [
			"_A faster bow that creates arrows from Mana._",
			"Crafted with a _Dragonstone_, the _Crystal Bow_ is a ranged weapon with the ability to conjure arrows from _Mana_, as if the bow were enchanted with _Infinity_.",
			"Similarly to the _Livingwood Bow_, it'll repair itself using _Mana_.",
			"Thanks to the bow's lightweight and flexible components, it also fires arrows much harder than a wooden one would.",
			"An improved model, fixed reverting to a seed"
		]
	},
	{
		item: "botania:dirt_rod",
		summary: [
			"_A rod for creating dirt._",
			"The _Rod of the Lands_ is a simple tool: by drawing _Mana_ from the user's inventory (sourced from a _Mana Tablet_ or similar), it can conjure a _Dirt_ block and place it in the world.",
			"For the same _Mana_ cost, this item can provide _Dirt_ to the _Rod of the Shifting Crust_.",
			"The Dirty Stick This rod can be given to a _Livingwood Avatar_; an avatar holding this rod will periodically use its own _Mana_ to place a block of _Dirt_ before itself...."
		]
	},
	{
		item: "botania:diva_charm",
		summary: [
			"_Charm attacking mobs._",
			"The _Charm of the Diva_ blesses its wearer with the power to turn attackers on their comrades; it uses _Mana_ to twist the hearts of mobs that harm its wearer, causing them to go after other nearby hostile mobs instead.",
			"You shall not disrespect Big Sister"
		]
	},
	{
		item: "botania:divining_rod",
		summary: [
			"_A rod for finding ores._",
			"The _Rod of the Plentiful Mantle_ has the ability (for a moderate _Mana_ cost) to divine in a modest radius around its user for ores.",
			"These will emit a brief glow through walls, allowing them to be easily seen.",
			"Identical ores will glow identical colors, though colors may not be the same over separate uses.",
			"One day Pahimar will deliver This rod can be given to a _Livingwood Avatar_.",
			"When so given, the avatar will use its _Mana_ to show all nearby ores continually, as if the rod was being used by a player.",
			"Glow colors, in this case, will remain the same so long as the avatar isn't moved...."
		]
	},
	{
		item: "botania:dodge_ring",
		summary: [
			"_Sweep to the side to dodge attacks._",
			"The _Ring of Dexterous Motion_ is a terrific _Trinket_ to dodge damage during duels.",
			"Its wearer can double-tap a movement key to hurl themselves in that direction and dodge incoming attacks/mobs.",
			"Dodging has a short cooldown, and burns some of its user's hunger.",
			"Dexterity bonus"
		]
	},
	{
		item: "botania:dreamwood_wand",
		summary: [
			"_I have done nothing but teleport bread for three days._",
			"_Alfheim_ contains a myriad of valuable resources.",
			"Unfortunately, most of them are rather scarce due to competition between the various _Elven_ clans.",
			"The Elves you have contacted are interested in trading resources native to their lands, such as _Dreamwood_, _Elementium_, _Pixie Dust_ and _Dragonstones_.",
			"_Dreamwood_ can also be crafted into decorative blocks like _Livingwood_ can."
		]
	},
	{
		item: "botania:ender_dagger",
		summary: [
			"_A dagger that cuts through Endermen like butter._",
			"Those _Endermen_.",
			"They're the peskiest things since _Creepers_.",
			"(I swear, whoever came up with those things really needs to take it down a _notch_.)However, a dagger crafted from a material with their energies can tear through them like a thousand-degree knife through butter.",
			"Due to the concentration of energy, though, the dagger's only good for a few kills, and its compactness prevents the _Blue Ingot_ in its recipe from healing with _Mana_, the way typical tools would.",
			"Still, killing those elongated thieves is worth the trouble.",
			"Strike my Soul..."
		]
	},
	{
		item: "botania:ender_hand",
		summary: [
			"_Ender Chest access anywhere._",
			"The _Hand of Ender_ allows its user to access their interdimensional Ender subspace pocket; in other words, their _Ender Chest_ inventory.",
			"Said inventory can be opened with some _Mana_ by right-clicking with the Hand, no matter the place.",
			"Using the hand on another player will use substantially more _Mana_, but will open _their_ inventory instead.",
			"It's like the 5G of Ender Chests Furthermore, a _Hand of Ender_ automatically provides the _Rod of the Shifting Crust_ access to its user's _Ender Chest_'s contents, for a small _Mana_ cost per block...."
		]
	},
	{
		item: "botania:exchange_rod",
		summary: [
			"_A rod for swapping blocks._",
			"The _Rod of the Shifting Crust_ is a magical device with the ability to swap blocks in the world at very high speeds.",
			"To set up the rod, sneak-right click a block to select it.",
			"After a block is selected, punching any other block in the world with the rod will use _Mana_ to swap it for the selected block (assuming the latter is present in the user's inventory).",
			"Right-clicking a block in the world will perform a larger transformation, swapping all highlighted blocks with the selected one.",
			"Blocks being placed (obviously) come from the user's inventory, and require _Mana_ for placement.",
			"Only proper, full-sized blocks can be used for this swap-- no flowers, torches, or other shenanigans of that sort, though slabs are fine.",
			"Very hard blocks may consume more _Mana_ to be replaced.",
			"Other rods or devices can supply blocks to the _Rod of the Shifting Crust_.",
			"For example, a _Rod of the Lands_ in a user's inventory will provide their _Rod of the Shifting Crust_ with an endless supply of _Dirt_ (assuming sufficient _Mana_ to conjure each dirt block, of course).",
			"If replacing a cubical area is not desired, using the _Stone of Temperance_ can reduce it to a plane of blocks...."
		]
	},
	{
		item: "botania:fire_rod",
		summary: [
			"_A rod for summoning circles of flame._",
			"The _Rod of the Hells_ contains the very essence of fire.",
			"When used on the ground, for a moderate _Mana_ cost, it'll summon a circle of fire that will burn anything within.",
			"The ring has a radius of about five blocks, and takes a small amount of time to spin up to full ferocity.",
			"Do note that, once ignited, the fire burns anything living in it, its own caster included.",
			"Through the fire and the flames This rod can be given to a _Livingwood Avatar_.",
			"An avatar holding one will continually use its own _Mana_ to maintain a ring of flame around itself...."
		]
	},
	{
		item: "botania:flight_tiara",
		summary: [
			"_Three-dimensional flight...",
			"up to a point._",
			"The _Flügel_ were a race of god-slaying beings that once dominated these lands and possessed powers of three-dimensional flight.",
			"Among other things.",
			"While the _Flügel_ are now _quite_ extinct, the _Flügel Tiara_, fashioned from _Gaia Spirits_, can use _Mana_ to replicate their power of flight.",
			"Forty thousand books from another world Combining the _Flügel Tiara_ with different types of _Quartz_ will change the appearance of its wings: one style for each type of quartz.",
			"The recipes for the various types of quartz can be found under _Decorative Blocks_, and the _Elves_ will trade _Elven Quartz_ for _Nether Quartz_...."
		]
	},
	{
		item: "botania:flower_bag",
		summary: [
			"_A trusty pouch to hold your floral goodness._",
			"The physical laws regarding _Inventories_ are somewhat skewed in our world.",
			"Thanks to that, carrying an array of different colors of flowers can turn out to be a major hassle.",
			"Luckily, a _Flower Pouch_ takes care of all those issues.",
			"It stores up to one stack of each color of _Mystical Flower_ and _Tall Mystical Flower_, and passively catches any more that its holder picks up.",
			"It's about the same size on the inside (any colors work) Flowers won't be picked up by the pouch if the pouch is held in your dominant hand.",
			"Furthermore, sneak-right clicking the pouch on a _Chest_ or other inventory will dump all flowers the pouch contains into said inventory...."
		]
	},
	{
		item: "botania:flugel_eye",
		summary: [
			"_The true powers of a Flügel._",
			"Unlike the crafted _Flügel Tiara_, the _Eye of the Flügel_ contains primordial _Flügel_ magic.",
			"Magic strong enough, in fact, to harness the _Flügels_' ability to recall themselves to a previously-visited location.",
			"Sneak-right clicking this eye somewhere will bind it to that position.",
			"Holding right-click with a bound Eye will then use _Mana_ to warp its owner back to its bound location.",
			"Unfortunately, the Eye is still but a fragment of the _Flügels_' true potential, so it can't warp its user across dimensions.",
			"However, just having an _Eye of the Flügel_ on hand allows a _Flügel Tiara_ user to fly with an empty flight bar (at a higher _Mana_ cost)."
		]
	},
	{
		item: "botania:goddess_charm",
		summary: [
			"_Prevents explosions from damaging the world._",
			"The _Benevolent Goddess' Charm_ is a defensive _Trinket_ that's worn (as its name implies) in the _Charm_ slot.",
			"When worn, it uses _Mana_ to prevent explosions in its wearer's vicinity from damaging any blocks in the world.",
			"No EXPLOSION!"
		]
	},
	{
		item: "botania:grass_seeds",
		summary: [
			"_Seeds to create Grass, Podzol and Mycelium._",
			"Watching the slow grow of _Grass_ is seldom a fun activity.",
			"_Tall Grass_, infused with _Mana_, becomes _Pasture Seeds_, which will grow grass in a nearby area when used on a _Dirt_ block.",
			"Other dirt-type blocks can also be grown, such as _Podzol_ or _Mycelium_, from alternative seeds.",
			"_Pasture Seeds_ for grass _Boreal Seeds_ for podzol..."
		]
	},
	{
		item: "botania:gravity_rod",
		summary: [
			"_A rod for lifting and throwing mobs._",
			"The _Rod of the Shaded Mesa_ is a powerful artifact; legend has it that the first of these devices was found lying atop a dusky geographical feature next to a single crowbar.",
			"To use this device, aim it at a mob or item and hold right-click to pick it up.",
			"Releasing right-click will drop the held entity, while punching with it will toss the entity in a powerful burst.",
			"This power does not come free, of course.",
			"Its use requires a constant drain of _Mana_ from the user's inventory.",
			"bun pls..."
		]
	},
	{
		item: "botania:ice_pendant",
		summary: [
			"_Frost Walker: Necklace Edition._",
			"The _Snowflake Pendant_ is a _Trinket_ that's saturated with freezing energies.",
			"Any nearby still _Water_ blocks near its wearer's feet will be temporarily frozen into _Ice_; said _Ice_ will melt shortly after the wearer leaves the area (as if the wearer had _Frost Walker_ boots).",
			"A trail of _Snow Layers_ is also left in its wearer's path.",
			"This charm will cease its freeze if its wearer is sneaking or fully submerged, and also makes its wearer immune to the effects of _Powder Snow_.",
			"Do you want to build a snowman?..."
		]
	},
	{
		item: "botania:infinite_fruit",
		summary: [
			"_Endless supply of nourishment._",
			"The relic known as _The Fruit of Grisaia_ bestows the brave soul who earned it with an endless supply of nourishment.",
			"It can be eaten like any other piece of food, but will use _Mana_ to replenish hunger instead.",
			"It would probably be a good idea to get used to the taste of apple, though."
		]
	},
	{
		item: "botania:invisibility_cloak",
		summary: [
			"_Exactly what it says on the tin._",
			"No need to explain the _Invisibility Cloak_.",
			"You wear it on your _Body_ slot.",
			"It takes _Mana_ from your inventory.",
			"It makes you and your _Trinkets_ invisible.",
			"Magic.",
			"You're a wizard, Steve"
		]
	},
	{
		item: "botania:keep_ivy",
		summary: [
			"_Keep items after death._",
			"A dying person's items splatter all over the ground, which is generally a massive nuisance for all involved.",
			"This issue can be avoided quite simply: when a piece of _Resolute Ivy_ is attached to an item in a crafting grid, the ivy will sacrifice itself at death to keep the item in its holder's inventory.",
			"Afterwards, another piece will be needed in the event of a second death.",
			"Because people die when they are killed There is, however, one restriction on the items the ivy can protect.",
			"For _technical reasons_, the ivy will not attach to an item that leaves something behind when used in a crafting recipe (like a _Bucket of Water_)...."
		]
	},
	{
		item: "botania:king_key",
		summary: [
			"_Open the treasury._",
			"The _Key of the King's Law_ is a powerful relic with the ability to materialize weapons from thin air.",
			"Holding down right-click with this key will begin summoning glowing projectiles from...",
			"somewhere.",
			"Up to twenty projectiles can be created at once, and releasing the grip on the key will launch them, one at a time, at the point the summoner is looking towards.",
			"These projectiles move at high velocities and explode on contact."
		]
	},
	{
		item: "botania:knockback_belt",
		summary: [
			"_Prevent all knockback._",
			"By harnessing the (relative) stability of tectonic forces, the _Tectonic Girdle_ negates any _Knockback_ applied to its wearer from outside attacks and all recoil from the _Mana Blaster_.",
			"The Steve who couldn't be moved"
		]
	},
	{
		item: "botania:laputa_shard",
		summary: [
			"_Raise parts of your world as floating islands._",
			"To abbreviate the complex magical sequences in its creation: combining certain specific resources, including _Gaia Spirits_, allows one to create a shard of power that, when shattered upon the ground, will lift a spheroid area around the point it was smashed high into the air.",
			"Look, Shiro, Laputa exists! A freshly-created shard will lift a sphere of about 14 blocks in radius, but the shard's radius can be upgraded with additional _Gaia Spirits_; each shard adds another block to the radius, up to a radius of 44 blocks.",
			"Note that a larger shard can take at least ten minutes, and possibly much more, to finish its lifting...."
		]
	},
	{
		item: "botania:lava_pendant",
		summary: [
			"_Snuffs some fires._",
			"The _Pyroclast Pendant_ is a _Trinket_ that can handle weak fires.",
			"If its wearer is on fire but not exposed to anything flame-inducing, said wearer will be extinguished.",
			"Unfortunately, the Pendant can't help if its wearer's still stuck in _Fire_, _Lava_, or anything else that's hot.",
			"Hanako could have used one of these"
		]
	},
	{
		item: "botania:lexicon",
		summary: [
			"_What you're reading right now, dummy._",
			"The _Lexica Botania_ is the repository of all knowledge for all botanical matters.",
			"(But you probably knew that already.)All well-known botanical knowledge is stored within these pages.",
			"For convenience, if a block happens to have an entry in here, it can be sneak-right clicked on with the _Lexica Botania_ to open said entry.",
			"Crafting the _Lexica Botania_.",
			"The _Lexica Botania_'s title can also be customized by placing it in an _Anvil_ and renaming it.",
			"This changes both its cover and its title.",
			"The Edition of the Lexica shown equates to the version of the _Botania_ you're running (and no, I _don't_ care about the fourth wall)...."
		]
	},
	{
		item: "botania:livingwood_bow",
		summary: [
			"_A stronger bow that regenerates using Mana._",
			"The _Livingwood Bow_ is (as its name suggests) a bow made of _Livingwood_, strung with _Mana Infused String_.",
			"Due to its sturdier construction, it'll last longer than a normal _Bow_.",
			"It'll also repair itself using _Mana_, the same way _Blue Tools_ do.",
			"Does it shoot airplanes?"
		]
	},
	{
		item: "botania:loki_ring",
		summary: [
			"One of the three mythical rings of the _Aesir_, the _Ring of Loki_ allows for the wearer to call upon the Trickster God's ability to effectively be in multiple places at once.",
			"To use an equipped _Ring of Loki_, begin by sneak-righting click a block with an empty hand.",
			"Once a block is selected (designated the \"origin\"), sneak-right clicking other blocks will store their offsets from the origin in the ring.",
			"To finish the procedure, sneak-right click the origin again.",
			"Sneak-right clicking a stored block during the selection process will remove it from the ring's memory.",
			"To clear a completed selection, just sneak-right click the ground twice.",
			"After the selection is complete, multiple boxes in wireframe will be visible, moving relative to the looked-at block.",
			"When a block is placed while sneaking, all wireframe locations will have blocks placed there, too, allowing for placement _en masse_.",
			"The _Terra Shatterer_ and _Terra Truncator_ will also break blocks at these locations when sneaking, allowing for truly ludicrous quantities of destruction...."
		]
	},
	{
		item: "botania:magnet_ring",
		summary: [
			"_Pull items towards you._",
			"A _Magnetizing Lens_ on a ring of _Blue Ingots_ yields a _Ring of Magnetization_, which attracts nearby items, making them float towards the wearer.",
			"The ring is disabled when its user is sneaking, or when in range of a _Solegnolia_.",
			"Note that a tossed item won't be drawn by its wearer's ring for several seconds (so as to not to interfere with the purpose of said toss).",
			"How do they work? Upgrading the ring for a larger range..."
		]
	},
	{
		item: "botania:mana_mirror",
		summary: [
			"_Remote Portable Mana Access._",
			"A _Mana Mirror_ is an alternative to _Mana_-containing items like _Tablets_.",
			"After it's bound to a _Mana Pool_, items in the inventory requiring _Mana_ will draw from it.",
			"To bind a mirror to a pool, simply _sneak-right click_ the pool with the mirror.",
			"The mirror can't input or output mana from/to pools in any other way.",
			"Mirror mirror on the wall..."
		]
	},
	{
		item: "botania:mana_ring",
		summary: [
			"_Mana-Tablet-In-A-Ring._",
			"Putting a _Mana Tablet_ on a _Blue Ingot_ ring makes the Tablet wearable.",
			"The _Band of Mana_ functions exactly as its component Tablet does, but can be worn as a _Trinket_ as well.",
			"Upgrading the ring by plating it with a _Green Ingot_ allows it to store about four times as much _Mana_.",
			"Creating the ring Upgrading the ring..."
		]
	},
	{
		item: "botania:mana_tablet",
		summary: [
			"_Portable Mana Storage._",
			"Using _Mana Spreaders_ to transport _Mana_ is all well and good, but there are other ways of getting the stuff around too.",
			"The _Mana Tablet_ is a portable item that can carry _Mana_ within itself.",
			"In addition, other items in an inventory can draw from it for their own use, making it an essential tool.",
			"Tossing a tablet into a _Mana Pool_ will allow for flow of _Mana_ between them.",
			"Sneak-right clicking (or using a _Dispenser_) on the _Mana Pool_ with a _Wand of the Forest_ will change which way the _Mana_ will flow.",
			"Unlike normal items, dropped tablets never despawn.",
			"Sadly, it doesn't have wifi..."
		]
	},
	{
		item: "botania:mining_ring",
		summary: [
			"_Mine faster with Haste._",
			"The _Ring of the Mantle_ simply uses _Mana_ to provide a _Haste_ effect for its wearer.",
			"Note that a trickle of _Mana_ is used while the wearer swings their arm or equipped item for anything, including but not limited to attacking, mining, or just flailing.",
			"Diggy diggy hole"
		]
	},
	{
		item: "botania:missile_rod",
		summary: [
			"_A rod for pewpew._",
			"The _Rod of the Unstable Reservoir_ is a weapon at its strongest against a large crowd of foes.",
			"When used, it'll materialize from _Mana_ countless arcane missiles that home in on targets at random.",
			"Zapzapzapzap This rod can be given to a _Livingwood Avatar_.",
			"An avatar with one will attack nearby mobs with missiles, using its own _Mana_ to do so...."
		]
	},
	{
		item: "botania:monocle",
		summary: [
			"_An essential tool for viewing flowers' radii._",
			"The _Manaseer Monocle_ is a handy accessory for insight into _Mana Bursts_' trajectories.",
			"It's not just a fancy eyepiece: it allows its wearer to see all nearby _Mana Bursts_-- even through walls.",
			"Additionally, when a wearer looks at a flower, they can see its areas of effect.",
			"Why hello there old chap As a bonus, viewing redstone components with the _Manaseer Monocle_ will display information about them, expediting the construction of redstone contraptions.",
			"The monocle can be used as a _Cosmetic Override_ to any other _Trinket_; when so applied, it keeps all its functionality, allowing it to be used without taking up a slot...."
		]
	},
	{
		item: "botania:obedience_stick",
		summary: [
			"_Binding flowers to a location en masse._",
			"For some inexplicable reason, a _Blue Ingot_ attached to some _Livingwood Twigs_ is a thing flowers _pay attention to_.",
			"When used on a _Mana Spreader_ or _Mana Pool_, this tool (dubbed the _Floral Obedience Stick_) binds all nearby _Generating_ or _Functional_ flowers, respectively, to that block.",
			"A _Dispenser_ can also use a _Floral Obedience Stick_.",
			"Generate, or else!"
		]
	},
	{
		item: "botania:odin_ring",
		summary: [
			"_Godlike resistance._",
			"One of the three mythical rings of the _Aesir_, the _Ring of Odin_ grants its bearer the vitality and resistance of the Father God.",
			"It provides its wearer with ten extra hearts of health and indefinite protection from various kinds of elemental damage, including drowning, suffocation, fire, and starvation."
		]
	},
	{
		item: "botania:open_bucket",
		summary: [
			"_A bucket that destroys anything that comes inside._",
			"A bucket fashioned from _Elementium_ seems to behave strangely: liquids dumped into by it simply vanish into the ether, never to be seen again.",
			"This makes it a useful tool for fluid cleanup.",
			"A Souvenir from Lewis"
		]
	},
	{
		item: "botania:overgrowth_seed",
		summary: [
			"_Turns grass into enchanted soil._",
			"An _Overgrowth Seed_ is an item that, when planted on _Grass_, spells it into _Enchanted Soil_.",
			"Flowers that are planted on this _Enchanted Soil_ will function at twice their normal speed."
		]
	},
	{
		item: "botania:phantom_ink",
		summary: [
			"_Make your armor and Trinkets invisible._",
			"Having your beautiful skin and accessories hidden under a set of clunky armor is nobody's dream.",
			"It's bulky, flat, and worst of all, unfashionable!Luckily, splashing _Phantom Ink_ on armor in a crafting grid will make the latter completely invisible, while still providing all of its benefits.",
			"(_Phantom Ink_ only works on armor sets that use _Mana_.) Who you gonna call?"
		]
	},
	{
		item: "botania:pixie_ring",
		summary: [
			"_Spawn more pixie friends (warning: lifetime of friends not insured)._",
			"(Note: This ring works best alongside the _Elementium Armor_ set; insight in the latter's abilities is advised to use this ring.)When worn, the _Great Fairy Ring_ simply increases the chance for a _Pixie_ to spawn when its wearer is hit, even if no _Elementium Armor_ is equipped.",
			"We got square heads, big pointy caps"
		]
	},
	{
		item: "botania:rainbow_rod",
		summary: [
			"_A rod for creating rainbow bridges (and fancy building blocks)._",
			"The _Bifrost_ is the legendary rainbow bridge that connects our world and the realm of the gods.",
			"While the _Rod of the Bifrost_ can't really do _that_, it allows wielder to summon a rainbow bridge from _Mana_ in the direction they look.",
			"This bridge can extend up to a hundred blocks away, and will vanish after about thirty seconds.",
			"Only one bridge can be created for any given _Rod of the Bifrost_ at a time; as soon as the old bridge vanishes, a new one can be created.",
			"Going my way!! Cut open a path and go!..."
		]
	},
	{
		item: "botania:reach_ring",
		summary: [
			"_Reach farther, build farther._",
			"\"If you tap into the power of your Pride, nothing will be out of your reach.\"When the _Ring of Far Reach_ is worn, the maximum distance from which its wearer can interact with blocks is increased by about three blocks.",
			"Fire and Blood"
		]
	},
	{
		item: "botania:red_string",
		summary: [
			"_Remote inventories and other remote things._",
			"Lore of old says that the gods connect people who will affect each others' lives with a red string, tied between their ankles.",
			"While blocks aren't people, they don't need gods to be connected.",
			"Instead, they can be linked with a material called (_of course_) _Red String_.",
			"Each _Red Stringed_ block has a different criterion for what it'll bind to, but all have a range of about eight blocks.",
			"If a block is bound, its String can be viewed by holding a _Wand of the Forest_.",
			"The _Red String_ won't be affected by intervening blocks, but _Red Stringed_ blocks can't be chained.",
			"Are you in a pinch?..."
		]
	},
	{
		item: "botania:sextant",
		summary: [
			"_A tool to help create circles._",
			"In a world of cubes, the secrets of creating circles is a lost art coveted by many-- so much so, in fact, that some to turn to the unholy act of \"tabbing out\" to learn the proper procedures.",
			"The _Worldshaper's Sextant_, however, provides a ready alternative to such an act.",
			"To use the item, simply right-click and hold at a block to choose a circle's center, and look around to choose its radius; a blue circle will appear in the world as a preview of the circle's shape.",
			"Upon release of the sextant, a mirage of _Cobblestone_ blocks will appear as a building guide.",
			"Sneak-right clicking the sextant will remove the circle.",
			"You sketch a circle, filling you with determination..."
		]
	},
	{
		item: "botania:slime_bottle",
		summary: [
			"_Slime chunk detector._",
			"Placing a _Slimeball_ in an container of _Elementium_ seems to have an interesting effect on said slimeball: when in an area where _Slimes_ would naturally spawn underground, the inanimate blob of slime comes alive and bounces around the container.",
			"For harvesting _Slimeballs_ or setting up a _Narslimmus_, it proves an invaluable tool.",
			"JUMPYDOLL"
		]
	},
	{
		item: "botania:smelt_rod",
		summary: [
			"_A rod for smelting blocks._",
			"The _Rod of the Molten Core_ has the ability to focus heat drawn from the world's core.",
			"Focusing it (by holding right-click) at a block in the world that can be smelted into a different block will smelt it into that block.",
			"For example, _Cobblestone_ will smelt into _Stone_ and then into _Smooth Stone_, _Sand_ melts into _Glass_, and so on.",
			"No raid party required"
		]
	},
	{
		item: "botania:spawner_mover",
		summary: [
			"_The ability to move Spawners._",
			"When a _Dragonstone_, _Elementium_, _Ender Air_, and _Gaia Spirits_ are crafted in a specific pattern, they yield a device that can restrain the curious energies of a _Monster Spawner_ and carry it to another point in space.",
			"Unfortunately, the device will shatter after being used once.",
			"A spawner parcel"
		]
	},
	{
		item: "botania:speed_up_belt",
		summary: [
			"_Speeds you up the more you walk._",
			"The _Planestrider's Sash_ is an alternative to the _Sojourner's Sash_.",
			"Unlike its counterpart, it provides no speed boost by default-- however, the more its wearer moves, the faster they get, allowing them to hit truly ludicrous speeds.",
			"If its user stops running, however, their bonus is reset.",
			"If you go slow you're a Planeswalker"
		]
	},
	{
		item: "botania:spell_cloth",
		summary: [
			"_Wipe enchantments and curses off items._",
			"_Manaweave Cloth_, when combined with a _Mana Pearl_'s displacive properties, can become a type of cloth that dispels all _Enchantments_ or _Curses_ it touches.",
			"Combining the _Spellbinding Cloth_ with any enchanted item in a crafting table will remove all enchantments, including curses, from that item (at the cost of some of the cloth's durability).",
			"Oldest item in the book"
		]
	},
	{
		item: "botania:star_sword",
		summary: [
			"_Sword that calls down fallen stars._",
			"The _Starcaller_ is a blade with the power to call upon the wrath of the stars.",
			"When swung, the blade summons a falling star from the heavens to the point the wielder is looking at, dealing damage to whatever stands there.",
			"This sword is nontrivial to acquire, with _Ender Air_ and a _Terra Blade_ both being components in its crafting.",
			"Do note that any enchantments on the latter will be lost.",
			"Caller, fury, whatever..."
		]
	},
	{
		item: "botania:super_cloud_pendant",
		summary: [
			"_Lets you triple jump._",
			"The _Nimbus Amulet_ is an upgraded form of the _Cirrus Amulet_.",
			"Infused with the power of _Gaia Spirits_, it allows its wearer to _triple-jump_.",
			"Magic > physics"
		]
	},
	{
		item: "botania:super_lava_pendant",
		summary: [
			"_Full-on fire and lava resistance._",
			"The _Crimson Pendant_ is an upgrade to the _Pyroclast Pendant_.",
			"Wearing it provides the wearer full-on immunity to fire damage (from flames, lava, etc.) You can now take a lava bath"
		]
	},
	{
		item: "botania:super_travel_belt",
		summary: [
			"_Gotta go fast._",
			"The _Globetrotter's Sash_ is nothing more than an upgrade to the _Sojourner's Sash_.",
			"_Gaia Spirits_ and _Elven resources_ allow this belt's wearer (for some _Mana_, of course) to reach incredible speeds-- the _Sojourner's Sash_ doesn't even stand a chance in comparison.",
			"No time for guessing, follow my plan instead"
		]
	},
	{
		item: "botania:swap_ring",
		summary: [
			"_Make sure you have the right tool for the job._",
			"Switching tools can be a pain, especially when you find yourself shoveling away at dirt with...",
			"an axe? The _Ring of Correction_ is a great way to, well, correct those problems.",
			"With this ring equipped, the tool in hand will always be the right one for the block being broken, be it pick, axe, shovel, hoe, or shears.",
			"As long as you have the relevant _Mana_-using tools on hand.",
			"Use the right tools"
		]
	},
	{
		item: "botania:temperance_stone",
		summary: [
			"_A limiter for the power of the Green Tools._",
			"The _Terra Shatterer_ can tear through huge tracts of land like lightning when charged to its maximum potential; however, this might not always be the user's intention.",
			"A small, 3x3 region might be more fitting in certain cases; thus, an active _Stone of Temperance_ in the inventory will prevent a _Terra Shatterer_ from breaking any wider areas.",
			"This also affects the _Terra Truncator_ and the _Rod of the Shifting Crust_.",
			"The stone can be toggled on/off by right clicking it, either in your inventory or your hand.",
			"Don't lose it"
		]
	},
	{
		item: "botania:terra_axe",
		summary: [
			"_An axe that chops down whole trees.",
			"How inspired._",
			"The _Terra Truncator_ is a greataxe of a premium quality achievable only with _Green Ingots_.",
			"It can fell an entire tree at once, using _Mana_ to break all its logs and leaves in one fell swoop.",
			"It won't do so while its user is sneaking or has a _Stone of Temperance_.",
			"TIMBEEEEEEEER"
		]
	},
	{
		item: "botania:terra_pick",
		summary: [
			"_Upgradable pickaxe with large area-of-effect powers._",
			"The _Terra Shatterer_ is a tool that, thanks to the sheer quantity of _Green_ in its recipe, can absorb absolutely ludicrous amounts of _Mana_.",
			"The tool functions very much like a _Mana Tablet_ when tossed on a _Mana Pool_.",
			"However, any _Mana_ absorbed can't be released again, so it's nonviable as a storage device.",
			"The amount of _Mana_ stored in the tool establishes its _Rank_.",
			"The rank of the tool does not change its speed; rather, it increases the range of its _Active Ability_.",
			"A sneak right-click in the air will toggle the Shatterer's Ability on or off...."
		]
	},
	{
		item: "botania:terra_sword",
		summary: [
			"_A sword that fires a beam that damages mobs._",
			"The _Green Blade_, crafted from _Green Ingots_, is a sword infused with the strength of nature.",
			"It's on par with a _Light Blue Sword_ in terms of raw power, and when swung, can sometimes fire a beam that will deal as much as a melee hit would.",
			"Additionally, it can use _Mana_ for durability, much like _Blue Tools_ can.",
			"No Broken Hero Sword"
		]
	},
	{
		item: "botania:terraform_rod",
		summary: [
			"_A rod for terraforming._",
			"While digging away at dirt with a shovel is definitely a functional means of landscaping, flattening huge tracts of land can get somewhat arduous.",
			"The _Rod of the Terra Firma_, by contrast, terraforms in a quicker and environmentally-friendlier manner.",
			"This rod, will, at a nontrivial cost of _Mana_ from the user's inventory, flatten surrounding land to your own altitude.",
			"For this to happen, charge it by _holding right-click_, and slowly but surely, the nearby terrain will be flattened to your level, either by placing _Dirt_ or by removing blocks.",
			"_Blocks removed by the rod are non-recoverable._",
			"The terrain will adapt to the changes as best as it can (up to a distance limit) to avoid weirdly-shaped hills and so on.",
			"The flattening, thus, will follow the terrain's natural shape.",
			"Note that the rod will completely cease to function below sea level...."
		]
	},
	{
		item: "botania:third_eye",
		summary: [
			"_See all the mobs._",
			"The _Third Eye_ is an sensory aid of sorts.",
			"When worn in the _Body_ slot, it uses _Mana_ to cause nearby mobs to glow, making them visible even through walls.",
			"Read their positions, not their minds"
		]
	},
	{
		item: "botania:thor_ring",
		summary: [
			"_Because your Terra Shatterer wasn't strong enough._",
			"One of the three mythical rings of the _Aesir_, the _Ring of Thor_ bestows upon its wearer the might of the Thunder God.",
			"When equipped, it dramatically increases a _Terra Shatterer_'s area of effect."
		]
	},
	{
		item: "botania:thorn_chakram",
		summary: [
			"_Throwable vine weapon that bounces and poisons._",
			"The _Thorn Chakram_ is a thrown weapon crafted from a _Green Ingot_ and plant matter.",
			"When thrown, a chakram pierces through enemies, dealing damage with a chance to leave behind poison.",
			"It bounces off blocks, and returns to its thrower after about three seconds like a boomerang.",
			"Up to 6 _Thorn Chakrams_ can be stacked together, making them deadly in closed spaces.",
			"Spores and stingers"
		]
	},
	{
		item: "botania:thunder_sword",
		summary: [
			"_Sword that calls upon thunder._",
			"The _Thundercaller_ is a dual-pronged sword with the ability to conjure lightning.",
			"Crafted from materials like a _Terra Blade_ and _Ender Air_, it sacrifices the power of long-ranged attacks for the power to zap multiple targets in one stroke.",
			"An attack from the _Thundercaller_, in a crowd, will generate a chain of lightning that zaps nearby hostile mobs.",
			"Blessed Blade of the Trade Chat"
		]
	},
	{
		item: "botania:tiny_planet",
		summary: [
			"_Your own personal Mana Burst orbit._",
			"The _Tiny Planet_ is a _Trinket_ with gravitational properties.",
			"When equipped, it pulls nearby _Mana Bursts_ into orbits around its wearer.",
			"By increasing its mass with some _Stone_, it can also be placed as a block for the same effect.",
			"Clearly from rebirth More of a planet than Pluto..."
		]
	},
	{
		item: "botania:tornado_rod",
		summary: [
			"_A rod for jumping high into the sky._",
			"The _Rod of the Skies_ uses _Mana_ to launch its user high in the air.",
			"To use it, simply right-click with it and watch yourself soar.",
			"The rod, after usage, will briefly enter a mode where it negates fall-damage, keeping its user safe.",
			"A treasure from Lorule This rod can be given to a _Livingwood Avatar_.",
			"When so given, an avatar will use its _Mana_ to launch any players that jump near the avatar as if they'd used the rod themselves...."
		]
	},
	{
		item: "botania:travel_belt",
		summary: [
			"_Run faster, jump higher, and step more smoothly._",
			"Traversing lots of terrain sometimes proves to be a hassle.",
			"The _Sojourner's Sash_ is a _Belt_ that, when worn, uses a trickle of _Mana_ to buff its wearer's movement speed, jump height, and fall-damage resistance.",
			"It also allows a non-sneaking wearer to step up one-block-high gaps as if they were stairs.",
			"...everell"
		]
	},
	{
		item: "botania:twig_wand",
		summary: [
			"_Your essential multi-tool._",
			"A botanist's most important tool for manipulating flowers is the _Wand of the Forest_.",
			"This wand, crafted from a pair of _Mystical Petals_ strapped to a few _Livingwood Twigs_, is a must-have for a huge number of botanical tasks.",
			"The wand has two modes, _Bind Mode_ and _Function Mode_.",
			"In _Bind Mode_, sneak-right click it on a compatible block to select it, then sneak-right click elsewhere to bind the two blocks.",
			"In _Function Mode_ it simply doesn't perform this function, freeing the sneak-right click action up for other tasks.",
			"The two modes can be switched between by sneak-right clicking the wand in the air.",
			"Sneak-right clicking a block in _Function Mode_ rotates the block around the axis of the side it was clicked on-- for example, using the wand on the top of a _Chest_ will change the direction it faces.",
			"Most blocks with orientations can be reoriented this way.",
			"A _Dispenser_ holding a wand will use the wand on the block it currently faces, when triggered...."
		]
	},
	{
		item: "botania:vine_ball",
		summary: [
			"_Throwable vines you can climb like ladders._",
			"_Ladders_ can't support their own weight; they require supporting blocks.",
			"_Vines_ don't, but aren't strong enough to be climbable by pushing towards them; you'll just end up walking right through them instead.",
			"On the other hand, when a bunch of _Vines_ are balled up, they yield a throwable item that creates a climbable string of strong _Vines_ on impact.",
			"Combining some _Livingwood Twigs_ with a _Rune of Air_ yields a slingshot that lets these _Vine Balls_ ignore gravity entirely.",
			"This would be in Vineacraft......"
		]
	},
	{
		item: "botania:water_ring",
		summary: [
			"_Move super fast underwater._",
			"The _Ring of Chordata_ allows its user to swim like, well, a fish.",
			"When equipped, it uses _Mana_ to bestow an underwater wearer with greater vision, maneuverability, and mining speed, as well as the ability to breathe indefinitely.",
			"Check out that fish AI"
		]
	},
	{
		item: "botania:water_rod",
		summary: [
			"_A rod for creating water._",
			"Similarly to its land-themed counterpart, the _Rod of the Seas_ will (at the cost of some _Mana_) place a block of _Water_ wherever it's used.",
			"Furthermore, it can refill a _Petal Apothecary_, as well as empty _Buckets_ in the inventory.",
			"Keep the Earth clean, it isn't Uranus"
		]
	},
	{
		item: "botania:world_seed",
		summary: [
			"_Single-use jump to world spawn._",
			"_World Seeds_ are energized pieces of elemental matter with the ability to return their user to the world's spawn point.",
			"If its user is 24 or more blocks from the world's spawnpoint, a right-click with one held will instantly teleport them to that location, consuming the seed in the process.",
			"Where the heart is"
		]
	},
	// Botanic Additions
	{
		item: /botanicadds:.*necroidus/,
		summary: [
			"_Necroidus_ is essentially a wither builder, but uses mana instead.",
			"You will need to drop soul sand and wither skulls nearby for the flower to build.",
			"Note: building will be anchored on the blocks above the flower, up to 4 blocks and the creation process doesn't use very much mana."
		]
	},
	{
		item: /botanicadds:.*rainute/,
		summary: [
			"_Rainute_ produces _Mana_ while it's raining.",
			"Note: This flower doesn't produce anything in snow environment.",
			"Don't get it too wet!"
		]
	},
	{
		item: /botanicadds:.*glaciflora/,
		summary: [
			"_Glaciflora_ is an alternative to _Rainute_ but for snow biomes.",
			"You know why this is a thing....",
			"Cold to the touch!"
		]
	},
	{
		item: /botanicadds:.*tempestea/,
		summary: [
			"_Tempestea_ is another weather-dependent flower except this one isn't a passive one.",
			"_Tempestea_ generates mana when a lightning occurs nearby.",
			"Afterwards, it redirects it on self and generates a lot of mana.",
			"This process heats the flower and it needs _roughly a minute_ to cool down.",
			"Essentially an energy converter!"
		]
	},
	{
		item: /botanicadds:.*vibrantia/,
		summary: [
			"_Vibrantia_ comes from deep underground, where _Sculk_ lives.",
			"It harnesses power of _Sculk_ to generate mana when it senses vibrations nearby.",
			"Making a flower from sculk, however, reduces it's feeling abilities, and thus it can no longer hear mana bursts and other projectiles at all."
		]
	},
	{
		item: /botanicadds:.*apicaria/,
		summary: [
			"The _Apicaria_ is a relaxing flower.",
			"Not you though, it takes care of keeping your bees calm.",
			"It channels _Mana_ into angered bees (whom you shouldn't have touched in the first place) and saves the player from bee's anger.",
			"It also prevents bees from angering at player when one harvests the _Beehive_'s content.",
			"Bzzzzzz."
		]
	},
	{
		item: /botanicadds:.*energizera/,
		summary: [
			"Through careful energy channeling, this flower creates _Mana_ from _Forge Energy_.",
			"Any nearby blocks, containing _Forge Energy_ will feed the flower with energy.",
			"Power is mana!"
		]
	},
	{
		item: "botanicadds:mana_tesseract",
		summary: [
			"Transporting mana over insane distances, especially between dimensions was a dream, until now! _Mana Tesseract_ is your new way of transporting mana! Of course it's far from perfect, but at least it can get you going.",
			"To change channels, you'll need to rename the _Tesseract Attunement Tool_.",
			"Space may be broken..."
		]
	},
	{
		item: "botanicadds:elven_altar",
		summary: [
			"_Elven Altar_ is suitable for faster crafting.",
			"By improving it with _Dragonstone_ and _Dreamrock_ you can get an altar that is capable of accepting _Mana_ from _Sparks_.",
			"Since they transfer mana much faster, this seems to be an important device to upgrade!"
		]
	},
	{
		item: "botanicadds:gaia_plate",
		summary: [
			"After getting your palms on elven resources, why not to upgrade your _Terrestrial Agglomeration Plate_? It has been pretty good at doing what it should.",
			"But perhaps it's time to upgrade? _Gaia Agglomeration Plate_ is way more efficient in creating _Terrasteel_ AND it can create more than just that!"
		]
	},
	{
		item: "botanicadds:terra_catalyst",
		summary: [
			"_Terra Catalyst_ is used as another type of catalyst.",
			"It may also be used as a splitter for some resources such as _Gaia Spirit_."
		]
	},
	{
		item: "botanicadds:dreaming_pool",
		summary: [
			"_Dreaming Mana Pool_ is another pool of mana, made from _Dreamrock_.",
			"This pool is twice larger than a normal pool.",
			"Enjoy!"
		]
	},
	{
		item: "botanicadds:mana_stealer_sword",
		summary: [
			"_Mana Stealing Blade_ is an improvement to _Terra Blade_.",
			"This time though, it deals more damage AND it's capable of drawing mana from your enemy players!"
		]
	},
	{
		item: "botanicadds:elven_brewery",
		summary: [
			"_Elven Brewery_ is an improved version of _Botanical Brewery_.",
			"Combining it with _Dragonstone_ and _Dreamrock_ allows attaching _Sparks_ to it, making the crafting process way faster."
		]
	},
	{
		item: "botanicadds:aura_ring_gaia",
		summary: [
			"The _Gaia Band of Aura_ is an upgrade to _Greater Band of Aura_ with a piece of _Gaiasteel_.",
			"This band creates mana twice as fast, as a _Greater Band of Aura_!"
		]
	},
	{
		item: "botanicadds:mana_ring_gaia",
		summary: [
			"The _Gaia Band of Mana_ is an upgrade to _Greater Band of Mana_ with a piece of _Gaiasteel_.",
			"This band stores about four times as much mana, as a _Greater Band of Mana_!"
		]
	},
	{
		item: "botanicadds:gaiasteel_pylon",
		summary: [
			"The _Gaiasteel Pylon_ is a better version of _Natura Pylon_.",
			"By applying some _Gaiasteel_ to _Natura Pylon_, it can be upgraded, thus reducing any mana cost for operating _The Portal to Alfheim_ by around four times."
		]
	},
	{
		item: "botanicadds:elven_fluxfield",
		summary: [
			"Improving on _Mana Fluxfield_ with elven resources allows one to attach spark to the Fluxfield, while also improving it's overall capacity."
		]
	},
	// Ars Nouveau
	{
		item: "ars_nouveau:agronomic_sourcelink",
		summary: [
			"The Agronomic Sourcelink generates source from crop and tree growth within 15 blocks.",
			"Bonus source is generated for magical plants such as Mageblooms, Source Berry Bushes, and Archwood Saplings.",
			"Source will be output from the Sourcelink to nearby jars within 5 blocks.",
			"Note: Bonemealing crops will not grant Source."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:alchemical_sourcelink",
		summary: [
			"Generates source by consuming potions from adjacent potion jars.",
			"The amount of source varies per potion and is dependent on the complexity of the potion.",
			"Bonus source is given for the length and level of the potion with multipliers for each effect a potion contains.",
			"Utilizing Wixies and Potion Melders is recommended for creating highly complex potions."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:alchemists_crown",
		summary: [
			"Allows the wearer to consume potions and flasks instantly from their inventory."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:amplify_arrow",
		summary: [
			"Adds two amplifies to the end of the inscribed spell when used.",
			"Each recipe makes ."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:amulet_of_mana_boost",
		summary: [
			"Increases max mana by a moderate amount."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:amulet_of_mana_regen",
		summary: [
			"Increases mana regeneration by a moderate amount."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:annotated_codex",
		summary: [
			"The Annoted Codex allows players to share their knowledge of glyphs with other players.",
			"To record your known glyphs, simply use the codex.",
			"Recording glyphs requires EXP for each glyph known, and the EXP will be consumed upon using the item.",
			"Using the item again will update the list of known glyphs.",
			"Other players may use the book to learn the glyphs, consuming the codex in the process."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:bastion_pod",
		summary: [
			"A fruit that can be brewed into a Potion of Defence, reducing the amount of damage taken."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:belt_of_levitation",
		summary: [
			"A belt that allows the user levitate a moderate distance above the ground.",
			"Useful for climbing mountains! Simply sneak in the air while falling (or jumping) to rise.",
			"Reduces a small amount of fall damage while worn."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:belt_of_unstable_gifts",
		summary: [
			"Occasionally grants a random positive potion effect for a short duration.",
			"These effects can vary in strength."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:bombegrante_pod",
		summary: [
			"A fruit that packs an explosive punch.",
			"Can be brewed into a Potion of Blasting, causing the target to explode when the duration ends."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:brazier_relay",
		summary: [
			"Allows the users to bind a Ritual Brazier ritual to a new location.",
			"Multiple rituals can be connected to the same brazier relay.",
			"To connect, use the Dominion Wand on your Ritual Brazier, then the relay.",
			"Source is consumed at the original braziers location.",
			"Can be bound within 15 blocks."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:dominion_wand",
		summary: [
			"A tool for configuring Source Relays and automation entities.",
			"To set a transfer path, use the wand on the object that you would like to take source from, and then use it on the block you would like to send source to.",
			"For example: Source Jar to Source Relay, Source Relay to Source Relay, or Source Relay to Source Jar.",
			"To clear connections, sneak and use this wand on a relay.",
			"You can switch into Strict mode using the radial menu, allowing to specify the side of the blocks to use."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:dowsing_rod",
		summary: [
			"A Dowsing Rod provides the user a short duration of Scrying for Budding Amethyst and Magic Find, which will cause magical creatures to glow within 75 blocks of you.",
			"The Dowsing Rod has a limited number of uses."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:enchanters_eye",
		summary: [
			"A caster tool that can cast inscribed spells remotely through a Scry Crystal.",
			"Use the eye on a Scry Crystal to bind the location, or hold a bound Scry Parchment in the offhand.",
			"Spells will be cast through the eye similar to a Spell Turret, but you are considered the caster for all effects.",
			"Useful for remote teleportation or item movement."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:enchanters_mirror",
		summary: [
			"Applies a self spell to the user.",
			"Spells cast with this mirror are discounted and gain additional bonus duration to all glyphs.",
			"Apply a spell at the Scribe's table that DOES NOT contain a form such as Heal -> Amplify."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:enchanters_shield",
		summary: [
			"Upon blocking damage, the user will gain a short duration of Mana Regeneration and Spell Damage.",
			"Additionally, this shield will repair over time using the wearers mana."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:enchanters_sword",
		summary: [
			"Applies a Touch spell before damaging an entity.",
			"Additionally, all spells gain Spell Damage.",
			"Apply a spell at the Scribes Table that does NOT contain a form, such as Ignite -> Extend Time."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:frostaya_pod",
		summary: [
			"A fruit that can be brewed into a Potion of Freezing, freezing the target over time."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:jar_of_light",
		summary: [
			"Summons a light that will follow the user as they move.",
			"Can be summoned and dismissed at any time."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:jump_ring",
		summary: [
			"Allows the user to continue jumping in the air.",
			"Each jump will expend mana."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:magebloom_crop",
		summary: [
			"A magically infused flower, Mageblooms provide additional source to nearby Agronomic Sourcelinks as they grow and provide a source of Magebloom Fiber.",
			"Mageblooms can also be used in crafting Potions of Spell Damage, increasing the damage of your spells."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:mendosteen_pod",
		summary: [
			"A fruit that can be brewed into a Potion of Recovery, increases the amount of healing received from all sources."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:mycelial_sourcelink",
		summary: [
			"Generates a moderate amount of source from nearby food, generating more for more nourishing food.",
			"Source Berry food is worth far more than other mundane foods.",
			"Additionally, the Mycelial Sourcelink will convert Grass or Dirt in the 3x3 below it into Mycelium and will grow mushrooms around it given that the space is empty.",
			"The Sourcelink will also pull items from nearby pedestals."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:pierce_arrow",
		summary: [
			"Adds two pierce to the beginning of the chain.",
			"Each recipe makes _32_."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:potion_diffuser",
		summary: [
			"Consumes a potion and applies it to nearby entities, greatly extending the use of the potion.",
			"To use, bind a Potion Jar to the diffuser using the Dominion Wand.",
			"Every 10 minutes the diffuser will consume a single potion and apply it every few seconds."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:potion_jar",
		summary: [
			"A jar that stores up to 100 potions.",
			"Potion can be removed by using an Empty Bottle, Potion Flask, or Arrows on the jar.",
			"Wixies will use these jars during Potion Autocrafting.",
			"The jar may be locked by using a Dominion Wand while sneaking.",
			"Locked Jars will only receive the potion it is locked to from Wixies.",
			"Can be used with a Comparator."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:potion_melder",
		summary: [
			"Converts three doses of a potion from two Potion Jars and outputs a potion with the combined effects.",
			"Use the Dominion Wand from a Potion Jar to Melder to link a jar for consumption.",
			"Link two input potion jars to the melder.",
			"Then, use the wand on the Melder and then to a third jar to set the output.",
			"The Potion Melder requires source per mix."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:reactive",
		summary: [
			"Reactive is an enchantment that can be applied to ANY item and can be applied and upgraded by the Enchanting Apparatus.",
			"Tools and armor with the Reactive enchantment have a chance to automatically cast a spell on use or when the player is hurt.",
			"The spell that the enchantment will cast is dependent on the spell inscribed in the first crafting phase, and the user must have enough mana to cast the spell."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:reactive2",
		summary: [
			"To enchant an item with Reactive, place any item or armor in the apparatus.",
			"The spell parchment placed on the pedestal must be inscribed with a valid spell.",
			"See the Scribes Table for additional information.",
			"Reactive Enchantment also requires jars of source near the Enchanting Apparatus.",
			"The first level enchantment requires approximately one third of a jar."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:reactive3",
		summary: [
			"To upgrade the enchantment, replace the reagent with any item that has an existing Reactive enchantment.",
			"The Tier 2 reactive enchantment requires an item with Reactive I, and the Tier 3 Reactive enchantment requires an item with Reactive II.",
			"Higher levels will require a significantly higher amount of source nearby."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:reactive4",
		summary: [
			"The spell that Reactive gear casts can be changed by placing an enchanted piece of gear into the apparatus with a new inscribed spell parchment.",
			""
		],
		"controls": []
	},
	{
		item: "ars_nouveau:redstone_relay",
		summary: [
			"Can be connected to other Redstone Relays to wirelessly send a redstone signal.",
			"Takes input from one side and outputs in all other directions.",
			"Can be connected within 30 blocks of another relay, and multiple relays can be connected."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:relay",
		summary: [
			"Enables the transport of source between Source Jars and other Source Relays.",
			"To pull source from jars, use the Dominion Wand on the jar, and then on the relay.",
			"To send between relays or from a relay to a jar, use the wand on the relay and then the target you wish to send source to.",
			"Relays may only reach up to 30 blocks away.",
			"To clear connections, sneak while using the Dominion Wand on the relay."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:relay_collector",
		summary: [
			"Operates similar to the Source Relay, but will automatically take from jars it is not linked to within 5 blocks.",
			"See the instructions on the Source Relay for use."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:relay_deposit",
		summary: [
			"Operates similar to the Source Relay, but will deposit to jars it is not linked to within 5 blocks.",
			"See the instructions on the Source Relay for use."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:relay_splitter",
		summary: [
			"Operates similar to the Source Relay, but will support taking from and transferring to multiple jars at once.",
			"The splitter has a much larger through-put than the Source Relay, and will split this throughput amongst all of its jars.",
			"See the instructions on the Source Relay for use."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:relay_warp",
		summary: [
			"Operates similar to the Source Relay: Splitter but can teleport source an endless distance between other Warp relays.",
			"For distances beyond 30 blocks, there is a chance that some source will be lost during warp."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:ring_of_greater_discount",
		summary: [
			"Provides a slightly larger discount over the Lesser Ring of Discount."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:ring_of_lesser_discount",
		summary: [
			"In addition to providing a small bonus to maximum mana and mana regen, Rings of Discount reduce the total cost to cast a spell."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:ritual_brazier",
		summary: [
			"A brazier that may be used as decoration or for performing rituals.",
			"To light the brazier for decoration, cast a Light spell on the brazier.",
			"The color of the brazier corresponds with the color of the spell.",
			"Applying a redstone signal will disable a running ritual.",
			"For information on performing rituals, see the dedicated section on rituals."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:runic_chalk",
		summary: [
			"Runic chalk can be used to place permanent Runes on the ground that will cast spells on entities that walk over them.",
			"To give a rune a spell, inscribe spell parchment using the scribes table.",
			"Once the rune has cast the spell, it will become uncharged.",
			"An uncharged rune will charge itself from nearby source jars.",
			"Using Runic Chalk on a temporary rune will convert it to a permanent one.",
			"Using an essence on the rune will change its pattern."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:scryer_scroll",
		summary: [
			"Stores the location of a Scryer's Crystal.",
			"To create one, use a Blank Parchment on a Scry Crystal.",
			"You can remotely access the stored position by placing this item on a pedestal near a Scryer's Oculus.",
			"Naming this item will allow you to easily recognize it in the Scryer's Oculus interface."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:scryers_crystal",
		summary: [
			"Can be used to look through as if you were standing there.",
			"Right click to enter the camera, or bind the camera to a Scryer's Scroll by using Blank Parchment on the block.",
			"A Scryer's Scroll will let you remotely access the block via a Scryer's Oculus.",
			""
		],
		"controls": []
	},
	{
		item: "ars_nouveau:scryers_oculus",
		summary: [
			"Allows you to remotely access Scry Crystals.",
			"To use, place Scryer's Scrolls on nearby pedestals and interact with the Oculus to select which Scry Crystal you would like to access.",
			"Scry Crystals must be chunk loaded."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:source_jar",
		summary: [
			"Source Jars store source gathered from nearby Sourcelinks.",
			"Source is used in rituals and automation by powering devices like the Imbuement Chamber and Enchanting Apparatus.",
			"Source may be moved using a Source Relay or by breaking and moving it.",
			"Devices will use source from nearby jars.",
			"Source Jars will provide a signal to comparators based on their level."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:source_lamp",
		summary: [
			"Behaves like a copper bulb, but the light and comparator values can be adjusted by casting Light with dampen."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:spell_prism",
		summary: [
			"When a projectile spell hits this block, it is redirected the direction the block is facing.",
			"Spell Prisms will send a signal to nearby Observers if a spell is redirected."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:spell_sensor",
		summary: [
			"Outputs a redstone signal when a spell is cast nearby.",
			"Output strength is determined by the length of the spell cast.",
			"Using a Dominion Wand will cause it to trigger when a spell resolves nearby, instead of being cast.",
			"Using a Spell Parchment will set the sensor to only output when that exact spell is detected."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:split_arrow",
		summary: [
			"Adds two split to the beginning of the chain.",
			"If a spell arrow will deal damage, each split arrow will as well.",
			"Each recipe makes ."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:stable_warp_scroll",
		summary: [
			"Creates a temporary Warp Portal when used on a block.",
			"This scroll is not consumed on use and can teleport between dimensions.",
			"Using a Stabilized Warp Scroll to create a Warp Portal will create a cross dimension warp portal, but consume the scroll.",
			"This scroll may only be bound to a location a single time."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:starbuncle_shades",
		summary: [
			"Using these on a Starbuncle will disable their ability to pick up items off the ground or pick Sourceberries.",
			"Wanding the starbuncle will drop the glasses."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:summon_focus",
		summary: [
			"A special casting focus.",
			"Grants summons from spells additional duration, strength, speed, and deals damage to enemies that kill them.",
			"Additionally, casting spells that target you like Self and Orbit will cast a copy of the spell on your nearby summons."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:threads",
		summary: [
			"Each type of armor has its own unique set of Thread Slots.",
			"Upgrading the armor to a new tier will unlock and add additional slots to the armor.",
			"The Sorcerors set provides the least amount of defence while providing the most powerful slots, while the Battlemage's set provides defence but much weaker slots.",
			"For recipes on upgrading your armor to the next tier, see the section in the Armor and Perks category."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:vitalic_sourcelink",
		summary: [
			"Generates a moderate amount of source from nearby mob death and animal breeding.",
			"Additionally, the Vitalic Sourcelink will generate passive Source from nearby baby animals and will accelerate their growth."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:void_jar",
		summary: [
			"A jar that can destroy items on pickup and grants a small amount of mana in return.",
			"To turn the jar on and off, use the jar while sneaking.",
			"To add or remove an item to be destroyed by the jar, use the jar with an item in the off hand, or use an item on the Scribes Table with the jar placed on it.",
			"The jar must be in your hotbar to function."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:void_prism",
		summary: [
			"Destroys any spell projectiles that pass through it."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:wand",
		summary: [
			"Wands accept only a single spell, and are inscribed using the Scribes Table.",
			"A Wand always starts with Projectile -> Accelerate, and MUST be inscribed with a spell that does not have another form.",
			"This allows you to cast spells beyond the 10 spell cap.",
			"If you want a wand that casts Break, inscribe the wand with JUST break, and your result will be a wand with Projectile -> Acclerate -> Break."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:warp_scroll",
		summary: [
			"A scroll that may be used a single time to teleport to a recorded location.",
			"However, teleporting across dimensions is not possible.",
			"Can be used to warp other entities if an inscribed scroll is held in the offhand and the holder casts Blink on an entity."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:wixie_hat",
		summary: [
			"Allows starbuncles to transport potions.",
			"Once wearing a Wixie Hat, use the Dominion Wand to connect them between Potion Jars."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:alakarkinos_charm",
		summary: [
			"Alakarkinos can sift sand and gravel to find items found in archaeology sites.",
			"They can be found on beaches and will give you a token if they receive a Pottery Sherd of any kind."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:allow_scroll",
		summary: [
			"Provides a list of items to automation related entities.",
			"To inscribe an item, place on the Scribes Table and use blocks and items on the table while sneaking.",
			"When given to a Starbuncle, the Starbuncle will only pickup and take items on the scroll."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:alteration_table",
		summary: [
			"Used to inscribe Threads onto magical armors.",
			"To use the table, place armor onto the stand of the table.",
			"The tablet will display the available Thread Slots on the armor.",
			"To add or remove a Thread, use the thread on the tablet of the table.",
			"Removing the armor will apply the threads to the armor.",
			"To remove a thread, place the armor on the table and interact with the display with an empty hand."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:amethyst_golem_charm",
		summary: [
			"Amethyst Golems will harvest, grow, and collect Amethyst near its home.",
			"To obtain an Amethyst Golem, perform the Ritual of Awakening near Budding Amethyst to obtain the Amethyst Golem Charm.",
			"Summon the Amethyst Golem by using a charm on a block.",
			"Before an Amethyst Golem will perform tasks, they must first have a home.",
			"Set their home by using the Dominion Wand on the golem, and then on a block.",
			"Once a home has been set, the golem will begin performing tasks over time.",
			"They will convert Amethyst Blocks into Budding Amethyst, harvest Amethyst Clusters, speed up Budding Amethyst growth, and pick up and store Amethyst Shards.",
			"If their home is not an inventory, they will ignore items on the ground."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:applying_perks",
		summary: [
			"Threads may be applied to armor using the Alteration Apparatus.",
			"Each piece of armor has a unique set of Thread Slots with their own variety of levels.",
			"Some Threads may require a Thread Slot of a minimum level, but many threads simply increase in power based on the slot they are given."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:archwood",
		summary: [
			"Archwood Trees have a small chance to spawn in any biome, and come in four types.",
			"Rarely, you may stumble upon an Archwood Forest, a biome full of magical creatures, naturally spawning lights, and Archwood trees.",
			"Can be used as decoration, rituals, or for crafting wands.",
			"Archwood Trees also have a chance to spawn magical fruits that can be consumed or brewed into potions."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:archwood_grate",
		summary: [
			"Liquids placed on top of them will be transported below, waterlogging the below block if possible.",
			"Interacting with the grate will also act as if you are interacting with the block below it, allowing you to bucket liquids below.",
			"Additionally, items and projectiles will pass through it.",
			"Can be placed in any direction."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:armor",
		summary: [
			"Magical robes will increase the wearers mana regen and can be upgraded with special abilities using Threads.",
			"The Sorceror's set provides the lowest defence, but provides the most powerful set of slots for Threads.",
			"The Arcanist's and Battlemage's sets provide increasingly more defence, but fewer and less powerful Thread Slots.",
			"For more information on Threads, see the section on Armor and Perks."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:armor_upgrading",
		summary: [
			"Magical armor can be upgraded with Threads to provide additional effects.",
			"Each type of armor has a different number of slots, and those slots vary in size.",
			"Larger slots will increase the power of threads, and some threads require a slot of a certain size or larger.",
			"To apply threads, see the section on the Alteration Table."
		],
		"controls": []
	},
	{
		item: /ars_nouveau:.*spell_turret/,
		summary: [
			"_Turrets_ can be used to cast spells when given a redstone signal, functioning like a _Dispenser_.",
			"_Turrets_ will accept spells that use Touch and Projectile.",
			"Spells may be set using an inscribed piece of Spell Parchment.",
			"In order to cast spells, turrets will draw source from nearby Source Jars.",
			"Turrets may use Item Pickup and Place Block as long as an inventory is placed adjacent to this block.",
			"_Enchanted Spell Turrets_ cast spells at half the source cost compared to basic spell turrets.",
			"_Timer Spell Turrets_ will automatically fire on a timer.",
			"To prevent further changes, lock and unlock the turret using the dominion wand.",
			"Setting the turret to _0 seconds will disable it_.",
		],
		"controls": []
	},
	{
		item: "ars_nouveau:bookwyrm_charm",
		summary: [
			"Bookwyrm Charms can be used on a Storage Lectern to increase the number of accessible inventories.",
			"Augment a Ritual of Awakening with Book and Quills in order to obtain charms.",
			"In the event that they die or are dispelled, they will drop their charm."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:decorative",
		summary: [
			"Purely decorative blocks.",
			"To see the full list, place Arcane Stone in a Stonecutter."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:deny_scroll",
		summary: [
			"Provides a list of items to automation related entities.",
			"To inscribe an item, place on the Scribes Table and use blocks and items on the table while sneaking.",
			"When given to a Starbuncle, the Starbuncle will pickup and take any item that is NOT on this scroll."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:drygmy_charm",
		summary: [
			"_Drygmys_ are often found following and tending to animals around it.",
			"Drygmys can be given a home in the world, and will produce items from nearby monsters and animals as if they were slain, without harming them.",
			"A wild drygmy may be befriended by throwing a _Wilden Horn_ near it.",
			"To summon a Drygmy, use a Drymy Charm on a block of Mossy Cobblestone, turning into a _Drygmy Henge_.",
			"Casting dispel or killing the Drygmy will return your charm.",
			"A Drygmy considers its home to be 10 blocks in every direction from its home.",
			"The drygmy will use this area to produce items from any entities nearby.",
			"To get started, place a _chest_ and jar of _Source_ next to the  Henge."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:enchanters_fishing_rod",
		summary: [
			"Fishing Rods accept a single spell and are inscribed using the Scribes Table.",
			"Rods always start with Touch and MUST be inscribed with a spell that does not contain a form.",
			"Fishing Rods can be used like a normal fishing rod, but hooking an entity will allow the user to cast the spell on the hooked entity until the line is broken."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:enchanters_gauntlet",
		summary: [
			"Gauntlets are a spell casting multi-tool that can break blocks at diamond hardness.",
			"Gauntlets accept a single spell and are inscribed using the Scribes Table.",
			"Gauntlets always start with Touch and MUST be inscribed with a spell that does not contain a form.",
			"Spells cast with the gauntlet are cast with a discount."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:enchanting_apparatus",
		summary: [
			"The Enchanting Apparatus utilizes pedestals and Source for crafting.",
			"To use the Enchanting Apparatus, place any number of Arcane Pedestals within 3 blocks with their items.",
			"Once you have filled the pedestals, use the middle item on the Enchanting Apparatus block.",
			"The Enchanting Apparatus requires an Arcane Core next to its base in order to work."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:flask_cannons",
		summary: [
			"Flask Cannons can consume potions from bottles and flasks from the players inventory and convert the potion into a Splash or Lingering potion.",
			"To select the potion to be thrown, use the Radial Menu to select your flask or potion and use the launcher."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:how_to_enchant",
		summary: [
			"The Enchanting Apparatus may add new enchantments or upgrade existing ones by using Source and items.",
			"To begin, select a level 1 enchantment and add its items to the pedestals.",
			"Place a jar of Source nearby, and use the item you want to enchant on the apparatus.",
			"The apparatus may only apply enchantments that are valid to the item you have given it."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:sky_block",
		summary: [
			"Skyweave will display the skybox of the dimension it is placed in.",
			"To toggle the skybox and show the facade, cast Dispel on it.",
			"The facade may be set to another block like Mirrorweave.",
		]
	},
	{
		item: /ars_nouveau:.*weave/,
		summary: [
			"_Mirrorweave_ can replicate the appearance of any block that is used on it.",
			"These blocks will take on the same collisions and light as their replicated block.",
			"_Sense Magic_ will reveal the illusion.",
			"",
			"_Falseweave_ has the same properties as Mirrorweave, but can be passed through as if it were air.",
			"_Sense Magic will_ cause the block to become invisible, revealing any hidden paths.",
			"",
			"_Ghostweave_ has the same properties as Mirrorweave, but can be turned into an invisible wall by casting Invisbility on it.",
			"Casting Dispel will reveal the block again.",
			"_Sense Magic_ will cause the block to appear solid again."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:imbuement_chamber",
		summary: [
			"Imbues items with Source to create new items.",
			"The primary way to obtain Source Gems, amethyst and lapis may be used to create Source Gems.",
			"The Imbuement Chamber will passively accumulate source for recipes, or will draw from Source Jars 2 block away.",
			"Some recipes require additional items placed in pedestals within 1 block of the Imbuement Chamber, such as Essences.",
			"Items in pedestals will not be consumed."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:important_resources",
		summary: [
			"It's recommended to keep stock of certain resources as they will be used in many crafting recipes.",
			"While exploring, look for Iron Ore, Gold Ore, Amethyst Shards (or Lapis Lazuli), Diamond, Sourceberries, and Archwood Logs.",
			"Dowsing Rods can help with locating Budding Amethyst Blocks and magical creatures."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:introduction_to_glyphs",
		summary: [
			"Glyphs are the building blocks that make up spells.",
			"A spell’s outcome is determined by which Glyphs are used and in what order they appear.",
			"They fall under three major categories: Forms, Effects, and Augments.",
			"Form Glyphs are the vessels that deliver the contents of a spell to the target.",
			"Every spell must begin with a Form, and only one Form may be present.",
			"Effect Glyphs determine what a spell will do once it reaches its target.",
			"Spells can contain multiple Effects and will resolve in the order they are placed during spellcrafting.",
			"Augment Glyphs change the properties of the Form or Effect Glyph to their left as long as they are compatible.",
			"Multiple Augments may be chained together to modify the same Glyph.",
			"Augments have no effect on other Augments.",
			"Glyphs fall into tiers of I, II, or III.",
			"The Novice’s Spell Book can only cast tier I Glyphs, but higher tiers will be available each time you upgrade your Spell Book."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:introduction_to_spellcrafting",
		summary: [
			"Spellcrafting is accessed by pressing [C] while your Spell Book is selected on the inventory bar.",
			"Clicking Glyphs from the list will add them to the bottom of the page to represent they are part of the spell.",
			"Clicking Glyphs inside your spell will remove them.",
			"Once satisfied, you may name the spell and click “Create” to save it.",
			"Spell Books may hold up to ten spells at once as shown by the bookmarks on the right side of the book.",
			"Clicking one will swap the spell you are working on."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:item_detector",
		summary: [
			"A Display Case can be configured to output a redstone signal when a certain level of inventory is reached.",
			"To set the item for tracking, use an item on the case.",
			"Interact with the block to increase the count, and punch to decrease.",
			"To link to an inventory, Dominion Wand an inventory to the display case.",
			"Wanding while sneaking will invert if the signal outputs below or greater than the set count.",
			"If a Filter Scroll is given to the Display Case, it will count all items that match the filter."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:learning_glyphs",
		summary: [
			"New Glyphs may be created through the Scribe’s Table from certain items and paying EXP.",
			"Once crafted, the Glyph can be consumed to learn it, making it available during spellcrafting.",
			"Players can share their current Glyph knowledge with each other by crafting an Annotated Codex."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:magelight_torch",
		summary: [
			"Decorative lights.",
			"To ignite, cast Light on the sconce.",
			"The color of the flame corresponds with your spell color.",
			"The Magelight Torch on a wall can change the direction of its flames by interacting.",
			"Use Touch or Projectile Sensitive to target the sconce."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:magical_automation",
		summary: [
			"Ars Nouveau supports a wide variety of automation methods via Spell Turrets, magical helpers, and Rituals.",
			"Using one or a combination of these options can achieve almost anything you want such as farming crops and trees, quarrying the earth, crafting and transporting items, smelting, and brewing potions."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:magical_crafting",
		summary: [
			"The Imbuement Chamber allows the conversion of Amethyst Shards or Lapis Lazuli into Source Gems.",
			"By placing three Arcane Pedestals bearing certain items adjacent to the chamber, Source Gems can be imbued further into Essences which are used in many Glyph recipes.",
			"Placing an Enchanting Apparatus on top of an Arcane Core allows the crafting of essentials such as Magebloom Seeds, magical equipment, and charms to summon magical helpers.",
			"It can also directly enchant your gear with enchantments of your choice.",
			"The Alteration Table allows for slotting in various Threads into magical armor that grant special properties while worn."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:mimic_scroll",
		summary: [
			"Provides a list of items to automation related entities.",
			"When this scroll is attached to an inventory, entities will only insert items that already exist in the inventory.",
			"To attach the scroll, place an item frame on the inventory, and place a Mimic Scroll in it."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:mob_jar",
		summary: [
			"Allows you to capture and store mobs for transportation or decoration.",
			"To capture a mob, you must perform a Ritual of Containment.",
			"See the Ritual of Containment for more info.",
			"To release a mob, cast Dispel on the jar and the mob will be released above the jar.",
			"Note Blocks placed above a jar will play an ambient sound of the mob inside."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:obtaining_gems",
		summary: [
			"To obtain Source Gems, you must first build an Imbuement Chamber.",
			"An Imbuement Chamber imbues items inside it with Source, and will convert them to a new item.",
			"To obtain a source gem, place an Amethyst or Lapis inside your Imbuement Chamber and wait.",
			"Imbuement Chambers will consume source from nearby Source Jars to speed up any crafting.",
			"A Dowsing Rod can be used for finding Budding Amethyst early."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:potion_flask",
		summary: [
			"A flask that stores 8 charges of a potion.",
			"To fill the flask, use the flask on a Potion Jar, or craft the flask in a Crafting Table with another potion.",
			"You may empty the flask by using the flask on a Potion Jar while sneaking."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:reactive_enchantment",
		summary: [
			"Items with Reactive have a chance to cast spells when swung.",
			"The spell on the Spell Parchment determines the spell that will be inscribed on the item."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:repository",
		summary: [
			"A repository can store a double chests worth of items.",
			"When named, it will display the name as a tooltip, and preserve it when dropped as an item.",
			"Useful for creating named inventory tabs with the Storage Lectern.",
			"A Repository Catalog can be used as a proxy for a chain of connected repositories, and respects filter scrolls on repositories when inserting items."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:repository_controller",
		summary: [
			"Catalogs can insert and extract items from any adjacent and connected repository.",
			"Catalogs respect filters placed on repositories via item frames while inserting items, and will prioritize existing stacks of an item.",
			"Filter scrolls can be used on the Catalog, storing the filter and applying it to all connected repositories when interacted with directly."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:scribes_table",
		summary: [
			"To craft new glyphs, use a spell book on the table to open the codex.",
			"Throw the required items onto the table as rendered above, and the table will scribe a new glyph.",
			"The table will also pull items from nearby inventories.",
			"You may also inscribe a spell onto Spell Parchment or Enchanters Items.",
			"To do this, place a Blank Parchment on the table.",
			"Then, with your spell book in hand, change your spell book to your desired spell as if you were going to cast it.",
			"Then, use the book on the table while sneaking.",
			"Your item will now contain that spell."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:shapers_focus",
		summary: [
			"A focus that modifies effects that move, create, or modify blocks.",
			"Blocks that you move with effects like Launch, Gravity, Pull, Knockback, etc.",
			"will now deal damage to entities they hit.",
			"Damage is increased by Spell Damage, block hardness, and the speed of the block.",
			"Additionally, effects that target or create blocks will duplicate the rest of the spell targeting the new block or moving block.",
			"Modifying or creating a block will duplicate the rest of your spell onto that new block.",
			"For example, Freeze -> Break will freeze the block, and cast break onto that block.",
			"Without the focus, break would only be applied to the block that was hit originally.",
		],
		"controls": []
	},
	{
		item: "ars_nouveau:sourceberry_bush",
		summary: [
			"A Sourceberry Bush can be found in Taiga and Archwood Forest biomes, and produces Sourceberries.",
			"A Sourceberry can be used to craft a Potion of Mana Regeneration or consumed as food.",
			"Starbuncles will automatically harvest fully grown Source Berry Bushes, making them useful for early automation of the Agronomic Sourcelink.",
			"Sourceberry foods will also grant Mana Regeneration."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:spell_books",
		summary: [
			"Accessing higher tier spells will require a better spell book.",
			"While a novice spell book only has access to Tier 1 spells, the Apprentice and Archmage spell books will unlock tiers two and three.",
			"Upgrading your spell book will transfer all of the spells that you have learned into your new book.",
			"Books may be dyed by crafting them with a piece of dye."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:spell_bow",
		summary: [
			"A bow that can be inscribed with a spell using the Scribes Table.",
			"If the player has enough mana, arrows will become Spell Arrows and will apply the spell on their target.",
			"If no arrows are in the inventory, a spell arrow that deals 0 damage will be cast.",
			"If there is not enough mana, regular arrows will be fired.",
			"Enchanter's Bows may use special Augment Arrows for empowering the inscribed spell."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:spell_casting",
		summary: [
			"Ars Nouveau grants aspiring wizards the ability to craft powerful spells.",
			"Through creative spellcrafting, you can vanquish foes, reshape the world, automate tasks, create spectacles, and so much more!",
			"To begin spellcasting, you will need to craft a Novice’s Spell Book which will allow you to create, store, and cast spells using Mana.",
			"Upgrading your Spell Book, learning new Glyphs, and crafting magical equipment will further enhance your ability to cast new and more powerful spells."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:spell_crossbow",
		summary: [
			"A crossbow that can be inscribed with a spell.",
			"The mana cost of the spell will be deducted when the bow is loaded if mana is present.",
			"Enchanter's Crossbows may use special augment arrows to empower their spells."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:starbuncle_charm",
		summary: [
			"_Starbuncles_ naturally appear in wooded areas in search of golden nuggets.",
			"They will allow someone to approach if they are holding a gold nugget.",
			"To summon a Starbuncle, use a _Starbuncle Charm_ on the ground.",
			"Summoned Starbuncles will pickup nearby items and can move items between inventories such as chests.",
			"Starbuncles will harvest fully grown Source Berry bushes around it.",
			"A Starbuncle will drop its charm when Dispelled or when killed.",
			"You may dye them any color.",
			"To bind a Starbuncle to place items into a chest, use the dominion wand on the Starbuncle and then the inventory.",
			"To take items from an inventory, use the wand on the inventory and then the Starbuncle.",
			"Starbuncles will move items between as many inventories as you desire.",
			"Looking at a Starbuncle will tell you how many chests are being taken from, and input to.",
			"Using the Dominion Wand on a Starbuncle while sneaking will reset them.",
			"You may dictate where items go and may be picked up by using Item Scrolls or Item Frames.",
			"Starbuncles may be bound to a Magebloom Bed using the Dominion Wand and will rest on the bed when there are no other tasks to be done.",
			"Using a charm on an existing Starbuncle will stack them.",
			"Stacked starbuncles will transport multiple stacks at a time"
		],
		"controls": []
	},
	{
		item: "ars_nouveau:storage_lectern",
		summary: [
			"The Storage Lectern can used to view, manage, and craft from multiple connected inventories.",
			"The number of inventories that may be connected is determined by the number of Bookwyrms bound to the lectern.",
			"You can add more Bookwyrms to the lectern by using a Bookwyrm Charm.",
			"Use the Dominion Wand from an inventory to the lectern in order to bind or remove access.",
			"Inventories can be connected 30 blocks away."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:summon_bed",
		summary: [
			"A decorative bed.",
			"Starbuncles can be bound to a bed using the Dominion Wand, and they will rest on the bed when there are no other tasks."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:summoning_familiars",
		summary: [
			"To begin summoning familiars, you will need to obtain a Bound Script of the entity you wish to befriend.",
			"These can be obtained by performing the Ritual of Binding near a relevant entity.",
			"See the full list of eligible entities in the Familiars section.",
			"Once you have obtained a Bound Script, use it to learn the familiar."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:volcanic_sourcelink",
		summary: [
			"The Volcanic Sourcelink generates Source by consuming burnable items.",
			"Archwood logs will generate bonus Source, with Blazing Archwood generating the most.",
			"As the Volcanic Sourcelink produces Source, it also produces heat, converting stone into magma blocks and then lava.",
			"The Volcanic Sourcelink automatically outputs to nearby jars, starting with the one closest to it.",
			"The Volcanic Sourcelink will also take items from surrounding pedestals."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:warp_portal",
		summary: [
			"Warp portals, like warp scrolls, provide a one-way teleport to any location, provided it is in the same dimension.",
			"To construct a Warp Portal, build a frame from Sourcestone or its variants in the shape of a rectangle and provide a full Source Jar nearby.",
			"Then, throw a warp scroll with a written location into the frame.",
			"Given there is enough source nearby, the portal will be created."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:weald_waddler",
		summary: [
			"If a Weald Walker dies, it will be turned into a Weald Waddler.",
			"Weald Waddlers will slowly grow back into Weald Walkers, and can be sped up by giving them bonemeal.",
			"A Weald Waddler cannot fight or protect itself until it has grown back to a Walker."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:weald_walker",
		summary: [
			"Weald Walkers are living Archwood Trees that guard their homes against hostile monsters.",
			"A Weald Walker can be created from the Ritual of Awakening.",
			"When summoned, the Weald Walker will roam randomly unless given a home position.",
			"To give the Weald Walker a home, use the dominion wand on the Weald Walker, and then the block you wish it to guard."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:whirlisprig_charm",
		summary: [
			"Whirlisprigs are curious nature sprites that are exclusively found in forested areas.",
			"Summoned Whirlisprigs can be given a home in the world, and will begin producing natural materials including wood, crops, seeds, and flowers that exist around them.",
			"Wild Whirlisprigs can be befriended and will drop Whirlisprig Tokens if a tree is grown near them.",
			"To summon a Whirlisprig, use a Whirlisprig charm on any flower.",
			"Whirlisprigs consider their home to be 10 blocks in any direction from the flower.",
			"Whirlisprigs require source nearby to operate, and will only generate items if there is a chest placed next to the flower.",
			"You can get your charm back by using Dispel on a Whirlisprig.",
			"Summoned Whirlisprigs must be happy in order to produce materials, and their mood is determined by the number and diversity of natural materials in their home.",
			"You may use blocks on the Whirlisprig to gain additional info if a Whirlisprig would enjoy that block in their home.",
			"Interacting with the Whirlisprig with an empty hand will give you additional info on the Whirlisprig's happiness."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:wilden",
		summary: [
			"Wilden are hostile creatures that can be commonly found at night around Wilden Dens.",
			"While Wilden Defenders may only be found in cold biomes, Stalker and Hunter Dens can be found in any forest biome."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:wixie_charm",
		summary: [
			"A Wixie can automatically craft items for you at the expense of source.",
			"To obtain a Wixie Token, cast Dispel on a Witch while it is half health or less.",
			"Once you have obtained a Wixie Charm, use it on a Cauldron to summon your Wixie.",
			"To select an item for crafting, use your item or block on the Wixie Cauldron.",
			"The Wixie will select the recipe for crafting based on the inventories nearby, you need not specify the exact materials for the recipe.",
			"Each craft requires a small amount of source and will be drained from nearby Source Jars.",
			"Wixies can craft multiple items at once by placing pedestals adjacent to the cauldron.",
			"Wixie's will attempt to craft items in the pedestal, rotating round robin.",
			"Wixies will autocraft potions using nearby Potion Jars and items.",
			"Potions that require Water will be supplied by the Wixie.",
			"Potions that require another potion as a base will be taken from nearby Potion Jars.",
			"A Wixie will output 3 doses of a Potion into a nearby Potion Jar when complete.",
			"To begin, place down an empty Potion Jar, right click the cauldron with an Awkward Potion, and supply Nether Wart from a nearby chest.",
			"You can select specific inventories for the wixie by using a dominion wand on an inventory, and then the cauldron."

		],
		"controls": []
	},
	{
		item: "ars_nouveau:alakarkinos_charm",
		summary: [
			"Loves to dance to nearby jukeboxes."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:applying_perks",
		summary: [
			"Threads only apply a single time on an entire armor set, and they do not stack.",
			"For more information on applying threads, see the Alteration Table."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:armor_upgrading",
		summary: [
			"Armor also has three tiers, and these tiers may be increased using the Enchanting Apparatus and the upgrade recipes found in this section.",
			"Each tier will increase the amount of mana regen the armor grants, and increases the number and size of the slots of the armor."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:mob_jar",
		summary: [
			"Many entities can be interacted with inside the jar and will continue to simulate while inside the jar.",
			"Some examples include: chickens will lay eggs, sheep can be sheared, cows can be milked, and some mobs like the Blaze will turn the jar into a light source.",
			"Experiment with a variety of mobs to create aesthetic and functional farms.",
			"Drygmys will also treat the jar as if it were a normal entity in the area."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:performing_rituals",
		summary: [
			"To activate your ritual, interact with the brazier with an empty hand.",
			"Once activated, your ritual can no longer be augmented and has been consumed permanently.",
			"If a ritual requires source to operate, the brazier will pull from source jars within 6 blocks.",
			"Information related to rituals and their requirements can be found in their respective entries."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:potion_flask",
		summary: [
			"An enchanted flask that extends the time of effects by 50%"
		],
		"controls": []
	},
	{
		item: "ars_nouveau:reactive_enchantment",
		summary: [
			"Like other enchantments, Reactive levels can only be applied to an item with the previous level of enchantment.",
			"Reactive 2 requires Reactive 1, etc."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:repository_controller",
		summary: [
			"Catalogs are highly performant when used with the Storage Lectern and should be used over other big inventories or systems with many slots.",
			"Filters are not applied when items are extracted from other systems like a Hopper, and insertions via hopper will not respect the catalogs own filter, but will respect inserting into a filtered repository."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:storage",
		summary: [
			"Items can be automatically inserted into the lectern by placing them into an unbound inventory that is adjacent to the lectern.",
			"You may also link a lectern to the 'main' lectern in order to extend the view and access of the original lectern, these lecterns can be chained together within 30 blocks indefinitely.",
			"Once a lectern is linked to another lectern, it will no longer be able to connect to inventories or accept bookwyrms."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:summoning_familiars",
		summary: [
			"Once you have obtained a bound script, you may access your list of familiars from your Spellbook crafting menu in the Familiars section.",
			"Selecting a Familiar will summon it in the world and give you Familiar Sickness, preventing you from summoning another one for a short time.",
			"To obtain your first familiar, perform the Ritual of Binding near a Starbuncle.",
			"Familiars are bound to the player and cannot be transferred between books."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:warp_portal",
		summary: [
			"Portals can be built horizontal or vertical, from 1x1 to 21x21 in size.",
			"Warping does not cost any source after creation.",
			"Using a Dominion Wand on the portal will change the texture of the portal."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:weald_walker",
		summary: [
			"Casts Flare at nearby enemies, careful not to ignite any blocks in the process."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:alakarkinos_charm",
		summary: [
			"Alakarkinos can be summoned anywhere by using a charm on a block.",
			"To set its home, use the Dominion Wand to bind Alakarkinos to a chest or inventory."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:potion_flask",
		summary: [
			"An enchanted flask that increases the power of effects by 1, but reduces their time in half."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:reactive_enchantment",
		summary: [
			"The spell inscribed for Reactive can be changed by placing the item in the apparatus with a new inscribed spell parchment."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:storage",
		summary: [
			"Linked inventories that are named will create a tab in the Storage Lectern, allowing you to view and manipulate all inventories that share that name.",
			"Unlike normal chests, Repositories will preserve their name when dropped.",
			"The Name Effect can also name inventories placed in the world."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:summoning_familiars",
		summary: [
			"Typically only one familiar may be out at a time, and summoning another familiar will remove others bound to you.",
			"You may dismiss your own familiar by casting Dispel on it.",
			"In exchange for empowering the owner, familiars will reserve a portion of max mana from their owner for as long as they persist in the world."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:weald_walker",
		summary: [
			"Casts Freeze and Cold Snap at nearby enemies."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:wilden",
		summary: [
			"An aggressive and fast hunter that can summon allied wolves."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:alakarkinos_charm",
		summary: [
			"Alakarkinos will seek out gravel or sand that is placed within 3 blocks horizontal and one block vertical around its bound inventory.",
			"In order to convert blocks into items, Source must be provided near its chest.",
			"After some time and a few magic tricks, Alakarkinos will destroy the sand or gravel and insert items into the inventory."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:storage",
		summary: [
			"Repository Catalogs should be used when possible for large or frequent item automations involving the storage lectern.",
			"Repository catalogs are bound to a single location that exposes all connected repositories, and is optimized for server performance over other large slot inventories or chests."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:warp_portal",
		summary: [
			"A magical portal that can send players, mobs, spells, and items to any location in the same dimension."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:weald_walker",
		summary: [
			"Casts an amplified Harm with a Snare effect at nearby enemies."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:wilden",
		summary: [
			"Generally spawning in small groups, Stalkers have ground and aerial attacks."
		],
		"controls": []
	},
	{
		item: "ars_nouveau:weald_walker",
		summary: [
			"Casts Hex and an amplified Wither at nearby enemies."
		],
		"controls": []
	},
	// Ars Additions
	{
		item: "ars_additions:ender_source_jar",
		summary: [
			"The Ender Source Jar allows you to store source in an ender-connected Source Jar.",
			"Each jar you place will link to the same pool of source, allowing you to use the Source Jar from anywhere.",
		]
	},
	{
		item: "ars_additions:handy_haversack",
		summary: [
			"After binding the Handy Haversack to a container, you can right-click items onto the haversack to deposit them into that container from anywhere.",
			"When the container is unloaded the haversack will close and not accept any items.",
			"You can automate the depositing of items by adding items to its filters.",
			"Use the haversack with an item in your off hand, or scribe the haversack using a Scribe's table with the item you wish to add.",
		]
	},
	{
		item: "ars_additions:imbued_spell_parchment",
		summary: [
			"You can imbue source into a spell parchment to allow you to cast that spell without consuming mana.",
			"To cast with an imbued spell parchment, you need to hold use to gather up all the source in the parchment ready to release.",
			"It takes about half a second to gather up 100 mana worth of source from the parchment, so bigger spells will take a longer time to cast.",
		]
	},
	{
		item: "ars_additions:unstable_reliquary",
		summary: [
			"Reliquaries are able to store references to entities and locations to be targeted using the Recall glyph.",
			"To store a reference in a Reliquary, hold it in your off-hand and cast a spell with the Mark glyph.",
		]
	},
	{
		item: "ars_additions:xp_jar",
		summary: [
			"A jar that can destroy items on pickup and grants a small amount of XP in return.",
			"To turn the jar on and off, use the jar while sneaking.",
			"To add or remove an item to be destroyed by the jar, use the jar with an item in the off hand, or use an item on the Scribes Table with the jar placed on it.",
			"The jar must be in your hotbar to function.",
		]
	},
	{
		item: /ars_additions:.*charm/,
		summary: [
			"Charms are a set of curios enchanted with strong protection magics.",
			"They range from allowing you to walk on Powdered Snow, to saving you from the Warden's powerful Sonic Boom.",
			"Each charm has a specific amount of charges available to protect you.",
			"Once the charges have been depleted, pop them into an Imbuement chamber to charge them back up.",
		]
	},
	{
		item: /ars_additions:.*warp_index/,
		summary: [
			"Warp Indexes are used to remotely access your Storage Lecterns.",
			"The Warp Index allows you to access your Storage Lectern anywhere within the same dimension.",
			"The Stabilized Warp Index does not have the same limitation and will work in any dimension.",
			"Both of these Warp Indexes require your Storage Lectern to be chunk-loaded.",
		]
	},
	{
		item: "ars_additions:warp_nexus",
		summary: [
			"A Warp Nexus allows interdimensional travel to nine locations of your choice.",
			"Using the Warp Nexus while Sneaking will open up an inventory to store nine different Warp Scrolls.",
			"Using the Warp Nexus without Sneaking will open up a Warp menu to allow you to pick your destination.",
			"Warp Nexus inside Nexus Towers are situated on-top of Source Leylines so they don't require any source to operate.",
			"Once moved, a Warp Nexus requires 1,000 source per teleport.",
		]
	},
	// Ars Elemental
	{
		item: "ars_additions:wixie_enchanting_apparatus",
		summary: [
			"To create a Wixie Enchanting Apparatus, use a Wixie Charm on an Enchanting Apparatus while Sneaking."
		]
	},
	{
		item: "ars_elemental:spell_horn",
		summary: [
			"The Enchanter's Horn can be used to cast spells on you and nearby entities.",
			"Hold the Horn to increase the range, at max charge it will also give a Spell Damage effect to the player.",
			"It MUST be inscribed with a spell that does NOT have another method, using a Scribing Table.",
		]
	},
	{
		item: "ars_elemental:curio_bag",
		summary: [
			"All those trinkets can easily clutter your inventory, but you never know when they will be useful.",
			"Using some magebloom fiber you can make a pouch to store and carry around curios, potion flasks, charms and other small items.",
			"You can also open it with G while in the hotbar or in a curio slot.",
		]
	},
	{
		item: "ars_elemental:caster_bag",
		summary: [
			"The trinket pouch can only hold rather small things, but with a stronger fiber it seems possible to hold different kind of magical items.",
			"The Spellcaster bag can hold any caster tool and the mod's magic armor, arrow and shield.",
			"You can also open it with G while in the hotbar or in a curio slot.",
		]
	},
	{
		item: "ars_elemental:water_upstream",
		summary: [
			"This block generates an upstream current that will make surrounding entities in water float upwards as if inside a bubble column, even if they are not in source blocks.",
			"Sneaking will allow to descend.",
		]
	},
	{
		item: "ars_elemental:magma_upstream",
		summary: [
			"This block generates an upstream current that will make surrounding entities in lava float upwards and gain a short Fire Resistance effect.",
			"Sneaking will allow to descend",
		]
	},
	{
		item: "ars_elemental:air_upstream",
		summary: [
			"This block generates an upstream current that will make surrounding entities levitate.",
			"Sneaking will give Slowfall and allow to descend.",
			"Consumes Source when at least an entity is affected.",
		]
	},
	{
		item: "ars_elemental:everfull_urn",
		summary: [
			"This magic urn converts Source into water.",
			"Link a cauldron or an Apothecary to the urn using a dominion wand and it will be refilled for a cheap amount of source.",
		]
	},
	{
		item: "ars_elemental:firenando_charm",
		summary: [
			"The Flarecannon can be used as a wandering sentry, like the weald walkers.",
			"It will shoot flare homing projectiles at enemies and patrol around the area assigned using the dominion wand.",
			"Soul Sand and Magma blocks can be used to change appearance.",
			"If defeated, it can be reactivated with blaze powder or magma cream.",
			"Friends call it Firenando.",
		]
	},
	{
		item: "ars_elemental:advanced_prism",
		summary: [
			"Upgrade of the Spell Prism that can be adjusted to aim to a specific block.",
			"Use the dominion wand to link the prism to a block.",
			"This prism also allows lenses, but can't be pushed by pistons.",
			"Some lens will require a bit of source whenever a spell is redirected.",
			"A Prism Lens can be applied to this advanced prisms to customize how the prism redirects projectiles.",
			"Arc and Homing lenses change the projectile to be an arc or homing projectile.",
			"Rainbow lens randomize the color of the projectile, while Acceleration and Deceleration lenses allow to adjust the speed.",
		]
	},
	{
		item: "ars_elemental:spell_mirror",
		summary: [
			"Mirror similar to a Spell Prism that can be placed on walls, floor and ceiling.",
			"If a spell projectile hits the mirror, it will be reflected by with a mirrored angle.",
		]
	},
	{
		item: /ars_elemental:.*turret/,
		summary: [
			"Enchanted Turrets can be imbued with the power of an elemental focus to gift them a fractions of its abilities.",
			"Spells shot by these turrets will trigger the combos of the corresponding focus and will be discounted by 65 % if the spell contains a glyph of the matching elemental school.",
		]
	},
	{
		item: "ars_elemental:base_bangle",
		summary: [
			"This magic accessory has a chance to boost the damage of your spells.",
			"Its magic is unstable but perhaps attuning it to a school can stabilize its abilities.",
		]
	},
	{
		item: "ars_elemental:air_bangle",
		summary: [
			"This bangle will boost the damage of your Air spells.",
			"Your arms sparks with the element, giving a passive boost to speed and attack knockback.",
		]
	},
	{
		item: "ars_elemental:fire_bangle",
		summary: [
			"This bangle will boost the damage of your Fire spells.",
			"Your arms are engulfed in the element, setting on fire enemies hit and granting a passive boost to speed while in hot biomes.",
		]
	},
	{
		item: "ars_elemental:earth_bangle",
		summary: [
			"This bangle will boost the damage of your Earth spells.",
			"Plants blossom on your arms, inflicting snare to enemies hit and granting the wearer immunity to cactus and berry bushes and knockback resistance.",
		]
	},
	{
		item: "ars_elemental:water_bangle",
		summary: [
			"This bangle will boost the damage of your Water spells.",
			"Your arms chills the air around, freezing enemies on every hit.",
			"It will also grant the wearer a passive boost to speed in water and rain.",
		]
	},
	{
		item: "ars_elemental:summon_bangle",
		summary: [
			"This bangle will boost the damage of your Summoning spells.",
			"Your summons follows your arms movement, targeting whatever your hit with increased damage.",
		]
	},
	{
		item: "ars_elemental:anima_bangle",
		summary: [
			"This bangle will boost the damage of your Anima spells.",
			"You can feel a cycle of life and death in your arms, randomly healing or withering the enemies hit and giving you a small health boost."]
	},

	// Other
	{
		item: /^(?=.*alloy_forgery:)(?=.*forge_controller)/,
		summary: [
			"The easiest way of getting the most materials out of your mining trips is an _Alloy Forge_.",
			"Alloy Forges have two uses:",
			" - Being _more efficient Furnaces_ that can multiply the result smelting items.",
			" - _Forming Alloys_ (duh)",
		],
		controls: [
			{
				control: "Creating an Alloy Forge",
				noBaseText: true,
				text: [
					"Alloy Forges are _multiblock structures_",
					"and need to be constructed in a set way:",
					"_Layer 1:_   _Layer 2:_   _Layer 3:_",
					"  ⬛⬛⬛          ⬛           ⬛",
					"  ⬛⬛⬛        ⬛  ⬛       ⬛  ⬛",
					"  ⬛⬛⬛          _⬜_           ⬛",
					"",
					"⬛ - _Forge material_ (listed in the tooltip)",
					"_⬜_ - _Forge block_"
				]
			}
		]
	},
	{
		item: [
			'glow_item_frame',
			'item_frame'
		],
		controls: [
			{
				control: "right-clicked with empty hand",
				requiresHold: false,
				text: [
					"Turns the Item Frame _invisible_",
					"Do it again to make it _visible_ again"
				]
			}
		]
	},
	{
		item: [
			'kubejs:eye_of_verdant_bloom'
		],
		controls: [
			{
				control: "used on a bonemealable block",
				requiresHold: false,
				text: [
					"Triggers the _Bone Meal_ effect in a _7x7 area_",
					"Every block has an individual chance to trigger the effect"
				]
			},
			{
				control: "used on a bonemealable block while sneaking",
				requiresHold: false,
				text: [
					"Triggers the _Bone Meal_ effect on the _target block_",
					"Unlike the area effect, _it never fails_"
				]
			}
		]
	},
	{
		item: [
			'kubejs:eye_of_ethercraft'
		],
		controls: [
			{
				control: "used on a Blaze Burner",
				requiresHold: false,
				text: [
					"Triggers the _Blaze Cake_ effect on the targeted",
					"Blaze Burner that lasts much longer"
				]
			}
		]
	},
	{
		item: [
			'majruszsdifficulty:enderium_helmet',
			'majruszsdifficulty:enderium_chestplate',
			'majruszsdifficulty:enderium_leggings',
			'majruszsdifficulty:enderium_boots'
		],
		controls: [
			{
				control: 'wearing 2 Enderium armor pieces',
				text: [
					'Grants an _extra level of Looting_ while in _The End_'
				]
			},
			{
				control: 'wearing 3 Enderium armor pieces',
				text: [
					'Replaces _Chorus Fruit_ teleport with a _random potion effect_'
				]
			}
		]
	}

];

ItemEvents.tooltip((tooltip) => {
	itemsToTooltip.forEach((tooltipItem) => {
		// add the tooltip to the item
		tooltip.addAdvanced(tooltipItem.item, (item, advanced, text) => {

			let addEmptyLine = (text.size() > 1);

			// Add Hold [Shift] for Summary
			if (!tooltip.shift) {
				text.add(1, [
					Text.of("Hold [").darkGray(),
					Text.of("Shift").gray(),
					Text.of("] for Summary").darkGray(),
				]);
				if (addEmptyLine) text.add(2, "");
			}
			// When Holding Shift
			else {
				text.add(1, [
					Text.of("Hold [").darkGray(),
					Text.of("Shift").white(),
					Text.of("] for Summary").darkGray(),
				]);
				text.add(2, []);
				let lineNumber = 3;
				if (tooltipItem.hasOwnProperty("summary")) {
					// define line number
					tooltipItem.summary.forEach((line) => {
						const lines = wrapText(line, 50);
						lines.forEach((splitLine) => {
							text.add(lineNumber, createFormattedTextObjectArray(splitLine));
							lineNumber++;
						})
					});
				}
				// Add Controls
				if (tooltipItem.hasOwnProperty("controls")) {
					if (tooltipItem.hasOwnProperty("summary")) {
						text.add(lineNumber, []);
						lineNumber++;
					}
					tooltipItem.controls.forEach((control) => {
						text.add(lineNumber, [control.noBaseText ? Text.of(control.control).gray() : [
							Text.of(control.requiresHold ? "Hold " : "When ").gray(),
							Text.of(control.control).gray(),
						], Text.of(':').gray()]);
						lineNumber++;
						control.text.forEach((line) => {
							let formattedTextObjectArray =
								createFormattedTextObjectArray(line);
							// Add a space before each line
							formattedTextObjectArray.unshift(" ");
							// Add the line to the tooltip
							text.add(lineNumber, formattedTextObjectArray);
							lineNumber++;
						});
					});
				}
				if (addEmptyLine) text.add(lineNumber, "");
			}

		});
	});
});

/**
 *
 * A function to create a formatted text object array
 * Seperates the text by _ characters and then sets any text inside _ pairs to be orange
 *
 * @param {line} A string of text to be formatted
 * @returns {textObjects} An array of text objects
 */
function createFormattedTextObjectArray(line) {
	// check if the first character is a _, if it is, the summary starts with a yellow text
	let startsInYellow = line.startsWith("_");
	// remove the _ if it does
	if (startsInYellow) {
		line = line.substring(1);
	}
	// get the summary line and split it into an array
	let lineContents = line.split("_");
	// define an interator for the for each loop
	let i = 0;
	// Create an empty array for text objects to be added to
	let textObjects = [];
	lineContents.forEach((textComponent) => {
		// Every other text component is orange
		let textColor = i % 2 == 0 ? colorOrange : colorYellow;
		// Unless the summary starts with yellow
		if (startsInYellow) {
			textColor = i % 2 == 0 ? colorYellow : colorOrange;
		}
		// Add the text component and color it
		let textObject = new Text().of(textComponent);
		textObject.color(textColor);
		textObjects.push(textObject);
		i++;
	});
	return textObjects;
}

const colorOrange = 0xc7954b;
const colorYellow = 0xeeda78;

function wrapText(str, maxLength) {
	const words = str.split(' ');
	let lines = [];
	let currentLine = '';

	for (let word of words) {
		if ((currentLine + word).length <= maxLength) {
			currentLine += (currentLine ? ' ' : '') + word;
		} else {
			if (currentLine) lines.push(currentLine);
			currentLine = word;
		}
	}

	if (currentLine) lines.push(currentLine);
	return lines;
}
