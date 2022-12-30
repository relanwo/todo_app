/* eslint-disable react/sort-comp */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';

import './app.css';

import { isThursday } from 'date-fns';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
// import { TimerContextProvider } from '../timer-context/timer-context';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoData: [
        this.createTodoItem('sample task 1', '1669190980663', '20', '00'),
        this.createTodoItem('sample task 2', '1669190480369', '10', '00'),
        this.createTodoItem('sample task 3', '1669190450769', '00', '30'),
      ],
      filter: 'all',
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.created === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text, min, sec) => {
    // generate id
    const newItem = this.createTodoItem(text, Date.now().toString(), min, sec);

    // add item
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];

      return {
        todoData: newArray,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'completed'),
    }));
  };

  onToggleEdit = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'editing'),
    }));
  };

  onSubmit = (id, text) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.map((item) => {
        const newItem = item;
        if (item.created === id) {
          newItem.text = text;
        }
        return newItem;
      });
      return {
        todoData: newArr,
      };
    });
  };

  onCompletedDeleted = () => {
    this.setState(({ todoData }) => {
      const completedArray = todoData.filter((item) => item.fieldClass === 'completed');

      completedArray.forEach((item) => this.deleteItem(item.created));
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => item.fieldClass === 'active');
      case 'completed':
        return items.filter((item) => item.fieldClass === 'completed');
      default:
        return items;
    }
  }
  // eslint-disable-next-line consistent-return
  // filter(items, filter) {
  //   switch (filter) {
  //     case 'all':
  //       return items;
  //     case 'active':
  //       items.filter((item) => {
  //         if (item.fieldClass !== 'active') {
  //           item.fieldClass += 'none';
  //         }
  //         return items;
  //       });
  //       break;
  //     case 'completed':
  //       return items.filter((item) => {
  //         if (item.fieldClass !== 'completed') {
  //           item.fieldClass += 'none';
  //         }
  //         return items;
  //       });
  //     default:
  //       return items;
  //   }
  // }

  // eslint-disable-next-line react/no-unused-class-component-methods
  toggleProperty(arr, id, propClass) {
    const idx = arr.findIndex((el) => el.created === id);

    // 1. update object
    const oldItem = arr[idx];
    const toggledClass = oldItem.fieldClass === 'active' ? propClass : 'active';
    const newItem = { ...oldItem, fieldClass: toggledClass };

    // 2. construct new array
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  createTodoItem(text, created, min, sec) {
    return {
      text,
      fieldClass: 'active',
      created,
      time: (min * 60 + sec) * 1000,
      pause: true,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ todoData }) => {
        const newArr = todoData.map((item) => {
          if (!item.pause) {
            item.time -= 1000;
            if (item.time === 0) {
              this.stopTimer(item.created);
              item.fieldClass = 'completed';
            }
          }
          return item;
        });
        return {
          todoData: newArr,
        };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startTimer = (id) => {
    console.log('start');
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.created === id);
      const newObj = [{ ...todoData[idx], pause: false }];
      const newData = [...todoData.slice(0, idx), ...newObj, ...todoData.slice(idx + 1)];
      return {
        todoData: newData,
      };
    });
  };

  stopTimer = (id) => {
    console.log('stop');
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.created === id);
      const newObj = [{ ...todoData[idx], pause: true }];
      const newData = [...todoData.slice(0, idx), ...newObj, ...todoData.slice(idx + 1)];
      return {
        todoData: newData,
      };
    });
  };

  render() {
    const { todoData, filter, timerArr } = this.state;

    const visibleItems = this.filter(todoData, filter);
    const todoCount = todoData.filter((el) => el.fieldClass !== 'completed').length;

    return (
      <div className="todoapp">
        <h1>todos</h1>
        <main className="main">
          <NewTaskForm onItemAdded={this.addItem} />
          {/* <TimerContextProvider value={timerArr}> */}
          <TaskList
            todos={visibleItems}
            filter={filter}
            onDeleted={this.deleteItem}
            onToggleEdit={this.onToggleEdit}
            onToggleDone={this.onToggleDone}
            onSubmit={this.onSubmit}
            timerArr={timerArr}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
          />
          {/* </TimerContextProvider> */}
          <Footer
            toDo={todoCount}
            onCompletedDeleted={this.onCompletedDeleted}
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </main>
      </div>
    );
  }
}
