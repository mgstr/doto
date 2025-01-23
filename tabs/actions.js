import { Tab } from "./tab.js"

export class Actions extends Tab {
    constructor(tabs, content) {
        super("Next actions", tabs, content)
    }

    activate() {
        this.content.innerHTML = ""
    }
}