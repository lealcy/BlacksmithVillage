"use strict";

function createResourceList() {
    var rl = new Map(
        ["money"]
    );
    rl.set("money", new Resource("money", "Money"));
    rl.set("forager", new Resource("forager", "Forager", 0, [["money", 1]], [["food", 1]]));
    rl.set("woodCutter", new Resource("woodCutter", "Wood Cutter", 0, [["food", 1], ["money", 3]], [["wood", 1]]));
    rl.set("food", new Resource("food", "food", 1));
    rl.set("food", new Resource("food", "food", 1));
    rl.set("wood", new Resource("wood", "Wood", 10));
    rl.set("ironOre", new Resource("ironOre", "Iron Ore", 7));
    return rl;
}