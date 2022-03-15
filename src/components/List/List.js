import './List.scss';
import cn from 'classnames';
import Badge from '../Badge/Badge';

import removeSvg from '../../assets/img/icons/remove.svg';

const List = ({ items, isRemovable, onClick, onRemove }) => {
  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить список ?')) {
      onRemove(item);
    }
  };
  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={cn(item.className, 'list-item', { active: item.active })}
        >
          <i className="icon">{item.icon ? item.icon : <Badge color={item.color} />}</i>
          <span>{item.name}</span>
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
