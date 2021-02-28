const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer
    .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the title of your project?'
        },
        {
          type: 'input',
          name: 'description',
          message: 'Please provide a brief description of your project:'
        },
        {
          type: 'input',
          name: 'install',
          message: 'How do you install your app?'
        },
        {
          type: 'input',
          name: 'usage',
          message: 'How do you use your app?'
        },
        {
          type: 'checkbox',
          name: 'license',
          message: 'Which license would you like to apply to your project?',
          choices: ['The Unlicense', 'MIT', 'GNU GPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0']
        },
        {
          type: 'input',
          name: 'contributors',
          message: 'Please list any other contributors:'
        },
        {
          type: 'input',
          name: 'github',
          message: 'What is your GitHub username?'
        },
        {
          type: 'input',
          name: 'email',
          message: 'What is your email?'
        },
    ]);
}; 

const generateReadme = (answers) =>
`
# ${answers.title}
<p>${answers.description}</p>

<h1>Installation</h1>
<p>${answers.install}</p>

<h1>Usage</h1>
<p>${answers.usage}</p>

<h1>License</h1>
<p>This project is licensed by ${answers.license}</p>

<h1>Contributors</h1>
<p>${answers.contributors}</p>

<h1>Questions</h1>
<p>GitHub Username: ${answers.github}</p>
<p>Email: ${answers.email}</p>
`;

const init = () => {
  promptUser()
    .then((answers) => writeFileAsync('README.md', generateReadme(answers)))
    .then(()=> console.log("Sucess! Your README file has been created!"))
    .catch((err) => console.error(err));
}

init();