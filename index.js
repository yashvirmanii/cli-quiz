#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from 'chalk-animation';
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import { pastel } from "gradient-string";

let playerName;

const sleep = (ms = 2000) => new Promise((r)=> setTimeout(r,ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who wants to be a javascript millionaire? \n'
    )

    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')}
        I am a process on your computer.
        If you get any question wrong I will be ${chalk.bgRed('Killed')}
        So get all the questions right...
    `)
}

async function askName() {
    const answers = await inquirer.prompt({
        name:'player_name',
        type:'input',
        message:'What is you name?',
        default() {
            return 'Player';
        },
    })

    playerName = answers.player_name;
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if(isCorrect){
        spinner.success({text:'Nice work'})
    }else{
        spinner.error({text:`Game over, you lost ${playerName}`})
        process.exit(1);
    }
}

async function question1() {
    const answers = await inquirer.prompt({
        name:'question_1',
        type:'list',
        message:'Javascript was created in 10 days then released on\n',
        choices:[
            'May 23rd, 1995',
            'Nov 24rd, 1995',
            'Dec 4th, 1995',
            'Dec 17th, 1996',
        ]
    })
    return handleAnswer(answers.question_1 == 'Dec 4th, 1995')
}

function winner() {
    console.clear()
    const msg = ` Congrats, ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`;
    figlet(msg,(err,data)=>{
        console.log(pastel(data));
    })
}

await welcome();
await askName();
await question1()
winner()