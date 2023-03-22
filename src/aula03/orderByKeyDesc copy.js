import { onValue, orderByKey, query, ref } from "firebase/database";
import db from "../libs/firebase/rtdb_conection.js"

const node = "users"
let refNode = ref(db, node);

const consulta = query(refNode, orderByKey())

onValue(consulta, (dados) => {
  console.log(dados.val());
  let arrayDados = Object.entries(dados.val())
  arrayDados.reverse();

  console.log('DESC')
  console.log(arrayDados)

})