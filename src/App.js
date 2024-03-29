import React, { useState, useEffect } from 'react';
import './App.scss';
import './var.scss';
import axios from 'axios';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import { List, AddList, Tasks } from './components';

import { ReactComponent as ListSvg } from './assets/img/icons/list.svg';
import swal from 'sweetalert';
import SettingsList from './components/SettingsList/SettingsList';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setcolors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  // console.log('activeItem', activeItem);
  // console.log('lists', lists);

  let history = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const listId = location.pathname.split('lists/')[1];

    if (lists) {
      const list = lists.find((list) => list.id === Number(listId));
      setActiveItem(list);
    }
  }, [location.pathname]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setLists(data);
      });

    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setcolors(data);
    });
  }, []);

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const onEditTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const onRemoveTask = (listId, taskId) => {
    swal({
      title: 'Вы действительно хотите удалить задачу?',
      icon: 'warning',
      buttons: ['Отмена', 'Да'],
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Ваша задача была удалена!', {
          icon: 'success',
        });
        const newList = lists.map((item) => {
          if (item.id === listId) {
            item.tasks = item.tasks.filter((task) => task.id !== taskId);
          }
          return item;
        });
        setLists(newList);
        axios.delete('http://localhost:3001/tasks/' + taskId).catch(() => {
          alert('Не удалось удалить задачу');
        });
      }
    });
  };

  const onEditTask = (listId, taskObj) => {
    swal('Изменить название задачи: ' + taskObj.text, {
      className: 'remove-task',
      content: {
        element: 'input',
        attributes: {
          value: taskObj.text,
        },
      },
    }).then((value) => {
      swal(`Вы ввели: ${value}`);
      swal('Ваша задача была изменена!', {
        icon: 'success',
      });
      const newTaskText = value;
      if (!newTaskText) {
        return;
      }
      const newList = lists.map((list) => {
        if (list.id === listId) {
          list.tasks = list.tasks.map((task) => {
            if (task.id === taskObj.id) {
              task.text = newTaskText;
            }
            return task;
          });
        }
        return list;
      });
      setLists(newList);
      axios
        .patch('http://localhost:3001/tasks/' + taskObj.id, { text: newTaskText })
        .catch(() => {
          alert('Не удалось изменить задачу');
        });
    });
  };

  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios.patch('http://localhost:3001/tasks/' + taskId, { completed }).catch(() => {
      alert('Не удалось обнавить задачу');
    });
  };

  return (
    <section className="todo">
      <aside className="todo__sidebar">
        <div className="todo__sidebar-wrapper">
          <List
            onClickItem={(list) => {
              history(`/`, { replace: true });
            }}
            items={[
              {
                active: !activeItem,
                icon: <ListSvg />,
                name: 'Все задачи',
              },
            ]}
          />
          {lists ? (
            <List
              onClickItem={(list) => {
                history(`/lists/${list.id}`, { replace: true });
              }}
              activeItem={activeItem}
              items={lists}
              onRemove={(id) => {
                const newList = lists.filter((item) => item.id !== id);
                setLists(newList);
              }}
              isRemovable
            />
          ) : (
            'Загрузка...'
          )}

          <AddList onAdd={onAddList} colors={colors} />
          <SettingsList />
        </div>
      </aside>
      <div className="todo__tasks">
        <Routes>
          <Route
            exact
            path="/"
            element={
              lists &&
              lists.map((list, index) => (
                <Tasks
                  list={list}
                  withoutEmpty
                  key={list.id}
                  onAddTask={onAddTask}
                  onEditTask={onEditTask}
                  onEditTitle={onEditTitle}
                  onRemoveTask={onRemoveTask}
                  onCompleteTask={onCompleteTask}
                />
              ))
            }
          />
          <Route
            path="lists/:id"
            element={
              lists &&
              activeItem && (
                <Tasks
                  list={activeItem}
                  onAddTask={onAddTask}
                  onEditTask={onEditTask}
                  onEditTitle={onEditTitle}
                  onRemoveTask={onRemoveTask}
                  onCompleteTask={onCompleteTask}
                />
              )
            }
          />
        </Routes>
      </div>
    </section>
  );
}

export default App;
