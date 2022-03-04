import './List.scss';

const List = ({ items }) => {
  return (
    <ul className="list">
      {items.map((item) => (
        <li className={item.active ? 'list-item active' : 'list-item'}>
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
