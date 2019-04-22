import React from 'react';
import { Link } from 'react-router-dom';
import groupIcon from "../assets/Group.svg";

function Group({group}) {
  const numCompleted = group.tasks.reduce((numCompleted, task) => {
    if (task.completedAt) {
      numCompleted++;
    }
    return numCompleted;
  }, 0);

  return (
    <Link to={{
      pathname: `/group/${group.title}`,
      state: { 
        group, 
        tasks: group.tasks
      }
    }}>
      <div className="row border-bottom py-4 px-0">
        <div className="col-1 text-left">
          <img src={ groupIcon } alt="Group"/>
        </div>
        <div className="col">
          <div className="font-weight-bold">{group.title}</div>
          <div className="text-secondary">{numCompleted} OF {group.taskTotal} TASKS COMPLETE</div>
        </div>
      </div>  
    </Link>
  )
}

export default Group;