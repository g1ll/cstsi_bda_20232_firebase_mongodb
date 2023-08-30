import { onValue, orderByKey, query, ref, orderByChild, onChildAdded } from "firebase/database";
import db from "../libs/firebase/rtdb_connection.js"

const node = "produtos"
let refNode = ref(db, node);

const consulta = query(refNode, orderByChild('preco'))
let precosDesc = []

onChildAdded(consulta, (dados) => {
//   console.log(dados.val());
  	precosDesc.unshift(dados.val())
	console.table(precosDesc)
})

