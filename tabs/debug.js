import { data } from "../data.js"
import { Tab } from "./tab.js"

// Convert JSON data to a blob and create a download link
function downloadJSON(data, filename) {
    const jsonString = JSON.stringify(data, null, 2); // Convert JSON object to a string
    const blob = new Blob([jsonString], { type: "application/json" }); // Create a Blob object
    const url = URL.createObjectURL(blob); // Create a URL for the Blob

    // Create a temporary anchor element for the download
    const a = document.createElement("a");
    a.href = url;
    a.download = filename; // Set the file name
    a.click(); // Trigger the download

    // Clean up the URL object
    URL.revokeObjectURL(url);
}

export class Debug extends Tab {
    constructor(tabs, content) {
        super("Debug", tabs, content)

        this.header.querySelector("#buttons").innerHTML = `
                <i class="fa-solid fa-download"></i>
                <i class="fa-solid fa-trash"></i>
                `

        this.header.querySelector(".fa-trash").addEventListener("click", async (e) => {
            e.stopPropagation()
            await chrome.storage.local.clear()
            this.header.click()
        })

        this.header.querySelector(".fa-download").addEventListener("click", async (e) => {
            e.stopPropagation()
            const raw = await data.load()
            downloadJSON(raw, "raw.json")
        })
    }

    async activate() {
        super.activate()
        await this.show()
    }

    async show() {
        const raw = await data.load()
        const json = JSON.stringify(raw, null, 2)
        content.innerHTML = `<pre style="text-align: left;">${json}</pre>`
    }
}