import { data } from "../data.js"

export const debug = async (tab, content) => {
    const raw = await data.load()
    const json = JSON.stringify(raw, null, 2)
    content.innerHTML = `<pre style="text-align: left;">${json}</pre>`

    tab.querySelector("#buttons").innerHTML = `
        <button aria-label="download" class="btn"><i class="fa-solid fa-download"></i></button>
        <button aria-label="clear" class="btn"><i class="fa-solid fa-trash"></i></button>
        `

    tab.querySelector(`[aria-label="clear"]`).addEventListener("click", async (e) => {
        await chrome.storage.local.clear()
        tab.click()
    })

    tab.querySelector(`[aria-label="download"]`).addEventListener("click", async (e) => {
        console.log("download")
    })
}