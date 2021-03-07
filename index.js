// Dependencies
const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');

// Turn fs.writeFile into a promise
const writeFileAsync = util.promisify(fs.writeFile);

// Inquirer prompts
const promptUser = () => {
  return inquirer
    .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the title of this project?'
        },
        {
          type: 'input',
          name: 'description',
          message: 'Please provide a brief description of the project:'
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
          type: 'list',
          name: 'license',
          message: 'Which license would you like to apply to your project?',
          choices: ['Apache license 2.0', 'MIT', 'IBM', 'ISC']
        },
        {
          type: 'input',
          name: 'contributors',
          message: 'Please list any other contributors:'
        },
        {
          type: 'input',
          name: 'tests',
          message: 'What are the test instructions for this application?'
        },
        {
          type: 'input',
          name: 'github',
          message: "Please enter the link to the project's GitHub profile:"
        },
        {
          type: 'input',
          name: 'email',
          message: 'Please enter an email address for questions:'
        },
    ]);
}; 

// Generate template for README file
const generateReadme = (answers) =>
`
# ${answers.title}
<h1>Table of Contents:</h1>
<ul>
  <li><a href="#description">Description</a></li>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#license">License</a></li>
  <li><a href="#contributors">Contributors</a></li>
  <li><a href="#tests">Tests</a></li>
  <li><a href="#questions">Questions</a></li>
</ul>
<h1 id="description">Description:</h1>
<p>${answers.description}</p>
<h1 id="installation">Installation</h1>
<p>${answers.install}</p>
<h1 id="usage">Usage</h1>
<p>${answers.usage}</p>
<h1 id="license">License</h1>
<p>${answers.title} is licensed by ${answers.license}</p>
<h1 id="contributors">Contributors</h1>
<p>${answers.contributors}</p>
<h1 id="tests">Tests</h1>
<p>${answers.tests}</p>
<h1 id="questions">Questions</h1>
<p>Please visit the project's GitHub page and email for any questions.</p>
<ul>
  <li><a href="${answers.github}">GitHub Page</a></li>
  <li><a href="mailto: ${answers.email}">Email</a></li>
</ul>
`;

// const licenseBadge = (answers) => {
//   const license = `${answers.license.choices}`;
//   const badge = `${answers.license}`;

//   switch (license) {
//     case "Apache license 2.0":
//       badge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
//       break;
//     case "MIT":
//       badge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
//       break;
//     case "IBM":
//       badge = "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)"
//       break;
//     case "ISC":
//       badge = "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)"
//       break;
//     default:
//       console.log("Error");
//   }
// }

// Init function
const init = () => {
  promptUser()
    .then((answers) => writeFileAsync('README-Test.md', generateReadme(answers)))
    .then(() => console.log("Success! Your README file has been created!"))
    .catch((err) => console.error(err));
}

init();