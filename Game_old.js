"use strict";

class Game {
    constructor(game, divId) {
        this.defaults();
        this.game = game;
        this.el = document.getElementById(divId);
        this.createScreen();
        console.log(this);
        this.tick();
    }
    
    defaults() {
        this.tickInterval = 1000;
        this.workers = this.createWorkers();
        this.resources = this.createResources();
    }
    
    tick() {
        for (let name of Object.keys(this.workers)) {
            let worker = this.workers[name];
            
        }
        
        this.updateWorkers();
        this.updateResources();
        this.updateScreen();
        setTimeout(this.tick.bind(this), this.tickInterval);
    }
    
    updateWorkers() {
        var money = this.resources.get("money");
        for (let [name, worker] of this.workers) {
            if(money.quantity > worker.cost && this.el.querySelector(`#${name}AutoHire`).checked) {
                this.hire(name, 1 * this.el.querySelector(`#${name}HireSpinner`).value);
            }
        }
    }
    
    updateResources() {
        for (let [name, res] of this.resources) {
            if (name !== "money") {
                if (res.tickCount < 1) {
                    res.quantity += this.workers.get(res.worker).quantity;
                    res.resetTickCount();
                    if(res.quantity && this.el.querySelector(`#${name}AutoSell`).checked) {
                        this.sell(name, 1 * this.el.querySelector(`#${name}Spinner`).value);
                    }
                } else {
                    res.tickCount--;
                }
            }
        }
    }
    
    createScreen() {
        var html = `
            <div>
                <h2>Workforce</h2>`;
        for (let [k, v] of this.workers) {
            html += `
                ${v.name} (cost: ${v.cost}): <span id="${k}">${v.quantity}</span>
                    <input type="button" value="Hire" id="${k}Hire" onclick="${this.game}.hire('${k}', 1 * document.getElementById('${k}HireSpinner').value)">
                    <input type="number" min="1" value="1" style="width: 4em" id="${k}HireSpinner">
                    <input type="checkbox" id="${k}AutoHire"><label for="${k}AutoHire">Auto Hire</label>
                <br>
            `;
            
        }
        html += ` 
            </div>
            <div>
                <h2>Resources</h2>
        `;
        for (let [k, v] of this.resources) {
            if (k == "money") {
                html += `
                    ${v.name}: <span id="${k}">${v.quantity}</span> 
                        <br>
                `;
            } else {
                html += `
                    ${v.name} (value: ${v.value}): <span id="${k}">${v.quantity}</span> 
                        <input type="button" value="Sell" onclick="${this.game}.sell('${k}', 1 * document.getElementById('${k}Spinner').value)">
                        <input type="number" min="1" value="1" style="width: 4em" id="${k}Spinner">
                        <progress id="${k}Progress" max="${v.tickCost}" value="${v.tickCount}"></progress>
                        <input type="checkbox" id="${k}AutoSell"><label for="${k}AutoSell">Auto Sell</label>
                        <br>
                `;
            }
        }
        html += "</div>";
        this.el.innerHTML = html;
    }
    
    updateScreen() {
        for (let [k, v] of this.workers) {
            this.el.querySelector(`#${k}`).innerHTML = v.quantity;
        }
        for (let [k, v] of this.resources) {
            this.el.querySelector(`#${k}`).innerHTML = v.quantity;
            if (k !== "money" && this.workers.get(v.worker).quantity) {
                this.el.querySelector(`#${k}Progress`).max = v.tickCost;
                this.el.querySelector(`#${k}Progress`).value = v.tickCount;
            }
        }    
    }
    
    hire(workerId, quantity) {
        var worker = this.workers.get(workerId);
        var cost = quantity * worker.cost * worker.quantity;
        var money = this.resources.get("money");
        if (cost <= money.quantity) {
            money.quantity -= cost;
            worker.quantity += quantity;
        } else {
            quantity = Math.floor(money.quantity / worker.cost);
            worker.quantity += quantity;
            money.quantity -= quantity * worker.cost;
        }
    }
    
    sell(resourceId, quantity) {
        var res = this.resources.get(resourceId);
        var money = this.resources.get("money");
        if (res.quantity >= quantity) {
            money.quantity += quantity * res.value;
            res.quantity -= quantity;
        } else {
            money.quantity += res.quantity * res.value;
            res.quantity = 0;
        }
    }
    
    createWorkers() {
        return {
            forager: {
                name: "Forager",
                quantity: 1,
                consume: {
                    food: 1,
                    money: 1
                },
                produce: {
                    food: 5
                }
            },
            woodCutter: {
                name: "Wood Cutter",
                quantity: 0,
                consume: {
                    food: 1,
                    money: 2
                },
                produce: {
                    wood: 1
                }
            }
        };
    }
    
    createResources() {
        return {
            money: {
                name: "Money",
                quantity: 100,
                value: 1
            },
            food: {
                name: "Food",
                quantity: 100,
                value: 1
            },
            wood: {
                name: "Wood",
                quantity: 0,
                value: 3
            }
        };
    }
    
    
    
}