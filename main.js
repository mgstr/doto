import { storage } from "./storage.js"

document.addEventListener("DOMContentLoaded", async () => {
    const tabs = document.querySelectorAll('.tab')
    const contents = document.querySelectorAll('.content')

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and content
            tabs.forEach(t => t.classList.remove('active'))
            contents.forEach(c => c.classList.remove('active'))

            // Add active class to the clicked tab and corresponding content
            tab.classList.add('active')
            const contentId = tab.getAttribute('data-content')
            document.getElementById(contentId).classList.add('active')
        })
    })

    // setup Inbox
    const input = document.querySelector("#inbox #textInput")
    input.value = await storage.load("input")
    input.addEventListener('input', async (e) => {
        await storage.save("input", e.target.value)
    })
})
