import { onChildAdded, orderByChild, query, ref } from "firebase/database";
import db from "../libs/firebase/rtdb_connection.js"

const node = "user"
let refNode = ref(db, node);

const consulta =query(refNode,orderByChild('idade'))
onChildAdded(consulta,(dados)=>{
  console.log(dados.key);
  console.log(dados.val());
})