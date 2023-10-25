import { initializeApp } from 'firebase/app'
import {
	getFirestore,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	orderBy
}
	from "firebase/firestore";
import firebaseConfig from "./config"
console.log(firebaseConfig)
const db = getFirestore(initializeApp(firebaseConfig));
const collectionName = 'todos'
const todosCollectionRef = collection(db, collectionName);

const createTodo = async ({ text, image, image_path}) => {
	let todo = {text:text}
	if(image)
		todo.image = image;
	if(image_path)
		todo.image_path = image_path;
	await addDoc(todosCollectionRef,todo)
}

const readTodos = async () => {
	const querySnap = await getDocs(todosCollectionRef)
	const docs = querySnap.docs
	if (!docs.length)
		throw Error("Empty data!")

	let todos = docs.map(async doc => {
		const todo = ({
			id: doc.id,
			...doc.data()
		})

		todo.details && formatDetailsDate(todo.details)
		return todo;
	})

	todos = await Promise.all(await loadSteps(todos))
	todos = await Promise.all(await loadOwners(todos))
	return todos;
}

const formatDetailsDate = (details) => {
	let date = details.deadline.toDate()
	let deadline = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
	details.deadline = deadline;
}

const getCollabsEmail = async (collabs) => {
	collabs.forEach(async collab => {
		if (collab.user) {
			const snapUser = await getDoc(collab.user)
			if (snapUser.exists()) {
				collabs = collabs.map(oldCollab => {
					if (oldCollab.user.path === collab.user.path)
						oldCollab.email = snapUser.data().email
					return oldCollab
				})
			}
		}
	})
}

const loadOwners = async (todos) => {
	return todos.map(async todo => {
		if (todo.userid) {
			const userSnap = await getDoc(doc(db, 'users', todo.userid))
			if (userSnap.exists())
				todo.owner = userSnap.data().name
		}
		return todo
	})
}

const loadSteps = async (todos) => {
	return todos.map(async todo => {
		const stepRef = collection(db, `${collectionName}/${todo.id}/steps`)
		const stepQuery = query(stepRef, orderBy('order', 'asc'))
		const snapSteps = await getDocs(stepQuery)
		
		if (snapSteps.empty)
			return todo;

		todo.steps = snapSteps.docs.map(stepDoc => {
			return { id: stepDoc.id, ...stepDoc.data() }
		})
		return todo
	})
}

const updateTodo = async ({ id, text }) => {
	await updateDoc(doc(db,collectionName, id), { text: text })
}

const deleteTodo = async (todoId) => {
	//TODO:delete from storage
	//https://firebase.google.com/docs/storage/web/delete-files?hl=pt-br
	console.log(todoId)
	await deleteDoc(doc(db,collectionName, todoId));
}

export { createTodo, readTodos, updateTodo, deleteTodo }