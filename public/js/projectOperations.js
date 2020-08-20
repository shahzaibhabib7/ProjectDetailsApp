import axios from 'axios';



export const addNewProject = async (projectName, projectSource, clientName, developers, projectManager, startDate, dueDate, platform, theme, plugins, status) => {
    try {

        // STRING MANIPULATION
        developers = developers.split(',');
        // removes last ", " separator
        developers.pop();
        plugins = plugins.split(',');


        console.log(`${projectName} | ${projectSource} | ${clientName} | ${developers} | ${projectManager} | ${startDate} | ${dueDate} | ${platform} | ${theme} | ${plugins} | ${status}`);


        // SENDING REQUEST
        const res = await axios({
            method: 'POST',
            url: '/api/v1/projects/',
            data: {
                projectName,
                projectSource,
                clientName,
                developers,
                projectManager,
                startDate,
                dueDate,
                platform,
                theme,
                plugins,
                status
            }
        });

        console.log(res);

        if (res.data.status === 'success') {
            console.log('Project successfully created!');
            setTimeout(() => {
                window.location.href = '/projects';
            }, 1500);
        }

    } catch (err) {
        console.log(err);
    }
};

export const updateProject = async (projectId, projectName, projectSource, clientName, developers, projectManager, startDate, dueDate, platform, theme, plugins, status) => {
    try {

        // STRING MANIPULATION
        developers = developers.split(',');
        // removes last ", " separator
        developers.pop();
        plugins = plugins.split(',');


        console.log(`${projectName} | ${projectSource} | ${clientName} | ${developers} | ${projectManager} | ${startDate} | ${dueDate} | ${platform} | ${theme} | ${plugins} | ${status}`);


        // SENDING REQUEST
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/projects/${projectId}`,
            data: {
                projectName,
                projectSource,
                clientName,
                developers,
                projectManager,
                startDate,
                dueDate,
                platform,
                theme,
                plugins,
                status
            }
        });

        console.log(res);

        if (res.data.status === 'success') {
            console.log('Project successfully updated!');
            setTimeout(() => {
                window.location.href = '/projects';
            }, 1500);
        }

    } catch (err) {
        console.log(err);
    }
};

export const deleteProject = async (projectId) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/projects/${projectId}`
        });

        console.log(res);

        if (res.status === 204) {
            console.log('Project successfully deleted');
            setTimeout(() => {
                window.location.href = '/projects/';
            }, 1500);
        }
    } catch (err) {
        console.log(err);
    }
};