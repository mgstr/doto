import { data } from "../data.js"

export const debug = async (tab, content) => {
    const raw = await data.load()
    const json = JSON.stringify(raw, null, 2)
    content.innerHTML = `<pre style="text-align: left;">${json}</pre>`
}