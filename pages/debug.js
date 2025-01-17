import { data } from "../data.js"

export const debug = async (tab, content) => {
    const raw = await data.load()
    const json = JSON.stringify(raw, null, 2)
    content.innerHTML = `<pre style="text-align: left;">${json}</pre>`

    tab.querySelector("#buttons").innerHTML = `
        <i class="fa-solid fa-download"></i>
        <i class="fa-solid fa-trash"></i>
        `

    tab.querySelector(".fa-trash").addEventListener("click", async (e) => {
        await chrome.storage.local.clear()
        tab.click()
    })

    tab.querySelector(".fa-download").addEventListener("click", async (e) => {
        console.log("download")
    })
}