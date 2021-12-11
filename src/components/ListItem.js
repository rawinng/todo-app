import { useState } from "react";
import "./ListItem.css";

function ListItem(props) {
  const { id, title, completed, onDelete, onChange: changeOnTitle } = props;
  const [checked, setChecked] = useState(completed);

  return (
    <li className="ListItem" key={id}>
      <input
        type="checkbox"
        defaultChecked={checked}
        onChange={() => {
          setChecked(!checked);
          changeOnTitle(id, !checked);
        }}
      ></input>
      <span className={checked ? "Completed" : ""}>{title}</span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
}

export default ListItem;
