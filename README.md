# Task Tracker CLI

Project #1 from a series of projects in roadmap.sh

### How to use
```bash
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
```