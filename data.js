import { storage } from "./storage.js"

export function calculateHash(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
    }
    return hash;
}

export function projectNextAction(project) {
    return project.steps[0]
}

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
        console.log("todo.init", this.#raw)
    }

    get raw() { return this.#raw }
    async clear() {
        await chrome.storage.local.clear()
        await this.init()
    }
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
    setCurrentAction(id) {
        this.#raw.currentAction = id
        data.save(this.#raw)
    }
    findActionById(id) {
        const project = this.#raw.projects
            .filter(project => projectNextAction(project))
            .find(project => calculateHash(projectNextAction(project)))
        return project && projectNextAction(project)
    }
}

export const todo = new ToDoModel()
