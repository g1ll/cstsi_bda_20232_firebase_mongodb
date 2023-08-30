import { onValue, orderByKey, query, ref, orderByChild, onChildAdded } from "firebase/database";
import db from "../libs/firebase/rtdb_connection.js"

const node = "produtos"
let refNode = ref(db, node);

const consulta = query(refNode, orderBykey())

onValue(consulta, (dados) => {
  let arrayDados = Object.entries(dados.val())
  arrayDados.reverse();
  console.log('DESC')
  console.log(arrayDados)
  arrayDados.forEach((item,index)=>console.log(`${index}: ${item[0]}`))
})