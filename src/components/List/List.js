import './List.scss';
import cn from 'classnames';
import Badge from '../Badge/Badge';

import removeSvg from '../../assets/img/icons/remove.svg';

import axios from 'axios';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {
  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить список ?')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };
  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          onClick={onClickItem ? () => onClickItem(item) : null}
          key={index}
          className={cn(item.className, 'list-item', {
            active: activeItem && activeItem.id === item.id,
          })}
        >
          <i className="icon">
            {item.icon ? item.icon : <Badge color={item.color.name} />}
          </i>
          <span>
            {item.name}
            {item.tasks && ` (${item.tasks.length})`}
          </span>
          {isRemovable && (
            <img
              className="list__remove-icon"
              src={removeSvg}
              alt="remove icon"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
