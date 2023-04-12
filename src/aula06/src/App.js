import { Button, FormControl, Input, InputLabel, Icon } from '@mui/material'
import { useState } from 'react';

import './App.css';

function App() {

  const [todos, setTodos] = useState([
    'Understanding Firestore Database!',
    'Create the first app with collections and documents.'
  ])
  const [input, setInput] = useState('')

  const addTodo = e => {
    e.preventDefault()
    setTodos([...todos, input])
    setInput('')
  }

  const delTodo = itemIndex => {
    const filtered = todos.filter((v, index) => index !== itemIndex)
    setTodos(filtered)
  }

  return (
    <div className="App">
      <h1>TODO React Firebase</h1>
      <form>
        <FormControl>
          <InputLabel>Write a TODO</InputLabel>
          <Input value={input} onChange={e => 
            setInput(e.target.value)} />
        </FormControl>
        <Button
          type="submit" onClick={addTodo} variant="contained"
          color="primary" disabled={!input}>Add Todo
        </Button>
      </form>
      <ul style={{ listStyle: "none" }}>
        {todos.map((todo, index) =>{
            return (<li key={`todo_${index}`}>
                      {todo}
                      <Button onClick={e => delTodo(index)} color="error" >
                          <Icon>delete_forever</Icon>
                      </Button>
                  </li>
            )}
        )}
      </ul>
    </div>
  );
}
export default App;
