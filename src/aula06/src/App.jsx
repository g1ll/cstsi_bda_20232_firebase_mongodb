import { Button, FormControl, Input, InputLabel, Icon } from '@mui/material'
import { useState } from 'react';
import {db} from "./firebase"

import './App.css';

function App() {

  const [todos, setTodos] = useState([
    'Understanding react app Todo with Arrays',
    'Understanding Firestore Database!',
    'Create the first app with collections and documents.'
  ])
  const [input, setInput] = useState('Digite...')

  const addTodo = e => {
    e.preventDefault()
    setTodos([...todos, input])
    setInput('')
  }

  const delTodo = itemIndex => {
    console.log("Deletar:"+itemIndex)
    const filtered = todos.filter(
      (v, index) => index !== itemIndex
    )
    setTodos(filtered)
  }

  return (

    <div className="App">
      <h1>TODO React Firebase</h1>
      <form>
        <FormControl>
          <InputLabel>Write a TODO</InputLabel>
          <Input
            value={input}
            onChange={e => 
              setInput(e.target.value)
            } />
        </FormControl>
        <Button
          type="submit" onClick={addTodo} variant="contained"
          color="primary" disabled={!input}>Add Todo
        </Button>
      </form>
      <ul style={{ listStyle: "none" }}>
        {
          todos.map((todo,index)=>(<>
            <li key={index}>{todo}</li>
            <Button key={'btn-'+index} onClick={()=> delTodo(index)} color="error" >
                <Icon>delete_forever</Icon>
            </Button>
          </>
        ))}
      </ul>
    </div>
  );
}
export default App;