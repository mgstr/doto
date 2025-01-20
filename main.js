import { tabsManager } from "./tabs/tabsManager.js"

document.addEventListener("DOMContentLoaded", async () => {
    const tabs = document.querySelector(".tabs")
    const content = document.getElementById("content")

    await tabsManager.init(tabs, content)

    tabs.addEventListener("click", (e) => {
        tabsManager.switchTo(e)
    })
})
/*
    const template = document.createElement("template")
    for (const pageObject in [inbox, projects, debug]) {
        template.innerHTML = `<div class="tab"><span id="badge"></span> ${pageObject.title}</div>`
        const tab = document.createElement("div")
        const badge = document.createElement("span")
        badge.id = "badge"
        tab.insertBefore(badge, tab.firstChild)
    }
    tabs.forEach(tab => {
        function initializeTab() {

            const buttons = document.createElement("span")
            buttons.id = "buttons"
            tab.appendChild(buttons)

            pageObject.tab(tab, content)
        }

        const pageId = tab.getAttribute('data-content')
        const pageObject = pages[pageId]
        if (pageObject) {
            tabsManager[pageId] = pageObject
        } else {
            console.error(`Can't find a page object for ${pageId}`)
        }

        initializeTab()

        tab.addEventListener('click', async () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'))
            tabs.forEach(t => t.classList.remove('review'))

            // Add active class to the clicked tab
            tab.classList.add('active')

            pageObject.content(tab, content)
        })
    })

    tabs[0].click()
*/
