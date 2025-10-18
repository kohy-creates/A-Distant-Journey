// priority: 100

global.server = {
    createSequencedAssembly: (() => {
        /**
         * @typedef SequencedAssemblyIO Input, transitional and output items for the recipe.
         * @property {InputItem_} input The input
         * @property {OutputItem_} transitional The transitional, "incomplete" item.
         * @property {OutputItem_[]} outputs The array of output items, optionally with chances defined.
         */

        /**
         * Builds a new sequenced assembly recipe.
         *
         * If `.loops(number)` isn't provided, 1 loop is the default.
         * @param {Internal.RecipesEventJS} event The recipe event.
         * @param {SequencedAssemblyIO} io Input, transitional and output items for the recipe.
         */
        function SequencedAssemblyBuilder(event, io) {
            /** @type {Internal.RecipesEventJS} */
            this._event = event;
            /** @type {InputItem_} */
            this._input = io.input;
            /** @type {OutputItem_} */
            this._transitional = io.transitional;
            /** @type {OutputItem_[]} */
            this._outputs = io.outputs;
            /** @type {Internal.RecipeJS_[]} */
            this._steps = [];
            /** @type {number} */
            this._loopAmount = 1;
        }

        /**
         * Adds a new filling step.
         * @param {Internal.InputFluid_} fluid The fluid to use in the recipe.
         * @returns {this} The current instance.
         */
        SequencedAssemblyBuilder.prototype.addFillingStep = function (fluid) {
            this._steps.push(this._event.recipes.create.filling([this._transitional], [this._transitional, fluid]));
            return this;
        };

        /**
         * Adds a new pressing step.
         * @returns {this} The current instance.
         */
        SequencedAssemblyBuilder.prototype.addPressingStep = function () {
            this._steps.push(this._event.recipes.create.pressing([this._transitional], [this._transitional]));
            return this;
        };

        /**
         * Adds a new cutting step.
         * @param {number} [processingTime] Processing time in ticks.
         * @returns {this} The current instance.
         */
        SequencedAssemblyBuilder.prototype.addCuttingStep = function (processingTime) {
            let cuttingRecipe = this._event.recipes.create.cutting([this._transitional], [this._transitional]);
            if (typeof processingTime !== "undefined") cuttingRecipe = cuttingRecipe.processingTime(processingTime);
            this._steps.push(cuttingRecipe);
            return this;
        };

        /**
         * Adds a new deploying step.
         * @param {InputItem_} item
         * @returns {this} The current instance.
         */
        SequencedAssemblyBuilder.prototype.addDeployingStep = function (item) {
            this._steps.push(this._event.recipes.create.deploying([this._transitional], [this._transitional, item]));
            return this;
        };

        /**
         * Sets the amount of loops needed to finish the recipe.
         *
         * Defaults to 1 if not provided.
         * @param {number} loopAmount Amount of loops needed to finish the recipe.
         * @returns {this} The current instance.
         */
        SequencedAssemblyBuilder.prototype.loops = function (loopAmount) {
            this._loopAmount = loopAmount;
            return this;
        };

        /**
         * Builds the recipe.
         */
        SequencedAssemblyBuilder.prototype.build = function () {
            this._event.recipes.create
                .sequenced_assembly(this._outputs, this._input, this._steps)
                .transitionalItem(this._transitional)
                .loops(this._loopAmount);
        };

        /**
         * Builds a new sequenced assembly recipe.
         * @example
         * ```js
         * createSequencedAssembly(event, {
         *   input: "minecraft:bucket",
         *   transitional: "minecraft:bucket",
         *   outputs: ["minecraft:powder_snow_bucket"],
         * })
         *   .addDeployingStep("minecraft:snowball")
         *   .addFillingStep({ fluid: "minecraft:water", amount: 250 })
         *   .loops(2)
         *   .build();
         * ```
         * @param {Internal.RecipesEventJS} event The recipe event.
         * @param {SequencedAssemblyIO} io Input, transitional and output items for the recipe.
         */
        return function createSequencedAssembly(event, io) {
            return new SequencedAssemblyBuilder(event, io);
        };
    })()
}
