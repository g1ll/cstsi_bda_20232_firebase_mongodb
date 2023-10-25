import { useEffect, useState } from 'react';
import '../assets/styles/App.css'
import {
  createTodo,
  readTodos,
  updateTodo,
  deleteTodo
} from '../firebase/TodoModel.js';

import TodoForm from './TodoForm.jsx';
import { TodoList } from './TodoList.jsx';

import { initializeApp } from 'firebase/app'

import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable
}
  from "firebase/storage";
import firebaseConfig from '../firebase/config'

const firebaseApp = initializeApp(firebaseConfig)
const storage = getStorage(firebaseApp);

function App() {
  console.log("Render!!")
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [fileName, setFileName] = useState('')

  const [editMode, setEditMode] = useState(false)
  const [todo, setTodo] = useState({})

  const [isLoaded, setLoaded] = useState(false)

  const [progresspercent, setProgresspercent] = useState(0);

  useEffect(() => listTodo(), []);

  const listTodo = () => {
    readTodos()
      .then(todosPending => {
        Promise.all(todosPending)
          .then(todos => {
            setTodos(todos)
            setLoaded(true)
          })
      })
      .catch(e => console.error(`Erro ao carregar todos! ${e.message}`))
  }

  const addTodo = async e => {
    e.preventDefault()
    if(!e.target[1]?.files){
      await createTodo({ text: text })
      listTodo()
      setText('')
      return;
    }
    console.log('file uploaded')
    submitImage(e.target[1]?.files[0])
    setFileName('')
    return;
  }

  const delTodo = async todoId => {
    await deleteTodo(todoId);
    listTodo()
  }

  const updTodo = async e => {
    e.preventDefault()
    let id = todo.id
    await updateTodo({ id, text })

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

  const submitImage = (file) => {
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {//PROGRESS
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress)
        console.log(progress,"% transferido")
      },//ERROR
      (error) => {
        alert(error);
      },//COMPLETE
      () => {
        console.log('Transferencia concluida!!!')
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            const todo = {
              image: downloadURL,
              image_path: uploadTask.snapshot.ref._location.path_,
              text: text
            }
            await createTodo(todo);
            listTodo()
            setText('')
          });
      }
    );
  }


  return (
    <div className="App">
      <TodoForm
        input={text}
        setInput={setText}
        setFileName={setFileName}
        fileName={fileName}
        editMode={editMode}
        addTodo={addTodo}
        updTodo={updTodo} />
      {isLoaded ?
        <TodoList todos={todos} editTodo={editTodo} delTodo={delTodo} />
        : <p>Loading from Firestore...</p>
      }
    </div>
  )
}

export default App
