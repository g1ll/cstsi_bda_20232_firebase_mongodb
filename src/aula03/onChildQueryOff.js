import db from "../libs/firebase/rtdb_connection.js"
import {
	endAt,
	onChildAdded,
	onChildChanged,
	onChildRemoved,
	onValue,
	orderByChild,
	query,
	ref,
	off,
	startAt
} from "firebase/database";

const node = "users"
const userRef = ref(db, node)


//consulta para um path /users/ com nós que possuam 
//objetos com  os seguintes campos {idade:number, nome:string}
let consultaRestrita = query(
	userRef,
	orderByChild('idade'),
	startAt(0),
	endAt(60)
);

let consultaGeral = query(
	userRef,
	orderByChild('idade'),
);

let list = []

const updateList = (item) => {
	console.log(item)
	if (list.find(i => i.id == item.id) != undefined)
		list = list.map(i => i.id == item.id ? item : i)
	else list.push(item)
	sortList()
	renderList()
}

const deleteList = (item) => {
	list = list.filter(i => i.id != item.id)
	renderList()
}

const renderList = () => {
	console.clear()
	console.table(list)
}

//ordena por idade
const sortList = () => list.sort(
	(a, b) => a.data.idade > b.data.idade ? 1
		: (a.data.idade < b.data.idade) ? -1 : 0
)

onChildAdded(consultaRestrita,(snapshot) => {
	if (!snapshot.exists())
		return console.log("Nó não encontrado")
	list.push({ id: snapshot.key, data: snapshot.val() })
	sortList()
	renderList()
})

onChildChanged(consultaGeral, (snapshot) => {
	if (!snapshot.exists())
		return console.log("Nó não encontrado")

	console.log(snapshot.val())
	
	let idade = snapshot.val()?.idade
	if (idade && idade >= 0 && idade < 65)
		updateList({ id: snapshot.key, data: snapshot.val() })
});


onChildRemoved(consultaRestrita, (snapshot) => {
	if (!snapshot.exists())
		return console.log("Nó não encontrado")
	deleteList({ id: snapshot.key, data: snapshot.val() })
});

// function createListenerAdd(refListener) {
// 	onChildAdded(consultaRestrita, refListener);
// }
// let addListenerCallback = (snapshot) => {
// 	if (!snapshot.exists())
// 		return console.log("Nó não encontrado")
// 	list.push({ id: snapshot.key, data: snapshot.val() })
// 	sortList()
// 	printList()
// };
// createListenerAdd(addListenerCallback)


// onValue(userRef,(snapshot)=>{
// 	// list.length = 0
// 	if (!snapshot.exists())
// 		return console.log("Nó não encontrado")
// 	// off(consultaRestrita,'child_added',addListenerCallback)
// 	addListenerCallback = (snapshot) => {
// 		if (!snapshot.exists())
// 			return console.log("Nó não encontrado")
// 		list.push({ id: snapshot.key, data: snapshot.val() })
// 		sortList()
// 	};
// 	// createListenerAdd(addListenerCallback)
// 	onChildAdded(consultaRestrita, addListenerCallback);
// 	console.log(snapshot.val())
// })

// onChildChanged(consultaGeral, (snapshot) => {
// 	list.length = 0
// 	off(consultaRestrita,'child_added',addListenerCallback)
// 	createListenerAdd(addListenerCallback)
// });