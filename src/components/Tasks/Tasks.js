import React from 'react';
import axios from 'axios';

import './Tasks.scss';
import EditSvg from '../../assets/img/icons/pen.svg';

import AddTaskForm from './AddTaskForm';
import Task from './Task';
import swal from 'sweetalert';

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  onEditTask,
  onRemoveTask,
  withoutEmpty,
}) => {
  const editTitle = () => {
    swal('Изменить название списка: ' + list.name, {
      className: 'remove-task',
      content: {
        element: 'input',
        attributes: {
          value: list.name,
        },
      },
    }).then((value) => {
      // swal(`Вы ввели: ${value}`);
      const newTitle = value;

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
    });
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
          <Task
            key={task.id}
            list={list}
            onEdit={onEditTask}
            onRemove={onRemoveTask}
            {...task}
          />
        ))}
        <AddTaskForm list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
