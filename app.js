const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const teamArray = [];

const render = require("./lib/htmlRenderer");


//This function will start the code and prompt the user to answer some questions about the manager of the team
function managerCreation() {

    //Prompt manager questions
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?",
            //Validate input here
        },
        {
            type: "input",
            name: "managerId",
            message: "What is the manager's id?",
            //Validate input here
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is the manager's email?"
            //Validate input here
        },
        {
            type: "input",
            name: "managerOffice",
            message: "What is the manager office number",
            //Validate input here
        },
        {
            type: "list",
            name: "newEmployee",
            message: "Do you want to add a new employee?",
            choices: ["Yes", "No"]
            //Validate input here
        },

        // This promise have the variable that it stores all the answers the user input 
    ]).then(answers => {
        // Const manager creates a new manager with the answers provided above
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffice);
        //We push the new manager to the team array
        teamArray.push(manager)

        if (answers.newEmployee === "Yes") {
            newEmployee();
        }

        else {
            createTeam();
            console.log("File created");
        }
        
    })
        .catch(error => {
            if (error.isTtyError) {
                console.log("There was an error");
            }
        });
}

//This function will run if the user decides to create another member on the team
function newEmployee() {

    inquirer.prompt([
        {
            type: "list",
            name: "memberRole",
            message: "What is this employee's role?",
            choices: ["Engineer", "Intern"]
            //Validate input here
        },
        {
            type: "input",
            name: "memberName",
            message: "What is your employee name?",
            //Validate input here
        },
        {
            type: "input",
            name: "memberId",
            message: "What is the employee id?",
            //Validate input here
        },
        {
            type: "input",
            name: "memberEmail",
            message: "What is the employee email?"
            //Validate input here
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github",
            when: engineerEmployee => {
                if (engineerEmployee.memberRole == "Engineer") {
                    return true
                }
                return false
            }
        },
        {
            type: "input",
            name: "school",
            message: "What is the intern's school",
            when: internEmployee => {
                if (internEmployee.memberRole == "Intern") {
                    return true
                }
                return false
            }
        },
        {
            type: "list",
            name: "newEmployee",
            message: "Do you want to add a new employee?",
            choices: ["Yes", "No"],
        }

    ]).then(answers => {

        if (answers.memberRole === "Engineer") {
            const engineer = new Engineer(answers.memberName, answers.memberId, answers.memberEmail, answers.github);
            // console.log(engineer);
            teamArray.push(engineer);
            // console.log(teamArray);
        }
        if (answers.memberRole === "Intern") {
            const intern = new Intern(answers.memberName, answers.memberId, answers.memberEmail, answers.school);
            teamArray.push(intern);
        }

        if (answers.newEmployee == "Yes") {
            return newEmployee();
        }
        else {
            
            createTeam();
            console.log("createHTML()");
        }
        console.log(teamArray);

    })
        .catch(error => {
            if (error.isTtyError) {
                console.log("There was an error");
            }
        });

}

//This function will create the html with the user's answerd questions from each member of the team
function createTeam() {
    const html = render(teamArray);
    fs.writeFile("./team.html", html, function (err) {
        if (err) throw err;
    });
}

managerCreation();
