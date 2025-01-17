import { storage } from "../storage.js"

export const data = {
    load: async () => {
        return storage.load("doto", { inbox: [] })
    },
    save: async (raw) => {
        storage.save("doto", raw)
    }
}