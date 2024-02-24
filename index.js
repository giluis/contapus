"use strict";
var _a;
function save() {
    state.lastUpDate = new Date();
    localStorage.setItem("state", JSON.stringify(state));
}
function render() {
    const counter = document.querySelector(".counter > .pudisplay");
    if (counter == null) {
        alert("Severe error, please contact developer");
        return;
    }
    counter.textContent = state.pus[0].toString();
}
const eventHandlers = {
    ".counter > .pubutton": { on: "click", dispatch: "INC_PUS" },
    ".switch": { on: "click", dispatch: "PERIOD_TOGGLE" },
};
for (let [key, value] of Object.entries(eventHandlers)) {
    (_a = document.querySelector(key)) === null || _a === void 0 ? void 0 : _a.addEventListener(value.on, (_) => {
        dispatch(value.dispatch);
    });
}
function dispatch(event) {
    switch (event) {
        case "PERIOD_TOGGLE":
            state.period = !state.period;
            break;
        case "INC_PUS":
            state.pus[0] += 1;
            break;
        default:
            alert(`Invalid event ${event} Please contact developer`);
            return;
    }
    render();
    save();
}
let state = { pus: [0], lastUpDate: new Date(), period: false };
let stored_state = localStorage.getItem("state");
if (stored_state) {
    state = JSON.parse(stored_state);
    const lastUpdate = state.lastUpDate;
    const now = new Date();
    if (now > lastUpdate && now.getDay() > lastUpdate.getDay()) {
        state.pus.splice(0, 0, 0);
        save();
    }
}
render();
