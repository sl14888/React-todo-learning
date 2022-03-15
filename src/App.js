import React, { useState } from 'react';
import './App.scss';
import './var.scss';
import List from './components/List/List';
import AddList from './components/AddList/AddList';
import Tasks from './components/Tasks/Tasks';

import { ReactComponent as ListSvg } from './assets/img/icons/list.svg';
import DB from './assets/db.json';
function App() {
  const [lists, setLists] = useState(
    DB.lists.map((item) => {
      item.color = DB.colors.filter((color) => color.id === item.colorId)[0].name;
      return item;
    })
  );
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
