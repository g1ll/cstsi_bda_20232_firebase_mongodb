import { Button, FormControl, Input, InputLabel } from '@mui/material'
import { useEffect, useState } from 'react';
import { TodoList } from './TodoList.jsx';
import '../assets/styles/App.css'
import { 
  createTodo, 
  readTodos, 
  updateTodo,
  deleteTodo } from '../firebase/TodoModel.js';

function App() {
  console.log("Render!!")
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  const [editMode, setEditMode] = useState(false)
  const [todo, setTodo] = useState({})

  const [isLoaded, setLoaded] = useState(false)

  useEffect(() =>listTodo(), []);

  const listTodo = ()=>{
    readTodos()
      .then(todosPending=>{
        Promise.all(todosPending)
          .then(todos=>{
            setTodos(todos)
            setLoaded(true)
        })
      })
      .catch(e=>console.error(`Erro ao carregar todos! ${e.message}`))
  }

  const addTodo = async e => {
    e.preventDefault()
    await createTodo({ text: text })
    listTodo()
    setText('')
  }

  const delTodo = async todoId => {
    await deleteTodo(todoId);
    listTodo()
  }

  const updTodo = async e => {
    e.preventDefault()
    let id = todo.id
    await updateTodo({id,text})

    setTodo({})
    setText('')
    setEditMode(false)
    listTodo()
  }

  const editTodo = (todoId) => {
    const todo = todos.find(todo => todo.id === todoId);
    setText(todo.text)
    setTodo(todo)
    setEditMode(true)
  }

  return (
    <div className="App">
      <form>
        <FormControl>
          <InputLabel>Write a TODO</InputLabel>
          <Input value={text} onChange={e =>
            setText(e.target.value)} />
        </FormControl>
        <Button
          type="submit" onClick={!editMode ? addTodo : updTodo}
          variant="contained"
          color={editMode ? "primary" : "success"}
          disabled={!text}>
          {!editMode ? "Add" : "Edit"}
          &nbsp;Todo
        </Button>
      </form>
      {isLoaded ?
        <TodoList todos={todos} editTodo={editTodo} delTodo={delTodo} />
        : <p>Loading from Firestore...</p>
      }
    </div>
  )
}

export default App
