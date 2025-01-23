import { Tab } from "./tab.js"

export class Actions extends Tab {
    constructor() {
        super("Next actions")
    }

    activate() {
        this.content.innerHTML = ""
    }
}