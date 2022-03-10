import './List.scss';
import cn from 'classnames';
import Badge from '../Badge/Badge';

const List = ({ items, isRemovable, onClick }) => {
  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={cn(item.className, 'list-item', { active: item.active })}
        >
          <i className="icon">{item.icon ? item.icon : <Badge color={item.color} />}</i>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default List;
