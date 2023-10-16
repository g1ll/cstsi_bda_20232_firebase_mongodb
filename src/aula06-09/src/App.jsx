import { Button, FormControl, Input, InputLabel, Icon } from '@mui/material'
import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from "./firebase"
import './App.css';

function App() {

  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('Digite...')
  const [idToUpdated, setIdToUpdated] = useState()
  const [isLoaded, setLoaded] = useState(false)
  const [isEditMode,setIsEditMode] = useState(false)
  const collectionRef = collection(db, 'todos')

  useEffect(() => {
    getTodos()
  }, []);

  const getTodos = () => {
    getDocs(collectionRef)
      .then(querySnap => {
        const docs = querySnap.docs
        if (!docs.length)
          throw Error("Empty data!")

        const todos = docs.map(
          doc => ({
            id: doc.id,
            text: doc.data().text
          })
        )
        setTodos(todos)
        setLoaded(true)
      }).catch(e =>
        console.error(e)
      );
  }

  const addTodo = async e => {
    e.preventDefault()
    await addDoc(collectionRef, { text: input })
    setInput('')
    getTodos()
  }

  const delTodo = async todoId => {
    await deleteDoc(doc(db, 'todos', todoId))
    getTodos()
  }

  const editTodo = async todoId => {
    const todo = todos.find(todo => todo.id == todoId)
    setInput(todo.text)
    setIdToUpdated(todo.id)
    setIsEditMode(true)
  }

  const updateTodo = async e => {
    e.preventDefault()
    await updateDoc(
      doc(db, 'todos', idToUpdated),
      {text:input}
    )
    setInput('')
    setIsEditMode(false)
    getTodos()
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
          type="submit"
          onClick={isEditMode?updateTodo:addTodo}
          variant="contained"
          color="success" 
          disabled={!input}>
            {!isEditMode?"Add ":"Edit "}
            Todo
        </Button>
      </form>
      {!isLoaded
        ? (<p>
          Carregando os dados...
        </p>)
        : (
          <ul style={{ listStyle: "none" }}>
            {
              todos.map((todo, index) => (
                <li key={index}>{todo.text}
                  <Button
                    onClick={() => editTodo(todo.id)}
                    color="primary" >
                    <Icon>edit_note</Icon>
                  </Button>
                  <Button
                    onClick={() => delTodo(todo.id)}
                    color="error" >
                    <Icon>delete_forever</Icon>
                  </Button>
                </li>
              ))}
          </ul>
        )}
    </div>
  );
}
export default App;