#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.red(`\tStudent Management System`));
let studentId = Math.floor(10000 + Math.random() * 100);
let studentBalance = 50000;
let answer = await inquirer.prompt([
    {
        name: "newStudent",
        type: "input",
        message: "Enter student name:",
        validate: function (value) {
            if (/^[A-Za-z\s]+$/.test(value.trim())) {
                return true;
            }
            else {
                return chalk.red("Please enter a valid name. Name cannot contain numbers or be empty.");
            }
        }
    },
    {
        name: "Courses",
        type: "list",
        message: "Select Course You want to Enroll",
        choices: ["TypeScript", "Python", "Generative AI", "Block Chain", "Cloud Computing"]
    },
    {
        name: "StudentBalance",
        type: "number",
        message: "Enter Initial Student Balance:",
        default: studentBalance
    },
    {
        name: "OtherOptions",
        type: "list",
        message: chalk.green("What do you want to do Next"),
        choices: ["View Balance", "Pay Fee", "Show Status", "Exit"]
    }
]);
const tuitionFee = {
    "TypeScript": 4500,
    "Python": 4000,
    "Generative AI": 6000,
    "Block Chain": 4500,
    "Cloud Computing": 5000,
};
if (answer.OtherOptions === "View Balance") {
    console.log(`Your Balance is: ${studentBalance}`);
}
if (answer.OtherOptions === "Pay Fee") {
    console.log(`Course Fee of Selected Course is: ${tuitionFee[answer.Courses]}`);
    let courseAmount = await inquirer.prompt([{
            name: "Payment",
            type: "number",
            message: "Kindly pay the Fee of selected Course:"
        }]);
    if (courseAmount.Payment === tuitionFee[answer.Courses]) {
        if (studentBalance >= courseAmount.Payment) {
            studentBalance -= courseAmount.Payment;
            console.log(chalk.green("Fee Paid"));
            console.log(`Remaining Balance: ${studentBalance}`);
        }
        else {
            console.log(chalk.red("Insufficient balance. Please add more funds."));
        }
    }
    else {
        console.log(chalk.red("Please Enter Valid Amount"));
    }
}
if (answer.OtherOptions === "Show Status") {
    console.log(`Student Name: ${answer.newStudent}`);
    console.log(`Student ID: ${studentId}`);
    console.log(`Enrolled in: ${answer.Courses}`);
    console.log(`Student Balance: ${studentBalance}`);
}
if (answer.OtherOptions === "Exit") {
    console.log(chalk.yellow("Thank You!"));
    process.exit();
}
