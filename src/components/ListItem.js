import { useState } from "react";
import "./ListItem.css";

function ListItem(props) {
  const { title, completed, onDelete } = props;
  const [checked, setChecked] = useState(completed);

  return (
    <li className="ListItem">
      <input
        type="checkbox"
        defaultChecked={checked}
        onChange={() => setChecked(!checked)}
      ></input>
      <span className={checked ? "Completed" : ""}>{title}</span>
      <button onClick={() => onDelete(title)}>Delete</button>
    </li>
  );
}

export default ListItem;
