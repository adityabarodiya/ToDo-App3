import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import the cors package


const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors()); // Use the cors middleware


mongoose.connect('mongodb+srv://adityabarodiya:xJgDIkvrklyd04Mt@cluster0.m6xjsds.mongodb.net/todoApp3', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);


const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/api/todos', async (req: Request, res: Response) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/api/todos', async (req: Request, res: Response) => {
  const { text } = req.body;
  const todo = new Todo({
    text,
    completed: false,
  });
  await todo.save();
  res.status(201).json(todo);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
