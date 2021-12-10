import "./App.css";
import React, { useReducer, useState } from "react";
import ListItem from "./components/ListItem";

function App() {
  const [textInput, setTextInput] = useState("");
  const [state, dispatch] = useReducer(
    (state, payload) => {
      switch (payload.action) {
        case "ADD":
          return {
            todos: [...state.todos, payload.todo],
          };
        case "DELETE":
          return {
            todos: [
              ...state.todos.filter((todo) => todo.title !== payload.todoText),
            ],
          };
        default:
      }
    },
    {
      todos: [
        {
          completed: true,
          title: "Hello",
        },
        {
          completed: false,
          title: "World",
        },
      ],
    }
  );
  const addToTodoList = () => {
    dispatch({
      action: "ADD",
      todo: {
        completed: false,
        title: textInput,
      },
    });
  };
  const deleteFromTodoList = (text) => {
    dispatch({
      action: "DELETE",
      todoText: text,
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <span>Todo List</span>
        <span className="Subtitle">
          This is the list of things you should focus
        </span>
      </header>
      <div className="App-body">
        <ul className="Todo-list">
          <li>
            <input
              type="text"
              value={textInput}
              onChange={(event) => setTextInput(event.target.value)}
            ></input>
            <button onClick={addToTodoList}>Add</button>
          </li>
          {state.todos.map((todo) => (
            <ListItem
              title={todo.title}
              completed={todo.completed}
              onDelete={deleteFromTodoList}
            ></ListItem>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
