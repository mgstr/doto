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
            .map(project => `<div>
                <span class="action-name">${project.steps[0]}</span>
                <span class="action-project">${project.name}</span>
                </div>`)
            .join("")

        this.content.innerHTML = rows
    }
}