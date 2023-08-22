const state = {
  data: {
    tasks: [{ id: "123", text: "asdf", checked: false }],
  },
  listeners: [],
  init() {
    console.log("State Init");

    const localData = localStorage.getItem("save-state");
    this.setState(JSON.parse(localData!));
  },
  getState() {
    return this.data;
  },
  getEnabledTasks() {
    const lastState = this.getState();
    return lastState.tasks.filter((t) => !t.deleted);
  },
  addTask(id: string, text: string) {
    const lastState = this.getState();

    lastState.tasks.push({ id, text, checked: false });
    this.setState(lastState);
  },
  changeItemState(id: string, newValue: boolean, property: "check" | "delete") {
    const lastState = this.getState();
    const itemToChange = lastState.tasks.find((t) => t.id == id);
    if (property == "check") {
      itemToChange.checked = newValue;
    }
    if (property == "delete") {
      itemToChange.deleted = newValue;
    }
    this.setState(lastState);
  },
  setState(newState) {
    this.data = newState;

    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("save-state", JSON.stringify(newState));
  },
  subscribe(callback: (any) => void) {
    this.listeners.push(callback);
  },
  clearCache() {
    if (this.getEnabledTasks().length == 0) {
      console.log("se borraron las tasks eliminadas");
      localStorage.clear();
      this.setState({
        tasks: [
          {
            id: "null",
            text: "Soy necesario para que el programa no se rompa :D",
            checked: false,
            deleted: true,
          },
        ],
      });
      console.log(this.data);
    }
  },
};

export { state };
