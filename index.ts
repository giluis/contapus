
function save() {
  state.lastUpDate = new Date();
  localStorage.setItem("state", JSON.stringify(state));
}

function render() {
  const counter = document.querySelector(".counter > .pudisplay");
  if (counter == null) {
    alert("Severe error, please contact developer")
    return 
  }
  counter.textContent = state.pus[0].toString();
}

type EventHandler = {
  [key: string]: {
    on: string,
    dispatch: AppEvent
  }
}

const eventHandlers: EventHandler = {
  ".counter > .pubutton": {on: "click", dispatch: "INC_PUS"},
  ".switch": {on: "click", dispatch: "PERIOD_TOGGLE"},
}

for(let [key,value] of Object.entries(eventHandlers)) {
  document.querySelector(key)?.addEventListener(value.on, (_) => {
    dispatch(value.dispatch)
  });
}

type AppEvent = "PERIOD_TOGGLE" | "INC_PUS";

function dispatch(event: AppEvent) {
  switch (event) {
    case "PERIOD_TOGGLE":
      state.period = !state.period;
      break;
    case "INC_PUS":
      state.pus[0] += 1;
      break;
    default:
      alert(`Invalid event ${event} Please contact developer`)
      return
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