import { data } from "../data.js"

export const debug = async (tab, content) => {
    const raw = await data.load()
    const json = JSON.stringify(raw, 2)
    content.innerHTML = `<pre>${json}</pre>`
}