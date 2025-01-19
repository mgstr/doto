const initHeader = (name) => {
    const template = document.createElement("template")
    template.innerHTML = `<div class="tab" id="${name}"><span id="badge"></span>${name}<span id="buttons"></span></div>`
    return template.content.firstChild
}

export class Tab {
    constructor(name, tabs, content) {
        this.id = name
        this.content = content
        this.header = initHeader(name)
        tabs.appendChild(this.header)
    }

    show() {
        this.content.innerHTML = "<div>404</div>"
    }

    activate() {
        this.header.classList.add("active")
    }

    deactivate() {
        this.header.classList.remove("active")
        this.header.classList.remove("review")
    }
}
