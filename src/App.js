import React, { useState, useEffect } from 'react';
import './App.scss';
import './var.scss';
import axios from 'axios';

import { List, AddList, Tasks } from './components';

import { ReactComponent as ListSvg } from './assets/img/icons/list.svg';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setcolors] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expend-color').then(({ data }) => {
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
        <div className="tasks__items-row">
          <Tasks />
        </div>
      </div>
    </section>
  );
}

export default App;
