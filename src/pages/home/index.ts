import { state } from "../../state";

export function initHomePage(rootEl: HTMLElement) {
  const homePageEl = document.createElement("div");

  homePageEl.innerHTML = `
  <section class="content-section">
        <div class="title-container">
          <h1 class="title">Mis pendientes</h1>
        </div>
        <form class="form">
          <div class="form__input-container">
            <legend class="form__legend">Nuevo pendiente</legend>
            <input name="task-text" type="text" class="form__input" />
          </div>
          <button class="form__button">Agregar</button>
        </form>
      </section>
    <section class="cards-section"></section>
    `;

  //agregar estilos a cards sectionn

  const cardsSection = homePageEl.querySelector(".cards-section");

  function renderTasks(tasks) {
    cardsSection!["innerHTML"] = "";
    for (const cardItem of tasks) {
      const cardContainer = document.createElement("div");
      cardContainer.style.maxWidth = "316px";
      cardContainer.style.minWidth = "290px";
      cardContainer.style.width = "100%";
      cardContainer.style.flexGrow = "1";
      const card = document.createElement("todo-card");
      card.textContent = cardItem.text;
      card.setAttribute("checked", `${cardItem.checked}`);
      card.setAttribute("id", cardItem.id);
      card.addEventListener("change", (e: any) => {
        state.changeItemState(e.detail.id, JSON.parse(e.detail.value), "check");
      });
      card.addEventListener("delete", (e: any) => {
        state.changeItemState(e.detail.id, e.detail.value, "delete");
      });

      cardContainer.appendChild(card);
      cardsSection!.appendChild(cardContainer);
    }
  }

  state.subscribe(() => {
    renderTasks(state.getEnabledTasks());
  });
  rootEl.appendChild(homePageEl);
  document.querySelector(".form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    state.addTask(crypto.randomUUID(), e.target!["task-text"].value);
  });
}
