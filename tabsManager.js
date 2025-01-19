import { Tab } from "./tabs/tab.js"

class TabsManager {
    constructor() {
        this.tabs = []
    }

    init(tabs, content) {
        this.add(new Tab("404", tabs, content))
        this.add(new Tab("500", tabs, content))

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