const t={data:{tasks:[]},listeners:[],init(){console.log("State Init");const t=localStorage.getItem("save-state");this.setState(JSON.parse(t))},getState(){return this.data},getEnabledTasks(){return this.data.tasks},addTask(t,e){const n=this.getState();n.tasks.push({id:t,text:e,checked:!1}),this.setState(n)},changeItemState(t,e,n){const s=this.getState(),i=s.tasks.find((e=>e.id==t));"check"==n&&(i.checked=e),"delete"==n&&(i.deleted=e),this.setState(s)},setState(t){this.data=t;for(const t of this.listeners)t();localStorage.setItem("save-state",JSON.stringify(t))},subscribe(t){this.listeners.push(t)},clearCache(){0==this.getEnabledTasks().length&&(console.log("se borraron las tasks eliminadas"),localStorage.clear(),this.setState({tasks:[{id:"null",text:"Soy necesario para que el programa no se rompa :D",checked:!1,deleted:!0}]}))}};function e(e){const n=document.createElement("div");n.innerHTML='\n  <section class="content-section">\n        <div class="title-container">\n          <h1 class="title">Mis pendientes</h1>\n        </div>\n        <form class="form">\n          <div class="form__input-container">\n            <legend class="form__legend">Nuevo pendiente</legend>\n            <input name="task-text" type="text" class="form__input" />\n          </div>\n          <button class="form__button">Agregar</button>\n        </form>\n      </section>\n    <section class="cards-section"></section>\n    ';const s=n.querySelector(".cards-section");t.subscribe((()=>{!function(e){s.innerHTML="";for(const n of e){const e=document.createElement("div");e.style.maxWidth="316px",e.style.minWidth="290px",e.style.width="100%",e.style.flexGrow="1";const i=document.createElement("todo-card");i.textContent=n.text,i.setAttribute("checked",`${n.checked}`),i.setAttribute("id",n.id),i.addEventListener("change",(e=>{t.changeItemState(e.detail.id,JSON.parse(e.detail.value),"check")})),i.addEventListener("delete",(e=>{t.changeItemState(e.detail.id,e.detail.value,"delete")})),e.appendChild(i),s.appendChild(e)}}(t.getEnabledTasks())})),e.appendChild(n),document.querySelector(".form")?.addEventListener("submit",(e=>{e.preventDefault(),t.addTask(crypto.randomUUID(),e.target["task-text"].value)}))}customElements.define("todo-card",class extends HTMLElement{constructor(){super(),this.checked=!1,this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.text=this.textContent||"No me pasaron texto",this.checked=!!JSON.parse(this.getAttribute("checked")),this.id=this.getAttribute("id"),this.render()}render(){const t=document.createElement("style");t.innerText='\n        *{\n          box-sizing: border-box;\n        }\n        .card {\n          padding: 22px 16px 12px 13px;\n          width: 100%;\n          border-radius: 4px;\n          background: #fff599;\n          display: flex;\n          flex-wrap: wrap;\n          justify-content: space-between;\n        }\n        .card-text {\n          margin: 0;\n          /*max-width: 250px;*/\n          max-width: 86%;\n          font-family: "Roboto", sans-serif;\n          font-size: 18px;\n          font-style: normal;\n          font-weight: 400;\n          line-height: normal;\n        }\n        .line-through {\n          text-decoration: line-through;\n        }\n        .buttons-container {\n          display: flex;\n          flex-direction: column;\n          justify-content: space-between;\n          align-items: center;\n        }\n        .check-button {\n          width: 21px;\n          height: 21px;\n          border: 1px solid #000;\n          background-color: #fff;\n        }\n        .delete-button-container{\n          margin-top: 12px;\n          height: 21px;\n          width: 21px;\n        }\n        .delete-button {\n          display: none;\n          padding: 0;\n          border: none;\n          background-color: inherit;\n        }\n        .show{\n          display: block;\n        }\n        .delete-button:hover,\n        .check-button:hover {\n          scale: 1.2;\n        }\n        .delete-button__img {\n          height: 21px;\n          width: 21px;\n          margin: 0;\n        }\n        \n        .warning-container{\n          display: none;\n          position: fixed;\n          top: 0;\n          bottom: 0;\n          left: 0;\n          right: 0;\n          background-color: rgba(0,0,0, 0.91);\n          align-items: center;\n          justify-content: center;\n        }\n        .warning {\n          background-color: grey;\n          border-radius: 4px;\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          padding: 22px 16px 22px 16px;\n          width: 290px;\n          height: 106px;\n        }\n        .warning__title {\n          margin: 0;\n          font-family: "Roboto", sans-serif;\n          font-size: 22px;\n          font-style: normal;\n          font-weight: 500;\n          line-height: normal;\n        }\n        .warning__buttons-container {\n          margin-top: 12px;\n          width: 100%;\n          display: flex;\n          justify-content: space-around;\n        }\n        .cancel-btn,\n        .confirm-btn {\n          font-family: "Roboto", sans-serif;\n          font-size: 18px;\n          font-style: normal;\n          font-weight: 400;\n          line-height: normal;\n          width: 90px;\n          background-color: #9cbbe9;\n          border: none;\n          border-radius: 4px;\n        }\n        .cancel-btn:hover, \n        .confirm-btn:hover {\n          scale: 1.1;\n        }\n        ';const e=document.querySelector("#delete"),n=document.createElement("div");n.classList.add("card"),n.innerHTML=`\n          <p class="card-text">${this.text}</p>\n          <div class="buttons-container">\n            <input type="checkbox" class="check-button" ${this.checked?"checked":""}/>\n            <div class="delete-button-container">\n              <button class="delete-button">\n                <img src=${e?.getAttribute("src")} />\n              </button>\n            </div>\n          </div>\n        <div class="warning-container">  \n          <div class="warning">\n            <h3 class="warning__title">¿Deseas borrar esta nota?</h3>\n            <div class="warning__buttons-container">\n              <button class="cancel-btn">Cancelar</button>\n              <button class="confirm-btn">Borrar</button>\n            </div>\n          </div>\n        </div>  \n        `,this.checked&&n.querySelector(".card-text")?.classList.add("line-through"),this.shadow.appendChild(n),this.shadow.appendChild(t),this.buttons()}buttons(){const t=this.shadow.querySelector(".card"),e=this.shadow.querySelector(".check-button"),n=this.shadow.querySelector(".delete-button"),s=this.shadow.querySelector(".warning-container"),i=this.shadow.querySelector(".cancel-btn"),o=this.shadow.querySelector(".confirm-btn");t.addEventListener("click",(()=>{setTimeout((()=>{t.style.border="3px solid",n.style.display="block"}),1)})),window.addEventListener("click",(()=>{t.style.border="none",n.style.display="none"})),e.addEventListener("click",(t=>{const e=new CustomEvent("change",{detail:{id:this.id,value:t.target.checked}});this.dispatchEvent(e)})),n.addEventListener("click",(()=>{s.style.display="flex"})),i.addEventListener("click",(()=>{s.style.display="none"})),o.addEventListener("click",(()=>{s.style.display="none",console.log("se borro: "+this.shadow.querySelector(".card-text").textContent);const t=new CustomEvent("delete",{detail:{id:this.id,value:!0}});this.dispatchEvent(t)}))}}),e(document.querySelector(".root")),t.init(),t.clearCache();
//# sourceMappingURL=index.607ce486.js.map
