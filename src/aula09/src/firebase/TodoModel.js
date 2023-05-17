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

const db = getFirestore(initializeApp(firebaseConfig));
const todosCollectionRef = collection(db, "todos");

const createTodo = async ({ text }) => {
	await addDoc(todosCollectionRef, { text: text })
}

const readTodos = async () => {
	const querySnap = await getDocs(todosCollectionRef)
	const docs = querySnap.docs
	console.log(docs)
	if (!docs.length)
		throw Error("Empty data!")

	const todosPromises = docs.map(async doc => {
		const todo = ({
			id: doc.id,
			...doc.data()
		})

		todo.details && formatDetailsDate(todo.details)
		todo.collabs && await getCollabsEmail(todo.collabs)

		return todo;
	})

	let todos = await Promise.all(todosPromises)

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
		const stepRef = collection(db, `todos/${todo.id}/steps`)
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
	await updateDoc(doc(db,"todos", id), { text: text })
}

const deleteTodo = async (todoId) => {
	console.log(todoId)
	await deleteDoc(doc(db, 'todos', todoId));
}

export { createTodo, readTodos, updateTodo, deleteTodo }