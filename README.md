# Task Tracker CLI

[Project #1](https://roadmap.sh/projects/task-tracker) of a series of projects in roadmap.sh.

### How to use
Clone this repository.

To remove the need for the `node` prefix, run
```bash
npm link
```

Example commands that you can run
```bash
# Adding a new task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: ...)

# Updating and deleting tasks
task-cli update <ID> "Buy groceries and cook dinner"
task-cli delete <ID>

# Marking a task as in progress or done
task-cli mark-in-progress <ID>
task-cli mark-done <ID>

# Listing all tasks
node task-cli list

# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
```