import "./App.css";
import React, { useEffect, useReducer, useState } from "react";
import ListItem from "./components/ListItem";
import TodoService from "./service/TodoService";

function App() {
  const [textInput, setTextInput] = useState("");
  const [state, dispatch] = useReducer(
    (state, payload) => {
      switch (payload.action) {
        case "LOADING":
          return {
            ...state,
            isLoading: true,
          };
        case "LOADED":
          return {
            ...state,
            isLoading: false,
            todos: payload.data,
          };
        default:
      }
    },
    {
      isLoading: false,
      todos: [],
    }
  );

  useEffect(() => {
    loadList();
  }, []);

  const loadList = () => {
    const service = TodoService();
    dispatch({ action: "LOADING" });
    service
      .getTodo()
      .then((data) => {
        dispatch({ action: "LOADED", data: data });
      })
      .catch((ex) => {
        alert("Load Error:" + ex);
      });
  };
  const addToTodoList = () => {
    const service = TodoService();
    service
      .addTodo({ title: textInput, completed: false })
      .then((data) => {
        loadList();
      })
      .catch((ex) => {
        alert("Add Error:" + ex);
      });
  };
  const deleteFromTodoList = (id) => {
    const service = TodoService();
    const todoFound = state.todos.find((todo) => todo.id === id);
    service
      .deleteTodo(todoFound.id)
      .then((data) => {
        loadList();
      })
      .catch((ex) => {
        alert("Delete Error:" + ex);
      });
  };
  const updateOnTodoList = (id, checked) => {
    const service = TodoService();
    const todoFound = state.todos.find((todo) => todo.id === id);
    service
      .updateTodo(todoFound.id, { ...todoFound, completed: checked })
      .then((data) => {
        loadList();
      })
      .catch((ex) => {
        alert("Update Error:" + ex);
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
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              onDelete={deleteFromTodoList}
              onChange={updateOnTodoList}
            ></ListItem>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
