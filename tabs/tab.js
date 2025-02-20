const initHeader = (id, name) => {
    const template = document.createElement("template")
    template.innerHTML = `<div class="tab" id="${id}"><span id="badge"></span><span id="title">${name}</span><span id="buttons"></span></div>`
    return template.content.firstChild
}

export class Tab {
    constructor(name) {
        this.name = name
        this.id = name.toLowerCase().replace(" ", "_")
    }

    init(tabs, content) {
        this.content = content
        this.header = initHeader(this.id, this.name)
        tabs.appendChild(this.header)
    }

    setTitle(title) {
        const newTitle = title ?? this.name
        this.header.querySelector("#title").innerText = newTitle
    }

    async show() {
        this.content.innerHTML = "<div>404</div>"
    }

    async activate() {
        this.header.classList.add("active")
    }

    async deactivate() {
        this.header.classList.remove("active")
        this.header.classList.remove("review")
    }
}
