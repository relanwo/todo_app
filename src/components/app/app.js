/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';

import './app.css';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoData: [
        this.createTodoItem('sample task 1', '1669190980663'),
        this.createTodoItem('sample task 2', '1669190480369'),
        this.createTodoItem('sample task 3', '1669190450769'),
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

  addItem = (text) => {
    // generate id
    const newItem = this.createTodoItem(text, Date.now().toString());

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

  createTodoItem(text, created) {
    return {
      text,
      fieldClass: 'active',
      created,
    };
  }

  render() {
    const { todoData, filter } = this.state;

    const visibleItems = this.filter(todoData, filter);

    const todoCount = todoData.filter((el) => el.fieldClass !== 'completed').length;

    return (
      <div className="todoapp">
        <h1>todos</h1>
        <main className="main">
          <NewTaskForm onItemAdded={this.addItem} />
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleEdit={this.onToggleEdit}
            onToggleDone={this.onToggleDone}
            onSubmit={this.onSubmit}
          />
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
