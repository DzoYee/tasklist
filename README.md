## Table of Contents

  1. [Quick Start](#quick-start)
  1. [Database Design](#database-design)
  1. [API](#api)

## Quick Start

  1. Open new terminal window
  2. `$git clone https://github.com/DzoYee/tasklist.git`
  3. `$cd tasklist`
  4. `$npm install`
  5. `$npm run start`

## Database Design

``` SQL
CREATE TABLE taskGroup(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE task(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  completed_at VARCHAR(255),
  group_id INT NOT NULL,
  FOREIGN KEY (group_id)
  REFERENCES taskGroup (id)
  ON DELETE CASCADE
);

CREATE TABLE taskDependency(
  task_id INT NOT NULL,
  FOREIGN KEY (task)
  REFERENCES task (id)
  ON DELETE CASCADE,
  dependency_id INT NOT NULL,
  FOREIGN KEY (dependency_id)
  REFERENCES task (id)
  ON DELETE CASCADE
);
```

## API
### Patch /task/:id
```
Request Payload
{
  "completedAt": ""
}

Success

{
  "id": 6,
  "group": "Build Airplane",
  "task": "Hammer nails into wood",
  "dependencyIds": [2, 3, 4],
  "completedAt": null,
}

Error

{
  "errors": [
    {
      "status": "400",
      "title":  "Invalid Attribute",
      "description": "CompletedAt must be in X format or null."
      "source": "completedAt"
    },
    {
      "status: "404",
      "title": "Entity Not Found"
      "description": "Attempted to update a missing task"
    }
  ]
}

```