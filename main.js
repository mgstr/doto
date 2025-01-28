import { tabsManager } from "./tabs/tabsManager.js"

document.addEventListener("DOMContentLoaded", async () => {
    const tabs = document.querySelector(".tabs")
    const content = document.getElementById("content")

    await tabsManager.init(tabs, content)

    tabs.addEventListener("click", (e) => {
        tabsManager.switchTo(e)
    })
})