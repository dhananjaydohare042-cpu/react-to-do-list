
import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  const [inputText, setInputText] = useState("");
  
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [status, setStatus] = useState('all');

  // Save todos whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Filter todos based on status
  const filteredTodos = todos.filter(todo => {
    if (status === 'completed') {
      return todo.completed === true;
    }
    if (status === 'uncompleted') {
      return todo.completed === false;
    }
    return true;
  });

  return (
    <div className="App">
      <header>
        <h1>React Todo List App</h1>
      </header>

      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />

      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
}

export default App;
