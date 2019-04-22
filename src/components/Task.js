import React from 'react';
import _ from 'lodash';
import completedIcon from "../assets/Completed.svg";
import incompleteIcon from "../assets/Incomplete.svg";
import lockedIcon from "../assets/Locked.svg";

function Task({task, toggleTask, tasks, completedTasks, groupTitle}) {
  const isLocked = _.some(task.dependencyIds, (id) => !completedTasks[id]);
  const isCompleted = task.completedAt;
  const title = task.task;
  let icon = null;

  if (isLocked) {
    icon = 
      <img 
        src={ lockedIcon }
        alt="Locked"
      />;
  } else {
    icon = 
      <img 
        onClick={() => toggleTask(groupTitle, task.id)}
        className="cursor"
        src={ isCompleted ? completedIcon : incompleteIcon }
        alt={ isCompleted ? "Completed" : "Incomplete" }
      />;
  }

  return task ? (
    <div className="col-12 row task font-weight-bold py-4 px-0">
      <div className="col-1 px-0 text-center">{icon}</div>
      { isCompleted ? 
        <strike className="col-9">{ title }</strike> :
        <div className="col-9">{ title }</div>
      }
    </div>
  ): 
  <div>Loading ...</div>
}

export default Task;