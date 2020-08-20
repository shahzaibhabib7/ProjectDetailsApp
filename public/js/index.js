import '@babel/polyfill';
import { addNewProject, updateProject, deleteProject } from './projectOperations';



// DOM ELEMENTS
const addNewProjectForm = document.querySelector('form.form.add_new');
const deleteProjectButton = document.querySelector('a.control_btn.delete-btn');
const updateProjectForm = document.querySelector('form.form.update');
console.log('Hello');


// DELAGATION
if (addNewProjectForm) {
    console.log('Form found!');
    addNewProjectForm.addEventListener('submit', e => {
        // this prevents form from loading any other page
        console.log('Event Listener');
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

        const developerCheckboxes = document.getElementsByName('developers');
        let developers = '';

        for (let i = 0; i < developerCheckboxes.length; i++) {
            if (developerCheckboxes[i].checked) {
                developers += developerCheckboxes[i].value + ",";
            }
        }

        console.log(`${projectName} | ${projectSource} | ${clientName} | ${developers} | ${projectManager} | ${startDate} | ${dueDate} | ${platform} | ${theme} | ${plugins} | ${status}`);

        addNewProject(projectName, projectSource, clientName, developers, projectManager, startDate, dueDate, platform, theme, plugins, status);
    });
}

if (updateProjectForm) {
    console.log('Update form found!');
    updateProjectForm.addEventListener('submit', e => {
        console.log('Event Listener');
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

        const developerCheckboxes = document.getElementsByName('developers');
        let developers = '';

        for (let i = 0; i < developerCheckboxes.length; i++) {
            if (developerCheckboxes[i].checked) {
                developers += developerCheckboxes[i].value + ",";
            }
        }

        const projectId = window.location.href.split('/update-project/')[1];

        console.log(`${projectId} ${projectName} | ${projectSource} | ${clientName} | ${developers} | ${projectManager} | ${startDate} | ${dueDate} | ${platform} | ${theme} | ${plugins} | ${status}`);

        updateProject(projectId, projectName, projectSource, clientName, developers, projectManager, startDate, dueDate, platform, theme, plugins, status);
    });
}

if (deleteProjectButton) {
    deleteProjectButton.addEventListener('click', e => {
        e.preventDefault();
        const projectId = window.location.href.split('/projects/')[1];
        console.log(projectId);
        deleteProject(projectId);
    });
}