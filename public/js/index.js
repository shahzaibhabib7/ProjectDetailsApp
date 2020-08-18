// DOM ELEMENTS
const addNewProjectForm = document.querySelector('.add_new');
console.log('Hello');
// DELAGATION
if (addNewProjectForm) {
    console.log('Form found!');
    addNewProjectForm.addEventListener('submit', e => {
        // this prevents form from loading any other page
        console.log('hadf');
        e.preventDefault();
        const projectName = document.getElementById('projectName').value;
        const projectSource = document.getElementById('projectSource').value;
        const clientName = document.getElementById('clientName').value;
        const projectManager = document.getElementById('projectManager').value;
        const startDate = document.getElementById('startDate').value;
        const dueDate = document.getElementById('dueDate').value;
        const platform = document.getElementById('platform').value;
        const theme = document.getElementById('theme').value;
        const plugins = document.getElementById('plugins').value;
        const status = document.getElementById('status').value;

        console.log(projectName);
        console.log(projectSource);
        console.log(clientName);
        console.log(projectManager);
        console.log(startDate);
        console.log(dueDate);
        console.log(platform);
        console.log(theme);
        console.log(plugins);
        console.log(status);
    });
}