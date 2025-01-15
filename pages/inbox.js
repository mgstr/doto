import { storage } from "../storage.js"

export const inbox = async (tab, content) => {
    const getIdeas = async () => storage.load("ideas", [])
    const setInputValue = (value) => {
        input.value = value
        setAddState(value)
    }
    const setAddState = (value) => add.disabled = value.lendth === 0
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

    setInputValue(await storage.load("input", ""))
    setBadgeCount((await getIdeas()).length)

    input.addEventListener("input", async (e) => {
        const value = e.target.value
        setAddState(value)
        storage.save("input", value)
    })
    add.addEventListener("click", async (e) => {
        const idea = input.value
        if (idea.length > 0) {
            const ideas = await getIdeas()
            ideas.push(idea)
            storage.save("ideas", ideas)
            setBadgeCount(ideas.length)

            setInputValue("")
            storage.save("input", "")
        }
    })
}