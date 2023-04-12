import { Button, FormControl, Input, InputLabel, Icon } from '@mui/material'
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from './firebase.js';
import './App.css';

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const [isLoaded, setLoaded] = useState(false)
  const collectionRef = collection(db, "todos");

  useEffect(() => {
    getDocs(collectionRef)
      .then(querySnap => {
        //console.log(querySnap.docs.map(d=>d.data().todo))
        const docs = querySnap.docs
        if (!docs.length)
          throw Error("Empty data!")
        
        const todos = docs.map(
              doc => doc.data().todo
            )
        setTodos(todos)
        setLoaded(true)
      }).catch(e =>
        console.error(e.message)
      );
  }, [input])


  const addTodo = async e => {
    e.preventDefault()
    const docRef = await addDoc(collectionRef,{todo:input})
    console.log(docRef.id)
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
      {isLoaded ?
        <ul style={{ listStyle: "none" }}>
          {todos.map((todo, index) => {
            return (<li key={`todo_${index}`}>
              {todo}
              <Button onClick={e => delTodo(index)} color="error" >
                <Icon>delete_forever</Icon>
              </Button>
            </li>
            )
          }
          )}
        </ul>
        : <p>Loading from Firestore...</p>
      }
    </div>
  );
}
export default App;
