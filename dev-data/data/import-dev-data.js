const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./../../models/projectModel');
const User = require('./../../models/userModel');


// this will read our variables from the file and save them into node.js environment variable
dotenv.config({ path: `${__dirname}/../../config.env` });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    // console.log(con.connections);
    console.log('✅ DB Connection Successfull!');
});

// read JSON file
const projects = JSON.parse(fs.readFileSync(`${__dirname}/project-simple.json`, 'utf-8'));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/user-simple.json`, 'utf-8'));


// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Project.create(projects);
        // await User.create(users);
        console.log('Data successfully loaded!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Project.deleteMany();
        // await User.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}