import { storage } from "../storage.js"

export const inbox = async (_tab, content) => {
    content.innerHTML = `<input type="text" id="textInput" size="40" autofocus/>
    <button id="add" disabled>+</button>`

    const input = content.querySelector("#textInput")
    const add = content.querySelector("#add")

    const value = await storage.load("input")
    input.value = value
    add.disabled = value.lendth === 0
    input.addEventListener("input", async (e) => {
        const value = e.target.value
        add.disabled = value.length === 0
        await storage.save("input", value)
    })
}