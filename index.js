
const inquirer = require("inquirer");
const fs = require('fs');
const util = require('util');


const writeFile= util.promisify(fs.writeFile);

//array of questions for user input
const questions = () => inquirer.prompt([
   {
    type: "input",
    message: "What is your name?",
    name:"name",
   },
   {
    type: "input",
    message: "What is your GitHub username?",
    name:'githubname',
   },
   {
    type: 
    "input",
    message: "What is your email address?", 
    name: "email"
   },
   {
    type: "input", 
    message: "What is the project title?",
    name: "title"
   },
   {
    type: "list",
    message: "What type of license does your project have?",
    name: "license",
    choices: ["BSD 3", "GPL 3.0","MIT","None"]
   },
   {
    type: "input",
    message: "Please write a short description of your project?",
    name: "description"
   },
   {
    type: "input",
    message: "What kind of License should your project have?",
    name: "license"
   },
   {
    type: "input",
    message: "What command should be run to install dependencies?",
    name: "install"
   },
   {
    type: "input",
    message: "What command should be used to run tests?",
    name: "testcommand"
   }, 
   {
    type: "input",
    message: 
    "What does the user need to know about using this repository?",
    name: "directions"
   },
]);

function generateMarkDown(data){

   let badge = "";  
     if(data.license == "MIT"){
        badge = "![License](https://img.shields.io/static/v1?label=License&message=MIT&color=blueviolet&style=plastic)"
    }else if (data.license == "APACHE 2.0"){
        badge = "![License](https://img.shields.io/static/v1?label=License&message=APACHE2.0&color=blueviolet&style=plastic)"
    }else if (data.license == "GPL 3.0"){
        badge = "![License](https://img.shields.io/static/v1?label=License&message=GPL3.0&color=blueviolet&style=plastic)"
    }else if (data.license == "BSD 3"){
        badge = "![License](https://img.shields.io/static/v1?label=License&message=BSD3&color=blueviolet&style=plastic)"
    }


return`# ${data.title}
${data.description}
## Table of Contents
*[Installation](#installation)
*[Usage](#usage)
*[License](#license)
*[Contributing](#contributing)
*[Tests](#tests)
*[Questions](#questions)

##Installation

${data.install}

##Usage
${data.directions}

##License
${data.license}

##Contributing
${data.contribute}

##Tests

Use the following command to run tests:
${data.testcommand} 

##Questions

Contact me with additional questions at 

[GitHub](https://github.com/${data.githubname})
or contact 
${data.name} at ${data.email}`

}

questions()
 .then((data) => writeFile('README.md', generateMarkDown(data)))
 .then(() => console.log('Successful html write'))
 .catch((err) => console.error(err));