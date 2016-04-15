"use strict";

class Resource {
    constructor(id, name, value, consume, produce) {
        this.id = id;
        this.name = name;
        this.value = value || 0;
        this.consume = new Map(consume);
        this.produce = new Map(produce);
        this.quantity = 0;
    }
}