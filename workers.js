var workers = new Map;

workers.set("gatherer", { 
    name: "Gatherer", 
    quantity: 1, 
    cost: 100, 
    baseCost: 100, 
    production: new Map([
        ["food", {produce: 1, tickCost: 100, consume: new Map}],
    ]),
    currentProduce: "food",
    tickCount: 0,
});

workers.set("farmer", {
    name: "Farmer",
    quantity: 0,
    cost: 1000,
    baseCost: 1000,
    production: new Map([
        ["food", {produce: 12, tickCost: 1000, consume: new Map}],
    ]),
    currentProduce: "food",
    tickCount: 0,
});

workers.set("hunter", {
    name: "Hunter",
    quantity: 0,
    cost: 1500,
    baseCost: 1500,
    production: new Map([
        ["food", {produce: 16, tickCost: 1200, consume: new Map}],
    ]),
    currentProduce: "food",
    tickCount: 0,
});


workers.set("woodCutter", {
    name: "Wood Cutter",
    quantity: 0,
    cost: 2000,
    baseCost: 2000,
    production: new Map([
        ["wood", {produce: 1, tickCost: 1500, consume: new Map}],
    ]),
    currentProduce: "wood",
    tickCount: 0,
});

workers.set("miner", {
    name: "Miner",
    quantity: 0,
    cost: 2200,
    baseCost: 2200,
    production: new Map([
        ["ironOre", {produce: 1, tickCost: 500, consume: new Map}],
    ]),
    currentProduce: "ironOre",
    tickCount: 0,
});