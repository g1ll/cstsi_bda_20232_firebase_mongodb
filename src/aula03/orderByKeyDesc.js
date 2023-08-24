import { onValue, orderByKey, query, ref } from "firebase/database";
import db from "../libs/firebase/rtdb_connection.js"

const node = "user"
let refNode = ref(db, node);

const consulta = query(refNode, orderByKey())

onValue(consulta, (dados) => {
  console.log(dados.val());
  let arrayDados = Object.entries(dados.val())
  arrayDados.reverse();
  console.log('DESC')
  console.log(arrayDados)
  arrayDados.forEach((item,index)=>console.log(`${index}: ${item[0]}`))
})