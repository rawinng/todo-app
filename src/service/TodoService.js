function TodoService() {
  const url = "http://localhost:8080";
  const manageResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  };
  return {
    getTodo: async () => {
      return fetch(`${url}/todo`).then(manageResponse);
    },
    addTodo: async (todo) => {
      return fetch(`${url}/todo`, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      }).then(manageResponse);
    },
    deleteTodo: async (id) => {
      return fetch(`${url}/todo/${id}`, {
        method: "DELETE",
        cache: "no-cache",
      });
    },
    updateTodo: async (id, todo) => {
      return fetch(`${url}/todo/${id}`, {
        method: "PUT",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
    },
  };
}

export default TodoService;
