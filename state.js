export default class State {
    all_states;
    constructor() {
        let stored_states = this.retrieve();
        if (stored_states) {
            let states = JSON.parse(stored_states);
            if (!this.validate(states)) {
                // TODO: Add developer info
                throw "Invalid states were stored, please contact developer";
            }
            const lastUpdate = states[0].lastUpDate;
            const now = new Date();
            if (now > lastUpdate && now.getDay() > lastUpdate.getDay()) {
                states.splice(0, 0, {
                    pus: 0,
                    lastUpDate: now,
                    period: states[0].period,
                });
            }
            this.all_states = states;
            this.save();
        }
        else {
            this.all_states = [
                { pus: 0, lastUpDate: new Date(), period: false },
            ];
        }
    }
    retrieve() {
        return localStorage.getItem("states");
    }
    store() {
        localStorage.setItem("states", JSON.stringify(this.all_states));
    }
    save() {
        this.all_states[0].lastUpDate = new Date();
        this.store();
    }
    period() {
        return this.all_states[0].period;
    }
    lastUpDate() {
        return this.all_states[0].lastUpDate;
    }
    pus() {
        return this.all_states[0].pus;
    }
    togglePeriod() {
        this.all_states[0].period = !this.all_states[0].period;
    }
    incPus() {
        this.all_states[0].pus += 1;
    }
    // Validate this value with a custom type guard (extend to your needs)
    validate(o) {
        if (o instanceof Array) {
            return o.reduce((acc, cur) => acc &&
                "pus" in cur &&
                typeof cur.pus === "number" &&
                "lastUpDate" in cur &&
                cur.lastUpDate instanceof Date &&
                "period" in cur &&
                typeof cur.period === "boolean");
        }
        return false;
    }
}
