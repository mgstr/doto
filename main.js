import { inbox } from "./pages/inbox.js"
import { today } from "./pages/today.js"
import { projects } from "./pages/projects.js"
import { debug } from "./pages/debug.js"

const pages = { inbox, today, projects, debug }

document.addEventListener("DOMContentLoaded", async () => {
    const tabs = document.querySelectorAll(".tab")
    const content = document.getElementById("content")

    tabs.forEach(tab => {
        tab.addEventListener('click', async () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'))

            // Add active class to the clicked tab
            tab.classList.add('active')

            const pageId = tab.getAttribute('data-content')
            const pageGenerator = pages[pageId]
            if (pageGenerator) {
                await pageGenerator(tab, content)
            } else {
                content.innerHTML = "<h1>404</h1>"
            }
        })
    })

    tabs[0].click()
})
