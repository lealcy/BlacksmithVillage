"use strict";

function createWorkForce() {
    var wf = new Map;
    wf.set("forager", new Worker("forager", "Forager", 10, [["food", 1]]));
    wf.set("woodCutter", new Worker("woodCutter", "Wood Cutter", 30, [["wood", 1]]));
    wf.set("ironMiner", new Worker("ironMiner", "Iron Miner", 50, [["ironOre", 1]]));
    return wf;
}