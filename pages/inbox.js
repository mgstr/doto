import { storage } from "../storage.js"
import { data } from "../data.js"

export const inbox = async (tab, content) => {
    const getIdeas = async () => (await data.load()).ideas
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
    const switchToReviewMode = () => {
        console.log("switch to review mode")
        tab.innerText = "Review Inbox"
    }

    content.innerHTML = `<input type="text" id="textInput" size="40"/>
    <button id="add" disabled>+</button>`

    tab.querySelector("#buttons").innerHTML = `
        <i class="fa-solid fa-eye"></i>
    `

    const input = content.querySelector("#textInput")
    const add = content.querySelector("#add")

    setInputValue(await storage.load("input", ""))
    setBadgeCount((await getIdeas()).length)
    input.focus()

    input.addEventListener("input", async (e) => {
        const value = e.target.value
        setAddState(value)
        storage.save("input", value)
    })
    input.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
            if (e.shiftKey) {
                switchToReviewMode()
            } else {
                add.click()
            }
        }
    })

    add.addEventListener("click", async (_e) => {
        const idea = input.value
        if (idea.length > 0) {
            const raw = await data.load()
            raw.ideas.push(idea)
            data.save(raw)
            setBadgeCount(raw.ideas.length)

            setInputValue("")
            storage.save("input", "")
        }
    })
}