import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import './App.css';
import Group from './components/Group.js';
import GroupDetail from './components/GroupDetail.js';
import taskQuery from './queries/taskQuery.js';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupsByName: []
    }
  }

  sortGroupsByName() {
    const tasks = taskQuery();
    
    const groupsByName = tasks.reduce((groups, task) => {
      let taskGroupName = task.group;

      if (!groups.hasOwnProperty(taskGroupName)) {
        groups[taskGroupName] = {
          title: taskGroupName,
          taskTotal: 0,
          tasks: []
        };
      }

      groups[taskGroupName].taskTotal++;
      groups[taskGroupName].tasks.push(task);

      return groups;
    }, {});

    const completedTasks = tasks.reduce((completedTasks, task) => {
      completedTasks[task.id] = task.completedAt ? true : false;

      return completedTasks;
    }, {});

    return {
      groupsByName,
      completedTasks
    };
  }

  componentDidMount() {
    const { groupsByName, completedTasks } = this.sortGroupsByName();

    this.setState({ groupsByName, completedTasks });
  }

  toggleTask(groupTitle, taskId) {
    const task = _.find(this.state.groupsByName[groupTitle].tasks, { 'id': taskId });
    const completedTasks = this.state.completedTasks;
    const groupsByName = this.state.groupsByName;
    const momentDate = moment().format('YYYY-MM-DD HH:mm')

    completedTasks[taskId] = !completedTasks[taskId];

    if (task.completedAt) {
      task.completedAt = null;
    } else {
      task.completedAt = momentDate;
    }

    this.setState({ 
      groupsByName: groupsByName,
      completedTasks: completedTasks
    });
  }

  render() {
    const groupsList = _.toArray(this.state.groupsByName);
    const toggleTask = this.toggleTask.bind(this);

    return (
      <Router>
        <Route exact={true} path='/' render={() => (
          <div className="wrapper container groups">
            <div className="row justify-content-md-center">
              <div className="header col-10 py-4 border-bottom">Things To Do</div>
              <div className="main col-10">
                {groupsList.map((group, index) => 
                  <Group
                    key={ index }
                    group={ group }
                  />
                )}
              </div>
            </div>
          </div>  
        )}/>

        <Route path='/group/:title' render={props => (
          <GroupDetail
            {...props}
            groupsByName={ this.state.groupsByName }
            completedTasks={ this.state.completedTasks }
            toggleTask={ toggleTask  }
          />
        )}/>
      </Router>
    );
  }
}

export default App;
