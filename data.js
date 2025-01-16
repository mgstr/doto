import { storage } from "../storage.js"

export const data = {
    load: async () => {
        return storage.load("doto", { ideas: [] })
    },
    save: async (raw) => {
        storage.save("doto", raw)
    }
}