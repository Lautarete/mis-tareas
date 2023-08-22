export function initCardComponent() {
  customElements.define(
    "todo-card",
    class CardComp extends HTMLElement {
      shadow;
      text: string;
      checked: boolean = false;
      id: string;
      constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
        this.text = this.textContent || "No me pasaron texto";
        this.checked = JSON.parse(this.getAttribute("checked")!) ? true : false;

        this.id = this.getAttribute("id")!;

        this.render();
      }
      render() {
        const style = document.createElement("style");
        style.innerText = `
        *{
          box-sizing: border-box;
        }
        .card {
          padding: 22px 16px 12px 13px;
          width: 100%;
          border-radius: 4px;
          background: #fff599;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .card-text {
          margin: 0;
          max-width: 250px;
          font-family: "Roboto", sans-serif;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        .line-through {
          text-decoration: line-through;
        }
        .buttons-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
        .check-button {
          width: 21px;
          height: 21px;
          border: 1px solid #000;
          background-color: #fff;
        }
        .delete-button-container{
          margin-top: 12px;
          height: 21px;
          width: 21px;
        }
        .delete-button {
          display: none;
          padding: 0;
          border: none;
          background-color: inherit;
        }
        .show{
          display: block;
        }
        .delete-button:hover,
        .check-button:hover {
          scale: 1.2;
        }
        .delete-button__img {
          height: 21px;
          width: 21px;
          margin: 0;
        }
        
        .warning-container{
          display: none;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0,0,0, 0.91);
          align-items: center;
          justify-content: center;
        }
        .warning {
          background-color: grey;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 22px 16px 22px 16px;
          width: 290px;
          height: 106px;
        }
        .warning__title {
          margin: 0;
          font-family: "Roboto", sans-serif;
          font-size: 22px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }
        .warning__buttons-container {
          margin-top: 12px;
          width: 100%;
          display: flex;
          justify-content: space-around;
        }
        .cancel-btn,
        .confirm-btn {
          font-family: "Roboto", sans-serif;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          width: 90px;
          background-color: #9cbbe9;
          border: none;
          border-radius: 4px;
        }
        .cancel-btn:hover, 
        .confirm-btn:hover {
          scale: 1.1;
        }
        `;

        const deleteIMG = document.querySelector("#delete");
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <p class="card-text">${this.text}</p>
          <div class="buttons-container">
            <input type="checkbox" class="check-button" ${
              this.checked ? "checked" : ""
            }/>
            <div class="delete-button-container">
              <button class="delete-button">
                <img src=${deleteIMG?.getAttribute("src")} />
              </button>
            </div>
          </div>
        <div class="warning-container">  
          <div class="warning">
            <h3 class="warning__title">¿Deseas borrar esta nota?</h3>
            <div class="warning__buttons-container">
              <button class="cancel-btn">Cancelar</button>
              <button class="confirm-btn">Borrar</button>
            </div>
          </div>
        </div>  
        `;

        //esto deberia funcionar siempre y cuando el state recarge el contenido, ya que no hay ningun listener que le avise que tiene que cambiar de estilos
        if (this.checked) {
          card.querySelector(".card-text")?.classList.add("line-through");
        }

        this.shadow.appendChild(card);
        this.shadow.appendChild(style);
        this.buttons();
      }

      buttons() {
        const card = this.shadow.querySelector(".card");
        const checkButton = this.shadow.querySelector(".check-button");
        const deleteButton = this.shadow.querySelector(".delete-button");
        const warning = this.shadow.querySelector(".warning-container");
        const warningButtonCancel = this.shadow.querySelector(".cancel-btn");
        const warningButtonConfirm = this.shadow.querySelector(".confirm-btn");

        card.addEventListener("click", () => {
          setTimeout(() => {
            card.style.border = "3px solid";
            deleteButton.style.display = "block";
          }, 1);
        });
        window.addEventListener("click", () => {
          card.style.border = "none";
          deleteButton.style.display = "none";
        });
        checkButton.addEventListener("click", (e) => {
          const event = new CustomEvent("change", {
            detail: {
              id: this.id,
              value: e.target.checked,
            },
          });
          this.dispatchEvent(event);
        });
        deleteButton.addEventListener("click", () => {
          warning.style.display = "flex";
        });
        warningButtonCancel.addEventListener("click", () => {
          warning.style.display = "none";
        });
        warningButtonConfirm.addEventListener("click", () => {
          warning.style.display = "none";
          console.log(
            "se borro: " + this.shadow.querySelector(".card-text").textContent
          );
          const event = new CustomEvent("delete", {
            detail: {
              id: this.id,
              value: true,
            },
          });
          this.dispatchEvent(event);
        });
      }
    }
  );
}
