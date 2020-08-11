const dotenv = require('dotenv');
const app = require('./app');

// this will read our variables from the file and save them into node.js environment variable
dotenv.config({ path: './config.env' });

// console.log(app.get('env'));
// console.log(process.env);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});