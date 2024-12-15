import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null); // Change to null for clarity

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo=todos.find((i)=>i.id === editId);
      const updateTodos=todos.map((t)=>t.id === editTodo.id?(
        t={id:t.id,todo}):{id:t.id, todo:t.todo}
    );
    setTodos(updateTodos);
    setEditId(0)
    setTodo("")
    return;
  }

    if (todo !== '') {
      if (editId) {
        // Update existing todo
        setTodos(todos.map(t => t.id === editId ? { ...t, todo } : t));
        setEditId(null); // Reset editId after editing
      } else {
        // Add new todo
        setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      }
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos(delTodo);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
      <TodoForm handleSubmit={handleSubmit} todo={todo} editId={editId} setTodo={setTodo} />

        <TodoList todos={todos} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
