import { storage } from "./storage.js"
import { createProjectId, createActionId } from "./ids.js"

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
        project.id = createProjectId()
        project.steps = project.steps.filter(step => step)
        project.steps.forEach(step => step.id = createActionId());
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
            .find(project => projectNextAction(project).id === id)
        return [project && projectNextAction(project), project.id]
    }
    removeAction(actionId, projectId) {
        console.log("remove action: ", actionId, " from project: ", projectId)
        const project = this.#raw.projects.find(project => project.id === projectId)
        project.steps = project.steps.filter(step => step.id !== actionId)
    }
}

export const todo = new ToDoModel()
