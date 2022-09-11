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
                active: true,
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
                  key={list.id}
                  onAddTask={onAddTask}
                  list={list}
                  onEditTitle={onEditTitle}
                  onRemoveTask={onRemoveTask}
                  withoutEmpty
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
                  onAddTask={onAddTask}
                  list={activeItem}
                  onEditTitle={onEditTitle}
                  onRemoveTask={onRemoveTask}
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
