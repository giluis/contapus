import State from "./state.js";
const state = new State();
function render() {
    let counter = keyElements.counter_display;
    if (counter == null) {
        alert("Severe error, please contact developer");
        return;
    }
    counter.textContent = state.pus().toString();
}
const keyElements = {
    body: document.querySelector("body"),
    counter: document.querySelector(".counter"),
    counter_button: document.querySelector(".counter > .pubutton"),
    counter_display: document.querySelector(".counter > .pudisplay"),
};
const eventHandlers = {
    ".counter > .pubutton": { on: "click", dispatch: "INC_PUS" },
    ".switch": { on: "click", dispatch: "PERIOD_TOGGLE" },
};
for (let [key, value] of Object.entries(eventHandlers)) {
    document.querySelector(key)?.addEventListener(value.on, (_) => {
        dispatch(value.dispatch);
    });
}
function dispatch(event) {
    switch (event) {
        case "PERIOD_TOGGLE":
            state.togglePeriod();
            break;
        case "INC_PUS":
            state.incPus();
            break;
        default:
            alert(`Invalid event ${event} Please contact developer`);
            return;
    }
    render();
    state.save();
}
render();
