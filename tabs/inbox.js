import { storage } from "../storage.js"
import { todo } from "../data.js"
import { Tab } from "./tab.js"

export class Inbox extends Tab {
    constructor(tabs, content) {
        super("Inbox", tabs, content)

        const badge = this.header.querySelector("#badge")
        badge.addEventListener("click", (e) => {
            e.stopPropagation()
            this.reviewMode()
        })
        console.log("todo", todo, todo.raw)
        this.setBadgeCount(todo.raw?.inbox?.length)

        chrome.storage.onChanged.addListener((changes, areaName) => {
            if (areaName === "local" && changes["doto"]) {
                this.setBadgeCount(changes.doto.newValue?.inbox?.length)
            }
        })
    }

    async activate() {
        super.activate()

        this.addingMode()
    }

    async addingMode() {
        this.header.classList.remove("review")
        this.header.classList.add("active")

        this.content.innerHTML = `<input type="text" id="textInput" size="40"/>
            <button id="add" disabled>+</button>`

        const input = content.querySelector("#textInput")
        const add = content.querySelector("#add")
        const setAddState = (value) => add.disabled = value.lendth === 0
        const setInputValue = (value) => {
            input.value = value
            setAddState(value)
        }

        setInputValue(await storage.load("input", ""))
        input.focus()

        input.addEventListener("input", async (e) => {
            const value = e.target.value
            setAddState(value)
            storage.save("input", value)
            input.focus()
        })
        input.addEventListener("keydown", async (e) => {
            if (e.key === "Enter") {
                if (e.shiftKey) {
                    this.reviewMode()
                } else {
                    add.click()
                }
            }
        })

        add.addEventListener("click", async (_e) => {
            const idea = input.value
            if (idea.length > 0) {
                todo.addToInbox(idea)

                setInputValue("")
                storage.save("input", "")
            }
        })
    }

    async reviewMode() {
        this.header.classList.remove("active")
        this.header.classList.add("review")

        const idea = todo.getOldestInboxIdea()
        this.content.innerHTML = `
            <div class="container">
                <div class="center-text" id="idea">${idea}</div>
                <div class="actions">
                    <div id="delete">delete</div>
                    <div id="project">create project</div>
                    <div>action</div>
                </div>
            </div>`
        this.content.querySelector("#delete").addEventListener("click", (e) => {
            todo.deleteInboxIdea(idea)
            setTimeout(() => {
                todo.raw.inbox.length === 0 ? this.addingMode() : this.reviewMode()
            })
        })
        this.content.querySelector("#project").addEventListener("click", (e) => {
            this.content.innerHTML = `
                <div class="container">
                    <div>
                    <input type="text" id="textInput" size="40" value="${idea}"></input>
                    </div>
                    <div class="actions">
                        <div>save</div>
                    </div>
                </div>`
        })
    }

    setBadgeCount(count) {
        const element = this.header.querySelector("#badge")
        if (count === undefined || count === 0) {
            element.classList.remove("badge")
            element.innerText = ""
        } else {
            element.classList.add("badge")
            element.innerText = count
        }
    }
}