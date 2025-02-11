import { Tab } from "./tab.js"
import { todo } from "../data.js"

function newStep(name) {
    return `<div><i class="fa-solid fa-minus"></i> <span class="action editable">${name}</span></div>`
}

function simulateDoubleClick(element) {
    const dblClickEvent = new MouseEvent('dblclick', {
        bubbles: true,
        cancelable: true,
        view: window,
    });
    element.dispatchEvent(dblClickEvent);
}

export class Projects extends Tab {
    constructor() {
        super("Projects")
    }

    activate() {
        super.activate()

        this.showList()
    }

    showList() {
        this.setTitle()
        this.header.classList.remove("review")
        this.header.classList.add("active")

        const projects = todo.raw.projects.map(project => {
            const action = project.steps[0]?.name
            if (action)
                return `<div><span class="project large">${project.name}</span> <span class="action small">${action}</span></div>`
            return `<div><span class="project large">${project.name}</span> <span class="action small attention">no next action</span></div>`
        }
        ).join("")

        this.content.innerHTML = `<div class="projects">${projects}</div>`

        this.content.querySelectorAll("span.project")
            .forEach(project => project.addEventListener("click", (event) => {
                this.editProject(event.target.innerText)
            }))
    }

    editProject(name) {
        this.setTitle("Edit project")
        this.header.classList.remove("active")
        this.header.classList.add("review")

        const project = todo.raw.projects.find(project => project.name === name)
        const steps = project.steps.map(step => newStep(step.name)).join("")
        this.content.innerHTML = `<div class="projects-root">
            <div class="project large"><span class="editable">${project.name}</span></div>
            <div class="dod"><span class="editable">${project.dod}</span></div>
            <div class="steps">${steps}</div>
            <div><i class="fa-solid fa-plus"></i></div>
        </div>
        `
        function updateValue(newValue, classes) {
            if (classes.contains("project")) {
                project.name = newValue
            } else if (classes.contains("dod")) {
                project.dod = newValue
            } else {
                console.log(`update step to ${newValue}`)
            }
        }
        this.content.querySelector(".fa-plus").addEventListener("click", (event) => {
            const template = document.createElement("template")
            template.innerHTML = newStep("")
            const newStepElement = template.content.firstChild
            this.content.querySelector(".steps").appendChild(newStepElement)
            simulateDoubleClick(newStepElement.querySelector(".editable"))
        })
        this.content.querySelector(".projects-root").addEventListener("dblclick", (event) => {
            const target = event.target;

            // Check if the clicked element is the editable span
            if (target.classList.contains("editable")) {
                const currentText = target.textContent

                // Create an input element to replace the span
                const input = document.createElement("input")
                input.type = "text"
                input.value = currentText
                input.className = "editable-input"

                // Remember parent element
                const parent = target.parentNode

                // Replace the span with the input
                target.replaceWith(input)

                // Focus the input and select its content
                input.focus()
                input.select()

                // Flag to prevent multiple handlers from conflicting
                let isReplaced = false

                // Function to replace input with span
                const replaceInputWithSpan = () => {
                    if (isReplaced) return; // Ensure this runs only once
                    isReplaced = true

                    const newText = input.value

                    // Create a new span with the updated text
                    const span = document.createElement("span")
                    span.className = "editable"
                    span.textContent = newText

                    // Replace the input with the span
                    input.replaceWith(span)

                    updateValue(newText, parent.classList)
                }

                // Handle Enter key to save changes
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        replaceInputWithSpan()
                    }
                })

                // Handle blur event to save changes if clicked outside
                input.addEventListener("blur", () => {
                    replaceInputWithSpan()
                })
            }
        })
    }
}
