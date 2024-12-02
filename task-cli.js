#!/usr/bin/env node

const { Command } = require('commander');
const { v4: uuidv4 } = require('uuid'); 
const fs = require('fs');
const path = require('path');

const program = new Command();
const databaseFilePath = path.join(__dirname, 'database.json');

function readDatabase() {
  if (!fs.existsSync(databaseFilePath)) {
      fs.writeFileSync(databaseFilePath, JSON.stringify({}), 'utf8');
  }
  const data = fs.readFileSync(databaseFilePath, 'utf8');
  return JSON.parse(data);
}

function writeDatabase(data) {
  fs.writeFileSync(databaseFilePath, JSON.stringify(data, null, 2), 'utf8');
}

const validStatuses = ["todo", "in-progress", "done"]

program
  .name('task-cli')
  .description('CLI to track your tasks and manage your to-do list. ')
  .version('0.0.1');

program
  .command('add')
  .description('Add a single task')
  .argument('<description>', 'Description of the task')
  .action((desc) => {
    const currentDatetime = new Date().toLocaleString();
    const id = uuidv4();
    const database = readDatabase();

    const task = {
      description: desc,
      status: "todo",
      createdAt: currentDatetime,
      updatedAt: currentDatetime
    }

    database[id] = task;
    writeDatabase(database);
    console.log(database);
    console.log(`Task added successfully (ID: ${id})`);
  });

program
  .command('update')
  .description('Update a task based on id')
  .argument('<id>', 'ID of the task to update')
  .argument('<description>', 'New description of the task')
  .action((id, description) => {
    const currentDatetime = new Date().toLocaleString();
    const database = readDatabase();

    const prevTask = database[id];
    if (!prevTask) {
      console.log(`Task with ID ${id} not found.`);
      return;
    }

    // Change description property of database to second argument
    const task = {
      description: description,
      status: prevTask.status,
      createdAt: prevTask.createdAt,
      updatedAt: currentDatetime
    }

    database[id] = task;
    writeDatabase(database);
    console.log(database);
    console.log(`Task updated successfully (ID: ${id})`);
  });

program
  .command('delete')
  .description('Delete a task based on id')
  .argument('<id>', 'ID of the task to delete')
  .action((id) => {
    const database = readDatabase();

    const prevTask = database[id];
    if (!prevTask) {
      console.log(`Task with ID ${id} not found.`);
      return;
    }

    delete database[id];

    writeDatabase(database);
    console.log(database);
    console.log(`Task deleted successfully (ID: ${id})`);
  });

program
  .command('mark-in-progress')
  .description('Set the status of a task to \'in-progress\'')
  .argument('<id>', 'ID of the task')
  .action((id) => {
    const currentDatetime = new Date().toLocaleString();
    const database = readDatabase();

    const prevTask = database[id];
    if (!prevTask) {
      console.log(`Task with ID ${id} not found.`);
      return;
    }

    const task = {
      description: prevTask.description,
      status: 'in-progress',
      createdAt: prevTask.createdAt,
      updatedAt: currentDatetime
    }

    database[id] = task;
    writeDatabase(database);
    console.log(database);
    console.log(`Status of task with ID ${id} has been updated to "in-progress".`);
  });

program
  .command('mark-done')
  .description('Set the status of a task to \'done\'')
  .argument('<id>', 'ID of the task')
  .action((id) => {
    const currentDatetime = new Date().toLocaleString();
    const database = readDatabase();

    const prevTask = database[id];
    if (!prevTask) {
      console.log(`Task with ID ${id} not found.`);
      return;
    }

    const task = {
      description: prevTask.description,
      status: 'done',
      createdAt: prevTask.createdAt,
      updatedAt: currentDatetime
    }

    database[id] = task;
    writeDatabase(database);
    console.log(database);
    console.log(`Status of task with ID ${id} has been updated to "in-progress".`);
  });

program
  .command('list')
  .description('View all tasks')
  .argument('[status]', 'todo | in-progress | done') // Optiona argument
  .action((status) => {
    if (status && !validStatuses.includes(status)) {
      console.log(`Invalid status, please key in one of the following: todo | in-progress | done`);
      return;
    }

    const database = readDatabase();
    let tasks;

    if (status) {
      tasks = Object.values(database)
                    .filter((task) => task.status == status)
                    .map((task) => ({
                      "Description": task.description,
                      "Status": task.status,
                      "Created At": task.createdAt.split(",")[0], // Extract only the date part
                    }));
    } else {
      tasks = Object.values(database)
                    .map((task) => ({
                      "Description": task.description,
                      "Status": task.status,
                      "Created At": task.createdAt.split(",")[0], // Extract only the date part
                    }));
    }
    console.table(tasks);

  });

program.parse();

/*
# Adding a new task
node task-cli add "Buy groceries"
# Output: Task added successfully (ID: ...)

# Updating and deleting tasks
node task-cli update <ID> "Buy groceries and cook dinner"
node task-cli delete <ID>

# Marking a task as in progress or done
node task-cli mark-in-progress <ID>
node task-cli mark-done <ID>

# Listing all tasks
node task-cli list

# Listing tasks by status
node task-cli list done
node task-cli list todo
node task-cli list in-progress
*/