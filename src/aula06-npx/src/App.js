import { Button, FormControl, Input, InputLabel, Icon } from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
}
  from "firebase/firestore";
import { db } from './firebase.js';
import './App.css';

function App() {
  console.log("Render!!")
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  const [editMode, setEditMode] = useState(false)
  const [todo, setTodo] = useState({})

  const [isLoaded, setLoaded] = useState(false)
  const collectionRef = collection(db, "todos");

  useEffect(() => {
    listTodo()
  }, []);

  const listTodo = () => {
    getDocs(collectionRef)
      .then(querySnap => {
        //console.log(querySnap.docs.map(d=>d.data().todo))
        const docs = querySnap.docs
        if (!docs.length)
          throw Error("Empty data!")

        const todos = docs.map(
          doc => {
            const todo = ({
              id: doc.id,
              // text: doc.data().text
              ...doc.data()
            })

            todo.details && formatDetailsDate(todo.details)
            todo.collabs && getCollabsEmail(todo.collabs)

            return todo;
          })

        loadSteps(todos)
        loadOwners(todos)
        // loadCollabs(todos)
        setTodos(todos)
        setLoaded(true)
      }).catch(e =>
        console.error(e)
      );
  }

  const formatDetailsDate = (details) => {
    let date = details.deadline.toDate()
    let deadline = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    details.deadline = deadline;
  }

  const getCollabsEmail = (collabs) => {
    collabs.forEach((collab) => {
      if (collab.user)
        getDoc(collab.user)
          .then((snapUser) => {
            if (snapUser.exists()) {
              collabs = collabs.map(oldCollab => {
                if (oldCollab.user.path === collab.user.path)
                  oldCollab.email = snapUser.data().email
                return oldCollab
              })
            }
          })
          .catch((e) => console.error(e.message))
    })
  }

  const loadCollabs = (todos) => {
    todos.forEach(todo => {
      let consulta = query(
        collection(db, 'collabs'),
        where('todoid', '==', todo.id)
      )
      getDocs(consulta)
        .then(querySnap => {
          if (querySnap.empty)
            return;
          let collabs = querySnap.docs.map(collabsDoc => {
            return collabsDoc.data().collabid
          })
          console.log({ todo: todo.id, collabs: collabs })
          loadCollabsData(collabs, todo.id, todos)
        })
        .catch(e => console.error(e.message))
    })
  }

  const loadCollabsData = (collabs, todoId, todos) => {
    let collabCollection = collection(db, 'collabs');
    //where(campo,op,valor)
    let queryUser = query(
      collabCollection,
      where(documentId(), 'in', collabs)
    )
    getDocs(queryUser)
      .then(collabQuerySnap => {
        if (collabQuerySnap.empty)
          return;
        let collabsData = collabQuerySnap.docs.map(collabsDoc => {
          return ({ id: collabsDoc.id, ...collabsDoc.data() })
        })
        let newTodos = todos.map(ntodo => {
          if (ntodo.id === todoId)
            ntodo.collabs = collabsData
          return ntodo
        })
        setTodos(newTodos)
      })
      .catch(e => console.error(e.message))
  }

  const loadOwners = (todos) => {
    todos.forEach(todo => {
      if (todo.userid)
        getDoc(doc(db, 'users', todo.userid))
          .then(userSnap => {
            if (!userSnap.exists()) return;

            let newTodos = todos.map(ntodo => {
              if (ntodo.id === todo.id)
                ntodo.owner = userSnap.data().name;
              return ntodo
            })
            setTodos(newTodos)
          })
          .catch(e => console.error(e.message))
    })
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
    const docRef = await addDoc(collectionRef, { text: text })
    console.log(docRef.id)
    listTodo()
    setText('')
  }

  const delTodo = async todoId => {
    await deleteDoc(doc(db, 'todos', todoId));
    listTodo()
  }

  const updTodo = async e => {
    e.preventDefault()
    await updateDoc(doc(db, "todos", todo.id), { text: text })

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
      <h1>TODO React Firebase</h1>
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
  );
}


function TodoList({ todos, editTodo, delTodo }) {
  return (
    <ul style={{ listStyle: "none" }}>
      {todos.map((todo, index) =>
        <li key={index}>
          <Todo todo={todo} key={`todo_${index}`} />
          <Button key={`btn_${index}`}
            onClick={e => editTodo(todo.id)}
            color="primary" >
            <EditNoteIcon />
          </Button>
          <Button key={`btn_${index + 1}`}
            onClick={e => delTodo(todo.id)}
            color="error" >
            <Icon>delete_forever</Icon>
          </Button>
        </li>
      )}
    </ul>
  );
}

function Todo({ todo }) {
  return (<>
    {(todo.details || todo.steps || todo.collabs) ?
      <details style={{ display: 'inline' }}>
        <summary>{todo.text}
          &nbsp;|&nbsp;
          <span style={{ fontSize: '.7rem' }}>
            Autor: {todo.owner}
          </span>
        </summary>
        <ul style={{ listStyle: "none" }}>
          {todo.details && <li><TodoDetails details={todo.details} /></li>}
          {todo.steps && <li><TodoSteps steps={todo.steps} /></li>}
          {todo.collabs && <li><TodoCollabs collabs={todo.collabs} /></li>}
        </ul>
      </details>
      : <>{todo.text} &nbsp; | &nbsp;
        <span style={{ fontSize: '.7rem' }}>
          Autor: {todo.owner}
        </span>
      </>}
  </>);
}

function TodoDetails({ details }) {
  return (
    <details style={{ display: 'inline' }}>
      <summary>Detalhes</summary>
      <ul>
        <li>Prioridade: {details.priority > 0 ? 'Mínima' : 'Máxima'}</li>
        <li>Prazo: {details.deadline}</li>
      </ul>
    </details>
  )
}

function TodoSteps({ steps }) {
  return (
    <details style={{ display: 'inline' }}>
      <summary>Passos:</summary>
      <ol>
        {steps.map((step, index) =>
          <li key={`step_${index}`}>
            {step.description}
          </li>
        )}
      </ol>
    </details>
  )
}

function TodoCollabs({ collabs }) {
  return (
    <details style={{ display: 'inline' }}>
      <summary>Colaboradores:</summary>
      <ul>
        {collabs.map((collab, index) =>
          <li key={`collab_${index}`}>
            <a href={`mailto:${collab.email}`}>{collab.name}</a>
          </li>)}
      </ul>
    </details>
  );
}

export default App;