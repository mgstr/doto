import { storage } from "./storage.js"
import { inbox } from "./pages/inbox.js"

const pages = {
    inbox
}

document.addEventListener("DOMContentLoaded", async () => {
    const tabs = document.querySelectorAll(".tab")
    const content = document.getElementById("content")

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'))

            // Add active class to the clicked tab
            tab.classList.add('active')

            const pageId = tab.getAttribute('data-content')
            const pageGenerator = pages[pageId]
            if (pageGenerator) {
                pageGenerator(tab, content)
            } else {
                content.innerHTML = "<h1>404</h1>"
            }
        })
    })

    tabs[0].click()
})
