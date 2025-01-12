console.log("extension popup loaded")

function store(key, value) {
    console.log(`storing key=${key} value=${value}`)
    chrome.storage.local.set({ "textInput": textInput.value }, () => {
        if (chrome.runtime.lastError) {
            console.error("data saving error:", chrome.runtime.lastError)
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("page loaded...")

    const textInput = document.getElementById("textInput")
    const addButton = document.getElementById("add")

    chrome.storage.local.get(["textInput"], (result) => {
        console.log("data in the storage:", result)
        if (result.textInput) {
            console.log("restoring data in the textInput")
            textInput.value = result.textInput
            setAddButtonState()
        }
    })

    textInput.addEventListener("input", () => {
        console.log("input: ", "'" + textInput.value + "'")
        store("textInput", textInput.value)
        setAddButtonState()
    })

    addButton.addEventListener("click", () => {
        console.log("add button clicked")
        // for now just clear the input text
        clearInputText()
    })

    function clearInputText() {
        textInput.value = ""
        addButton.disabled = true
        store("textInput", "")
    }

    function setAddButtonState() {
        addButton.disabled = textInput.value.trim().length === 0
    }
})
