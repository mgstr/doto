console.log("extension popup loaded")

async function _claeaAll() {
    await chrome.storage.session.clear()
    await chrome.storage.sync.clear()
    await chrome.storage.local.clear()
}

async function _showAll() {
    await _show(chrome.storage.session)
    await _show(chrome.storage.sync)
    await _show(chrome.storage.local)
}

async function _show(storage) {
    return storage.get(null, (data) => {
        console.log(storage, data)
    })
}

function storeInSync(key, value) {
    _store(chrome.storage.sync, key, value)
}

function storeInSession(key, value) {
    _store(chrome.storage.session, key, value)
}

function _store(storage, key, value) {
    console.log(`storing key=${key} value=${value}`)
    storage.set({ [key]: textInput.value }, () => {
        if (chrome.runtime.lastError) {
            console.error("data saving error:", chrome.runtime.lastError)
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("page loaded...")

    const textInput = document.getElementById("textInput")
    const addButton = document.getElementById("add")

    chrome.storage.session.get(["textInput"], (result) => {
        console.log("data in the storage:", result)
        if (result.textInput) {
            console.log("restoring data in the textInput")
            textInput.value = result.textInput
            setAddButtonState()
        }
    })

    textInput.addEventListener("input", () => {
        console.log("input: ", "'" + textInput.value + "'")
        storeInSession("textInput", textInput.value)
        setAddButtonState()
    })

    addButton.addEventListener("click", () => {
        const idea = textInput.value.trim()
        if (idea.length === 0) {
            console.warn("skipping writing an empty idea")
            return
        }

        storeInSync("inbox", idea)

        clearInputText()
    })

    function clearInputText() {
        textInput.value = ""
        addButton.disabled = true
        storeInSession("textInput", "")
    }

    function setAddButtonState() {
        addButton.disabled = textInput.value.trim().length === 0
    }
})
