import React from 'react';
import axios from 'axios';

import './Tasks.scss';
import EditSvg from '../../assets/img/icons/pen.svg';

import AddTaskForm from './AddTaskForm';
import Task from './Task';

const Tasks = ({ list, onEditTitle, onAddTask, onRemoveTask, withoutEmpty }) => {
  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch('http://localhost:3001/lists/' + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert('Не удалось обнавить название списка');
        });
    }
  };

  return (
    <div className="tasks">
      <h2 style={{ color: list.color.hex }} className="tasks__title">
        {list.name}
        <img onClick={editTitle} src={EditSvg} alt="Edit icon" />
      </h2>
      <div className="tasks__items">
        {!withoutEmpty && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks.map((task) => (
          <Task key={task.id} list={list} onRemove={onRemoveTask} {...task} />
        ))}
        <AddTaskForm list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
