const { Command } = require('commander');
const { v4: uuidv4 } = require('uuid'); 
const fs = require('fs');
const path = require('path');

const program = new Command();
const databaseFilePath = path.join(__dirname, 'database.json');

// Function to read the JSON file
function readDatabase() {
  if (!fs.existsSync(databaseFilePath)) {
      // If the file doesn't exist, create an empty JSON object
      fs.writeFileSync(databaseFilePath, JSON.stringify({}), 'utf8');
  }
  const data = fs.readFileSync(databaseFilePath, 'utf8');
  return JSON.parse(data);
}

// Function to write to the JSON file
function writeDatabase(data) {
  fs.writeFileSync(databaseFilePath, JSON.stringify(data, null, 2), 'utf8'); // Pretty-print with 2 spaces
}

// const DUMMY_TASK = {
//   id: 1,
//   description: "Buy groceries",
//   status: "todo | in-progress | done",
//   createdAt: "12012012",
//   updatedAt: "12012012"
// }


program
  .name('task-cli')
  .description('CLI to track your tasks and manage your to-do list. ')
  .version('0.0.1');

program
  .command('add')
  .description('Add a single task')
  .argument('<description>', 'Description of the task')
  .action((description) => {
    const currentDatetime = new Date().toLocaleString();
    const id = uuidv4();

    const task = {
      id: id,
      description: str,
      status: "todo",
      createdAt: currentDatetime,
      updatedAt: currentDatetime
    }

    database = {...database, task};
    console.log(`Task added successfully (ID: ${id})`);
  });

program
  .command('update')
  .description('Add a single task')
  .argument('<id>', 'ID of the task to update')
  .argument('<description>', 'New description of the task')
  .action((id, description) => {
    const currentDatetime = new Date().toLocaleString();

    // Get first argument
    const prevTask = database[id];
    if (!prevTask) {
      console.log(`Task with ID ${id} not found.`);
      return;
    }

    // Change description property of database to second argument
    const task = {
      id: prevTask.id,
      description: description,
      status: prevTask.status,
      createdAt: prevTask.createdAt,
      updatedAt: currentDatetime
    }

    database = {...database, task};
    console.log(database);
    console.log(`Task added successfully (ID: ${id}`);
  });

program
  .command('join')
  .description('Join the command-arguments into a single string')
  .argument('<strings...>', 'one or more strings')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((strings, options) => {
    console.log(strings.join(options.separator));
  });

program.parse();

// Try the following:
//    node task-cli add "Buy groceries"
//    node task-cli update <ID> "Buy even more groceries"
//    node string-util split --separator=/ a/b/c
//    node string-util split --first a,b,c
//    node string-util join a b c d