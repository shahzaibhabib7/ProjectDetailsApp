const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// this will read our variables from the file and save them into node.js environment variable
dotenv.config({ path: './config.env' });

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

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: [true, 'A project must have a name'],
        unique: true
    },
    projectSource: {
        type: String,
        required: [true, 'A project must have a source']
    },
    clientName: {
        type: String,
        required: [true, 'A project must have a client name']
    },
    developer: {
        type: [String],
        required: [true, 'A project must have a developer']
    },
    projectManager: {
        type: String,
        required: [true, 'A project must have a manager']
    },
    startingDate: {
        type: Date,
        required: [true, 'A project must have a starting date']
    },
    dueDate: {
        type: Date,
        required: [true, 'A project must have a due date']
    },
    platform: {
        type: String,
        required: [true, 'A project must have a platform']
    },
    theme: {
        type: String,
        required: [true, 'A project must have a theme']
    },
    plugins: {
        type: [String]
    },
    status: {
        type: String
    }
});

const Project = mongoose.model('Project', projectSchema);

const testProject = new Project({
    projectName: 'ANIMA Garden',
    projectSource: 'fiverr',
    clientName: 'Andre Heller',
    developer: ["shahzaib", "karrar"],
    projectManager: 'Muhammad Kazim',
    startingDate: '2020-03-19T09:00:00.000Z',
    dueDate: '2020-03-25T09:00:00.000Z',
    platform: 'wordpress',
    theme: 'Sunway',
    plugins: ["Classic Editor", "Math Captcha"],
    status: 'Complete'
});

testProject.save().then(doc => {
    console.log(doc);
}).catch(err => {
    console.log('❗❗ ERROR : ', err);
});

// console.log(app.get('env'));
// console.log(process.env);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});