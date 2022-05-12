import React, { useState } from 'react';
import axios from 'axios';

import AddSvg from '../../assets/img/icons/add.svg';

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState();

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue('');
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post('http://localhost:3001/tasks/', obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleFormVisible();
      })
      .catch(() => {
        alert('Ошибка при добовлении задачи');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={AddSvg} alt="add icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            value={inputValue}
            className="field"
            type="text"
            placeholder="Введите задачу..."
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={addTask} className="btn btn-rest">
            {isLoading ? 'Добовление...' : 'Добавить задачу'}
          </button>
          <button onClick={toggleFormVisible} className="btn btn--grey btn-rest">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
