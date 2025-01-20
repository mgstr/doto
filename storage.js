export const storage = {
    async save(key, value) {
        await chrome.storage.local.set({ [key]: value })
    },
    async load(key, initial) {
        const value = (await chrome.storage.local.get([key]))[key] ?? initial
        return value
    }
}