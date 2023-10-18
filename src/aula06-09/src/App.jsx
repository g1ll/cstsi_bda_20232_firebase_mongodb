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
  const [isEditMode, setIsEditMode] = useState(false)
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
          doc => {
            let todo = {
              id: doc.id,
              ...doc.data()
            }
            if (todo.details) {
              let date = todo.details.deadline.toDate()
              console.log(date);
              let deadline = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
              todo.details.deadline = deadline;
            }
            return todo
          })
        loadSteps(todos)
        setTodos(todos)
        setLoaded(true)
      }).catch(e =>
        console.error(e)
      );
  }

  const loadSteps = (todos) => {
    todos.forEach(todo => {
      const stepRef = collection(db, `todos/${todo.id}/steps`)
      getDocs(stepRef)
        .then(snapSteps => {
          if (snapSteps.empty)
            return;
          let steps = snapSteps.docs.map(stepDoc => {
            return { id: stepDoc.id, ...stepDoc.data() }
          })
          let newTodos = todos.map(ntodo => {
            if (ntodo.id === todo.id)
              ntodo.steps = steps
            return ntodo
          })
          setTodos(newTodos)
        })
        .catch(e => console.error(e.message))
    })
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
      { text: input }
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
          onClick={isEditMode ? updateTodo : addTodo}
          variant="contained"
          color="success"
          disabled={!input}>
          {!isEditMode ? "Add " : "Edit "}
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
                <li key={index}>
                  {todo.details ?
                    <details style={{ display: 'inline' }}>
                      <summary>{todo.text}</summary>
                      <ul>
                        <li>Prioridade: {todo.details.priority > 0 ? 'Mínima' : 'Máxima'}</li>
                        <li>Prazo: {todo.details.deadline}</li>
                        {todo.steps ?
                          <li>Passos:
                            <ol>
                              {todo.steps.map((step, i) => <li key={`step_${index}-${i}`}>
                                {step.description}
                              </li>)}
                            </ol>
                          </li>
                          : ''}
                      </ul>
                    </details>
                    : (
                      todo.steps ?
                        <>
                          <details style={{ display: 'inline' }}>
                            <summary>{todo.text}</summary>
                            <ul><li>Passos:
                              <ol>
                                {todo.steps.map((step, i) => <li key={i}>
                                  {step.description}
                                </li>)}
                              </ol>
                            </li></ul>
                          </details></>
                        : todo.text
                    )}
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