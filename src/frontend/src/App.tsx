import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get<Todo[]>('http://localhost:5000/api/todos')
      .then((res) => {
        console.log('Todos fetched:', res.data);
        setTodos(res.data);
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
        // Handle the error, e.g., show a message to the user
      });
  }, []);

  const addTodo = async () => {
    await axios.post('http://localhost:5000/api/todos', { text });
    setText('');
    try {
      const res = await axios.get<Todo[]>('http://localhost:5000/api/todos');
      setTodos(res.data);
    } catch (error) {
      console.error('Error fetching todos after adding new todo:', error);
      
    }
  };

  return (
    <div className="App">
    <h1>Todo App</h1>
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="todo-input"
    />
    <button onClick={addTodo} className="add-todo-button">
      Add Todo
    </button>
    <ul>
      {Array.isArray(todos) &&
        todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              className="todo-checkbox"
            />
            <span
              className={`todo-text ${todo.completed ? 'completed' : ''}`}
            >
              {todo.text}
            </span>
          </li>
        ))}
    </ul>
  </div>
  );
};

export default App;
