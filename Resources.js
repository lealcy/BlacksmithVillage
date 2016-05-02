var resources = new Map;

resources.set("money", {
    name: "Money",
    cost: new Map,
    value: 1,
    quantity: 0,
});

resources.set("food", {
    name: "Food",
    cost: new Map([["money", 2]]),
    value: 1,
    quantity: 0,
});

resources.set("wood", {
    name: "Wood",
    cost: new Map([["money", 3]]),
    value: 2,
    quantity: 0,
});

resources.set("ironOre", {
    name: "Iron Ore",
    cost: new Map([["money", 6]]),
    value: 4,
    quantity: 0,
});
