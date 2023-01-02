/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';

import './app.css';

import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

function App() {
  function createTodoItem(text, created, min, sec) {
    return {
      text,
      fieldClass: 'active',
      created,
      time: (min * 60 + sec) * 1000,
      pause: true,
    };
  }

  const [todoData, setTodoData] = useState([
    createTodoItem('sample task 1', '1669190980663', '20', '00'),
    createTodoItem('sample task 2', '1669190480369', '10', '00'),
    createTodoItem('sample task 3', '1669190450769', '00', '30'),
  ]);
  const [filter, setFilter] = useState('all');

  const deleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.created === id);
    const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    setTodoData(newArray);
  };

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, Date.now().toString(), min, sec);
    const newArray = [...todoData, newItem];
    setTodoData(newArray);
  };

  function toggleProperty(arr, id, propClass) {
    const idx = arr.findIndex((el) => el.created === id);

    const oldItem = arr[idx];
    const toggledClass = oldItem.fieldClass === 'active' ? propClass : 'active';
    const newItem = { ...oldItem, fieldClass: toggledClass };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  const onToggleDone = (id) => {
    setTodoData(toggleProperty(todoData, id, 'completed'));
  };

  const onToggleEdit = (id) => {
    setTodoData(toggleProperty(todoData, id, 'editing'));
  };

  const onSubmit = (id, text) => {
    const newArr = todoData.map((item) => {
      const newItem = item;
      if (item.created === id) {
        newItem.text = text;
      }
      return newItem;
    });
    setTodoData(newArr);
  };

  const onCompletedDeleted = () => {
    const uncompletedArray = todoData.filter((item) => item.fieldClass !== 'completed');
    uncompletedArray.forEach((item) => deleteItem(item.created));
    setTodoData(uncompletedArray);
  };

  const onFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  function filterFunc(items, chosenFilter) {
    switch (chosenFilter) {
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

  const startTimer = (id) => {
    const idx = todoData.findIndex((el) => el.created === id);
    const newObj = [{ ...todoData[idx], pause: false }];
    const newData = [...todoData.slice(0, idx), ...newObj, ...todoData.slice(idx + 1)];
    setTodoData(newData);
  };

  const stopTimer = (id) => {
    const idx = todoData.findIndex((el) => el.created === id);
    const newObj = [{ ...todoData[idx], pause: true }];
    const newData = [...todoData.slice(0, idx), ...newObj, ...todoData.slice(idx + 1)];
    setTodoData(newData);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newArr = todoData.map((item) => {
        if (!item.pause) {
          item.time -= 1000;
          if (item.time === 0) {
            stopTimer(item.created);
            item.fieldClass = 'completed';
          }
        }
        return item;
      });
      setTodoData(newArr);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [todoData]);

  const visibleItems = filterFunc(todoData, filter);
  const todoCount = todoData.filter((el) => el.fieldClass !== 'completed').length;

  return (
    <div className="todoapp">
      <h1>todos</h1>
      <main className="main">
        <NewTaskForm onItemAdded={addItem} />
        {/* <TimerContextProvider value={timerArr}> */}
        <TaskList
          todos={visibleItems}
          filter={filter}
          onDeleted={deleteItem}
          onToggleEdit={onToggleEdit}
          onToggleDone={onToggleDone}
          onSubmit={onSubmit}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
        {/* </TimerContextProvider> */}
        <Footer
          toDo={todoCount}
          onCompletedDeleted={onCompletedDeleted}
          filter={filter}
          onFilterChange={onFilterChange}
        />
      </main>
    </div>
  );
  // }
}

export default App;
