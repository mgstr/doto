import { storage } from "./storage.js"

const data = {
    load: async () => {
        return storage.load("doto", { inbox: [], projects: [] })
    },
    save: async (raw) => {
        storage.save("doto", raw)
    }
}

class ToDoModel {
    #raw

    constructor() { }

    async init() {
        this.#raw = await data.load()
    }

    get raw() { return this.#raw }
    async clear() { await chrome.storage.local.clear() }
    async addToInbox(idea) {
        this.#raw.inbox.push(idea)
        data.save(this.#raw)
    }
    getOldestInboxIdea() { return this.#raw.inbox[0] }
    deleteInboxIdea(idea) {
        this.#raw.inbox = this.#raw.inbox.filter(i => i !== idea)
        data.save(this.#raw)
    }
    addProject(project) {
        this.#raw.projects.push(project)
        data.save(this.#raw)
    }
}

export const todo = new ToDoModel()
