import { onChildAdded, orderByChild, query, ref } from "firebase/database";
import db from "../libs/firebase/rtdb_connection.js"

const node = "produtos"
let refNode = ref(db, node);

const consulta =query(refNode,orderByChild('preco'))
onChildAdded(consulta,(dados)=>{
  console.log(dados.key);
  console.table(dados.val());
})