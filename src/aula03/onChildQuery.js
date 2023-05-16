import db from "../libs/firebase/rtdb_connection.js"
import {
	endAt,
	onChildAdded,
	onChildChanged,
	onChildRemoved,
	orderByChild,
	query,
	ref,
	startAt
} from "firebase/database";

const node = "users"
const userRef = ref(db, node)
let listUsers = []

//consulta para um path /users/ com nós que possuam 
//objetos com  os seguintes campos {idade:number, nome:string}
let start = 0
let end = 60
let consulta = query(
	userRef,
	orderByChild('idade'),
	startAt(start),
	endAt(end)
);

const updateList = (item) => {
	if (listUsers.find(i => i.id == item.id))
		listUsers = listUsers.map(i => i.id == item.id ? item : i)
	else listUsers.push(item)
	sortList()
	renderList()
}

const deleteList = (item) => {
	listUsers = listUsers.filter(i => i.id != item.id)
	renderList()
}

const renderList = () => {
	console.clear()
	console.table(listUsers)
}

const sortList = () => listUsers.sort(
	(a, b) => a.data.idade > b.data.idade ? 1
		: (a.data.idade < b.data.idade) ? -1 : 0
)

onChildAdded(consulta, (snapshot) => {
	console.log('added')
	if (!snapshot.exists())
		return console.log("Nó não encontrado")
	updateList({ id: snapshot.key, data: snapshot.val() })
})

onChildChanged(consulta, (snapshot) => {
	console.log('changed')
	if (!snapshot.exists())
		return console.log("Nó não encontrado")
	updateList({ id: snapshot.key, data: snapshot.val() })
});

onChildRemoved(consulta, (snapshot) => {
	console.log('removed')
	if (!snapshot.exists())
		return console.log("Nó não encontrado")
	deleteList({ id: snapshot.key, data: snapshot.val() })
});