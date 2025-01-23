import { todo } from "../data.js"
import { Debug } from "./debug.js"
import { Projects } from "./projects.js"
import { Inbox } from "./inbox.js"
import { Actions } from "./actions.js"


class TabsManager {
    constructor() {
        this.tabs = []
    }

    async init(tabsContainer, content) {
        await todo.init()

        this.tabs.push(new Inbox())
        this.tabs.push(new Actions())
        this.tabs.push(new Projects())
        this.tabs.push(new Debug())

        this.tabs.forEach(tab => tab.init(tabsContainer, content))

        this.activateFirstTab()
    }

    switchTo(element) {
        const id = element.srcElement.id

        this.tabs.filter(tab => tab.id !== id).forEach(tab => tab.deactivate())
        this.tabs.find(tab => tab.id === id).activate()
    }

    activateFirstTab() {
        this.tabs[0].activate()
    }
}

export const tabsManager = new TabsManager()
