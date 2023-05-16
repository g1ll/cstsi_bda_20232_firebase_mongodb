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
let consultaRestrita = query(
	userRef,
	orderByChild('idade'),
	startAt(start),
	endAt(end)
);

let consultaGeral = query(
	userRef,
	orderByChild('idade'),
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

//ordena por idade
const sortList = () => listUsers.sort(
	(a, b) => a.data.idade > b.data.idade ? 1
		: (a.data.idade < b.data.idade) ? -1 : 0
)

onChildAdded(consultaRestrita, (snapshot) => {
	if (!snapshot.exists())
		return console.log("Nó não encontrado")
	listUsers.push({ id: snapshot.key, data: snapshot.val() })
	sortList()
	renderList()
})

onChildChanged(consultaGeral, (snapshot) => {
	if (!snapshot.exists())
		return console.log("Nó não encontrado")

	console.log(snapshot.val())

	let idade = snapshot.val()?.idade
	if (idade && idade >= start && idade < end)
		updateList({ id: snapshot.key, data: snapshot.val() })
});

onChildRemoved(consultaRestrita, (snapshot) => {
	if (!snapshot.exists())
		return console.log("Nó não encontrado")
	deleteList({ id: snapshot.key, data: snapshot.val() })
});