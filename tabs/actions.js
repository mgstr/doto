import { Tab } from "./tab.js"
import { todo, calculateHash, projectNextAction } from "../data.js"

export class Actions extends Tab {
    constructor() {
        super("Next actions")
    }

    activate() {
        super.activate()

        const currentAction = todo.raw.currentAction
        currentAction ? this.showAction(currentAction) : this.showList()
    }

    showAction(currentAction) {
        this.header.classList.remove("active")
        this.header.classList.add("review")

        const action = todo.findActionById(currentAction)
        this.content.innerHTML = `<div class="center-text">
                <span class="action large" id="${currentAction}}">${action}</span>
                </div>
                <div class="menus">
                    <div id="stop">stop</div>
                    <div id="done">done</div>
                </div>
            `
        this.content.querySelector("#stop").addEventListener("click", (event) => {
            todo.setCurrentAction(undefined)
            this.showList()
        })
    }

    showList() {
        this.header.classList.remove("review")
        this.header.classList.add("active")

        const rows = todo.raw.projects
            .filter(project => projectNextAction(project))
            .map(project => `<div>
                <span class="action large" id="${calculateHash(projectNextAction(project))}">${projectNextAction(project)}</span>
                <span class="project small">${project.name}</span>
                </div>`)
            .join("")

        this.content.innerHTML = rows

        Array.from(this.content.querySelectorAll("span.action"))
            .forEach(action => {
                action.addEventListener("click", (event) => {
                    todo.setCurrentAction(event.target.id)
                    this.showAction(event.target.id)
                })
            }
            )
    }
}