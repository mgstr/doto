export const storage = {
    async save(key, value) {
        //console.log("saving in local storage, key", key, "value", value)
        await chrome.storage.local.set({ [key]: value })
    },
    async load(key, initial) {
        const value = (await chrome.storage.local.get([key]))[key] ?? initial
        //console.log("loading from local storage, key", key, "value", value)
        return value
    }
}