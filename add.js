console.log("extension popup loaded")

const debug = {
    claeaAll: async function () {
        await chrome.storage.session.clear()
        await chrome.storage.sync.clear()
        await chrome.storage.local.clear()
    },

    showAll: async function () {
        await this.show(chrome.storage.session)
        await this.show(chrome.storage.sync)
        await this.show(chrome.storage.local)
    },

    show: async function (storage) {
        return storage.get(null, (data) => {
            console.log(storage, data)
        })
    }
}

function storeInSync(key, value) {
    _store(chrome.storage.sync, key, value)
}

function storeInSession(key, value) {
    _store(chrome.storage.session, key, value)
}

function _store(storage, key, value) {
    storage.set({ [key]: textInput.value }, () => {
        if (chrome.runtime.lastError) {
            console.error("data saving error:", chrome.runtime.lastError)
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("textInput")
    const addButton = document.getElementById("add")

    chrome.storage.session.get(["textInput"], (result) => {
        if (result.textInput) {
            textInput.value = result.textInput
            setAddButtonState()
        }
    })

    textInput.addEventListener("input", () => {
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
