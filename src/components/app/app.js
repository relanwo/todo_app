/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';

import { formatDistanceToNow } from 'date-fns';

import './app.css';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

export default class App extends Component {
  maxId = 100;

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

  changeDateDistance = () => {
    this.setState(() => {
      const { todoData } = this.state;
      const newArr = todoData.map((elem) => {
        const newElem = elem;
        const distance = formatDistanceToNow(new Date(+newElem.created), [
          { includeSeconds: true },
          { addSuffix: true },
        ]);

        newElem.timeGone = distance;
        return newElem;
      });
      return { todoData: newArr };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    // generate id
    const newItem = this.createTodoItem(text, Number(new Date()));

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
        if (item.id === id) {
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

      completedArray.forEach((item) => this.deleteItem(item.id));
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  toggleProperty(arr, id, propClass) {
    const idx = arr.findIndex((el) => el.id === id);

    // 1. update object
    const oldItem = arr[idx];
    const toggledClass = oldItem.fieldClass === 'active' ? propClass : 'active';
    const newItem = { ...oldItem, fieldClass: toggledClass };

    // 2. construct new array
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

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

  createTodoItem(text, created) {
    const timeGone = formatDistanceToNow(+created, [{ includeSeconds: true }, { addSuffix: true }]);

    return {
      text,
      fieldClass: 'active',
      created,
      timeGone,
      id: this.maxId++,
    };
  }

  render() {
    const { todoData, filter } = this.state;

    const visibleItems = this.filter(todoData, filter);

    const todoCount = todoData.filter((el) => el.fieldClass !== 'completed').length;

    setInterval(() => {
      this.changeDateDistance();
    }, 10000);

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
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
        </section>
      </section>
    );
  }
}
