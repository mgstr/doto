import { Tab } from "./tab.js"

export class Projects extends Tab {
    constructor(tabs, content) {
        super("Projects", tabs, content)
    }

    activate() {
        super.activate()
        this.content.innerHTML = `<h1>${this.id}</h1>`
    }
}
