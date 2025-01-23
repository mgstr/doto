import { todo } from "../data.js"
import { Debug } from "./debug.js"
import { Projects } from "./projects.js"
import { Inbox } from "./inbox.js"
import { Actions } from "./actions.js"


class TabsManager {
    constructor() {
        this.tabs = []
    }

    async init(tabs, content) {
        await todo.init()

        this.add(new Inbox(tabs, content))
        this.add(new Actions(tabs, content))
        this.add(new Projects(tabs, content))
        this.add(new Debug(tabs, content))

        this.activateFirstTab()
    }

    add(tab) {
        this.tabs.push(tab)
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
