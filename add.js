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
    storage.set({ [key]: value }, () => {
        if (chrome.runtime.lastError) {
            console.error("data saving error:", chrome.runtime.lastError)
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("textInput")
    const addButton = document.getElementById("add")
    const counter = document.getElementById("counter")

    chrome.storage.session.get(["textInput"], (result) => {
        if (result.textInput) {
            textInput.value = result.textInput
            setAddButtonState()
        }
    })

    chrome.storage.sync.get(["inbox"], (result) => {
        console.log("inbox", result)
        if (result.inbox) {
            counter.innerText = result.inbox.length.toString()
        }
    })

    textInput.addEventListener("input", () => {
        storeInSession("textInput", textInput.value)
        setAddButtonState()
    })

    textInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            saveIdea()
        }
    })

    addButton.addEventListener("click", () => {
        saveIdea()
    })

    function saveIdea() {
        const idea = textInput.value.trim()
        if (idea.length === 0) {
            console.warn("skipping writing an empty idea")
            return
        }

        chrome.storage.sync.get(["inbox"], (result) => {
            const ideas = Array.isArray(result.inbox) ? result.inbox : []
            ideas.push(idea)
            storeInSync("inbox", ideas)
        })

        clearInputText()

        window.close()
    }

    function clearInputText() {
        textInput.value = ""
        addButton.disabled = true
        storeInSession("textInput", "")
    }

    function setAddButtonState() {
        addButton.disabled = textInput.value.trim().length === 0
    }
})
