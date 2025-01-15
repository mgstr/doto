import { storage } from "../storage.js"

export const inbox = async (tab, content) => {
    const getIdeas = async () => (await storage.load("ideas")) ?? []
    const setBadgeCount = (count) => {
        const element = tab.querySelector("#badge")
        if (count === 0) {
            element.classList.remove("badge")
            element.innerText = ""
        } else {
            element.classList.add("badge")
            element.innerText = count
        }
    }

    content.innerHTML = `<input type="text" id="textInput" size="40" autofocus/>
    <button id="add" disabled>+</button>`

    const input = content.querySelector("#textInput")
    const add = content.querySelector("#add")

    const value = (await storage.load("input")) ?? ""
    input.value = value
    add.disabled = value.lendth === 0
    setBadgeCount((await getIdeas()).length)

    input.addEventListener("input", async (e) => {
        const value = e.target.value
        add.disabled = value.length === 0
        await storage.save("input", value)
    })
    add.addEventListener("click", async (e) => {
        const idea = input.value
        if (idea.length > 0) {
            const ideas = await getIdeas()
            ideas.push(idea)
            storage.save("ideas", ideas)
            setBadgeCount(ideas.length)

            input.value = ""
            add.disabled = true
            storage.save("input", "")
        }
    })
}