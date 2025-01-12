console.log("extension popup loaded")

document.addEventListener("DOMContentLoaded", () => {
    console.log("page loaded...")

    const textInput = document.getElementById("textInput")
    const addButton = document.getElementById("add")

    chrome.storage.local.get(["textInput"], (result) => {
        console.log("data in the storage:", result)
        if (result.textInput) {
            console.log("restoring data in the textInput")
            textInput.value = result.textInput
        }
    })

    textInput.addEventListener("input", () => {
        console.log("input: ", "'" + textInput.value + "'")

        addButton.disabled = textInput.value.trim().length === 0

        chrome.storage.local.set({ "textInput": textInput.value }, () => {
            console.log("lastError:", chrome.runtime.lastError)
        })
    })
})
