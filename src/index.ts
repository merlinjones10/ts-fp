import inquirer from 'inquirer';
console.log('Hello world');
import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let mobbers = [] as any;
rl.question('Whos mobbing ', answer => {
  // TODO: Log the answer in a database
  //   console.log(`Mobbers: ${answer}`);

  mobbers = answer.split(',').map(name => name.trim());
  rl.close();
});

console.log('Diego', mobbers);
// const fn = async () => {
//   const answers = await inquirer.prompt({
//     message: 'what is your name',
//     name: 'name',
//   });
//   console.log(answers);
// };

// fn();

// const { program } = require('commander');
// import { program } from 'commander';

// program.option('--first').option('-s, --separator <char>');

// program.parse();

// const options = program.opts();
// const limit = options.first ? 1 : undefined;
// console.log(program.args[0].split(options.separator, limit));

// step 1. get input to CLI
/* PLAN(ish)
Features
- Timer, when reaches 15? Auto rotates new roles…? Play a sound? 
- List rotation 
- List priority
- Stretch goals:
- - Git integration. 
- - 

Restrictions: 
Use effect library


Core logic
- We provide a list of names
- We assign the roles based on priority. E.g only 2 people?  Only have navigator & driver, 10 people?  More roles.
- LOOP START: 
- Start timer, 
- Mob code!
- When timer runs out, rotate roles -> 
- Repeat 
- LOOP END
*/
