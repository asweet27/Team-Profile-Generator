const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const outputPath = path.resolve(__dirname, "output", "team.html");


const render = require("./lib/htmlRenderer");

const teamArray = [];
const teamIds = [];

function init() {
    function nameTeam() {
        inquirer.prompt([
            {
                type: "input",
                message: "Welcome to the Team Profile Generator! Start by telling us the name of your team.",
                name: "teamname"
            }
        ])
            .then(function(data) {
                const teamName = data.teamName
                teamArray.push(teamName)
                addManager();
            });
    }

    function addManager() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the team manager's name?",
                name: "managerName",
            },
            {
                type: "input",
                message: "What is the team manager's ID number?",
                name: "managerIdNumber",
            },
            {
                type: "input",
                message: "What is the team manager's email address?",
                name: "managerEmail",
            },
            {
                type: "input",
                message: "What is the team manager's office number?",
                name: "managerOfficeNumber",
            },
        ])
        .then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamArray.push(manager);
            teamIds.push(answers.managerId)
            buildTeam();
            
        });
    }

    function buildTeam() {
        inquirer.prompt([
            {
                type: "list",
                message: "Would you like to add more team members to your site?",
                name: "teamMemberAdd",
                choices: [
                    "Yes, add an Intern",
                    "Yes, add an Engineer",
                    "No, the team is complete"
                ]
            }
        ])
        .then(userInput => {
            switch (userInput.teamMemberAdd) {
                case "Yes, add an Intern":
                    addIntern();
                    break;
                case "Yes, add an Engineer":
                    addEngineer();
                    break;
                case "No, the team is complete":
                    createTeamSite();
                    break;
            }
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the intern's name?",
                name: "internName",
            },
            {
                type: "input",
                message: "What is the intern's email address?",
                name: "internEmail",
            },
            {
                type: "input",
                message: "What is the intern's ID number?",
                name: "internIdNumber",
            },
            {
                type: "input",
                message: "What school does the intern attend?",
                name: "internSchool",
            }
        ])
        .then(answers => {
            const intern = new Intern(answers.internName, answers.internEmail, answers.internIdNumber, answers.internSchool);
            teamArray.push(intern);
            teamIds.push(answers.internIdNumber);
            buildTeam();
        });
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the engineer's name?",
                name: "engineerName"
            },
            {
                type: "input",
                message: "What is the engineer's email address?",
                name: "engineerEmail"
            },
            {
                type: "input",
                message: "What is the engineer's ID number?",
                name: "engineerIdNumber"
            },
            {
                type: "input",
                message: "What is the engineer's Github username?",
                name: "engineerGithub"
            }
        ])
        .then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerEmail, answers.engineerIdNumber, answers.engineerGithub);
            teamArray.push(engineer);
            teamIds.push(answers.engineerIdNumber);
            buildTeam();
        });
    }

   function createTeamSite() {
       fs.writeFileSync(outputPath, render(teamArray), "utf-8");
       console.log("Success! Your team page has been rendered in the output folder!")
   } 

   nameTeam();


}

init();