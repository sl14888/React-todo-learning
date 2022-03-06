import './List.scss';
import cn from 'classnames';

const List = ({ items, isRemovable, onClick }) => {
  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={cn(item.className, 'list-item', { active: item.active })}
        >
          <i className="icon icon-listsvg">
            {item.icon ? item.icon : <i className={`badge badge--${item.color}`}></i>}
          </i>
          <span>{item.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default List;
