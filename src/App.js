import React, { useState, useEffect } from 'react';
import './App.scss';
import './var.scss';
import axios from 'axios';

import { List, AddList, Tasks } from './components';

import { ReactComponent as ListSvg } from './assets/img/icons/list.svg';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setcolors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

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

  return (
    <section className="todo">
      <aside className="todo__sidebar">
        <List
          items={[
            {
              icon: <ListSvg />,
              name: 'Все задачи',
            },
          ]}
        />
        {lists ? (
          <List
            onClickItem={(item) => {
              setActiveItem(item);
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
      </aside>
      <div className="todo__tasks">
        {lists && activeItem && (
          <Tasks onAddTask={onAddTask} list={activeItem} onEditTitle={onEditTitle} />
        )}
      </div>
    </section>
  );
}

export default App;
