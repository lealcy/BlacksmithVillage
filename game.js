
const TICK_INTERVAL = 50;
const EL_NAME = "#GameScreen";

var el = null;

function tick(tap) {
    for (let [workerId, worker] of workers) {
        worker.cost = worker.baseCost * (1 + Math.floor(worker.quantity / 10));
        if (tap || worker.tickCount > worker.production.get(worker.currentProduce).tickCost) {
            resources.get(worker.currentProduce).quantity += 
                worker.production.get(worker.currentProduce).produce * worker.quantity;
            worker.tickCount = 0;
        } else {
            worker.tickCount++;
        }
    }
    if (!tap){
        
        updateScreen();
        setTimeout(tick, TICK_INTERVAL);
    }
}

function createScreen() {
    el = document.querySelector(EL_NAME);
    var html = `
        <div>
            <input type="button" value="Tap!" onclick="tick(true)"></input>
        </div>
        <div>
            <h2>Workforce</h2>`;
    for (let [workerId, worker] of this.workers) {
        html += `
            ${worker.name} (cost: <span id="${workerId}Cost">${worker.cost}</span>):
            <label for="${workerId}Prod"><select id="${workerId}Prod">`;
        for (let [prodId, prod] of worker.production) {
            html += `<option value=${prodId}`;
            if (prodId == worker.currentProduce) {
                html += " selected";
            }
            html += `>${resources.get(prodId).name}</option>`;
        }
            
        html += `</select>
            <span id="${workerId}">${worker.quantity}</span>
            <progress id="${workerId}Progress" 
                max="${worker.production.get(worker.currentProduce).tickCost}" 
                value="${worker.tickCount}"></progress>

            <input type="button" value="Hire" id="${workerId}Hire" 
                onclick="hire('${workerId}', 1 * document.getElementById('${workerId}HireSpinner').value)">
            <input type="number" min="1" value="1" style="width: 4em" id="${workerId}HireSpinner">
            <input type="checkbox" id="${workerId}AutoHire"><label for="${workerId}AutoHire">Auto Hire</label>
            <br>
        `;
        
    }
    html += ` 
        </div>
        <div>
            <h2>Resources</h2>
    `;
    for (let [resId, res] of this.resources) {
        if (resId == "money") {
            html += `${res.name}: <span id="${resId}">${res.quantity}</span><br>`;
        } else {
            html += `
                ${res.name} (value: ${res.value}): <span id="${resId}">${res.quantity}</span> 
                    <input type="button" value="Sell" 
                        onclick="sell('${resId}', 1 * document.getElementById('${resId}Spinner').value)">
                    <input type="number" min="1" value="1" style="width: 4em" id="${resId}Spinner">
                    <input type="checkbox" id="${resId}AutoSell"><label for="${resId}AutoSell">Auto Sell</label>
                    <br>
            `;
        }
    }
    html += "</div>";
    el.innerHTML = html;
}

function updateScreen() {
    for (let [workerId, worker] of this.workers) {
        this.el.querySelector(`#${workerId}`).innerHTML = worker.quantity;
        this.el.querySelector(`#${workerId}Cost`).innerHTML = worker.cost;
        if (worker.quantity) {
            this.el.querySelector(`#${workerId}Progress`).max = worker.production.get(worker.currentProduce).tickCost;
            this.el.querySelector(`#${workerId}Progress`).value = worker.tickCount;
        }
    }
    for (let [resId, res] of this.resources) {
        this.el.querySelector(`#${resId}`).innerHTML = res.quantity;
    }    
}

function hire(workerId, quantity) {
    var worker = this.workers.get(workerId);
    var cost = quantity * worker.cost;
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

function sell(resourceId, quantity) {
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


