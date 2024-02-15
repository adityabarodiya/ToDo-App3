import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}



const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get<Todo[]>('/api/todos')
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
      // Handle the error, e.g., show a message to the user
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
