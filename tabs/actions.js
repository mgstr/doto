import { Tab } from "./tab.js"
import { todo } from "../data.js"

export class Actions extends Tab {
    constructor() {
        super("Next actions")
    }

    activate() {
        super.activate()

        const rows = todo.raw.projects
            .filter(project => project.steps[0])
            .map(project => `<tr><td>${project.steps[0]}</td><td>${project.name}</td></tr>`)
            .join("")

        this.content.innerHTML = `<table>${rows}</table>`
    }
}