import React from 'react';
import Task from './Task.js';
import { Link } from 'react-router-dom';

function GroupDetail({match, groupsByName, toggleTask, completedTasks}) {
  const group = groupsByName[match.params.title];

  return group ? (
    <div className="wrapper container">
      <div className="row justify-content-md-center">
        <div className="groupDetail--header header row col-10 border-bottom py-4 px-0">
          <div className="col-10">{ group.title }</div>
          <Link 
            to={{ pathname: `/`}} 
            className="col-2 text-right"
          >
            Back
          </Link>
        </div>
        {group.tasks.map((task) =>
          <div className="groups row col-10 border-bottom">
            <Task
              key={ task.id }
              task={ task }
              tasks={ group.tasks }
              toggleTask= { toggleTask }
              groupTitle= { group.title }
              completedTasks={ completedTasks }
            />
          </div>
        )}
      </div>
    </div>
  ) : (<div>Loading ...</div>)
}

export default GroupDetail;