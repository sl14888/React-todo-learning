import { React, useState } from 'react';
import List from '../List/List';
import './AddList.scss';

const AddButtonList = () => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(!visiblePopup)}
        items={[
          {
            className: 'list__add-button',
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 1V11"
                  stroke="#868686"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 6H11"
                  stroke="#868686"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: 'Добавить папку',
          },
        ]}
        isRemovable
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <input type="text" placeholder="Введите папку..." />
        </div>
      )}
    </div>
  );
};

export default AddButtonList;
