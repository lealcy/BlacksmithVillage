"use strict";

class Worker {
    constructor(id, name, cost, produce) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.produce = new Map(produce);
    }
}