const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function managerCreation() {

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

    ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffice);
        console.log(manager);
        if (answers.newEmployee === "Yes") {
            newEmployee();
        }

        else{
            console.log("Done!!!");
        }
    })
        .catch(error => {
            if (error.isTtyError) {
                console.log("There was an error");
            }


        });
}

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
            message: "What is the id?",
            //Validate input here
        },
        {
            type: "input",
            name: "memberEmail",
            message: "What is the email?"
            //Validate input here
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github",
            when: newAnswers =>{
                if(newAnswers.memberRole === "Engineer"){
                    return true
                }
                return false
            }
        },
        {
            type: "input",
            name: "school",
            message: "What is the intern's school",
            when: newAnswers =>{
                if(newAnswers.memberRole === "Intern"){
                    return true
                }
                return false
            }
        },


    ]).then(answers => {
        const engineer = new Engineer (answers.memberName, answers.memberId, answers.memberEmail, answers.github);
        console.log(engineer);
        const intern = new Intern (answers.memberName, answers.memberId, answers.memberEmail, answers.school);
        console.log(intern);

        })
        .catch(error => {
            if (error.isTtyError) {
                console.log("There was an error");
            }
        });

}

// const intern = new Intern (answers.memberName, answers.memberId, answers.memberEmail, answers.school);

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

managerCreation();
