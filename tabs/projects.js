import { Tab } from "./tab.js"
import { todo } from "../data.js"

export class Projects extends Tab {
    constructor(tabs, content) {
        super("Projects", tabs, content)
    }

    activate() {
        super.activate()
        this.content.innerHTML = `<div class="projects"></div>`

        const projects = this.content.firstChild
        todo.raw.projects.forEach(project => {
            const projectNode = document.createElement("div")
            projectNode.classList.add("project")
            projectNode.innerText = project.name
            projectNode.addEventListener("click", (e) => {
                this.editProject(project.name)
            })
            projects.appendChild(projectNode)
        });
    }

    editProject(name) {
        const project = todo.raw.projects.find(project => project.name === name)
        this.content.innerHTML = `<div class="projects-root">
            <div class="project-name"><span class="editable">${project.name}</span></div>
            <div class="project-dod"><span class="editable">${project.dod}</span></div>
            <div class="steps">
            </div>
        </div>
        `
        const steps = this.content.querySelector(".steps")
        project.steps.forEach(step => {
            const stepNode = document.createElement("div")
            stepNode.innerHTML = `<span class="editable">${step}</step>`
            steps.appendChild(stepNode)
        })

        this.content.querySelector(".projects-root").addEventListener("dblclick", (event) => {
            const target = event.target;

            // Check if the clicked element is the editable span
            if (target.classList.contains("editable")) {
                const currentText = target.textContent;

                // Create an input element to replace the span
                const input = document.createElement("input");
                input.type = "text";
                input.value = currentText;
                input.className = "editable-input";

                // Replace the span with the input
                target.replaceWith(input);

                // Focus the input and select its content
                input.focus();
                input.select();

                // Flag to prevent multiple handlers from conflicting
                let isReplaced = false;

                // Function to replace input with span
                const replaceInputWithSpan = () => {
                    if (isReplaced) return; // Ensure this runs only once
                    isReplaced = true;

                    const newText = input.value;

                    // Create a new span with the updated text
                    const span = document.createElement("span");
                    span.className = "editable";
                    span.textContent = newText;

                    // Replace the input with the span
                    input.replaceWith(span);
                };

                // Handle Enter key to save changes
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        replaceInputWithSpan();
                    }
                });

                // Handle blur event to save changes if clicked outside
                input.addEventListener("blur", () => {
                    replaceInputWithSpan();
                });
            }
        });
    }
}
