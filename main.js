import { inbox } from "./pages/inbox.js"
import { projects } from "./pages/projects.js"
import { debug } from "./pages/debug.js"

const pages = { inbox, projects, debug }

document.addEventListener("DOMContentLoaded", async () => {
    const tabs = document.querySelectorAll(".tab")
    const content = document.getElementById("content")

    const tabsManager = {}

    tabs.forEach(tab => {
        const pageId = tab.getAttribute('data-content')
        const pageObject = pages[pageId]
        if (pageObject) {
            tabsManager[pageId] = pageObject
        } else {
            console.error(`Can't find a page object for ${pageId}`)
        }

        initializeTab(tab, pageObject)

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
})

function initializeTab(tab, pageObject) {
    const badge = document.createElement("span")
    badge.id = "badge"
    tab.insertBefore(badge, tab.firstChild)

    const buttons = document.createElement("span")
    buttons.id = "buttons"
    tab.appendChild(buttons)

    pageObject.tab(tab)
}