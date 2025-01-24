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
                <span class="action large">${project.steps[0]}</span>
                <span class="project small">${project.name}</span>
                </div>`)
            .join("")

        this.content.innerHTML = rows
    }
}