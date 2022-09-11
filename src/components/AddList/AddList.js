import { React, useState, useEffect } from 'react';
import List from '../List/List';
import './AddList.scss';

import Badge from '../Badge/Badge';
import closeSvg from '../../assets/img/icons/close.svg';
import { ReactComponent as AddSvg } from '../../assets/img/icons/add.svg';

import axios from 'axios';

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    setSelectedColor(colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }
    setIsLoading(true);
    axios
      .post('http://localhost:3001/lists', {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0];
        const listObj = { ...data, color: { name: color.name, hex: color.hex } };
        onAdd(listObj);
        onClose();
      })
      .catch(() => {
        alert('Ошибка при добовлении задачи');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(!visiblePopup)}
        items={[
          {
            className: 'list__add-button',
            icon: <AddSvg />,
            name: 'Добавить папку',
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            className="add-list__popup-close-btn"
            src={closeSvg}
            alt="close button"
          />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Введите папку..."
          />
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => setSelectedColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && 'active'}
              />
            ))}
          </div>
          <button onClick={addList} className="btn btn-rest">
            {isLoading ? 'добовление...' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
