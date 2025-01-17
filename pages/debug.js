import { data } from "../data.js"

export const debug = async (tab, content) => {
    const raw = await data.load()
    const json = JSON.stringify(raw, null, 2)
    content.innerHTML = `<pre style="text-align: left;">${json}</pre>`

    tab.querySelector("#buttons").innerHTML = `<button aria-label="close" class="btn">❌</button>`
    tab.querySelector(`[aria-label="close"]`).addEventListener("click", async (e) => {
        await chrome.storage.local.clear()
        tab.click()
    })
}