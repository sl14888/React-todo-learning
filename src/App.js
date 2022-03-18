import React, { useState, useEffect } from 'react';
import './App.scss';
import './var.scss';
import axios from 'axios';

import { List, AddList, Tasks } from './components';

import { ReactComponent as ListSvg } from './assets/img/icons/list.svg';

function App() {
  const [lists, setLists] = useState(
    DB.lists.map((item) => {
      item.color = DB.colors.filter((color) => color.id === item.colorId)[0].name;
      return item;
    })
  );

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expend-color').then(({ data }) => {
      console.log(data);
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
        <List
          items={lists}
          onRemove={(list) => {
            console.log(list);
          }}
          isRemovable
        />
        <AddList onAdd={onAddList} colors={DB.colors} />
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
